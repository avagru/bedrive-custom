import {Component, ElementRef, OnDestroy, ViewEncapsulation} from '@angular/core';
import {MenuItem} from '../menu-item';
import {MenuEditor} from '../menu-editor.service';
import {Subscription} from 'rxjs';
import {Modal} from '../../../../core/ui/dialogs/modal.service';
import {ConfirmModalComponent} from '../../../../core/ui/confirm-modal/confirm-modal.component';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {OverlayPanel} from '../../../../core/ui/overlay-panel/overlay-panel.service';
import {IconSelectorComponent} from '../icon-selector/icon-selector.component';
import {RIGHT_POSITION} from '../../../../core/ui/overlay-panel/positions/right-position';

@Component({
    selector: 'menu-items',
    templateUrl: './menu-items.component.html',
    styleUrls: ['./menu-items.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MenuItemsComponent implements OnDestroy {
    public selectedMenuItem: MenuItem;
    public subscriptions: Subscription[] = [];

    constructor(
        public menus: MenuEditor,
        private modal: Modal,
        private overlayPanel: OverlayPanel,
    ) {}

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription && subscription.unsubscribe();
        });
    }

    public reorderMenuItems(e: CdkDragDrop<void>) {
        this.menus.reorderActiveMenuItems(e.previousIndex, e.currentIndex);
    }

    /**
     * Toggle specified menu item settings panel visibility.
     */
    public toggleMenuItem(item: MenuItem) {
        if (this.selectedMenuItem === item) {
            this.selectedMenuItem = null;
        } else {
            this.selectedMenuItem = item;
        }
    }

    /**
     * Ask user to confirm menu item deletion.
     */
    public confirmMenuItemDeletion() {
        this.modal.show(ConfirmModalComponent, {
            title: 'Delete Menu Item',
            body: 'Are you sure you want to delete this menu item?',
            ok: 'Delete'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.menus.deleteMenuItem(this.selectedMenuItem);
            this.selectedMenuItem = null;
        });
    }

    public openIconSelector(origin: HTMLElement, menuItem: MenuItem) {
        this.overlayPanel.open(IconSelectorComponent, {
            position: RIGHT_POSITION,
            origin: new ElementRef(origin),
        }).valueChanged().subscribe(icon => {
            menuItem.icon = icon;
            this.menus.commitChanges();
        });
    }
}
