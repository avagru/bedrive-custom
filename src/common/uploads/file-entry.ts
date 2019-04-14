import { Tag } from '../core/types/models/Tag';

export interface FileEntry {
    id: number;
    name: string;
    mime: string;
    url: string;
    hash: string;
    type: 'folder'|string;
    description: string;
    path: string;
    tags?: Tag[];
    file_name: string;
    file_size: number;
    parent_id: number;
    thumbnail: boolean;
    parent?: FileEntry;
    deleted_at: string;
    children?: FileEntry[];
    users?: {id: number, email: string}[];
}
