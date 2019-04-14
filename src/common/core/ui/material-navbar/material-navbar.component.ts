import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input, OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {Settings} from '../../config/settings.service';
import {CurrentUser} from '../../../auth/current-user';
import {BreakpointsService} from '../breakpoints.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'material-navbar',
    templateUrl: './material-navbar.component.html',
    styleUrls: ['./material-navbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MaterialNavbar implements OnInit {
    @Input() menuPosition: string;
    @Input() showToggleButton = false;
    @Input() container = false;
    @Input() showAuthButtons = false;
    @Output() toggleButtonClick = new EventEmitter();
    @Input() @HostBinding('class.transparent') transparent = false;
    public mobileSearchActive$ = new BehaviorSubject(false);

    public searchInput: HTMLInputElement;
    
    constructor(
        public config: Settings,
        public currentUser: CurrentUser,
        private el: ElementRef<HTMLElement>,
        public breakpoints: BreakpointsService,
    ) {}

    ngOnInit() {
        this.searchInput = this.el.nativeElement.querySelector('.nav-searchbar input');
        if (this.searchInput) {
            this.searchInput.addEventListener('blur', () => {
                this.closeMobileSearch();
            });
        }
    }

    public openMobileSearch() {
        this.mobileSearchActive$.next(true);
        this.el.nativeElement.classList.add('mobile-search-active');
        setTimeout(() => this.searchInput.focus());
    }

    public closeMobileSearch() {
        this.el.nativeElement.classList.remove('mobile-search-active');
        return this.mobileSearchActive$.next(false);
    }
}
