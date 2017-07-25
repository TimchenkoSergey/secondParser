export function getFileName(url) {
    return url.slice(url.indexOf('//') + 2).split('/').join('');
}