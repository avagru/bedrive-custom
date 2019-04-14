import {Injectable} from '@angular/core';
import {DriveFolder} from '../../folders/models/driveFolder';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Observable, of as observableOf} from 'rxjs';
import { Select } from '@ngxs/store';
import { DriveState } from '../../state/drive-state';
import { filter } from 'rxjs/operators';

/** Flat node with expandable and level information */
export interface FolderFlatNode extends DriveFolder {
    level: number;
    expandable: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class FoldersTreeService {
    @Select(DriveState.userFolders) userFolders$: Observable<DriveFolder[]>;

    public control: FlatTreeControl<FolderFlatNode>;

    public flattener: MatTreeFlattener<DriveFolder, FolderFlatNode>;

    public dataSource: MatTreeFlatDataSource<DriveFolder, FolderFlatNode>;

    constructor() {
        this.createTreeFlattener();
        this.createTreeControl();
        this.createTreeDataSource();
        this.bindToStore();
    }

    private createTreeFlattener() {
        this.flattener = new MatTreeFlattener(
            this.transformer,
            this.getLevel,
            this.isExpandable, this.getChildren
        );
    }

    private createTreeControl() {
        this.control = new FlatTreeControl<FolderFlatNode>(
            this.getLevel,
            this.isExpandable
        );
    }

    private createTreeDataSource() {
        this.dataSource = new MatTreeFlatDataSource(
            this.control,
            this.flattener
        );
    }

    private bindToStore() {
        this.userFolders$
            .pipe(filter(x => !!x))
            .subscribe(folders => {
                this.dataSource.data = folders;
            });
    }

    public transformer(node: DriveFolder, level: number) {
        const flatNode = Object.assign({}, node) as FolderFlatNode;
        flatNode.level = level;
        flatNode.expandable = !!node.children;
        return flatNode;
    }

    private getLevel(node: FolderFlatNode): number {
        return node.level;
    }

    private isExpandable(node: FolderFlatNode): boolean {
        return node.expandable;
    }

    private getChildren(node: DriveFolder): Observable<DriveFolder[]> {
        return observableOf(node.children);
    }
}
