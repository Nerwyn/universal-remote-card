import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/apple_tv/#remote
 */
export const appleTVDefaultKeys: IElementConfig[] = [
	{
		type: 'button',
		name: 'power',
		tap_action: { action: 'key', key: 'wakeup' },
		hold_action: { action: 'key', key: 'suspend' },
		icon: 'mdi:power',
	},
	{
		type: 'button',
		name: 'wakeup',
		tap_action: {
			action: 'key',
			key: 'wakeup',
		},
		icon: 'mdi:power-on',
	},
	{
		type: 'button',
		name: 'suspend',
		tap_action: {
			action: 'key',
			key: 'suspend',
		},
		icon: 'mdi:power-off',
	},
	{
		type: 'button',
		name: 'home',
		tap_action: {
			action: 'key',
			key: 'home',
		},
		icon: 'mdi:home',
	},
	{
		type: 'button',
		name: 'menu',
		tap_action: {
			action: 'key',
			key: 'menu',
		},
		icon: 'mdi:menu',
	},
	{
		type: 'button',
		name: 'top_menu',
		tap_action: {
			action: 'key',
			key: 'top_menu',
		},
		icon: 'mdi:apple',
	},
	{
		type: 'button',
		name: 'volume_up',
		tap_action: {
			action: 'key',
			key: 'volume_up',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		type: 'button',
		name: 'volume_down',
		tap_action: {
			action: 'key',
			key: 'volume_down',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
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
		type: 'button',
		name: 'up',
		tap_action: {
			action: 'key',
			key: 'up',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		type: 'button',
		name: 'down',
		tap_action: {
			action: 'key',
			key: 'down',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		type: 'button',
		name: 'left',
		tap_action: {
			action: 'key',
			key: 'left',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		type: 'button',
		name: 'right',
		tap_action: {
			action: 'key',
			key: 'right',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		type: 'button',
		name: 'center',
		tap_action: {
			action: 'key',
			key: 'select',
		},
		icon: 'mdi:circle',
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
				key: 'menu',
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
				key: 'previous',
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'key',
				key: 'next',
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
		type: 'button',
		name: 'play_pause',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_play_pause',
		},
		icon: 'mdi:play-pause',
	},
	{
		type: 'button',
		name: 'play',
		tap_action: {
			action: 'key',
			key: 'play',
		},
		icon: 'mdi:play',
	},
	{
		type: 'button',
		name: 'pause',
		tap_action: {
			action: 'key',
			key: 'pause',
		},
		icon: 'mdi:pause',
	},
	{
		type: 'button',
		name: 'skip_backward',
		tap_action: {
			action: 'key',
			key: 'skip_backward',
		},
		icon: 'mdi:skip-backward',
	},
	{
		type: 'button',
		name: 'skip_forward',
		tap_action: {
			action: 'key',
			key: 'skip_forward',
		},
		icon: 'mdi:skip-forward',
	},
	{
		type: 'button',
		name: 'previous',
		tap_action: {
			action: 'key',
			key: 'previous',
		},
		icon: 'mdi:skip-previous',
	},
	{
		type: 'button',
		name: 'next',
		tap_action: {
			action: 'key',
			key: 'next',
		},
		icon: 'mdi:skip-next',
	},
];
