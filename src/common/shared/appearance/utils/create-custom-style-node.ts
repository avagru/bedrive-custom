export function createCustomStyleNode() {
    let el = document.querySelector('#appearance-colors-css') as HTMLStyleElement;

    if ( ! el) {
        el = document.createElement('style');
        el.id = 'appearance-colors-css';
        document.head.appendChild(el);
    }

    // make sure colors <style> element is the last one
    // in <head> so it has the highest specificity
    if (el.parentNode.lastChild !== el) {
        el.parentNode.appendChild(el);
    }

    return el;
}
