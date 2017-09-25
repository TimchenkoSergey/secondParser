export function getFileName(url) {
    if (!url) {
        return '';
    }

    return url.slice(url.indexOf('//') + 2).split('/').join('');
}