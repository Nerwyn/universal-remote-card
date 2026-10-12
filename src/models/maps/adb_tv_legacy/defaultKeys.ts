import { IElementConfig } from '../../interfaces';

export const adbTVLegacyDefaultKeys: IElementConfig[] = [
	{
		name: 'power',
		tap_action: { action: 'key', key: '26' },
		icon: 'mdi:power',
	},
	{
		name: '',
		tap_action: { action: 'key', key: '' },
		icon: 'mdi:',
	},
];
