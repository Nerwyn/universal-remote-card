import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/roku/#remote
 */
export const rokuDefaultKeys: IElementConfig[] = [
	{
		name: 'power',
		tap_action: { action: 'key', key: 'power' },
		icon: 'mdi:power',
	},
	{
		name: 'home',
		tap_action: { action: 'key', key: 'home' },
		icon: 'mdi:home',
	},
	{
		name: 'back',
		tap_action: { action: 'key', key: 'back' },
		icon: 'mdi:keyboard-backspace',
	},
	{
		name: 'volume_up',
		tap_action: { action: 'key', key: 'volume_up' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		name: 'volume_down',
		tap_action: { action: 'key', key: 'volume_down' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		name: 'volume_mute',
		tap_action: { action: 'key', key: 'volume_mute' },
		icon: 'mdi:volume-low',
	},
	{
		name: 'volume_buttons',
		icon: 'mdi:volume-plus',
	},
	{
		type: 'slider',
		name: 'slider',
		range: [0, 1],
		step: 0.01,
		value_attribute: 'volume_level',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.volume_set',
			data: {
				volume_level: '{{ value | float }}',
			},
		},
	},
	{
		name: 'up',
		tap_action: { action: 'key', key: 'up' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		name: 'down',
		tap_action: { action: 'key', key: 'down' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		name: 'left',
		tap_action: { action: 'key', key: 'left' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		name: 'right',
		tap_action: { action: 'key', key: 'right' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		name: 'center',
		tap_action: { action: 'key', key: 'select' },
		icon: 'mdi:circle',
	},
	{
		name: 'navigation_buttons',
		icon: 'mdi:gamepad',
	},
	{
		name: 'dpad',
		icon: 'mdi:gamepad',
	},
	{
		type: 'circlepad',
		name: 'circlepad',
		tap_action: {
			action: 'key',
			key: 'select',
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: { action: 'key', key: 'up' },
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: { action: 'key', key: 'down' },
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: { action: 'key', key: 'left' },
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: { action: 'key', key: 'right' },
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'circlepad',
		name: 'clickwheel',
		styles: '.circlepad {\n  outline: none;\n\n  --label-color: var(--icon-color);\n  --size: min(32px, 12vw);\n  --icon-offset: min(20px, 4vw);\n}\n#center::part(button) {\n  outline: none;\n}',
		up: {
			styles: '.label {\n  font-size: min(18px, 6vw);\n  translate: var(--icon-offset) calc(-1 * var(--icon-offset));\n}',
			label: 'MENU',
			tap_action: {
				action: 'key',
				key: 'info',
			},
		},
		down: {
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) var(--icon-offset);\n\n}',
			icon: 'mdi:play-pause',
			tap_action: {
				action: 'key',
				key: 'play',
			},
		},
		left: {
			icon: 'mdi:skip-backward',
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) calc(-1 * var(--icon-offset));\n}',
			tap_action: {
				action: 'key',
				key: 'reverse',
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'key',
				key: 'forward',
			},
		},
		drag_action: {
			action: 'key',
			key: 'volume_{{"up" if clockwise else "down"}}',
		},
		tap_action: {
			action: 'key',
			key: 'select',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'select',
		},
		up: {
			tap_action: { action: 'key', key: 'up' },
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: { action: 'key', key: 'down' },
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: { action: 'key', key: 'left' },
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: { action: 'key', key: 'right' },
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'key',
			key: 'select',
		},
		drag_action: {
			action: 'key',
			key: '{{ ("right" if deltaX > 0 else "left") if (deltaX | abs) > (deltaY | abs) else ("down" if deltaY > 0 else "up") }}',
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'key',
			key: '{{ ("right" if deltaX > 0 else "left") if (deltaX | abs) > (deltaY | abs) else ("down" if deltaY > 0 else "up") }}',
			repeat_delay: 50,
		},
		up: {},
		down: {},
		left: {},
		right: {},
		icon: 'mdi:drag-variant',
	},
	{
		name: 'play_pause',
		tap_action: { action: 'key', key: 'play' },
		icon: 'mdi:play-pause',
	},
	{
		name: 'play',
		tap_action: { action: 'key', key: 'play' },
		icon: 'mdi:play',
	},
	{
		name: 'pause',
		tap_action: { action: 'key', key: 'play' },
		icon: 'mdi:pause',
	},
	{
		name: 'rewind',
		tap_action: { action: 'key', key: 'reverse' },
		icon: 'mdi:rewind',
	},
	{
		name: 'fast_forward',
		tap_action: { action: 'key', key: 'forward' },
		icon: 'mdi:fast-forward',
	},
	{
		name: 'replay',
		tap_action: { action: 'key', key: 'replay' },
		icon: 'mdi:replay',
	},
	{
		name: 'keyboard',
		tap_action: { action: 'keyboard' },
		icon: 'mdi:keyboard',
	},
	{
		name: 'textbox',
		tap_action: { action: 'textbox' },
		icon: 'mdi:text-box',
	},
	{
		name: 'search',
		tap_action: { action: 'search' },
		icon: 'mdi:search-web',
	},
	{
		name: 'delete',
		tap_action: { action: 'key', key: 'backspace' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:backspace',
	},
	{
		name: 'enter',
		tap_action: { action: 'key', key: 'enter' },
		icon: 'mdi:magnify',
	},
	{
		name: 'channel_up',
		tap_action: { action: 'key', key: 'channel_up' },
		icon: 'mdi:arrow-up-circle',
	},
	{
		name: 'channel_down',
		tap_action: { action: 'key', key: 'channel_down' },
		icon: 'mdi:arrow-down-circle',
	},
	{
		name: 'find_remote',
		tap_action: { action: 'key', key: 'find_remote' },
		icon: 'mdi:remote-tv',
	},
	{
		name: 'info',
		tap_action: { action: 'key', key: 'info' },
		icon: 'mdi:asterisk',
	},
	{
		name: 'av_1',
		tap_action: { action: 'key', key: 'input_av1' },
		icon: 'mdi:import',
	},
	{
		name: 'hdmi_1',
		tap_action: { action: 'key', key: 'input_hdmi1' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'hdmi_2',
		tap_action: { action: 'key', key: 'input_hdmi2' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'hdmi_3',
		tap_action: { action: 'key', key: 'input_hdmi3' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'hdmi_4',
		tap_action: { action: 'key', key: 'input_hdmi4' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'tuner',
		tap_action: { action: 'key', key: 'input_tuner' },
		icon: 'mdi:video-input-antenna',
	},
	{
		name: 'literal',
		tap_action: { action: 'key', key: 'literal' },
		icon: 'mdi:alphabetical',
	},
];
