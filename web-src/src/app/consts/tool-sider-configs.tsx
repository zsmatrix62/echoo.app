import {NavItemProps} from "@douyinfe/semi-ui/lib/es/navigation";
import {CodeBrackets, PayCode} from "@icon-park/react";
import {ReactNode} from "react";
import {JsonFormatterBlock} from "../tool-blocks/json-formatter";
import {Icon} from "@douyinfe/semi-ui";
import {Base64Serde} from "../tool-blocks/base64serde";

type ToolSiderItem = {
    navItemProps: NavItemProps;
    node: ReactNode;
};

const ToolSiderConfigs: { [key: string]: ToolSiderItem } = {
    "json-formatter": {
        navItemProps: {
            itemKey: "json-formatter",
            text: "JSON Format/Validate",
            icon: <Icon svg={<CodeBrackets theme="outline"/>}/>,
        },
        node: <JsonFormatterBlock/>,
    },
    "base64-serde": {
        navItemProps: {
            itemKey: "base64-serde",
            text: "Base64/Image Encode/Decode",
            icon: <Icon svg={<PayCode theme="outline"/>}/>
        },
        node: <Base64Serde/>
    },
    // "url-en-de": {
    //     navItemProps: {
    //         itemKey: "url-en-de",
    //         text: "URL Encode/Decode",
    //         icon: <Icon svg={<Percentage theme="outline"/>}/>
    //     },
    //     node: <UrlEnDe/>
    // },
    // "url-parser": {
    //     navItemProps: {
    //         itemKey: "url-parser",
    //         text: "URL Parser",
    //         icon: <Icon svg={<LinkOne theme="outline"/>}/>
    //     },
    //     node: <UrlParser/>
    // }
};

export default ToolSiderConfigs;
