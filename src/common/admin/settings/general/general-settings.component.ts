import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SettingsPanelComponent } from '../settings-panel.component';
import { FormControl } from '@angular/forms';
import { Page } from '../../../core/types/models/Page';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'homepage-settings',
    templateUrl: './general-settings.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GeneralSettingsComponent extends SettingsPanelComponent implements OnInit {
    private customPages: Page[] = [];
    public filteredCustomPages: Observable<Page[]>;
    public customPageSearch = new FormControl();

    ngOnInit() {
        this.setHomepageValue();
        this.pages.getAll().subscribe(response => {
            this.customPages = response.data;

            const page = this.customPages.find(
                customPage => customPage.id === this.state.initial.client['homepage.value']
            );

            this.customPageSearch.setValue(page ? page.slug : '');

            this.filteredCustomPages = this.customPageSearch.valueChanges.pipe(
                startWith(''),
                map(val => this.filterPages(val))
            );
        });
    }

    /**
     * Save current settings to the server.
     */
    public saveSettings() {
        const settings = this.state.getModified();

        if (this.state.client['homepage.type'] === 'page' && this.customPageSearch.value) {
            const page = this.customPages.find(
                customPage => customPage.slug === this.customPageSearch.value
            );

            if (page) settings.client['homepage.value'] = page.id;
        }

        super.saveSettings(settings);
    }

    public getHomepageComponents() {
        return this.customHomepage.getComponents();
    }

    /**
     * Filter custom pages by specified query.
     */
    private filterPages(query: string) {
        return this.customPages.filter(
            page => page.slug.toLowerCase().indexOf(query.toLowerCase()) === 0
        );
    }

    public getDisplayName(path: string) {
        return path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    public setHomepageValue() {
        if (this.state.client['homepage.type'] === 'component') {
            const current = this.state.client['homepage.value'];
            if ( ! current || typeof current !== 'string') {
                this.state.client['homepage.value'] = this.customHomepage.getComponents()[0].path;
            }
        } else {
            this.state.client['homepage.value'] = null;
        }
    }
}
