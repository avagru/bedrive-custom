import { InjectionToken } from '@angular/core';

export type PreviewUrlTransformer = (entryId: number) => string;

export const PREVIEW_URL_TRANSFORMER = new InjectionToken<PreviewUrlTransformer>('PREVIEW_URL_TRANSFORMER', {
    factory: () => {
        return entryId => 'secure/uploads/' + entryId;
    },
    providedIn: 'root',
});
