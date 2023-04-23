import type { ToolSettingConfig, ToolSettings, ToolSettingWidgetConfigItems } from '@echoo/types';

export interface FormatterToolProvider<OptionsType extends object, S = ToolSettings<OptionsType>> {
	Format(
		code: string,
		options: {
			settings?: S;
			errorCb?: (err?: Error) => void;
		},
	): string;

	ProvideSampleCode(lang: string): string;

	// DefaultSettingConfig is used to init settings of current formatter, will be set/override/re-used to localstorage and query prameters
	// NOTE: no need to pass to Format function each time as it's already in above stores
	DefaultSettingConfig?: ToolSettingConfig<OptionsType>;

	SettingsWidgetConfig?: () => ToolSettingWidgetConfigItems<OptionsType>;
}
