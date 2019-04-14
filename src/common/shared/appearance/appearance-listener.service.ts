import { Injectable } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Settings } from '../../core/config/settings.service';
import { AppearanceCommand } from './commands/appearance-command';
import { CommandTypes } from './commands/command-types';
import { AllCommands } from './commands/appearance-commands';
import { createSelectorBox } from './utils/create-selector-box';
import { selectNode } from './utils/select-node';
import { deselectNode } from './utils/deselect-node';
import { filter } from 'rxjs/operators';
import { Toast } from '../../core/ui/toast.service';
import { VebtoConfigAppearance } from '../../core/config/vebto-config';
import { createCustomStyleNode } from './utils/create-custom-style-node';
import { createCustomCodeNode } from './utils/create-custom-code-node';

@Injectable({
    providedIn: 'root'
})
export class AppearanceListenerService {
    public active = false;

    private dom: Partial<{
        selectBox: HTMLDivElement;
        colors: HTMLStyleElement;
    }> = {};

    constructor(
        private toast: Toast,
        private router: Router,
        private settings: Settings,
    ) {}

    public init() {
        if ( ! this.isPreviewMode()) return;
        this.listenForMessages();
        this.blockNotAllowedRoutes();
        this.createDomNodes();
    }

    private isPreviewMode(): boolean {
        return this.active = window.location.search.indexOf('preview=' + this.settings.csrfToken) > -1;
    }

    private listenForMessages() {
        window.addEventListener('message', e => {
            if (this.isAppearanceEvent(e) && this.eventIsTrusted(e)) {
                this.handleCommand(e.data);
            }
        });
    }

    private handleCommand(command: AllCommands|any) {
        // TODO: fix command data typings (remove "any")
        switch (command.type) {
            case (CommandTypes.Navigate):
                return this.router.navigate([command.route]);
            case (CommandTypes.SetConfig):
                return this.settings.set(command.key, command.value, true);
            case (CommandTypes.Select):
                return selectNode(command.selector, command.index, this.dom.selectBox);
            case (CommandTypes.Deselect):
                return deselectNode(this.dom.selectBox);
            case (CommandTypes.SetColors):
                return this.dom.colors.innerHTML = command.css;
            case (CommandTypes.SetCustomCss):
                return createCustomCodeNode('css', this.settings.getBaseUrl(true));
            case (CommandTypes.SetCustomJs):
                return createCustomCodeNode('js', this.settings.getBaseUrl(true));
        }
    }

    private eventIsTrusted(e: MessageEvent): boolean {
        return (new URL(e.origin).hostname) === window.location.hostname;
    }

    private isAppearanceEvent(e: MessageEvent) {
        const data = e.data as AppearanceCommand;
        return data && (data.type in CommandTypes);
    }

    private createDomNodes() {
        this.dom.selectBox = createSelectorBox();
        this.dom.colors = createCustomStyleNode();
    }

    private blockNotAllowedRoutes() {
        const config = this.settings.get('vebto.admin.appearance') as VebtoConfigAppearance;

        this.router.events
            .pipe(filter(e => e.toString().indexOf('NavigationStart') === 0))
            .subscribe((e: RouterEvent) => {
                if (e.url === '/') return;

                // route exists in config, bail
                const routes = config.navigationRoutes;
                if (routes.find(route => e.url.indexOf(route) > -1)) return;

                // prevent navigation to routes not specified in config
                const current = this.router.url.split('?')[0];
                this.router.navigate([current], {queryParamsHandling: 'preserve'});

                setTimeout(() => this.toast.open('That page is not supported by the editor.'));
            });
    }
}

