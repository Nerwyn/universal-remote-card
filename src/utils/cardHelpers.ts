import {
	CardHelpers,
	HassElement,
	IAction,
	IConfirmation,
} from '../models/interfaces';

let helpers: CardHelpers;

export async function handleConfirmation(
	node: HassElement,
	action: IAction,
): Promise<boolean> {
	const hass = node.hass;
	const confirmation = action.confirmation;

	if (
		confirmation &&
		(!(confirmation as IConfirmation).exemptions ||
			!(confirmation as IConfirmation).exemptions?.some(
				(e) => e.user == hass.user?.id,
			))
	) {
		if (!helpers) {
			helpers = await window.loadCardHelpers();
		}

		// Retrieve original confirmation text or get translation
		let text = (confirmation as IConfirmation).text;
		if (!text) {
			let serviceName;
			const [domain, service] = (
				action.perform_action ??
				action['service' as 'perform_action'] ??
				''
			).split('.');
			if (hass.services[domain]?.[service]) {
				const localize = await hass.loadBackendTranslation('title');
				serviceName = `${
					localize(`component.${domain}.title`) || domain
				}: ${
					localize(`component.${domain}.services.${service}.name`) ||
					hass.services[domain][service].name ||
					service
				}`;
			}

			text = hass.localize(
				'ui.panel.lovelace.cards.actions.action_confirmation',
				{
					action:
						serviceName ??
						hass.localize(
							`ui.panel.lovelace.editor.action-editor.actions.${action.action}`,
						) ??
						action.action,
				},
			);
		}

		return await helpers.showConfirmationDialog(node, {
			text,
			confirm: () => true,
			cancel: () => false,
		});
	}
	return true;
}
