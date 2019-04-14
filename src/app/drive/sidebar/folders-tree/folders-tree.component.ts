import {
    ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation
} from '@angular/core';
import { FoldersTreeService } from './folders-tree.service';
import { DriveFolder } from '../../folders/models/driveFolder';
import { DriveEntry } from '../../files/models/drive-entry';
import { ROOT_FOLDER, RootFolder } from '../../folders/root-folder';

@Component({
    selector: 'folders-tree',
    templateUrl: './folders-tree.component.html',
    styleUrls: ['./folders-tree.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersTreeComponent {
    @HostBinding('class.expanded') @Input() public expanded = false;
    @Input() selectedFolder: string;
    @Input() movingEntries: DriveEntry[] = [];
    @Input() disableContextMenu = false;
    @HostBinding('class.has-root-node') @Input() showRootNode = false;
    @Output() folderSelected: EventEmitter<DriveFolder|RootFolder> = new EventEmitter();

    // TODO: start trackBy function when it's fixed on angular material side
    constructor(public tree: FoldersTreeService) {}

    public selectFolder(folder?: DriveFolder|RootFolder) {
        folder = folder || ROOT_FOLDER;
        this.selectedFolder = folder.hash;
        this.folderSelected.emit(folder);
    }

    public toggle() {
        this.expanded = !this.expanded;
    }
}
