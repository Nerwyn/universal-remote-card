import { CardHelpers } from '../interfaces';

export {};

declare global {
	interface Window {
		customCards: CustomCard[];
		loadCardHelpers: () => Promise<CardHelpers>;
		haNunjucks: {
			entityRegistry: {
				configEntryId2EntityIds: Record<string, string[]>;
			};
		};
	}

	interface CustomCard {
		type: string;
		name: string;
		description: string;
		preview?: boolean;
		documentationURL?: string;
	}

	interface Event {
		// eslint-disable-next-line
		detail?: any;
	}
}
