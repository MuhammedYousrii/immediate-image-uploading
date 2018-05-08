export default function classify(selector) {
    const firstChar = selector.slice(0, 1);

    if (firstChar === '.') {
        console.wran(`${selector} -> it's already classified`);
    } else if (firstChar === '#') {
        const formatSelector = selector.slice(1);
        return `.${formatSelector}`;
    } else {
        return `.${selector}`;
    }
}
