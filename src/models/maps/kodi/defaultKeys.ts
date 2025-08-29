import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/kodi/#action-kodicall_method
 * https://kodi.wiki/view/JSON-RPC_API/v13
 */
export const kodiDefaultKeys: IElementConfig[] = [
	{
		type: 'button',
		name: 'power',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'GUI.ActivateWindow',
				window: 'shutdownmenu',
			},
		},
		icon: 'mdi:power',
	},
	{
		type: 'button',
		name: 'home',
		tap_action: {
			action: 'key',
			key: 'Input.Home',
		},
		icon: 'mdi:home',
	},
	{
		type: 'button',
		name: 'back',
		tap_action: {
			action: 'key',
			key: 'Input.Back',
		},
		icon: 'mdi:keyboard-backspace',
	},
	{
		type: 'button',
		name: 'menu',
		tap_action: {
			action: 'key',
			key: 'Input.ContextMenu',
		},
		icon: 'mdi:menu',
	},
	{
		type: 'button',
		name: 'volume_up',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Application.SetVolume',
				volume: 'increment',
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		type: 'button',
		name: 'volume_down',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Application.SetVolume',
				volume: 'decrement',
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		type: 'button',
		name: 'volume_mute',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Application.SetMute',
				mute: 'toggle',
			},
		},
		icon: 'mdi:volume-low',
	},
	{
		type: 'button',
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
		type: 'button',
		name: 'up',
		tap_action: {
			action: 'key',
			key: 'Input.Up',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		type: 'button',
		name: 'down',
		tap_action: {
			action: 'key',
			key: 'Input.Down',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		type: 'button',
		name: 'left',
		tap_action: {
			action: 'key',
			key: 'Input.Left',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		type: 'button',
		name: 'right',
		tap_action: {
			action: 'key',
			key: 'Input.Right',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		type: 'button',
		name: 'center',
		tap_action: {
			action: 'key',
			key: 'Input.Select',
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
			key: 'Input.Select',
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: {
				action: 'key',
				key: 'Input.Up',
			},
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: {
				action: 'key',
				key: 'Input.Down',
			},
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: {
				action: 'key',
				key: 'Input.Left',
			},
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: {
				action: 'key',
				key: 'Input.Right',
			},
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
				key: 'Input.ContextMenu',
			},
		},
		down: {
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) var(--icon-offset);\n\n}',
			icon: 'mdi:play-pause',
			tap_action: {
				action: 'perform-action',
				perform_action: 'kodi.call_method',
				data: {
					method: 'Player.PlayPause',
					playerid: 1,
				},
			},
		},
		left: {
			icon: 'mdi:skip-backward',
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) calc(-1 * var(--icon-offset));\n}',
			tap_action: {
				action: 'perform-action',
				perform_action: 'kodi.call_method',
				data: {
					method: 'Input.ExecuteAction',
					action: 'rewind',
				},
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'perform-action',
				perform_action: 'kodi.call_method',
				data: {
					method: 'Input.ExecuteAction',
					action: 'fastforward',
				},
			},
		},
		drag_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Application.SetVolume',
				volume: '{{ "increment" if clockwise else "decrement" }}',
			},
		},
		tap_action: {
			action: 'key',
			key: 'Input.Select',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'Input.Select',
		},
		up: {
			tap_action: {
				action: 'key',
				key: 'Input.Up',
			},
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: {
				action: 'key',
				key: 'Input.Down',
			},
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: {
				action: 'key',
				key: 'Input.Left',
			},
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: {
				action: 'key',
				key: 'Input.Right',
			},
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'key',
			key: 'Input.Select',
		},
		drag_action: {
			action: 'key',
			key: 'Input.{{ ("Right" if deltaX > 0 else "Left") if (deltaX | abs) > (deltaY | abs) else ("Down" if deltaY > 0 else "Up") }}',
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'key',
			key: 'Input.{{ ("Right" if deltaX > 0 else "Left") if (deltaX | abs) > (deltaY | abs) else ("Down" if deltaY > 0 else "Up") }}',
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
			perform_action: 'kodi.call_method',
			data: {
				method: 'Player.PlayPause',
				playerid: 1,
			},
		},
		icon: 'mdi:play-pause',
	},
	{
		type: 'button',
		name: 'play',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Player.PlayPause',
				playerid: 1,
				play: true,
			},
		},
		icon: 'mdi:play',
	},
	{
		type: 'button',
		name: 'pause',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Player.PlayPause',
				playerid: 1,
				play: false,
			},
		},
		icon: 'mdi:pause',
	},
	{
		type: 'button',
		name: 'music_play_pause',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Player.PlayPause',
				playerid: 0,
			},
		},
		icon: 'mdi:music',
	},
	{
		type: 'button',
		name: 'picture_play_pause',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Player.PlayPause',
				playerid: 2,
			},
		},
		icon: 'mdi:image',
	},
	{
		type: 'button',
		name: 'rewind',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Input.ExecuteAction',
				action: 'rewind',
			},
		},
		icon: 'mdi:rewind',
	},
	{
		type: 'button',
		name: 'fast_forward',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Input.ExecuteAction',
				action: 'fastforward',
			},
		},
		icon: 'mdi:fast-forward',
	},
	{
		type: 'button',
		name: 'keyboard',
		tap_action: { action: 'keyboard' },
		icon: 'mdi:keyboard',
	},
	{
		type: 'button',
		name: 'textbox',
		tap_action: { action: 'textbox' },
		icon: 'mdi:text-box',
	},
	{
		type: 'button',
		name: 'search',
		tap_action: { action: 'search' },
		icon: 'mdi:kodi',
	},
	{
		type: 'button',
		name: 'channel_up',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Input.ExecuteAction',
				action: 'channelup',
			},
		},
		icon: 'mdi:arrow-up-bold-circle',
	},
	{
		type: 'button',
		name: 'channel_down',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Input.ExecuteAction',
				action: 'channeldown',
			},
		},
		icon: 'mdi:arrow-down-bold-circle',
	},
	{
		type: 'button',
		name: 'info',
		tap_action: {
			action: 'key',
			key: 'Input.Info',
		},
		icon: 'mdi:information',
	},
	{
		type: 'button',
		name: 'codec',
		tap_action: {
			action: 'key',
			key: 'Input.ShowCodec',
		},
		icon: 'mdi:information-box',
	},
	{
		type: 'button',
		name: 'osd',
		tap_action: {
			action: 'key',
			key: 'Input.ShowOSD',
		},
		icon: 'mdi:television-guide',
	},
	{
		type: 'button',
		name: 'process_info',
		tap_action: {
			action: 'key',
			key: 'Input.ShowPlayerProcessInfo',
		},
		icon: 'mdi:information-variant-circle',
	},
	{
		type: 'button',
		name: 'guide',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'GUI.ActivateWindow',
				window: 'tvguide',
			},
		},
		icon: 'mdi:television-guide',
	},
];
