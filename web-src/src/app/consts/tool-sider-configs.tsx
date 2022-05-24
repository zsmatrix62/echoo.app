import { NavItemProps } from "@douyinfe/semi-ui/lib/es/navigation";
import { CodeBrackets, DataFour, LinkOne, PayCode } from "@icon-park/react";
import { ReactNode } from "react";
import { JsonFormatterBlock } from "../tool-blocks/json-formatter";
import { Icon } from "@douyinfe/semi-ui";
import { Base64Serde } from "../tool-blocks/base64serde";
import { UrlParser } from "../tool-blocks/url-parser";
import { IconArticle } from "@douyinfe/semi-icons";
import { SQLFormatterBlock } from "../tool-blocks/sql-formatter";

type ToolSiderItem = {
  navItemProps: NavItemProps;
  node: ReactNode;
};

const ToolSiderConfigs: { [key: string]: ToolSiderItem } = {
  "json-formatter": {
    navItemProps: {
      itemKey: "json-formatter",
      text: "JSON Format/Validate",
      icon: <Icon svg={<CodeBrackets theme="outline" />} />,
    },
    node: <JsonFormatterBlock />,
  },
  "base64-serde": {
    navItemProps: {
      itemKey: "base64-serde",
      text: "Base64/Image Encode/Decode",
      icon: <Icon svg={<PayCode theme="outline" />} />,
    },
    node: <Base64Serde />,
  },
  "url-parser": {
    navItemProps: {
      itemKey: "url-parser",
      text: "URL Parser",
      icon: <Icon svg={<LinkOne theme="outline" />} />,
    },
    node: <UrlParser />,
  },
  "sql-parser": {
    navItemProps: {
      itemKey: "sql-parser",
      text: "SQL Parser",
      icon: <Icon svg={<DataFour theme="outline" />} />,
    },
    node: <SQLFormatterBlock />,
  },
};

export default ToolSiderConfigs;
