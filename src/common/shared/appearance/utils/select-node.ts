export function selectNode(selector: string, index: number = 0, box: HTMLDivElement) {
    const el = document.querySelectorAll(selector)[index] as HTMLElement;
    if ( ! el) return;

    const rect = el.getBoundingClientRect();

    box.style.width = rect.width + 'px';
    box.style.height = rect.height + 'px';
    box.style.top = rect.top + 'px';
    box.style.left = rect.left + 'px';
    box.style.borderRadius = el.style.borderRadius;
}
