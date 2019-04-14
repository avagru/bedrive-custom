import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TextEditorComponent} from '../../../text-editor/text-editor.component';
import {Page} from '../../../core/types/models/Page';
import {Toast} from '../../../core/ui/toast.service';
import {Pages} from '../../../core/pages/pages.service';

@Component({
    selector: 'crupdate-page',
    templateUrl: './crupdate-page.component.html',
    styleUrls: ['./crupdate-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CrupdatePageComponent implements OnInit {
    @ViewChild(TextEditorComponent) textEditor: TextEditorComponent;

    public model = new Page();
    public errors: { body?: string, slug?: string } = {};
    public loading = false;

    constructor(
        private pages: Pages,
        private route: ActivatedRoute,
        private toast: Toast,
        private router: Router,
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.getPage(params['id']);
        });
    }

    public createPage() {
        this.loading = true;

        this.pages.create(this.getPayload()).subscribe((page: Page) => {
            this.router.navigate(['/admin/pages', page.id, 'edit']);
            this.toast.open('Page Created');
            this.errors = {};
            this.loading = false;
        }, errors => {
            this.errors = errors.messages;
            this.loading = false;
        });
    }

    public updatePage() {
        this.loading = true;

        this.pages.update(this.model.id, this.getPayload()).subscribe(() => {
            this.toast.open('Page Updated');
            this.errors = {};
            this.loading = false;
        }, errors => {
            this.errors = errors.messages;
            this.loading = false;
        });
    }

    public getPage(id: number) {
        if ( ! id) return;
        this.loading = true;

        this.pages.get(id).subscribe(page => {
            this.model = page;
            this.textEditor.setContents(this.model.body || '');
            this.loading = false;
        });
    }

    private getPayload(): Page {
        this.model.body = this.textEditor.getContents();
        return {...this.model};
    }
}
