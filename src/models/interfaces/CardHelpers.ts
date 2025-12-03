import { TemplateResult } from 'lit';

/**
 * https://github.com/home-assistant/frontend/blob/dev/src/panels/lovelace/custom-card-helpers.ts
 */
export interface CardHelpers {
	/**
	 * Show dialog to enter a numeric code
	 * @param {HTMLElement} element
	 * @param {EnterCodeDialogParams} dialogParams
	 * @returns {string | null}
	 */
	showEnterCodeDialog: (
		element: HTMLElement,
		dialogParams: EnterCodeDialogParams,
	) => Promise<string | null>;

	/**
	 * Show an alert dialog
	 * @param {HTMLElement} element
	 * @param {AlertDialogParams} dialogParams
	 */
	showAlertDialog: (
		element: HTMLElement,
		dialogParams: AlertDialogParams,
	) => Promise<void>;

	/**
	 * Show a confirmation dialog
	 * @param {HTMLElement} element
	 * @param {ConfirmationDialogParams} dialogParams
	 * @returns {boolean}
	 */
	showConfirmationDialog: (
		element: HTMLElement,
		dialogParams: ConfirmationDialogParams,
	) => Promise<boolean>;

	/**
	 * Show a dialog with an input prompt
	 * @param {HTMLElement} element
	 * @param {PromptDialogParams} dialogParams
	 * @returns {string | null}
	 */
	showPromptDialog: (
		element: HTMLElement,
		dialogParams: PromptDialogParams,
	) => Promise<string | null>;

	/**
	 * Import a more-info control so it can be created later
	 * https://github.com/home-assistant/frontend/blob/dev/src/dialogs/more-info/state_more_info_control.ts
	 * @param {string} type
	 */
	importMoreInfoControl: (type: string) => Promise<void>;
}

export interface EnterCodeDialogParams {
	codeFormat: 'text' | 'number';
	codePattern?: string;
	submitText?: string;
	cancelText?: string;
	title?: string;
	submit?: (code?: string) => void;
	cancel?: () => void;
}

interface BaseDialogBoxParams {
	confirmText?: string;
	text?: string | TemplateResult;
	title?: string;
	warning?: boolean;
}

export interface AlertDialogParams extends BaseDialogBoxParams {
	confirm?: () => void;
}

export interface ConfirmationDialogParams extends BaseDialogBoxParams {
	dismissText?: string;
	confirm?: () => void;
	cancel?: () => void;
	destructive?: boolean;
}

export interface PromptDialogParams extends BaseDialogBoxParams {
	inputLabel?: string;
	dismissText?: string;
	inputType?: string;
	defaultValue?: string;
	placeholder?: string;
	confirm?: (out?: string) => void;
	cancel?: () => void;
	inputMin?: number | string;
	inputMax?: number | string;
}
