import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/webostv/#generic-commands-and-buttons
 */
export const webosDefaultKeys: IElementConfig[] = [
	{
		name: 'power',
		icon: 'mdi:power',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.toggle',
		},
	},
	{
		name: 'home',
		tap_action: {
			action: 'key',
			key: 'HOME',
		},
		icon: 'mdi:home',
	},
	{
		name: 'back',
		tap_action: {
			action: 'key',
			key: 'BACK',
		},
		icon: 'mdi:keyboard-backspace',
	},
	{
		name: 'menu',
		tap_action: {
			action: 'key',
			key: 'MENU',
		},
		icon: 'mdi:menu',
	},
	{
		name: 'dash',
		tap_action: {
			action: 'key',
			key: 'DASH',
		},
		icon: 'mdi:view-dashboard-variant',
	},
	{
		name: 'exit',
		tap_action: {
			action: 'key',
			key: 'EXIT',
		},
		icon: 'mdi:exit-to-app',
	},
	{
		name: 'volume_up',
		tap_action: {
			action: 'key',
			key: 'VOLUMEUP',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		name: 'volume_down',
		tap_action: {
			action: 'key',
			key: 'VOLUMEDOWN',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		name: 'volume_mute',
		tap_action: {
			action: 'key',
			key: 'MUTE',
		},
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
		tap_action: {
			action: 'key',
			key: 'UP',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		name: 'down',
		tap_action: {
			action: 'key',
			key: 'DOWN',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		name: 'left',
		tap_action: {
			action: 'key',
			key: 'LEFT',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		name: 'right',
		tap_action: {
			action: 'key',
			key: 'RIGHT',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		name: 'center',
		tap_action: {
			action: 'key',
			key: 'ENTER',
		},
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
			key: 'ENTER',
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: { action: 'key', key: 'UP' },
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: { action: 'key', key: 'DOWN' },
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: { action: 'key', key: 'LEFT' },
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: { action: 'key', key: 'RIGHT' },
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
				key: 'MENU',
			},
		},
		down: {
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) var(--icon-offset);\n\n}',
			icon: 'mdi:play-pause',
			tap_action: {
				action: 'perform-action',
				perform_action: 'media_player.media_play_pause',
			},
		},
		left: {
			icon: 'mdi:skip-backward',
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) calc(-1 * var(--icon-offset));\n}',
			tap_action: {
				action: 'perform-action',
				perform_action: 'media_player.media_previous_track',
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'perform-action',
				perform_action: 'media_player.media_next_track',
			},
		},
		drag_action: {
			action: 'key',
			key: 'VOLUME{{"UP" if clockwise else "DOWN"}}',
		},
		tap_action: {
			action: 'key',
			key: 'ENTER',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'ENTER',
		},
		up: {
			tap_action: {
				action: 'key',
				key: 'UP',
			},
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: {
				action: 'key',
				key: 'DOWN',
			},
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: {
				action: 'key',
				key: 'LEFT',
			},
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: {
				action: 'key',
				key: 'RIGHT',
			},
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'key',
			key: 'ENTER',
		},
		drag_action: {
			action: 'key',
			key: '{{ ("RIGHT" if deltaX > 0 else "LEFT") if (deltaX | abs) > (deltaY | abs) else ("DOWN" if deltaY > 0 else "UP") }}',
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'key',
			key: '{{ ("RIGHT" if deltaX > 0 else "LEFT") if (deltaX | abs) > (deltaY | abs) else ("DOWN" if deltaY > 0 else "UP") }}',
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
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_play_pause',
		},
		icon: 'mdi:play-pause',
	},
	{
		name: 'play',
		tap_action: {
			action: 'key',
			key: 'PLAY',
		},
		icon: 'mdi:play',
	},
	{
		name: 'pause',
		tap_action: {
			action: 'key',
			key: 'PAUSE',
		},
		icon: 'mdi:pause',
	},
	{
		name: 'stop',
		tap_action: {
			action: 'perform-action',
			perform_action: 'webostv.command',
			data: {
				command: 'media.controls/stop',
			},
		},
		icon: 'mdi:stop',
	},
	{
		name: 'rewind',
		tap_action: {
			action: 'perform-action',
			perform_action: 'webostv.command',
			data: {
				command: 'media.controls/rewind',
			},
		},
		icon: 'mdi:rewind',
	},
	{
		name: 'fast_forward',
		tap_action: {
			action: 'perform-action',
			perform_action: 'webostv.command',
			data: {
				command: 'media.controls/fastForward',
			},
		},
		icon: 'mdi:fast-forward',
	},
	{
		name: 'previous',
		icon: 'mdi:skip-previous',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_previous_track',
		},
	},
	{
		name: 'next',
		icon: 'mdi:skip-next',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_next_track',
		},
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
		name: 'delete',
		tap_action: {
			action: 'perform-action',
			perform_action: 'webostv.command',
			data: {
				command: 'com.webos.service.ime/deleteCharacters',
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:backspace',
	},
	{
		name: 'enter',
		tap_action: {
			action: 'perform-action',
			perform_action: 'webostv.command',
			data: {
				command: 'com.webos.service.ime/sendEnterKey',
			},
		},
		icon: 'mdi:magnify',
	},
	{
		name: 'channel_up',
		tap_action: {
			action: 'key',
			key: 'CHANNELUP',
		},
		icon: 'mdi:arrow-up-circle',
	},
	{
		name: 'channel_down',
		tap_action: {
			action: 'key',
			key: 'CHANNELDOWN',
		},
		icon: 'mdi:arrow-down-circle',
	},
	{
		name: 'red',
		tap_action: {
			action: 'key',
			key: 'RED',
		},
		icon: 'mdi:alpha-r-box',
	},
	{
		name: 'green',
		tap_action: {
			action: 'key',
			key: 'GREEN',
		},
		icon: 'mdi:alpha-g-box',
	},
	{
		name: 'yellow',
		tap_action: {
			action: 'key',
			key: 'YELLOW',
		},
		icon: 'mdi:alpha-y-box',
	},
	{
		name: 'blue',
		tap_action: {
			action: 'key',
			key: 'BLUE',
		},
		icon: 'mdi:alpha-b-box',
	},
	{
		name: 'n0',
		tap_action: {
			action: 'key',
			key: '0',
		},
		icon: 'mdi:numeric-0',
	},
	{
		name: 'n1',
		tap_action: {
			action: 'key',
			key: '1',
		},
		icon: 'mdi:numeric-1',
	},
	{
		name: 'n2',
		tap_action: {
			action: 'key',
			key: '2',
		},
		icon: 'mdi:numeric-2',
	},
	{
		name: 'n3',
		tap_action: {
			action: 'key',
			key: '3',
		},
		icon: 'mdi:numeric-3',
	},
	{
		name: 'n4',
		tap_action: {
			action: 'key',
			key: '4',
		},
		icon: 'mdi:numeric-4',
	},
	{
		name: 'n5',
		tap_action: {
			action: 'key',
			key: '5',
		},
		icon: 'mdi:numeric-5',
	},
	{
		name: 'n6',
		tap_action: {
			action: 'key',
			key: '6',
		},
		icon: 'mdi:numeric-6',
	},
	{
		name: 'n7',
		tap_action: {
			action: 'key',
			key: '7',
		},
		icon: 'mdi:numeric-7',
	},
	{
		name: 'n8',
		tap_action: {
			action: 'key',
			key: '8',
		},
		icon: 'mdi:numeric-8',
	},
	{
		name: 'n9',
		tap_action: {
			action: 'key',
			key: '9',
		},
		icon: 'mdi:numeric-9',
	},
	{
		name: 'numpad',
		icon: 'mdi:dialpad',
	},
	{
		name: 'asterisk',
		tap_action: {
			action: 'key',
			key: 'ASTERISK',
		},
		icon: 'mdi:asterisk',
	},
	{
		name: 'info',
		tap_action: {
			action: 'key',
			key: 'INFO',
		},
		icon: 'mdi:information',
	},
	{
		name: 'guide',
		tap_action: {
			action: 'key',
			key: 'GUIDE',
		},
		icon: 'mdi:television-box',
	},
	{
		name: 'captions',
		tap_action: {
			action: 'key',
			key: 'CC',
		},
		icon: 'mdi:closed-caption',
	},
];
