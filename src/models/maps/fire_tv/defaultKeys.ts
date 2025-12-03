import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/androidtv#androidtvadb_command
 */
export const fireTVDefaultKeys: IElementConfig[] = [
	{
		name: 'power',
		tap_action: { action: 'key', key: 'POWER' },
		icon: 'mdi:power',
	},
	{
		name: 'sleep',
		tap_action: { action: 'key', key: 'SLEEP' },
		icon: 'mdi:power-sleep',
	},
	{
		name: 'resume',
		tap_action: { action: 'key', key: 'RESUME' },
		icon: 'mdi:power-on',
	},
	{
		name: 'wakeup',
		tap_action: { action: 'key', key: 'RESUME' },
		icon: 'mdi:power-on',
	},
	{
		name: 'suspend',
		tap_action: { action: 'key', key: 'SUSPEND' },
		icon: 'mdi:power-off',
	},
	{
		name: 'home',
		tap_action: { action: 'key', key: 'HOME' },
		icon: 'mdi:home',
	},
	{
		name: 'move_home',
		tap_action: { action: 'key', key: 'MOVE_HOME' },
		icon: 'mdi:home-import-outline',
	},
	{
		name: 'back',
		tap_action: { action: 'key', key: 'BACK' },
		icon: 'mdi:keyboard-backspace',
	},
	{
		name: 'menu',
		tap_action: { action: 'key', key: 'MENU' },
		icon: 'mdi:menu',
	},
	{
		name: 'settings',
		tap_action: { action: 'key', key: 'SETTINGS' },
		icon: 'mdi:cog',
	},
	{
		name: 'volume_up',
		tap_action: { action: 'key', key: 'VOLUME_UP' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		name: 'volume_down',
		tap_action: { action: 'key', key: 'VOLUME_DOWN' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		name: 'volume_mute',
		tap_action: { action: 'key', key: 'MUTE' },
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
		tap_action: { action: 'key', key: 'UP' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		name: 'down',
		tap_action: { action: 'key', key: 'DOWN' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		name: 'left',
		tap_action: { action: 'key', key: 'LEFT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		name: 'right',
		tap_action: { action: 'key', key: 'RIGHT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		name: 'center',
		tap_action: { action: 'key', key: 'CENTER' },
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
			key: 'CENTER',
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
				action: 'key',
				key: 'REWIND',
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'key',
				key: 'FAST_FORWARD',
			},
		},
		drag_action: {
			action: 'key',
			key: 'VOLUME_{{"UP" if clockwise else "DOWN"}}',
		},
		tap_action: {
			action: 'key',
			key: 'CENTER',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'CENTER',
		},
		up: {
			tap_action: { action: 'key', key: 'UP' },
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: { action: 'key', key: 'DOWN' },
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: { action: 'key', key: 'LEFT' },
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: { action: 'key', key: 'RIGHT' },
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'key',
			key: 'CENTER',
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
			action: 'perform-action',
			perform_action: 'media_player.media_play',
		},
		icon: 'mdi:play',
	},
	{
		name: 'pause',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_pause',
		},
		icon: 'mdi:pause',
	},
	{
		name: 'rewind',
		tap_action: { action: 'key', key: 'REWIND' },
		icon: 'mdi:rewind',
	},
	{
		name: 'fast_forward',
		tap_action: { action: 'key', key: 'FAST_FORWARD' },
		icon: 'mdi:fast-forward',
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
		tap_action: { action: 'key', key: 'input keyevent 67' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:backspace',
	},
	{
		name: 'enter',
		tap_action: { action: 'key', key: 'ENTER' },
		icon: 'mdi:magnify',
	},
	{
		name: 'red',
		tap_action: { action: 'key', key: 'RED' },
		icon: 'mdi:alpha-r-box',
	},
	{
		name: 'green',
		tap_action: { action: 'key', key: 'GREEN' },
		icon: 'mdi:alpha-g-box',
	},
	{
		name: 'yellow',
		tap_action: { action: 'key', key: 'YELLOW' },
		icon: 'mdi:alpha-y-box',
	},
	{
		name: 'blue',
		tap_action: { action: 'key', key: 'BLUE' },
		icon: 'mdi:alpha-b-box',
	},
	{
		name: 'component_1',
		tap_action: { action: 'key', key: 'COMPONENT1' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'component_2',
		tap_action: { action: 'key', key: 'COMPONENT2' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'composite_1',
		tap_action: { action: 'key', key: 'COMPOSITE1' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'composite_2',
		tap_action: { action: 'key', key: 'COMPOSITE2' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'hdmi_1',
		tap_action: { action: 'key', key: 'HDMI1' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'hdmi_2',
		tap_action: { action: 'key', key: 'HDMI2' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'hdmi_3',
		tap_action: { action: 'key', key: 'HDMI3' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'hdmi_4',
		tap_action: { action: 'key', key: 'HDMI4' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'source',
		tap_action: { action: 'key', key: 'INPUT' },
		icon: 'mdi:import',
	},
	{
		name: 'vga',
		tap_action: { action: 'key', key: 'VGA' },
		icon: 'mdi:serial-port',
	},
	{
		name: 'end',
		tap_action: { action: 'key', key: 'END' },
		icon: 'mdi:arrow-collapse-right',
	},
	{
		name: 'escape',
		tap_action: { action: 'key', key: 'ESCAPE' },
		icon: 'mdi:exit-to-app',
	},
	{
		name: 'pairing',
		tap_action: { action: 'key', key: 'PAIRING' },
		icon: 'mdi:bluetooth-audio',
	},
	{
		name: 'home',
		tap_action: { action: 'key', key: 'HOME' },
		icon: 'mdi:home',
	},
	{
		name: 'sys_up',
		tap_action: { action: 'key', key: 'SYSUP' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up-circle',
	},
	{
		name: 'sys_down',
		tap_action: { action: 'key', key: 'SYSDOWN' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down-circle',
	},
	{
		name: 'sys_left',
		tap_action: { action: 'key', key: 'SYSLEFT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left-circle',
	},
	{
		name: 'sys_right',
		tap_action: { action: 'key', key: 'SYSRIGHT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right-circle',
	},
	{
		name: 'text',
		tap_action: { action: 'key', key: 'TEXT' },
		icon: 'mdi:text',
	},
	{
		name: 'top',
		tap_action: { action: 'key', key: 'TOP' },
		icon: 'mdi:arrow-collapse-up',
	},
];
