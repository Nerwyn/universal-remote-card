import { IElementConfig } from '../../interfaces';

/**
 * https://github.com/mvdwetering/yamaha_ynca?tab=readme-ov-file#presets
 */
export const yamahaYNCADefaultSources: IElementConfig[] = [
	{
		name: 'napster',
		tap_action: { action: 'source', source: 'napster:preset:1' },
		icon: 'napster',
	},
	{
		name: 'netradio',
		tap_action: { action: 'source', source: 'netradio:preset:1' },
		icon: 'mdi:web',
	},
	{
		name: 'pandora',
		tap_action: { action: 'source', source: 'pandora:preset:1' },
		icon: 'mdi:pandora',
	},
	{
		name: 'pc',
		tap_action: { action: 'source', source: 'pc:preset:1' },
		icon: 'mdi:desktop-classic',
	},
	{
		name: 'rhapsody',
		tap_action: { action: 'source', source: 'rhap:preset:1' },
		icon: 'napster',
	},
	{
		name: 'sirius',
		tap_action: { action: 'source', source: 'sirius:preset:1' },
		icon: 'siriusxm',
	},
	{
		name: 'siriusir',
		tap_action: { action: 'source', source: 'siriusis:preset:1' },
		icon: 'siriusxm',
	},
	{
		name: 'tuner',
		tap_action: { action: 'source', source: 'tun:preset:1' },
		icon: 'mdi:radio',
	},
	{
		name: 'fm',
		tap_action: { action: 'source', source: 'dab:fmpreset:1' },
		icon: 'mdi:radio-fm',
	},
	{
		name: 'dab',
		tap_action: { action: 'source', source: 'dab:dabpreset:1' },
		icon: 'mdi:radio-tower',
	},
	{
		name: 'usb',
		tap_action: { action: 'source', source: 'usb:preset:1' },
		icon: 'mdi:usb',
	},
];
