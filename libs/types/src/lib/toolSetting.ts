export type ToolSettingConfig<OptionsType extends object> = {
	key: string;
	settings: ToolSettings<OptionsType>;
};

export type ToolSettingWidgetConfigItemValue<V, K> = {
	key: K;
	label?: {
		title?: string;
		tip?: string;
	};
	style?: { [klass: string]: unknown };
	widgetType: 'radio' | 'check' | 'combo' | 'input';
	defaultValue?: V;
	candidates: {
		label: string;
		value: V;
	}[];
};

export type ToolSettingWidgetConfigItem<OptionsType extends object, K extends keyof OptionsType = keyof OptionsType> = {
	[key in K]: ToolSettingWidgetConfigItemValue<OptionsType[key], key>;
};

export type ToolSettingWidgetConfigItems<OptionsType extends object> = ToolSettingWidgetConfigItem<
	Partial<OptionsType>
>[];

export type ToolSettings<OptionsType extends object> = {
	[K in keyof OptionsType]: ToolSettingItem<OptionsType, K>;
};

export type ToolSettingItem<
	OptionsType extends object,
	K extends keyof OptionsType,
	V extends OptionsType[K] = OptionsType[K],
> = {
	asQueryParams: boolean;
	asLocalStorageItem: boolean;
	value: V;
};
