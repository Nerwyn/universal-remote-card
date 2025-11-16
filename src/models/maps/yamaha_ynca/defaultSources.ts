import { IElementConfig } from '../../interfaces';

/**
 * https://github.com/mvdwetering/yamaha_ynca?tab=readme-ov-file#presets
 */
export const yamahaYNCADefaultSources: IElementConfig[] = [
	{
		type: 'button',
		name: 'napster',
		tap_action: { action: 'source', source: 'napster:preset:1' },
		icon: 'napster',
	},
	{
		type: 'button',
		name: 'netradio',
		tap_action: { action: 'source', source: 'netradio:preset:1' },
		icon: 'mdi:web',
	},
	{
		type: 'button',
		name: 'pandora',
		tap_action: { action: 'source', source: 'pandora:preset:1' },
		icon: 'mdi:pandora',
	},
	{
		type: 'button',
		name: 'pc',
		tap_action: { action: 'source', source: 'pc:preset:1' },
		icon: 'mdi:desktop-classic',
	},
	{
		type: 'button',
		name: 'rhapsody',
		tap_action: { action: 'source', source: 'rhap:preset:1' },
		icon: 'napster',
	},
	{
		type: 'button',
		name: 'sirius',
		tap_action: { action: 'source', source: 'sirius:preset:1' },
		icon: 'siriusxm',
	},
	{
		type: 'button',
		name: 'siriusir',
		tap_action: { action: 'source', source: 'siriusis:preset:1' },
		icon: 'siriusxm',
	},
	{
		type: 'button',
		name: 'tuner',
		tap_action: { action: 'source', source: 'tun:preset:1' },
		icon: 'mdi:radio',
	},
	{
		type: 'button',
		name: 'fm',
		tap_action: { action: 'source', source: 'dab:fmpreset:1' },
		icon: 'mdi:radio-fm',
	},
	{
		type: 'button',
		name: 'dab',
		tap_action: { action: 'source', source: 'dab:dabpreset:1' },
		icon: 'mdi:radio-tower',
	},
	{
		type: 'button',
		name: 'usb',
		tap_action: { action: 'source', source: 'usb:preset:1' },
		icon: 'mdi:usb',
	},
];
