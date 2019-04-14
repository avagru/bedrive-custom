import {Injectable} from '@angular/core';
import {AppearancePendingChanges} from './appearance-pending-changes.service';
import {Settings} from '../../../core/config/settings.service';
import {VebtoConfigAppearance} from '../../../core/config/vebto-config';
import { Select, Navigate, SetConfig, Deselect } from '../../../shared/appearance/commands/appearance-commands';
import { AppearanceCommand } from '../../../shared/appearance/commands/appearance-command';

@Injectable({
    providedIn: 'root'
})
export class AppearanceEditor {
    public activePanel: string;
    public defaultSettings: {name: string, value: any}[];
    public config: Partial<VebtoConfigAppearance> = {};
    public loading = false;
    private previewWindow: Window;

    constructor(
        public changes: AppearancePendingChanges,
        private settings: Settings,
    ) {}

    public init(iframe: HTMLIFrameElement, defaultSettings: {name: string, value: any}[]) {
        this.defaultSettings = defaultSettings;

        this.initConfig();
        this.hydrateSeoSection();

        const colors = this.defaultSettings.find(setting => setting.name === 'colors');

        this.config.sections.colors.fields = colors.value.map(color => {
            return {name: color.display_name, type: 'color', key: color.name, value: color.value};
        });

        this.initIframe(iframe);
        this.setFieldValues();
    }

    public saveChanges() {
        this.changes.save();
    }

    public closeActivePanel() {
        this.activePanel = null;
        this.navigate();
    }

    public navigate(route?: string) {
        if ( ! route) route = this.config.defaultRoute;
        this.postMessage(new Navigate(route));
    }

    public setConfig(key: string, value: string|number) {
        this.postMessage(new SetConfig(key, value));
    }

    public selectNode(selector: string, index = 0) {
        if ( ! selector) return;
        this.postMessage(new Select(selector, index));
    }

    public deselectNode() {
        this.postMessage(new Deselect());
    }

    private initIframe(iframe: HTMLIFrameElement) {
        iframe.src = this.settings.getBaseUrl() + this.config.defaultRoute + '?preview=' + this.settings.csrfToken;
        this.previewWindow = iframe.contentWindow;
    }

    public postMessage(command: AppearanceCommand) {
        this.previewWindow.postMessage(command, '*');
    }

    private setFieldValues() {
        Object.keys(this.config.sections).forEach(key => {
            const configItem = this.config.sections[key];

            if (configItem.name.toLowerCase() === 'colors') return;

            configItem.fields.forEach(field => {
                if (typeof field.value === 'undefined') {
                    field.value = this.getCurrentSetting(field.key);
                }
                if (typeof field.defaultValue === 'undefined') {
                    field.defaultValue = this.getDefaultSetting(field.key);
                }
            });
        });
    }

    private getCurrentSetting(key: string) {
        if (key.startsWith('env.')) {
            return this.getDefaultSetting('env')[key];
        } else {
            return this.settings.get(key);
        }
    }

    /**
     * Get default setting by specified key.
     */
    public getDefaultSetting(key: string) {
        const setting = this.defaultSettings.find(s => s.name === key);
        return setting ? setting.value : null;
    }

    private hydrateSeoSection() {
        const existing = this.config.sections.seo.fields.map(item => item.key);
        const seoFields = this.defaultSettings.find(setting => setting.name === 'seo_fields');

        if ( ! seoFields) return;

        seoFields.value.forEach(field => {
            if (existing.indexOf(field.name) > -1) return;
            this.config.sections.seo.fields.push(field);
        });
    }

    private initConfig() {
        this.config = this.settings.get('vebto.admin.appearance');
        if ( ! this.config.defaultRoute) this.config.defaultRoute = '/';
    }
}
