import {EventEmitter, Injectable} from '@angular/core';
import {Menu} from './menu';
import {MenuItem} from './menu-item';
import {Settings} from '../../../core/config/settings.service';
import {AppearanceEditor} from '../appearance-editor/appearance-editor.service';
import {moveItemInArray} from '@angular/cdk/drag-drop';

@Injectable({
    providedIn: 'root'
})
export class MenuEditor {

    private allMenus: Menu[] = [];

    /**
     * Currently selected menu, if any.
     */
    public activeMenu: Menu;

    /**
     * Fired when active menu items change (added or deleted).
     */
    public itemsChange = new EventEmitter();

    /**
     * MenuEditor Constructor.
     */
    constructor(
        private settings: Settings,
        private appearance: AppearanceEditor,
    ) {}

    /**
     * Get all existing menus.
     */
    public getAll() {
        return this.allMenus;
    }

    /**
     * Create a new menu.
     */
    public create() {
        this.activeMenu = new Menu({name: 'New Menu'});
        this.allMenus.push(this.activeMenu);
        this.commitChanges();
    }

    /**
     * Reorder currently active menu items to specified order.
     */
    public reorderActiveMenuItems(previousIndex: number, currentIndex: number) {
        moveItemInArray(this.activeMenu.items, previousIndex, currentIndex);
        this.commitChanges();
    }

    /**
     * Delete currently active menu.
     */
    public deleteActive() {
        const i = this.allMenus.indexOf(this.activeMenu);
        this.allMenus.splice(i, 1);
        this.activeMenu = null;
        this.commitChanges();
    }

    /**
     * Add new menu item to currently active menu.
     */
    public addItem(item: MenuItem) {
        item = this.transformLocalLinksToRoutes(item);
        this.activeMenu.items.push(item);
        this.commitChanges();
        this.itemsChange.emit();
    }

    /**
     * Transform links to routes if they point to the app.
     */
    private transformLocalLinksToRoutes(item: MenuItem): MenuItem {
        const baseUrl = this.settings.getBaseUrl();

        if (item.type !== 'link' || item.action.indexOf(baseUrl) === -1) return item;

        item.type = 'route';
        item.action = item.action.replace(this.settings.getBaseUrl(), '');
        return item;
    }

    /**
     * Remove specified menu item from currently active menu.
     */
    public deleteMenuItem(item: MenuItem) {
        let i = this.activeMenu.items.indexOf(item);
        this.activeMenu.items.splice(i, 1);
        this.commitChanges();
        this.itemsChange.emit();
    }

    /**
     * Commit current changes to menus.
     */
    public commitChanges() {
        const menus = JSON.stringify(this.allMenus);
        this.appearance.changes.add('menus', menus);
        this.appearance.setConfig('menus', menus);
    }

    /**
     * Set menus from json string.
     */
    public setFromJson(json: string) {
        if ( ! json) return;
        const menus = JSON.parse(json);

        if ( ! menus) return;

        this.allMenus = menus.map(menuData => {
            const menu = new Menu(menuData);

            menu.items = menu.items.map(item => new MenuItem(item));

            return menu;
        });
    }
}
