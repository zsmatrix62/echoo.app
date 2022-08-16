import { Space, Tag, Typography } from "@douyinfe/semi-ui";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";

const pjson = require('../../../package.json')
export const MainFooter = () => {
	return <Space className='main-footer' vertical>
		<Text type='tertiary'>
			<Space>
				<span>Copyright © 2022</span>
				<b>Echoo.app</b>
				<Tag><Typography.Text size={'small'} type="tertiary">v{pjson.version}</Typography.Text></Tag>
			</Space>
		</Text>
	</Space>;
};
