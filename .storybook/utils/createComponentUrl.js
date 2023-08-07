export function createComponentUrl(componentName) {
    const baseUrl = `${window.location.href.split('iframe')[0]}`;

    return `${baseUrl}?path=/docs/${componentName.toLowerCase()}--docs`;
}
