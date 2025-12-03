import { HomeAssistant } from './HomeAssistant';

export interface HassElement extends HTMLElement {
	hass: HomeAssistant;
}
