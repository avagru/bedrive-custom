export class MenuItem {
    id: number;
    label: string;
    icon: string;
    action: string;
    type = 'link';
    order = 1;
    condition: string = null;
    position = 0;

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }

        this.id = Math.floor(Math.random() * (1000 - 1));
    }
}