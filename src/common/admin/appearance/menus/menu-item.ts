export class MenuItem {
    id: number;
    label: string;
    action: string;
    type: 'page' | 'link' | 'route' = 'link';
    order = 1;
    condition: string = null;
    position = 0;
    icon: string;

    constructor(params: Object = {}) {
        for (const name in params) {
            this[name] = params[name];
        }

        this.id = Math.floor(Math.random() * (1000 - 1));
    }
}