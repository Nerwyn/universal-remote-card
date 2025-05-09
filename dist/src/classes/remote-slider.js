var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { RANGE_MAX, RANGE_MIN, SLIDER_ANIMATION, STEP, STEP_COUNT, } from '../models/constants';
import { BaseRemoteElement } from './base-remote-element';
let RemoteSlider = class RemoteSlider extends BaseRemoteElement {
    constructor() {
        super(...arguments);
        this.showTooltip = false;
        this.thumbOffset = 0;
        this.sliderOn = true;
        this.currentValue = this.value;
        this.speed = 0.02;
        this.range = [RANGE_MIN, RANGE_MAX];
        this.step = STEP;
        this.sliderWidth = 0;
        this.sliderHeight = 0;
        this.vertical = false;
        this.thumbWidth = 50;
        this.resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                this.sliderWidth = this.vertical
                    ? entry.contentRect.height
                    : entry.contentRect.width;
                this.sliderHeight = this.vertical
                    ? entry.contentRect.width
                    : entry.contentRect.height;
                this.setThumbOffset();
            }
        });
        this.rtl = false;
    }
    onInput(e) {
        const slider = e.currentTarget;
        if (!this.swiping && this.pointers) {
            clearTimeout(this.getValueFromHassTimer);
            this.getValueFromHass = false;
            this.value = slider.value;
            this.fireHapticEvent('selection');
            const start = parseFloat(this.oldValue ?? this.value ?? '0');
            const end = parseFloat(slider.value ?? start);
            this.newValue = end;
            this.currentValue = start;
            this.setThumbOffset();
            this.showTooltip = true;
            if (end > this.range[0]) {
                this.sliderOn = true;
            }
            clearInterval(this.intervalId);
            this.intervalId = undefined;
            let i = start;
            if (start > end) {
                this.intervalId = setInterval(() => {
                    i -= this.speed;
                    this.currentValue = i;
                    this.setThumbOffset();
                    if (end >= i) {
                        clearInterval(this.intervalId);
                        this.intervalId = undefined;
                        this.currentValue = end;
                        this.setThumbOffset();
                    }
                }, SLIDER_ANIMATION);
            }
            else if (start < end) {
                this.sliderOn = true;
                this.intervalId = setInterval(() => {
                    i += this.speed;
                    this.currentValue = i;
                    this.setThumbOffset();
                    if (end <= i) {
                        clearInterval(this.intervalId);
                        this.intervalId = undefined;
                        this.currentValue = end;
                        this.setThumbOffset();
                    }
                }, SLIDER_ANIMATION);
            }
            else {
                this.currentValue = end;
            }
            this.oldValue = end;
        }
        else {
            if (this.value == undefined) {
                this.getValueFromHass = true;
            }
            this.setValue();
            this.currentValue = this.value ?? 0;
            this.setThumbOffset();
            this.showTooltip = false;
        }
    }
    onPointerDown(e) {
        super.onPointerDown(e);
        const slider = e.currentTarget;
        if (!this.swiping) {
            clearTimeout(this.getValueFromHassTimer);
            this.getValueFromHass = false;
            this.currentValue = slider.value;
            this.value = slider.value;
            this.setThumbOffset();
            this.showTooltip = true;
            this.sliderOn = true;
        }
    }
    async onPointerUp(_e) {
        this.setThumbOffset();
        this.showTooltip = false;
        this.setValue();
        if (!this.swiping && this.pointers) {
            if (!this.newValue && this.newValue != 0) {
                this.newValue = Number(this.value);
            }
            if (!this.precision) {
                this.newValue = Math.trunc(this.newValue);
            }
            this.value = this.newValue;
            this.fireHapticEvent('light');
            await this.sendAction('tap_action');
        }
        else {
            this.getValueFromHass = true;
            this.setValue();
            this.currentValue = this.value ?? 0;
            this.setThumbOffset();
            this.setSliderState(this.currentValue);
        }
        this.endAction();
        this.resetGetValueFromHass();
    }
    onPointerMove(e) {
        super.onPointerMove(e);
        if (!this.vertical && this.pointers) {
            const sensitivity = 50;
            if (Math.abs((this.currentX ?? 0) - (this.initialX ?? 0)) <
                Math.abs((this.currentY ?? 0) - (this.initialY ?? 0)) -
                    sensitivity) {
                this.swiping = true;
                this.getValueFromHass = true;
                this.setValue();
                this.currentValue = this.value ?? 0;
                this.setThumbOffset();
                this.showTooltip = false;
                this.setSliderState(this.value);
            }
        }
    }
    setValue() {
        super.setValue();
        if (this.getValueFromHass) {
            this.oldValue = Number(this.value);
            if (this.newValue == undefined) {
                this.newValue = Number(this.value);
            }
        }
    }
    setThumbOffset() {
        const maxOffset = (this.sliderWidth - this.thumbWidth) / 2;
        const value = Number(this.getValueFromHass ? this.value : this.currentValue);
        this.thumbOffset = Math.min(Math.max(Math.round(((this.sliderWidth - this.thumbWidth) /
            (this.range[1] - this.range[0])) *
            (value - (this.range[0] + this.range[1]) / 2)), -1 * maxOffset), maxOffset);
    }
    setSliderState(value) {
        this.sliderOn =
            !(value == undefined ||
                this.hass.states[this.entityId]?.state == 'off' ||
                (this.entityId?.startsWith('timer.') &&
                    this.hass.states[this.entityId]?.state == 'idle')) || Number(value) > this.range[0];
    }
    endAction() {
        clearInterval(this.valueUpdateInterval);
        this.valueUpdateInterval = undefined;
        super.endAction();
    }
    buildBackground() {
        const style = {};
        if (this.vertical) {
            style['transform'] = `rotateZ(${this.rtl ? '90' : '270'}deg)`;
            style['width'] = `${this.sliderWidth}px`;
            style['height'] = `var(--background-height, ${this.sliderHeight}px)`;
        }
        return html `<div class="background" style=${styleMap(style)}></div>`;
    }
    buildTooltip() {
        return html `
			<div
				class="tooltip ${this.showTooltip ? 'faded-in' : 'faded-out'}"
			></div>
		`;
    }
    buildSliderStyles(context) {
        let height, width;
        const containerElement = this.shadowRoot?.querySelector('.container');
        if (containerElement) {
            const style = getComputedStyle(containerElement);
            height = style.getPropertyValue('height');
            width = style.getPropertyValue('width');
        }
        const tooltipLabel = `'${this.renderTemplate('{{ value }}{{ unit }}', context)}'`;
        let tooltipTransform;
        let iconTransform;
        if (this.vertical) {
            tooltipTransform = `translate(calc(-0.3 * ${width ?? 'var(--height)'} - 0.8em - 18px), calc(-1 * var(--thumb-offset)))`;
            iconTransform = 'translateY(calc(-1 * var(--thumb-offset)))';
        }
        else {
            tooltipTransform = `translate(var(--thumb-offset), calc(-0.5 * ${height ?? 'var(--height)'} - 0.4em - 10px))`;
            iconTransform = 'translateX(var(--thumb-offset))';
        }
        const styles = `
		:host {
			--tooltip-label: ${tooltipLabel};
			--tooltip-transform: ${tooltipTransform};
			--icon-transform: ${iconTransform};
		}
		${this.rtl
            ? `
		.slider::-webkit-slider-thumb {
			scale: -1;
		}
		.slider::-moz-range-thumb {
			scale: -1;
		}
		`
            : ''}
		`;
        return html `<style>
			${styles}
		</style>`;
    }
    buildSlider(config = this.config, context) {
        const value = context['value'];
        this.setSliderState(value);
        const style = {};
        if (this.renderTemplate(config.tap_action?.action, context) ==
            'none') {
            style['pointer-events'] = 'none';
        }
        if (this.vertical) {
            style['transform'] = `rotateZ(${this.rtl ? '90' : '270'}deg)`;
            style['height'] = `${this.sliderHeight}px`;
            style['width'] = `${this.sliderWidth}px`;
            style['touch-action'] = 'none';
        }
        return html `
			<input
				class="slider"
				tabindex="-1"
				type="range"
				min="${this.range[0]}"
				max="${this.range[1]}"
				step=${this.step}
				value="${value}"
				.value="${value}"
				style=${styleMap(style)}
				@input=${this.onInput}
				@pointerdown=${this.onPointerDown}
				@pointerup=${this.onPointerUp}
				@pointermove=${this.onPointerMove}
				@pointercancel=${this.onPointerCancel}
				@pointerleave=${this.onPointerLeave}
				@contextmenu=${this.onContextMenu}
			/>
		`;
    }
    render() {
        this.setValue();
        if (this.getValueFromHass) {
            this.currentValue = this.value;
        }
        const context = {
            value: this.getValueFromHass ? this.value : this.currentValue,
        };
        if (this.config.range) {
            this.range[0] = parseFloat(this.renderTemplate(this.config.range[0], context) ?? RANGE_MIN);
            this.range[1] = parseFloat(this.renderTemplate(this.config.range[1], context) ?? RANGE_MAX);
        }
        this.speed = (this.range[1] - this.range[0]) / 50;
        if (this.config.step) {
            this.step = Number(this.renderTemplate(this.config.step, context));
        }
        else {
            this.step = (this.range[1] - this.range[0]) / STEP_COUNT;
        }
        const splitStep = this.step.toString().split('.');
        if (splitStep.length > 1) {
            this.precision = splitStep[1].length;
        }
        else {
            this.precision = 0;
        }
        this.vertical =
            this.renderTemplate(this.config.vertical ?? false, context) == true;
        const containerStyle = {};
        const sliderElement = this.shadowRoot?.querySelector('input');
        if (sliderElement) {
            const style = getComputedStyle(sliderElement);
            const thumbWidth = style.getPropertyValue('--thumb-width');
            const height = style.getPropertyValue('--height');
            if (thumbWidth) {
                this.thumbWidth = parseInt(thumbWidth.replace(/[^0-9]+/g, ''));
            }
            else {
                this.thumbWidth = parseInt(height.replace(/[^0-9]+/g, ''));
            }
            if (this.vertical) {
                this.style.setProperty('width', 'fit-content');
                this.style.setProperty('align-self', 'stretch');
                containerStyle['height'] = `${this.sliderWidth}px`;
                containerStyle['width'] = 'var(--height)';
            }
        }
        this.rtl = getComputedStyle(this).direction == 'rtl';
        this.setThumbOffset();
        this.style.setProperty('--thumb-offset', `calc(${this.rtl && !this.vertical ? '-1 * ' : ''}${this.thumbOffset}px)`);
        return html `
			<div
				class="container ${this.sliderOn ? 'on' : 'off'}"
				style=${styleMap(containerStyle)}
			>
				${this.buildBackground()}${this.buildSlider(undefined, context)}
				${this.buildIcon(this.config.icon, context)}
				${this.buildLabel(this.config.label, context)}
			</div>
			${this.buildTooltip()}${this.buildSliderStyles(context)}
			${this.buildStyles(this.config.styles, context)}
		`;
    }
    async onKeyDown(e) {
        const keys = this.vertical
            ? ['ArrowDown', 'ArrowUp']
            : ['ArrowLeft', 'ArrowRight'];
        if (keys.includes(e.key)) {
            e.preventDefault();
            this.getValueFromHass = false;
            this.showTooltip = true;
            this.currentValue = Math.min(Math.max(parseFloat((this.currentValue ??
                this.value ??
                this.range[0])) +
                (e.key == keys[!this.vertical && this.rtl ? 1 : 0]
                    ? -1
                    : 1) *
                    this.step, this.range[0]), this.range[1]);
        }
    }
    async onKeyUp(e) {
        const keys = this.vertical
            ? ['ArrowDown', 'ArrowUp']
            : ['ArrowLeft', 'ArrowRight'];
        if (keys.includes(e.key)) {
            e.preventDefault();
            this.showTooltip = false;
            this.value = this.currentValue;
            await this.sendAction('tap_action');
            this.endAction();
            this.resetGetValueFromHass();
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver.observe(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.resizeObserver.disconnect();
    }
    static get styles() {
        return [
            super.styles,
            css `
				:host {
					display: flex;
					flex-flow: column;
					flex-grow: 0;
					place-content: center space-evenly;
					align-items: center;
					position: relative;
					height: unset;
					width: 100%;
					border: none;
					border-radius: 25px;
					padding: 0px;
					box-sizing: border-box;
					line-height: 0;
					outline: 0px;
					overflow: visible;
					font-size: inherit;
					color: inherit;
					pointer-events: none;
					transition: box-shadow 180ms ease-in-out;

					--color: var(--primary-text-color);
					--height: 48px;
				}
				:host(:focus-visible) {
					box-shadow: 0 0 0 2px
						var(--icon-color, var(--primary-text-color));
				}

				.container {
					all: inherit;
					overflow: hidden;
					height: var(--height);
					align-self: center;
					color: var(
						--background,
						var(
							--lovelace-background,
							var(--primary-background-color)
						)
					);
				}

				.background {
					position: absolute;
					width: 100%;
					height: var(--background-height, 100%);
					background: var(
						--background,
						var(
							--lovelace-background,
							var(--primary-background-color)
						)
					);
				}

				.slider {
					position: absolute;
					appearance: none;
					-webkit-appearance: none;
					-moz-appearance: none;
					pointer-events: all;
					height: 100%;
					width: inherit;
					background: none;
					overflow: hidden;
					touch-action: pan-y;
				}
				.slider:focus-visible {
					outline: none;
				}

				.slider::-webkit-slider-thumb {
					appearance: none;
					-webkit-appearance: none;
					height: var(--height);
					width: var(--thumb-width, var(--height));
					cursor: pointer;
					background: var(--color);
					border-color: rgb(0, 0, 0, 0);
					box-shadow: var(
						--thumb-box-shadow,
						calc(-100vw - (var(--thumb-width, var(--height)) / 2)) 0
							0 100vw var(--color)
					);
					border-radius: var(--thumb-border-radius, var(--height));
				}
				.slider::-moz-range-thumb {
					appearance: none;
					-webkit-appearance: none;
					height: var(--height);
					width: var(--thumb-width, var(--height));
					cursor: pointer;
					background: var(--color);
					border-color: rgb(0, 0, 0, 0);
					box-shadow: var(
						--thumb-box-shadow,
						calc(-100vw - (var(--thumb-width, var(--height)) / 2)) 0
							0 100vw var(--color)
					);
					border-radius: var(--thumb-border-radius, var(--height));
				}

				.off > ::-webkit-slider-thumb {
					visibility: hidden;
				}
				.off > ::-moz-range-thumb {
					visibility: hidden;
				}

				.tooltip {
					background: var(--clear-background-color);
					color: var(--primary-text-color);
					position: absolute;
					border-radius: 0.8em;
					padding: 0.2em 0.4em;
					height: 20px;
					width: fit-content;
					line-height: 20px;
					transform: var(--tooltip-transform);
					display: var(--tooltip-display);
				}

				.faded-out {
					opacity: 0;
					transition: opacity 180ms ease-in-out 0s;
				}
				.faded-in {
					opacity: 1;
					transition: opacity 540ms ease-in-out 0s;
				}
				.tooltip::after {
					content: var(--tooltip-label, 0);
				}

				.icon {
					color: var(
						--icon-color,
						var(
							--background,
							var(
								--lovelace-background,
								var(--primary-background-color)
							)
						)
					);

					--mdc-icon-size: var(--size, 32px);
				}
			`,
        ];
    }
};
__decorate([
    property()
], RemoteSlider.prototype, "config", void 0);
__decorate([
    state()
], RemoteSlider.prototype, "showTooltip", void 0);
__decorate([
    state()
], RemoteSlider.prototype, "thumbOffset", void 0);
__decorate([
    state()
], RemoteSlider.prototype, "sliderOn", void 0);
__decorate([
    state()
], RemoteSlider.prototype, "currentValue", void 0);
__decorate([
    state()
], RemoteSlider.prototype, "sliderWidth", void 0);
__decorate([
    state()
], RemoteSlider.prototype, "sliderHeight", void 0);
RemoteSlider = __decorate([
    customElement('remote-slider')
], RemoteSlider);
export { RemoteSlider };
