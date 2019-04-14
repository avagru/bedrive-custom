export const landingPage = {
    route: '/',
    name: 'Landing Page',
    position: 4,
    fields: [
        {
            name: 'Background',
            type: 'image',
            key: 'landingPage.background',
            selector: '.bg-container',
        },
        {
            name: 'Title',
            key: 'landingPage.title',
            selector: '.title',
        },
        {
            name: 'Subtitle',
            key: 'landingPage.subtitle',
            selector: '.subtitle'
        },
        {
            name: 'CTA Button',
            key: 'landingPage.ctaButton',
            selector: '.cta-button',
        }
    ]
};
