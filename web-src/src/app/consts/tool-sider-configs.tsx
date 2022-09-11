import { NavItemProps } from '@douyinfe/semi-ui/lib/es/navigation'
import {
  Calendar,
  CodeBrackets,
  FingerprintThree,
  LinkOne,
  PayCode,
  Percentage,
  Time,
} from '@icon-park/react'
import { ReactNode } from 'react'
import { JsonFormatterBlock } from '../tool-blocks/json-formatter'
import { Icon } from '@douyinfe/semi-ui'
import { Base64Serde } from '../tool-blocks/base64serde'
import { UrlParser } from '../tool-blocks/url-parser'
import { CrontabParserBlock } from '../tool-blocks/crontab-parser'
import { UnixTimeConverterPage } from '../tool-blocks/unix-time-converter'
import { UrlEncodePage } from '../tool-blocks/url-encode'
import { UUIDGeneratorBlock } from '../tool-blocks/uuid-generator'

type ToolSiderItem = {
  navItemProps: NavItemProps
  node: ReactNode
}

const ToolSiderConfigs: { [key: string]: ToolSiderItem } = {
  'json-formatter': {
    navItemProps: {
      itemKey: 'json-formatter',
      text: 'JSON Formatter',
      icon: <Icon svg={<CodeBrackets theme="outline" />} />,
    },
    node: <JsonFormatterBlock />,
  },
  'base64-serde': {
    navItemProps: {
      itemKey: 'base64-serde',
      text: 'Base64 Coders',
      icon: <Icon svg={<PayCode theme="outline" />} />,
    },
    node: <Base64Serde />,
  },
  'url-parser': {
    navItemProps: {
      itemKey: 'url-parser',
      text: 'URL Parser',
      icon: <Icon svg={<LinkOne theme="outline" />} />,
    },
    node: <UrlParser />,
  },
  'crontab-parser': {
    navItemProps: {
      itemKey: 'crontab-parser',
      text: 'Crontab Parser',
      icon: <Icon svg={<Calendar theme="outline" />} />,
    },
    node: <CrontabParserBlock />,
  },
  'unix-time-converter': {
    navItemProps: {
      itemKey: 'unix-time-converter',
      text: 'Unix Time Converter',
      icon: <Icon svg={<Time theme="outline" />} />,
    },
    node: <UnixTimeConverterPage />,
  },
  'url-encode': {
    navItemProps: {
      itemKey: 'url-encode',
      text: 'URL Encode/Decode',
      icon: <Icon svg={<Percentage theme="outline" />} />,
    },
    node: <UrlEncodePage />,
  },
  'uuid-generator': {
    navItemProps: {
      itemKey: 'uuid-generator',
      text: 'UUID Generator/Decoder',
      icon: <Icon svg={<FingerprintThree theme="outline" />} />,
    },
    node: <UUIDGeneratorBlock />,
  },
}

export default ToolSiderConfigs
