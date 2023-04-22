/**

┌───────────────────────────────────────────┐                ┌───────────────────────────────────┐
│                                           │                │                                   │
│                                           │                │                                   │
│                                           │                │                                   │
│                                           │                │          Setting Config           │
│      ┌────────────────────────────┐       │       ┌───────▶│                                   │
│      │       Tool Settings        │       │       │        │        ┌─────────────────┐        │
│      └────────────────────────────┘       │       │        │        │    Tool Key     │        │
│      ┌────────────────────────────┐       │       │        │        └─────────────────┘        │
│      │ ┌───────────────────────┐  │       │       │        └───────────────────────────────────┘
│      │ │   Tool Setting Item   │  │       │       │
│      │ └───────────────────────┘  │       │       │
│      │ ┌───────────────────────┐  │       │       │
│      │ │   Tool Setting Item   │  │       │───────┘
│      │ └───────────────────────┘  │       │
│      │ ┌───────────────────────┐  │       │
│      │ │   Tool Setting Item   │  │       │
│      │ └───────────────────────┘  │       │
│      │ ┌───────────────────────┐  │       │
│      │ │   Tool Setting Item   │  │       │
│      │ └───────────────────────┘  │       │
│      └────────────────────────────┘       │
│                                           │
│                                           │
│                                           │
│                                           │
└───────────────────────────────────────────┘

 */

export type ToolSettingConfig<OptionsType extends object> = {
  key: string;
  settings: ToolSettings<OptionsType>;
};

export type ToolSettings<OptionsType extends object> = {
  [K in keyof OptionsType]: ToolSettingItem<OptionsType, K>;
};

export type ToolSettingItem<
  OptionsType extends object,
  K extends keyof OptionsType,
  V extends OptionsType[K] = OptionsType[K]
> = {
  asQueryParams: boolean;
  asLocalStorageItem: boolean;
  value: V;
};
