import { html, TemplateResult } from 'lit';

/**
 * Build user provided CSS styles string, ensuring that it overrides the default styles
 * @param {string} [styles] User CSS styles string
 * @returns {TemplateResult<1>} lit HTML template with user CSS styles in a style tag
 */
export function buildStyles(styles?: string): TemplateResult<1> {
	if (!styles) {
		return html``;
	}

	// Ensure user styles override default styles
	let importantStyles = styles
		.replace(/ !important/g, '')
		.replace(/;/g, ' !important;');

	// Remove !important from keyframes
	// Initial check to avoid expensive regex for most user styles
	if (importantStyles.includes('@keyframes')) {
		const keyframeses = importantStyles.match(
			/@keyframes\s.*?\s{(.|\n)*?}\n}/g,
		);
		for (const keyframes of keyframeses ?? []) {
			importantStyles = importantStyles.replace(
				keyframes,
				keyframes.replace(/ !important/g, ''),
			);
		}
	}

	return html`<style id="user-styles">
		${importantStyles}
	</style>`;
}

/**
 * Parse pixel string to float
 * @param {string} pixels The pixel string, typicaly ends with 'px'
 * @returns The pixel string as a float
 */
export function getNumericPixels(pixels: string) {
	return parseFloat(pixels.replace(/[^0-9]+/g, ''));
}

/**
 * Replace underscores with spaces and capitalize the first letter of each word
 * @param {unknown} word
 * @returns {string}
 */
export function capitalizeWords(word: unknown): string {
	if (!word) return '';
	if (typeof word !== 'string') return word.toString();

	let result = '';
	let upperNext = true;
	for (const char of word) {
		if (upperNext) {
			result += char.toUpperCase();
			upperNext = false;
			continue;
		}
		if (char === '_') {
			result += ' ';
			upperNext = true;
			continue;
		}
		result += char;
	}
	return result;
}
