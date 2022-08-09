import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Button, Col, Form, Modal, Row, Space, Typography } from "@douyinfe/semi-ui";
import Section from "@douyinfe/semi-ui/lib/es/form/section";
import { IMac, Magic, Setting } from "@icon-park/react";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import { IconMoon, IconSun } from "@douyinfe/semi-icons";
import { useLocalStore } from "../libs/hooks/localstore";
import { useObservableState } from "observable-hooks";
import { Pref } from "../context/pref";

export type EchooSettings = {
	"general:share-analytics": boolean
	"appearance:theme": "dark" | "light" | "system"
	"updates:check-automatically": boolean
}

export const EchooSettingsDefault: EchooSettings = {
	"general:share-analytics": true,
	"appearance:theme": "system",
	"updates:check-automatically": true
}

type settingsModelProps = { visible: boolean, onVisibleChange: (v: boolean) => void }
export const SettingsModal = ({ visible, onVisibleChange }: settingsModelProps) => {
	const [settings, setSettings] = useLocalStore("settings", EchooSettingsDefault)
	const [shown, setShown] = useObservableState<boolean>(obs => {
		obs.subscribe(shown => {
			onVisibleChange(shown)
		})
		return obs
	}, visible)

	const formRef = useRef<Form>(null)

	const onChangeOfAnyField = (v: any) => {
		// @ts-ignore
		setSettings(v)

		let theme = v['appearance:theme'];
		Pref.getInstance().theme.$.next(theme)
	}

	useEffect(() => {
		setShown(visible)
	}, [setShown, visible])

	// noinspection RequiredAttributes
	return (
		<Modal centered visible={shown}
			footer={
				<Button type={"danger"} onClick={() => {
					setShown(!shown)
				}}>Close</Button>
			}
			closable={false}
			width={"600px"}
			height={"520px"}
			keepDOM={true}
			bodyStyle={{ overflow: 'auto', height: "400px", width: "600px" }}
		>
			<Form initValues={settings} ref={formRef} onValueChange={onChangeOfAnyField}
				style={{ height: "100%" }}>
				<Section text={<Space> <Magic size={28} /> <Typography.Text
					style={{ fontSize: 18 }}>Appearance</Typography.Text> </Space>}>
					<Row>
						<Col span={12}>
							<Space spacing={20}>
								<Text>Theme</Text>
								<Form.Select noLabel field={"appearance:theme"}>
									<Form.Select.Option label={
										<Space>
											<IMac style={{ height: 14 }} />
											<span>System</span>
										</Space>
									} value={"system"} />
									<Form.Select.Option label={
										<Space>
											<IconMoon />
											<span>Dark</span>
										</Space>
									} value={"dark"} />
									<Form.Select.Option label={
										<Space>
											<IconSun />
											<span>Light</span>
										</Space>
									} value={"light"} />
								</Form.Select>
							</Space>
						</Col>
					</Row>
				</Section>
				{/*{isTauri &&*/}
				{/*    <Section text={<Space> <UpdateRotation size={28}/> <Typography.Text*/}
				{/*        style={{fontSize: 18}}>Updates</Typography.Text> </Space>}>*/}

				{/*        <Space>*/}
				{/*            <Form.Checkbox noLabel field="updates:check-automatically">*/}
				{/*                Check for updates automatically*/}
				{/*            </Form.Checkbox>*/}

				{/*            <Tooltip content={"Check now"}>*/}
				{/*                <Button icon={<IconSync/>} size={"small"}/>*/}
				{/*            </Tooltip>*/}
				{/*        </Space>*/}
				{/*    </Section>*/}
				{/*}*/}
			</Form>
		</Modal>
	);
};
