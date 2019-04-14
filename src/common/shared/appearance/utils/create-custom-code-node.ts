import { randomString } from '../../../core/utils/random-string';

type CustomCodeEl = HTMLLinkElement|HTMLScriptElement;

export function createCustomCodeNode(type: 'css'|'js' = 'css', baseUrl: string): CustomCodeEl {
    let el = document.querySelector('#editor-custom-' + type) as CustomCodeEl;

    if ( ! el) {
        el = type === 'css' ? createLink(baseUrl) : createScript(baseUrl);
        el.id = 'editor-custom-' + type;
        document.head.appendChild(el);
    } else {
        updateElHash(type, el);
    }

    return el;
}

function updateElHash(type: 'css'|'js', el: CustomCodeEl) {
    const newHash = '?hash=' + randomString(5);

    if (type === 'css') {
        const link = el as HTMLLinkElement;
        link.href = link.href.split('?')[0] + newHash;
    } else {
        const script = el as HTMLScriptElement;
        script.src = script.src.split('?')[0] + newHash;
    }
}

function createScript(baseUrl: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.src = getCustomCodePath('js', baseUrl);
    return script;
}

function createLink(baseUrl: string): HTMLLinkElement {
    const link = document.createElement('link');
    link.href = getCustomCodePath('css', baseUrl);
    link.rel = 'stylesheet';
    return link;
}

function getCustomCodePath(type: 'css'|'js', baseUrl: string) {
    let base = baseUrl;
    base += 'storage/custom-code/custom-';
    base += (type === 'css' ? 'styles.css' : 'scripts.js');
    return base + '?hash=' + randomString(5);
}
