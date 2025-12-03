import { IElementConfig } from '../../interfaces';

/**
 * https://github.com/mvdwetering/yamaha_ynca?tab=readme-ov-file#remote-entity
 */
export const yamahaYNCADefaultKeys: IElementConfig[] = [
	{
		name: 'power',
		tap_action: { action: 'key', key: 'receiver_power_toggle' },
		icon: 'mdi:power',
	},
	{
		name: 'power_on',
		tap_action: { action: 'key', key: 'on' },
		icon: 'mdi:power-on',
	},
	{
		name: 'power_off',
		tap_action: { action: 'key', key: 'standby' },
		icon: 'mdi:power-off',
	},
	{
		name: 'power_source',
		tap_action: { action: 'key', key: 'source_power_toggle' },
		icon: 'mdi:power-cycle',
	},
	{
		name: 'back',
		tap_action: { action: 'key', key: 'return' },
		icon: 'mdi:keyboard-backspace',
	},
	{
		name: 'menu',
		tap_action: { action: 'key', key: 'menu' },
		icon: 'mdi:menu',
	},
	{
		name: 'popup_menu',
		tap_action: { action: 'key', key: 'popup_menu' },
		icon: 'mdi:dots-horizontal',
	},
	{
		name: 'option',
		tap_action: { action: 'key', key: 'option' },
		icon: 'mdi:dots-vertical',
	},
	{
		name: 'volume_up',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.volume_up',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		name: 'volume_down',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.volume_down',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		name: 'volume_mute',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.volume_mute',
			data: {
				is_volume_muted:
					'{{ not state_attr(config.media_player, "is_volume_muted") }}',
			},
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
		tap_action: { action: 'key', key: 'enter' },
		icon: 'mdi:checkbox-blank-circle',
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
			key: 'enter',
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
			label: 'menu',
			tap_action: {
				action: 'key',
				key: 'top_menu',
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
				action: 'key',
				key: 'rewind',
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'key',
				key: 'fast_forward',
			},
		},
		drag_action: {
			action: 'perform-action',
			perform_action:
				'media_player.volume_{{ "up" if clockwise else "down" }}',
		},
		tap_action: {
			action: 'key',
			key: 'enter',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'enter',
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
			key: 'enter',
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
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_play_pause',
		},
		icon: 'mdi:play-pause',
	},
	{
		name: 'play',
		tap_action: { action: 'key', key: 'play' },
		icon: 'mdi:play',
	},
	{
		name: 'pause',
		tap_action: { action: 'key', key: 'pause' },
		icon: 'mdi:pause',
	},
	{
		name: 'rewind',
		tap_action: { action: 'key', key: 'rewind' },
		icon: 'mdi:rewind',
	},
	{
		name: 'fast_forward',
		tap_action: { action: 'key', key: 'fast_forward' },
		icon: 'mdi:fast-forward',
	},
	{
		name: 'previous',
		tap_action: { action: 'key', key: 'previous' },
		icon: 'mdi:skip-previous',
	},
	{
		name: 'next',
		tap_action: { action: 'key', key: 'next' },
		icon: 'mdi:skip-next',
	},
	{
		name: 'stop',
		tap_action: { action: 'key', key: 'stop' },
		icon: 'mdi:stop',
	},
	{
		name: 'n0',
		tap_action: { action: 'key', key: '0' },
		icon: 'mdi:numeric-0',
	},
	{
		name: 'n1',
		tap_action: { action: 'key', key: '1' },
		icon: 'mdi:numeric-1',
	},
	{
		name: 'n2',
		tap_action: { action: 'key', key: '2' },
		icon: 'mdi:numeric-2',
	},
	{
		name: 'n3',
		tap_action: { action: 'key', key: '3' },
		icon: 'mdi:numeric-3',
	},
	{
		name: 'n4',
		tap_action: { action: 'key', key: '4' },
		icon: 'mdi:numeric-4',
	},
	{
		name: 'n5',
		tap_action: { action: 'key', key: '5' },
		icon: 'mdi:numeric-5',
	},
	{
		name: 'n6',
		tap_action: { action: 'key', key: '6' },
		icon: 'mdi:numeric-6',
	},
	{
		name: 'n7',
		tap_action: { action: 'key', key: '7' },
		icon: 'mdi:numeric-7',
	},
	{
		name: 'n8',
		tap_action: { action: 'key', key: '8' },
		icon: 'mdi:numeric-8',
	},
	{
		name: 'n9',
		tap_action: { action: 'key', key: '9' },
		icon: 'mdi:numeric-9',
	},
	{
		name: 'n10',
		tap_action: { action: 'key', key: '+10' },
		icon: 'mdi:numeric-10',
	},
	{
		name: 'info',
		tap_action: { action: 'key', key: 'info' },
		icon: 'mdi:information',
	},
	{
		name: 'osd',
		tap_action: { action: 'key', key: 'on_screen' },
		icon: 'mdi:television-guide',
	},
	{
		name: 'display',
		tap_action: { action: 'key', key: 'display' },
		icon: 'mdi:television',
	},
	{
		name: 'scene_1',
		tap_action: { action: 'key', key: 'scene_1' },
		icon: 'mdi:numeric-1-box',
	},
	{
		name: 'scene_2',
		tap_action: { action: 'key', key: 'scene_2' },
		icon: 'mdi:numeric-2-box',
	},
	{
		name: 'scene_3',
		tap_action: { action: 'key', key: 'scene_3' },
		icon: 'mdi:numeric-3-box',
	},
	{
		name: 'scene_4',
		tap_action: { action: 'key', key: 'scene_4' },
		icon: 'mdi:numeric-4-box',
	},
	{
		name: 'ent',
		tap_action: { action: 'key', key: 'ent' },
		icon: 'mdi:pine-tree',
	},
];
