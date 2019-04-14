import { ElementRef } from '@angular/core';
import { ConnectedPosition, PositionStrategy } from '@angular/cdk/overlay';

export interface OverlayPanelConfig {
    position?: ConnectedPosition[]|OverlayPanelGlobalPosition|'center';
    mobilePosition?: ConnectedPosition[]|OverlayPanelGlobalPosition|'center';
    positionStrategy?: PositionStrategy;
    origin?: ElementRef | 'global';
    hasBackdrop?: boolean;
    closeOnBackdropClick?: boolean;
    panelClass?: string | string[];
    backdropClass?: string | string[];
    fullScreen?: boolean;
    data?: any;
}

export interface OverlayPanelGlobalPosition {
    top?: string|number;
    bottom?: string|number;
    right?: string|number;
    left?: string|number;
}
