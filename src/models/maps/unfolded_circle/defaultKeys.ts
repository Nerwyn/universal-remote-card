import { IElementConfig } from '../../interfaces';

/**
 * https://github.com/JackJPowell/hass-unfoldedcircle
 */
export const unfoldedCircleDefaultKeys: IElementConfig[] = [
	{
		type: 'button',
		name: 'power',
		tap_action: { action: 'key', key: 'POWER' },
		icon: 'mdi:power',
	},
	{
		type: 'button',
		name: 'home',
		tap_action: { action: 'key', key: 'HOME' },
		icon: 'mdi:home',
	},
	{
		type: 'button',
		name: 'back',
		tap_action: { action: 'key', key: 'BACK' },
		icon: 'mdi:keyboard-backspace',
	},
	{
		type: 'button',
		name: 'volume_up',
		tap_action: { action: 'key', key: 'VOLUME_UP' },
		icon: 'mdi:volume-high',
	},
	{
		type: 'button',
		name: 'volume_down',
		tap_action: { action: 'key', key: 'VOLUME_DOWN' },
		icon: 'mdi:volume-low',
	},
	{
		type: 'button',
		name: 'volume_mute',
		tap_action: { action: 'key', key: 'MUTE' },
		icon: 'mdi:volume-low',
	},
	{
		type: 'button',
		name: 'volume_buttons',
		icon: 'mdi:volume-plus',
	},
	{
		type: 'button',
		name: 'up',
		tap_action: { action: 'key', key: 'DPAD_UP' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		type: 'button',
		name: 'down',
		tap_action: { action: 'key', key: 'DPAD_DOWN' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		type: 'button',
		name: 'left',
		tap_action: { action: 'key', key: 'DPAD_LEFT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		type: 'button',
		name: 'right',
		tap_action: { action: 'key', key: 'DPAD_RIGHT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		type: 'button',
		name: 'center',
		tap_action: { action: 'key', key: 'DPAD_MIDDLE' },
		icon: 'mdi:checkbox-blank-circle',
	},
	{
		type: 'button',
		name: 'navigation_buttons',
		icon: 'mdi:gamepad',
	},
	{
		type: 'button',
		name: 'dpad',
		icon: 'mdi:gamepad',
	},
	{
		type: 'circlepad',
		name: 'circlepad',
		tap_action: {
			action: 'key',
			key: 'DPAD_MIDDLE',
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: { action: 'key', key: 'DPAD_UP' },
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: { action: 'key', key: 'DPAD_DOWN' },
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: { action: 'key', key: 'DPAD_LEFT' },
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: { action: 'key', key: 'DPAD_RIGHT' },
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
				key: 'HOME',
			},
		},
		down: {
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) var(--icon-offset);\n\n}',
			icon: 'mdi:play-pause',
			tap_action: {
				action: 'key',
				key: 'PAUSE',
			},
			hold_action: {
				action: 'key',
				key: 'PLAY',
			},
		},
		left: {
			icon: 'mdi:skip-backward',
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) calc(-1 * var(--icon-offset));\n}',
			tap_action: {
				action: 'key',
				key: 'PREV',
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'key',
				key: 'NEXT',
			},
		},
		drag_action: {
			action: 'key',
			key: 'VOLUME_{{"UP" if clockwise else "DOWN"}}',
		},
		tap_action: {
			action: 'key',
			key: 'DPAD_MIDDLE',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'DPAD_MIDDLE',
		},
		up: {
			tap_action: { action: 'key', key: 'DPAD_UP' },
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: { action: 'key', key: 'DPAD_DOWN' },
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: { action: 'key', key: 'DPAD_LEFT' },
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: { action: 'key', key: 'DPAD_RIGHT' },
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'key',
			key: 'DPAD_MIDDLE',
		},
		drag_action: {
			action: 'key',
			key: 'DPAD_{{ ("RIGHT" if deltaX > 0 else "LEFT") if (deltaX | abs) > (deltaY | abs) else ("DOWN" if deltaY > 0 else "UP") }}',
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'key',
			key: 'DPAD_{{ ("RIGHT" if deltaX > 0 else "LEFT") if (deltaX | abs) > (deltaY | abs) else ("DOWN" if deltaY > 0 else "UP") }}',
			repeat_delay: 50,
		},
		up: {},
		down: {},
		left: {},
		right: {},
		icon: 'mdi:drag-variant',
	},
	{
		type: 'button',
		name: 'play_pause',
		tap_action: { action: 'key', key: 'PAUSE' },
		hold_action: { action: 'key', key: 'PLAY' },
		icon: 'mdi:play-pause',
	},
	{
		type: 'button',
		name: 'play',
		tap_action: { action: 'key', key: 'PLAY' },
		icon: 'mdi:play',
	},
	{
		type: 'button',
		name: 'pause',
		tap_action: { action: 'key', key: 'PAUSE' },
		icon: 'mdi:pause',
	},
	{
		type: 'button',
		name: 'previous',
		tap_action: { action: 'key', key: 'PREV' },
		icon: 'mdi:skip-previous',
	},
	{
		type: 'button',
		name: 'next',
		tap_action: { action: 'key', key: 'NEXT' },
		icon: 'mdi:skip-next',
	},
	{
		type: 'button',
		name: 'channel_up',
		tap_action: { action: 'key', key: 'CHANNEL_UP' },
		icon: 'mdi:arrow-up-circle',
	},
	{
		type: 'button',
		name: 'channel_down',
		tap_action: { action: 'key', key: 'CHANNEL_DOWN' },
		icon: 'mdi:arrow-down-circle',
	},
	{
		type: 'button',
		name: 'red',
		tap_action: { action: 'key', key: 'RED' },
		icon: 'mdi:alpha-r-box',
	},
	{
		type: 'button',
		name: 'green',
		tap_action: { action: 'key', key: 'GREEN' },
		icon: 'mdi:alpha-g-box',
	},
	{
		type: 'button',
		name: 'yellow',
		tap_action: { action: 'key', key: 'YELLOW' },
		icon: 'mdi:alpha-y-box',
	},
	{
		type: 'button',
		name: 'blue',
		tap_action: { action: 'key', key: 'BLUE' },
		icon: 'mdi:alpha-b-box',
	},

	{
		type: 'button',
		name: 'voice',
		tap_action: { action: 'key', key: 'VOICE' },
		icon: 'mdi:account-voice',
	},
];
