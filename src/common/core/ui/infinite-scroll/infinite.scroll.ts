import { Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export abstract class InfiniteScroll implements OnInit, OnDestroy {
    protected scrollSub: Subscription;
    @Input() threshold: number | string = 50;

    protected el: ElementRef;

    ngOnInit() {
        this.scrollSub = fromEvent(this.getScrollContainer(), 'scroll', {capture: true})
            .pipe(debounceTime(20))
            .subscribe((e: Event) => this.onScroll(e.target as HTMLElement));
    }

    ngOnDestroy() {
        this.scrollSub && this.scrollSub.unsubscribe();
    }

    protected getScrollContainer() {
        return this.el ? this.el.nativeElement : document;
    }

    protected onScroll(target: HTMLElement) {
        if ( ! target || ! this.canLoadMore() || this.isLoading()) return;

        const offset = parseInt(this.threshold as string);

        const currentScroll = this.el ?
            target.scrollTop + target.offsetHeight :
            window.scrollY + window.innerHeight;

        const heightWithoutOffset = this.el ?
            target.scrollHeight - offset :
            document.documentElement.scrollHeight - offset;

        if (currentScroll >= heightWithoutOffset) {
            this.loadMoreItems();
        }
    }

    protected abstract loadMoreItems();
    protected abstract canLoadMore(): boolean;
    protected abstract isLoading(): boolean;
}
