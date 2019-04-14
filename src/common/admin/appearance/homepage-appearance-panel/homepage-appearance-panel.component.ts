import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {AppearanceEditor} from '../appearance-editor/appearance-editor.service';
import {Settings} from '../../../core/config/settings.service';
import {mapOrder} from '../../../core/utils/map-order';
import {AppHttpClient} from '../../../core/http/app-http-client.service';

interface HomeList {
    id: number;
    name: string;
    description: string;
    items: object[];
    system: boolean;
    public: boolean;
    user_id: number;
}

@Component({
    selector: 'homepage-appearance-panel',
    templateUrl: './homepage-appearance-panel.component.html',
    styleUrls: ['./homepage-appearance-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageAppearancePanelComponent implements OnInit {
    public loading$ = new BehaviorSubject(false);
    public searchControl = new FormControl();
    public results$: BehaviorSubject<HomeList[]> = new BehaviorSubject([]);
    public homepageLists$: BehaviorSubject<HomeList[]> = new BehaviorSubject([]);

    constructor(
        public appearance: AppearanceEditor,
        public settings: Settings,
        private http: AppHttpClient,
    ) {
    }

    ngOnInit() {
        this.bindToSearchQueryControl();
        this.loadLists();
    }

    private loadLists() {
        const listIds = this.settings.getJson('homepage.lists') as number[];
        if (!listIds) return;
        this.loading$.next(true);
        this.http.get('lists', {listIds})
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.homepageLists$.next(mapOrder(response.data, listIds, 'id'));
            });
    }

    public selectResult(e: MatAutocompleteSelectedEvent) {
        const list = e.option.value as HomeList;
        this.searchControl.reset();
        this.commitChanges([...this.homepageLists$.value, list]);
    }

    private bindToSearchQueryControl() {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(200),
                distinctUntilChanged(),
                filter(query => typeof query === 'string'),
                switchMap(query => this.searchForList(query)),
                catchError(() => of([])),
            ).subscribe(results => {
            this.results$.next(results);
        });
    }

    private searchForList(query: string): Observable<HomeList[]> {
        return this.http.get('lists', {query, excludeSystem: true})
            .pipe(map((response: any) => response.data));
    }

    public removeList(list: HomeList) {
        const lists = this.homepageLists$.value;
        const newLists = lists.filter(curr => curr.id !== list.id);
        this.commitChanges(newLists);
    }

    public reorderLists($event) {
        const lists = this.homepageLists$.value.slice();
        moveItemInArray(lists, $event.previousIndex, $event.currentIndex);
        this.commitChanges(lists);
    }

    private commitChanges(homepageLists: HomeList[]) {
        this.homepageLists$.next(homepageLists);
        const changes = homepageLists.map(list => list.id);
        this.appearance.changes.add('homepage.lists', changes);
    }

    public displayFn(list: HomeList): string {
        return list ? list.name : null;
    }
}