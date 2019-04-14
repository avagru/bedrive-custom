export function slugifyString(text: string): string {
    if ( ! text) return text;

    return text.trim()
        .replace(/["']/g, '')
        .replace(/[^a-z0-9-]/gi, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
}
