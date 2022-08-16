import { NavItemProps } from "@douyinfe/semi-ui/lib/es/navigation";
import { Calendar, CodeBrackets, LinkOne, PayCode } from "@icon-park/react";
import { ReactNode } from "react";
import { JsonFormatterBlock } from "../tool-blocks/json-formatter";
import { Icon, Typography } from "@douyinfe/semi-ui";
import { Base64Serde } from "../tool-blocks/base64serde";
import { UrlParser } from "../tool-blocks/url-parser";
import { CrontabParserBlock } from "../tool-blocks/crontab-parser";

type ToolSiderItem = {
	navItemProps: NavItemProps;
	node: ReactNode;
};

const ToolSiderConfigs: { [key: string]: ToolSiderItem } = {
	"json-formatter": {
		navItemProps: {
			itemKey: "json-formatter",
			text: <Typography.Text>JSON Formatter</Typography.Text>,
			icon: <Icon svg={<CodeBrackets theme="outline" />} />,
		},
		node: <JsonFormatterBlock />,
	},
	"base64-serde": {
		navItemProps: {
			itemKey: "base64-serde",
			text: <Typography.Text>Base64 Coders</Typography.Text>,
			icon: <Icon svg={<PayCode theme="outline" />} />,
		},
		node: <Base64Serde />,
	},
	"url-parser": {
		navItemProps: {
			itemKey: "url-parser",
			text: <Typography.Text>URL Parser</Typography.Text>,
			icon: <Icon svg={<LinkOne theme="outline" />} />,
		},
		node: <UrlParser />,
	},
	"crontab-parser": {
		navItemProps: {
			itemKey: "crontab-parser",
			text: <Typography.Text>Crontab Parser</Typography.Text>,
			icon: <Icon svg={<Calendar theme="outline" />} />,
		},
		node: <CrontabParserBlock />,
	}
};

export default ToolSiderConfigs;
