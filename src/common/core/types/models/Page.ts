export class Page {
    id: number;
    title?: string;
    body: string;
    slug: string;
    type = 'default';
    created_at?: string;
    updated_at?: string;

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}