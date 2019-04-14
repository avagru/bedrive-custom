export type ShareableNetworks = 'facebook'|'twitter'|'pinterest'|'tumblr'|'blogger';

export function shareLinkSocially(network: ShareableNetworks, link: string, name?: string, image?: string) {
    const url = generateShareUrl(network, link, name, image);
    openNewWindow(url);
}

function openNewWindow(url: string) {
    const width  = 575,
        height = 400,
        left   = (window.innerWidth  - width)  / 2,
        top    = (window.innerHeight - height) / 2,
        opts   = 'status=1, scrollbars=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;

    window.open(url, 'share', opts);
}

function generateShareUrl(type: string, link: string, name?: string, image?: string) {
    switch (type) {
        case 'facebook':
            return 'https://www.facebook.com/sharer/sharer.php?u=' + link ;
        case 'twitter':
            return `https://twitter.com/intent/tweet?text=${name} - ${link}`;
        case 'google-plus':
            return 'https://plus.google.com/share?url=' + link ;
        case 'pinterest':
            return 'https://pinterest.com/pin/create/button/?url=' + link + '&media=' + image;
        case 'tumblr':
            const base = 'https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&posttype=photo&title=&caption=';
            return base + this.mediaItem.name + '&content=' + image + '&url=' + link ;
        case 'blogger':
            return 'https://www.blogger.com/blog_this.pyra?t&u=' + link + '&n=' + name;
    }
}
