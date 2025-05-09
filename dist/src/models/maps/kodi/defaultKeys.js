export const kodiDefaultKeys = [
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
];
