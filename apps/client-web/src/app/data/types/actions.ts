export type ButtonClickAction = () => void;

export interface DefaultFormatterActions {
	onSampleClicked: ButtonClickAction;
	onClearClicked: ButtonClickAction;
}

export abstract class DefaultOutputActionsImpl {}
