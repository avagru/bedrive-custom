import {Component, ViewChild, ViewEncapsulation, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppearanceEditor} from './appearance-editor/appearance-editor.service';

@Component({
    selector: 'appearance',
    templateUrl: './appearance.component.html',
    styleUrls: ['./appearance.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppearanceComponent implements OnInit {
    @ViewChild('iframe') iframe: ElementRef;

    constructor(
        public appearanceEditor: AppearanceEditor,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.appearanceEditor.init(
            this.iframe.nativeElement,
            this.route.snapshot.data.defaultSettings
        );
    }

    public openPanel(name: string) {
        this.appearanceEditor.activePanel = name;
    }

    public closeEditor() {
        this.router.navigate(['admin']);
    }

    public sortSections = (a, b) => {
        if (a.value.position > b.value.position) return a.value.position;
    }
}
