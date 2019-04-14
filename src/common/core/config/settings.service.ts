import {EventEmitter, Injectable} from '@angular/core';
import {VebtoConfig} from './vebto-config';
import * as Dot from 'dot-object';
import merge from 'deepmerge';
import { AppHttpClient } from '../http/app-http-client.service';
import {objToFormData} from '../utils/obj-to-form-data';
import {SettingsJsonPayload, SettingsPayload} from './settings-payload';

@Injectable({
    providedIn: 'root',
})
export class Settings {
    private http: AppHttpClient;
    private all: VebtoConfig = {};
    public csrfToken: string;
    public onChange: EventEmitter<string> = new EventEmitter();

    /**
     * Set multiple settings on settings service.
     */
    public setMultiple(settings: VebtoConfig, fireEvent = false) {
        for (const key in settings) {
            let value = settings[key];

            if (value === '0' || value === '1') {
                value = parseInt(value);
            }

            this.set(key, value);
        }
        if (fireEvent) this.onChange.emit();
    }

    public merge(config: object, fireEvent = false) {
        this.all = merge(this.all, config);
        if (fireEvent) this.onChange.emit();
    }

    /**
     * Set single setting.
     */
    public set(name: keyof VebtoConfig|any, value: VebtoConfig[keyof VebtoConfig]|any, fireEvent = false) {
        Dot['set'](name, value, this.all);
        if (fireEvent) this.onChange.emit(name);
    }

    /**
     * Get a setting by key, optionally providing default value.
     */
    public get(name: keyof VebtoConfig|any, defaultValue: any = null): any {
        const value = Dot.pick(name, this.all);

        if (value == null) {
            return defaultValue;
        } else {
            return value;
        }
    }

    /**
     * Get all settings.
     */
    public getAll() {
        return this.all;
    }

    /**
     * Check if setting with specified name exists.
     */
    public has(name: keyof VebtoConfig): boolean {
        return !!Dot.pick(name as string, this.all);
    }

    /**
     * Get a json setting by key and decode it.
     */
    public getJson(name: keyof VebtoConfig, defaultValue: any = null) {
        const value = this.get(name, defaultValue);
        if (typeof value !== 'string') return value;
        return JSON.parse(value);
    }

    /**
     * Get base url for the app.
     */
    public getBaseUrl(forceServerUrl = false): string {
        // sometimes we might need to get base url supplied by backend
        // even in development environment, for example, to prevent
        // uploaded images from having proxy urls like "localhost:4200"
        if (this.has('base_url') && (this.get('vebto.environment') === 'production' || forceServerUrl)) {
            return this.get('base_url') + '/';
        } else if (document.querySelector('base')) {
            return document.querySelector('base')['href'];
        } else {
            // 'https://site.com/subdomain/index.html/" => 'https://site.com/subdomain/'
            const url = window.location.href.split('?')[0];
            return url.replace(/([^\/]+\.\w+($|\/$))/, '');
        }
    }

    /**
     * Get app's asset base url.
     */
    public getAssetUrl(suffix?: string): string {
        let uri = (this.get('vebto.assetsUrl') || this.getBaseUrl());
        const prefix = this.get('vebto.assetsPrefix');

        // in production assets will be in "client" sub-folder
        if (this.get('vebto.environment') === 'production' && prefix) {
            uri += prefix + '/';
        }

        uri += 'assets/';

        if (suffix) uri += suffix;

        return uri;
    }

    /**
     * Save specified setting on the server.
     */
    public save(settings: SettingsPayload) {
        this.setMultiple(settings.client);
        const jsonSettings = {files: settings.files} as SettingsJsonPayload;
        // need to encode settings as json to preserve
        // booleans as form data will always be a string
        // also need to encode as base64 to make sure requests
        // are not blocked when setting contains <scripts>
        jsonSettings.client = btoa(JSON.stringify(settings.client));
        jsonSettings.server = btoa(JSON.stringify(settings.server));
        const data = objToFormData(jsonSettings);
        return this.http.post('settings', data);
    }

    /**
     * Check if any social login is enabled.
     */
    public anySocialLoginEnabled() {
        const names = ['facebook', 'google', 'twitter'];
        return names.filter(name => this.get('social.' + name + '.enable')).length > -1;
    }

    /**
     * Set HttpClient instance.
     */
    public setHttpClient(http: AppHttpClient) {
        this.http = http;
    }
}
