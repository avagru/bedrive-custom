import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SEARCH_FILE_TYPES } from '../search-file-types';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Store } from '@ngxs/store';
import {  OpenSearchPage } from '../../state/actions/commands';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { DriveEntryApiService } from '../../drive-entry-api.service';
import { BehaviorSubject, of as observableOf } from 'rxjs';
import { DriveEntry } from '../../files/models/drive-entry';
import { EntryDoubleTapped } from '../../state/actions/events';

interface SearchResult {
    type: 'entry'|'entryType';
    content: DriveEntry|{name: string, type: string};
}

@Component({
    selector: 'main-searchbar',
    templateUrl: './main-searchbar.component.html',
    styleUrls: ['./main-searchbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSearchbarComponent implements OnInit {
    @ViewChild('trigger', {read: ElementRef}) trigger: ElementRef;
    private defaultResults: SearchResult[] = [];
    public formControl = new FormControl();
    public results: BehaviorSubject<SearchResult[]> = new BehaviorSubject([]);
    private lastQuery: string;

    constructor(
        private store: Store,
        private driveApi: DriveEntryApiService,
    ) {
        this.setDefaultResults();
    }

    ngOnInit() {
        this.formControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(q => typeof q === 'string'),
            switchMap(query => this.search(query))
        ).subscribe(response => {
            this.results.next(response.data.map(entry => {
                return {type: 'entry', content: entry} as SearchResult;
            }));
        });
    }

    public executeAction(e: MatAutocompleteSelectedEvent) {
        const value = e.option.value as SearchResult;

        if (value.type === 'entryType') {
            this.openSearchPage({type: value.content.type});
            this.resetForm();
        } else {
            this.store.dispatch(new EntryDoubleTapped(value.content as DriveEntry));
        }

        this.trigger.nativeElement.blur();
    }

    public openSearchPage(params: {type?: string, query?: string}) {
        this.store.dispatch(new OpenSearchPage(params));
    }

    private search(query: string) {
        this.lastQuery = query;
        if ( ! query || query.length < 3) return observableOf({data: []});
        return this.driveApi.getCurrentUserEntries({query, per_page: 8});
    }

    private setDefaultResults() {
        this.defaultResults = SEARCH_FILE_TYPES.map(entryType => {
            return {type: 'entryType', content: entryType} as SearchResult;
        });

        this.results.next(this.defaultResults);
    }

    public resetForm() {
        this.formControl.reset();
        this.setDefaultResults();
        this.lastQuery = null;
    }

    displayFn = () => {
        // always show original user query when
        // clicking on any autocomplete option
        return this.lastQuery || '';
    }
}
