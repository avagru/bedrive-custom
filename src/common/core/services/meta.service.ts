import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, Data, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Settings } from '../config/settings.service';
import { Translations } from '../translations/translations.service';
import { ucFirst } from '../utils/uc-first';

export interface MetaTag {
    nodeName: 'meta'|'script'|'title'|'link';
    type?: string;
    content?: string;
    property?: string;
    _text?: string;
    href?: string;
    rel?: string;
}

const TAG_CLASS = 'dynamic-seo-tag';

@Injectable({
    providedIn: 'root'
})
export class MetaService {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private router: Router,
        private settings: Settings,
        private i18n: Translations,
        private route: ActivatedRoute,
    ) {}

    public init() {
        this.activeRouteData$()
            .subscribe(data => {
                if (data.api && data.api.seo) {
                    this.addTags(data.api.seo);
                } else if ( ! data.willSetSeo) {
                    this.setDefaultTags(data);
                }
            });
    }

    public addTags(tags: MetaTag[]) {
        this.removeOldTags();
        const firstChild = this.document.head.firstChild;
        tags.forEach(tag => {
            const node = document.createElement(tag.nodeName);
            node.classList.add(TAG_CLASS);
            Object.keys(tag).forEach(key => {
                if (key === 'nodeName') return;

                if (key === '_text') {
                    node.textContent = typeof tag[key] === 'string' ? tag[key] : JSON.stringify(tag[key]);
                } else {
                    node.setAttribute(key, tag[key]);
                }
            });

            this.document.head.insertBefore(node, firstChild);
        });
    }

    private removeOldTags() {
        const tags = this.document.head.getElementsByClassName(TAG_CLASS);
        for (let i = 0; i < tags.length; i++) {
            this.document.head.removeChild(tags[i]);
        }
    }

    private activeRouteData$(): Observable<Data> {
        return this.router.events
            .pipe(
                filter(e => e instanceof NavigationEnd),
                map(() => this.route),
                map((route: ActivatedRoute) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter((route: ActivatedRoute) => route.outlet === 'primary'),
                mergeMap(route => route.data)
            );
    }

    private setDefaultTags(data: Data) {
        const title = {
            nodeName: 'title',
            _text: this.settings.get('branding.site_name'),
        } as MetaTag;

        const defaultTitle = data.title || data.name;

        // prepend route name to site name, if available
        if (defaultTitle) {
            const name = this.i18n.t(defaultTitle.replace('-', ' '));
            title._text = name + ' - ' + title._text;
        }

        title._text = ucFirst(title._text);

        this.addTags([title]);
    }
}
