export const webosDefaultKeys = [
    {
        type: 'button',
        name: 'home',
        tap_action: {
            action: 'key',
            key: 'HOME',
        },
        icon: 'mdi:home',
    },
    {
        type: 'button',
        name: 'back',
        tap_action: {
            action: 'key',
            key: 'BACK',
        },
        icon: 'mdi:keyboard-backspace',
    },
    {
        type: 'button',
        name: 'menu',
        tap_action: {
            action: 'key',
            key: 'MENU',
        },
        icon: 'mdi:menu',
    },
    {
        type: 'button',
        name: 'dash',
        tap_action: {
            action: 'key',
            key: 'DASH',
        },
        icon: 'mdi:view-dashboard-variant',
    },
    {
        type: 'button',
        name: 'exit',
        tap_action: {
            action: 'key',
            key: 'EXIT',
        },
        icon: 'mdi:exit-to-app',
    },
    {
        type: 'button',
        name: 'volume_up',
        tap_action: {
            action: 'key',
            key: 'VOLUMEUP',
        },
        hold_action: { action: 'repeat' },
        icon: 'mdi:volume-high',
    },
    {
        type: 'button',
        name: 'volume_down',
        tap_action: {
            action: 'key',
            key: 'VOLUMEDOWN',
        },
        hold_action: { action: 'repeat' },
        icon: 'mdi:volume-medium',
    },
    {
        type: 'button',
        name: 'volume_mute',
        tap_action: {
            action: 'key',
            key: 'MUTE',
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
            key: 'UP',
        },
        hold_action: { action: 'repeat' },
        icon: 'mdi:chevron-up',
    },
    {
        type: 'button',
        name: 'down',
        tap_action: {
            action: 'key',
            key: 'DOWN',
        },
        hold_action: { action: 'repeat' },
        icon: 'mdi:chevron-down',
    },
    {
        type: 'button',
        name: 'left',
        tap_action: {
            action: 'key',
            key: 'LEFT',
        },
        hold_action: { action: 'repeat' },
        icon: 'mdi:chevron-left',
    },
    {
        type: 'button',
        name: 'right',
        tap_action: {
            action: 'key',
            key: 'RIGHT',
        },
        hold_action: { action: 'repeat' },
        icon: 'mdi:chevron-right',
    },
    {
        type: 'button',
        name: 'center',
        tap_action: {
            action: 'key',
            key: 'ENTER',
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
            key: 'PLAY',
        },
        icon: 'mdi:play',
    },
    {
        type: 'button',
        name: 'pause',
        tap_action: {
            action: 'key',
            key: 'PAUSE',
        },
        icon: 'mdi:pause',
    },
    {
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
        name: 'channel_up',
        tap_action: {
            action: 'key',
            key: 'CHANNELUP',
        },
        icon: 'mdi:arrow-up-circle',
    },
    {
        type: 'button',
        name: 'channel_down',
        tap_action: {
            action: 'key',
            key: 'CHANNELDOWN',
        },
        icon: 'mdi:arrow-down-circle',
    },
    {
        type: 'button',
        name: 'red',
        tap_action: {
            action: 'key',
            key: 'RED',
        },
        icon: 'mdi:alpha-r-box',
    },
    {
        type: 'button',
        name: 'green',
        tap_action: {
            action: 'key',
            key: 'GREEN',
        },
        icon: 'mdi:alpha-g-box',
    },
    {
        type: 'button',
        name: 'yellow',
        tap_action: {
            action: 'key',
            key: 'YELLOW',
        },
        icon: 'mdi:alpha-y-box',
    },
    {
        type: 'button',
        name: 'blue',
        tap_action: {
            action: 'key',
            key: 'BLUE',
        },
        icon: 'mdi:alpha-b-box',
    },
    {
        type: 'button',
        name: 'n0',
        tap_action: {
            action: 'key',
            key: '0',
        },
        icon: 'mdi:numeric-0',
    },
    {
        type: 'button',
        name: 'n1',
        tap_action: {
            action: 'key',
            key: '1',
        },
        icon: 'mdi:numeric-1',
    },
    {
        type: 'button',
        name: 'n2',
        tap_action: {
            action: 'key',
            key: '2',
        },
        icon: 'mdi:numeric-2',
    },
    {
        type: 'button',
        name: 'n3',
        tap_action: {
            action: 'key',
            key: '3',
        },
        icon: 'mdi:numeric-3',
    },
    {
        type: 'button',
        name: 'n4',
        tap_action: {
            action: 'key',
            key: '4',
        },
        icon: 'mdi:numeric-4',
    },
    {
        type: 'button',
        name: 'n5',
        tap_action: {
            action: 'key',
            key: '5',
        },
        icon: 'mdi:numeric-5',
    },
    {
        type: 'button',
        name: 'n6',
        tap_action: {
            action: 'key',
            key: '6',
        },
        icon: 'mdi:numeric-6',
    },
    {
        type: 'button',
        name: 'n7',
        tap_action: {
            action: 'key',
            key: '7',
        },
        icon: 'mdi:numeric-7',
    },
    {
        type: 'button',
        name: 'n8',
        tap_action: {
            action: 'key',
            key: '8',
        },
        icon: 'mdi:numeric-8',
    },
    {
        type: 'button',
        name: 'n9',
        tap_action: {
            action: 'key',
            key: '9',
        },
        icon: 'mdi:numeric-9',
    },
    {
        type: 'button',
        name: 'numpad',
        icon: 'mdi:dialpad',
    },
    {
        type: 'button',
        name: 'asterisk',
        tap_action: {
            action: 'key',
            key: 'ASTERISK',
        },
        icon: 'mdi:asterisk',
    },
    {
        type: 'button',
        name: 'info',
        tap_action: {
            action: 'key',
            key: 'INFO',
        },
        icon: 'mdi:information',
    },
    {
        type: 'button',
        name: 'guide',
        tap_action: {
            action: 'key',
            key: 'GUIDE',
        },
        icon: 'mdi:television-box',
    },
    {
        type: 'button',
        name: 'captions',
        tap_action: {
            action: 'key',
            key: 'CC',
        },
        icon: 'mdi:closed-caption',
    },
];
