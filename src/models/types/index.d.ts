import { CardHelpers } from '../interfaces';

export {};

declare global {
	interface Window {
		customCards: CustomCard[];
		loadCardHelpers: () => Promise<CardHelpers>;
	}

	interface CustomCard {
		type: string;
		name: string;
		description: string;
	}

	interface Event {
		// eslint-disable-next-line
		detail?: any;
	}
}
