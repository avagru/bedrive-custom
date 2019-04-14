export function getFaviconFromUrl(url: string) {
    const domain = new URL(url).origin;
    return 'http://www.google.com/s2/favicons?domain=' + domain;
}
