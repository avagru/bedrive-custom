import { AppearanceFieldConfig } from '../core/config/vebto-config';
import { colors, customCode, general, menus, seo } from './appearance/config';

export const DEFAULT_VEBTO_ADMIN_CONFIG = {
    admin: {
        pages: [],
        appearance: {
            navigationRoutes: [],
            menus: {
                availableRoutes: [
                    'login',
                    'register',
                    'contact',
                    'account-settings',
                    'admin/appearance',
                    'admin/users',
                    'admin/settings/authentication',
                    'admin/settings/branding',
                    'admin/settings/cache',
                    'admin/settings/providers',
                    'admin/roles',
                ],
            },
            sections: <{[key: string]: AppearanceFieldConfig}> {
                general,
                menus,
                colors,
                customCode,
                seo,
            }
        }
    }
};
