import { landingPage } from './admin/appearance/landing-page-config';

export const BEDRIVE_CONFIG = {
    assetsPrefix: 'client',
    navbar: {
        defaultPosition: 'drive-navbar',
        dropdownItems: [
            {route: '/drive', name: 'My Drive', icon: 'network-drive-custom'},
        ]
    },
    auth: {
        redirectUri: '/drive',
        adminRedirectUri: '/drive',
        color: 'primary',
    },
    accountSettings: {
        hideNavbar: false,
    },
    customPages: {
        hideNavbar: false,
    },
    demo: {
        email: false,
    },
    admin: {
        ads: [
            {
                slot: 'ads.filePreview',
                description: 'This ad will appear on shared file preview page.',
            },
            {
                slot: 'ads.drive',
                description: 'This ad will appear on user drive page.',
            },
        ],
        appearance: {
            defaultRoute: 'drive',
            navigationRoutes: [
                's',
                'drive',
            ],
            menus: {
                positions: [
                    'drive-navbar',
                    'drive-sidebar',
                    'homepage-navbar',
                    'admin-navbar',
                    'custom-page-navbar',
                ],
                availableRoutes: [
                    'drive/shares',
                    'drive/recent',
                    'drive/starred',
                    'drive/trash',
                ]
            },
            sections: {landingPage: landingPage},
        }
    },
};
