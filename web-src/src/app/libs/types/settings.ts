import {ReactNode} from "react";

type AppSettingOption<T extends AppSettingValueType> = {
    icon?: ReactNode
    title: string
    value: string | number
}

export type AppSettingEnableValue = {
    enabled?: boolean;
    value: AppSettingValueType
}

type AppSettingValueType = undefined | number | string | AppSettingEnableValue

export type AppSettingItem<T extends AppSettingValueType> = {
    platform: "all" | Array<"linux" | "windows" | "mac">
    userFriendlyName: string
    description?: string
    storeKey: string
    options?: Array<AppSettingOption<T>>
    value: T
}

export type AppSettings = Array<{
    groupTitle: string
    icon: ReactNode,
    items: Array<AppSettingItem<AppSettingValueType>>
}>