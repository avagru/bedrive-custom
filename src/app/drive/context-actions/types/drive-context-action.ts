export interface DriveContextAction {
    viewName: string;
    icon: string;
    execute: () => void;
    visible: () => boolean;
    separatorAfter?: boolean;
    showInCompact?: boolean;
}
