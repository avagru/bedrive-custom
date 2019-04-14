import {ElementRef, Injectable, Injector} from '@angular/core';
import {ConnectedPosition, Overlay, PositionStrategy} from '@angular/cdk/overlay';
import {ComponentPortal, ComponentType, PortalInjector} from '@angular/cdk/portal';
import {BreakpointsService} from '../breakpoints.service';
import {OverlayPanelRef} from './overlay-panel-ref';
import { OVERLAY_PANEL_DATA } from './overlay-panel-data';
import { OverlayPanelConfig } from './overlay-panel-config';
import {FullscreenOverlayScrollStrategy} from './fullscreen-overlay-scroll-strategy';
import {filter} from 'rxjs/operators';
import {ESCAPE} from '@angular/cdk/keycodes';

const DEFAULT_CONFIG = {
    hasBackdrop: true,
    closeOnBackdropClick: true,
    panelClass: 'overlay-panel',
};

@Injectable({
    providedIn: 'root'
})
export class OverlayPanel {
    constructor(
        public overlay: Overlay,
        private breakpoints: BreakpointsService,
        private injector: Injector,
    ) {}

    public open(component: ComponentType<any>, userConfig: OverlayPanelConfig): OverlayPanelRef {
        const config = Object.assign({}, DEFAULT_CONFIG, userConfig);

        const overlayRef = this.overlay.create({
            positionStrategy: this.getPositionStrategy(config),
            hasBackdrop: config.hasBackdrop,
            panelClass: config.panelClass,
            backdropClass: config.backdropClass,
            scrollStrategy: config.fullScreen ? new FullscreenOverlayScrollStrategy() : null,
        });

        const overlayPanelRef = new OverlayPanelRef(overlayRef);
        const portal = new ComponentPortal(component, null, this.createInjector(config, overlayPanelRef));
        overlayRef.attach(portal);

        if (config.closeOnBackdropClick) {
            overlayRef.backdropClick().subscribe(() => overlayPanelRef.close());
            overlayRef.keydownEvents()
                .pipe(filter(e => e.keyCode === ESCAPE))
                .subscribe(() => overlayPanelRef.close());
        }

        return overlayPanelRef;
    }

    private createInjector(config: OverlayPanelConfig, dialogRef: OverlayPanelRef): PortalInjector {
        const injectionTokens = new WeakMap();
        injectionTokens.set(OverlayPanelRef, dialogRef);
        injectionTokens.set(OVERLAY_PANEL_DATA, config.data || null);
        return new PortalInjector(this.injector, injectionTokens);
    }

    private getPositionStrategy(config: OverlayPanelConfig) {
        if (config.positionStrategy) {
            return config.positionStrategy;
        } else if (config.origin === 'global') {
            return this.getGlobalPositionStrategy(config);
        } else {
            return this.getConnectedPositionStrategy(config);
        }
    }

    /**
     * Get position strategy for overlay positioned globally.
     */
    private getGlobalPositionStrategy(config: OverlayPanelConfig): PositionStrategy {
        const position = this.getPositionOption(config);

        if (position === 'center') {
            return this.overlay.position().global().centerHorizontally().centerVertically();
        } else {
            const global = this.overlay.position().global();
            Object.keys(position).forEach(key => {
                global[key](position[key]);
            });
            return global;
        }
    }

    /**
     * Get position strategy for overlay connected to origin element.
     */
    private getConnectedPositionStrategy(config: OverlayPanelConfig) {
        return this.overlay.position()
            .flexibleConnectedTo(config.origin as ElementRef)
            .withPositions(this.getPositionOption(config) as ConnectedPosition[]);
    }

    /**
     * Select position strategy based on current device.
     */
    private getPositionOption(config: OverlayPanelConfig) {
        if (config.mobilePosition && this.breakpoints.isMobile$.value) {
            return config.mobilePosition;
        } else {
            return config.position;
        }
    }
}
