import { useRef } from 'react';
import { Button, Col, Form, Modal, Row, Space, Typography } from "@douyinfe/semi-ui";
import Section from "@douyinfe/semi-ui/lib/es/form/section";
import { Github, Protect, } from "@icon-park/react";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import { useLocalStore } from "../libs/hooks/localstore";
import { Pref } from "../context/pref";
import { PersonalPrivacy } from '@icon-park/react/es';

export type FirstLanchingModalSettings = {
	"allow-analytics": boolean
}

export const FirstLanchingModalSettingsDefault: FirstLanchingModalSettings = {
	"allow-analytics": true,
}

type props = { onVisibleChange: (v: FirstLanchingModalSettings) => void }

export const FirstLanchingModal = ({ onVisibleChange }: props) => {
	const [settings, setSettings] = useLocalStore("first-launching-settings", FirstLanchingModalSettingsDefault)
	const formRef = useRef<Form>(null)

	const onChangeOfAnyField = (v: any) => {
		console.log(v)
		// @ts-ignore
		setSettings(v)

		let allow = v['allow-analytics'];
		Pref.getInstance().allowAnalytics.$.next(allow)
	}

	// noinspection RequiredAttributes
	return (
		<Modal centered visible={true}
			footer={
				<Button type={"primary"} onClick={() => {
					onVisibleChange(settings as FirstLanchingModalSettings)
				}}>Continue</Button>
			}
			closable={false}
			width={"600px"}
			height={"auto"}
			keepDOM={true}
			bodyStyle={{ overflow: 'auto', height: "350px", width: "auto" }}
		>

			<Form initValues={settings} ref={formRef} onValueChange={onChangeOfAnyField}
				style={{ height: "100%" }}>
				<Section text={<Space> <PersonalPrivacy size={28} /> <Typography.Text
					style={{ fontSize: 18 }}>Anonymouse Analysis Notice</Typography.Text> </Space>}>
					<Row>
						<Col>
							<Typography.Paragraph style={{ padding: "20px 0" }} spacing='extended' >
								Echoo.app uses anonymouse analysis to trackdown usage and  website traffic, we use this kind of data to improve this application. You can always opt-out the analysis by adding browser add-on or un-check below option and continue.
							</Typography.Paragraph>
							<br />
							<Typography.Title heading={4} >Echoo.app guarentees:</Typography.Title>
							<br />
							<Typography.Paragraph spacing='extended'>
								<Space align='center'>
									<Protect size={24.5} />
									<span>Will NOT collect any of your data input into this application.</span>
								</Space>
								<Space align='center' style={{ marginTop: "10px" }}>
									<Github size={24.5} />
									<Typography.Text>Aways be an <a rel="noreferrer" href="https://github.com/zsmatrix62/echoo.app" target="_blank"> open source software</a></Typography.Text>
								</Space>
							</Typography.Paragraph>
						</Col>
					</Row>
					<Row style={{ position: "fixed", width: "100%", bottom: "60px" }}>
						<Col span={14} push={10}>
							<Form.Checkbox
								style={{ width: "100%" }}
								noLabel={true}
								field='allow-analytics' >
								<Text>Share anonymouse data with Echoo.app</Text>
							</Form.Checkbox>
						</Col>
					</Row>
				</Section>
			</Form>
		</Modal >
	);
};
