import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/jellyfin/
 */
export const jellyfinTVDefaultKeys: IElementConfig[] = [
	{
		name: 'home',
		tap_action: { action: 'key', key: 'GoHome' },
		icon: 'mdi:home',
	},
	{
		name: 'back',
		tap_action: { action: 'key', key: 'Back' },
		icon: 'mdi:keyboard-backspace',
	},
	{
		name: 'menu',
		tap_action: { action: 'key', key: 'ToggleContextMenu' },
		icon: 'mdi:menu',
	},
	{
		name: 'settings',
		tap_action: { action: 'key', key: 'GoToSettings' },
		icon: 'mdi:cog',
	},
	{
		name: 'volume_up',
		tap_action: { action: 'key', key: 'VolumeUp' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		name: 'volume_down',
		tap_action: { action: 'key', key: 'VolumeDown' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		name: 'volume_mute',
		tap_action: { action: 'key', key: 'ToggleMute' },
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
		tap_action: { action: 'key', key: 'MoveUp' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		name: 'down',
		tap_action: { action: 'key', key: 'MoveDown' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		name: 'left',
		tap_action: { action: 'key', key: 'MoveLeft' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		name: 'right',
		tap_action: { action: 'key', key: 'MoveRight' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		name: 'center',
		tap_action: { action: 'key', key: 'Select' },
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
			key: 'Select',
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: { action: 'key', key: 'MoveUp' },
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: { action: 'key', key: 'MoveDown' },
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: { action: 'key', key: 'MoveLeft' },
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: { action: 'key', key: 'MoveRight' },
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
				key: 'ToggleContextMenu',
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
				action: 'key',
				key: 'PlayNext',
			},
		},
		drag_action: {
			action: 'key',
			key: 'Volume{{"Up" if clockwise else "Down"}}',
		},
		tap_action: {
			action: 'key',
			key: 'Select',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'Select',
		},
		up: {
			tap_action: { action: 'key', key: 'MoveUp' },
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: { action: 'key', key: 'MoveDown' },
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: { action: 'key', key: 'MoveLeft' },
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: { action: 'key', key: 'MoveRight' },
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'key',
			key: 'Select',
		},
		drag_action: {
			action: 'key',
			key: '{{ ("MoveRight" if deltaX > 0 else "MoveLeft") if (deltaX | abs) > (deltaY | abs) else ("MoveDown" if deltaY > 0 else "MoveUp") }}',
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'key',
			key: '{{ ("MoveRight" if deltaX > 0 else "MoveLeft") if (deltaX | abs) > (deltaY | abs) else ("MoveDown" if deltaY > 0 else "MoveUp") }}',
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
		name: 'previous',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_previous_track',
		},
		icon: 'mdi:skip-previous',
	},
	{
		name: 'next',
		tap_action: { action: 'key', key: 'PlayNext' },
		icon: 'mdi:skip-next',
	},
	{
		name: 'page_up',
		tap_action: { action: 'key', key: 'PageUp' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:arrow-up',
	},
	{
		name: 'page_down',
		tap_action: { action: 'key', key: 'PageDown' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:arrow-down',
	},
	{
		name: 'search',
		tap_action: { action: 'key', key: 'GoToSearch' },
		icon: 'mdi:search-web',
	},
	{
		name: 'previous_letter',
		tap_action: { action: 'key', key: 'PreviousLetter' },
		icon: 'mdi:page-previous',
	},
	{
		name: 'next_letter',
		tap_action: { action: 'key', key: 'NextLetter' },
		icon: 'mdi:page-next',
	},
	{
		name: 'channel_up',
		tap_action: { action: 'key', key: 'ChannelUp' },
		icon: 'mdi:arrow-up-circle',
	},
	{
		name: 'channel_down',
		tap_action: { action: 'key', key: 'ChannelDown' },
		icon: 'mdi:arrow-down-circle',
	},
	{
		name: 'guide',
		tap_action: { action: 'key', key: 'Guide' },
		icon: 'mdi:television-box',
	},
	{
		name: 'osd',
		tap_action: { action: 'key', key: 'ToggleOsd' },
		icon: 'mdi:television-guide',
	},
	{
		name: 'osd_menu',
		tap_action: { action: 'key', key: 'ToggleOsdMenu' },
		icon: 'mdi:television-guide',
	},
	{
		name: 'screenshot',
		tap_action: { action: 'key', key: 'TakeScreenshot' },
		icon: 'mdi:monitor-screenshot',
	},
	{
		name: 'fullscreen',
		tap_action: { action: 'key', key: 'ToggleFullscreen' },
		icon: 'mdi:fullscreen',
	},
	{
		name: 'display_content',
		tap_action: { action: 'key', key: 'DisplayContent' },
		icon: 'mdi:content-duplicate',
	},
	{
		name: 'display_message',
		tap_action: { action: 'key', key: 'DisplayMessage' },
		icon: 'mdi:message',
	},
	{
		name: 'stats',
		tap_action: { action: 'key', key: 'ToggleStats' },
		icon: 'mdi:list-status',
	},
	{
		name: 'source',
		tap_action: { action: 'key', key: 'PlayMediaSource' },
		icon: 'mdi:import',
	},
	{
		name: 'trailers',
		tap_action: { action: 'key', key: 'PlayTrailers' },
		icon: 'mdi:truck-trailer',
	},
	{
		name: 'state',
		tap_action: { action: 'key', key: 'PlayState' },
		icon: 'mdi:play-box-multiple',
	},
];
