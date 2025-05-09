import { html } from 'lit';
export function buildStyles(styles) {
    if (!styles) {
        return html ``;
    }
    let importantStyles = styles
        .replace(/ !important/g, '')
        .replace(/;/g, ' !important;');
    if (importantStyles.includes('@keyframes')) {
        const keyframeses = importantStyles.match(/@keyframes .*?\s{(.|\s)*?}\s}/g);
        for (const keyframes of keyframeses ?? []) {
            importantStyles = importantStyles.replace(keyframes, keyframes.replace(/ !important/g, ''));
        }
    }
    return html `<style id="user-styles">
		${importantStyles}
	</style>`;
}
