import { Button, Typography, Col, Input, Row, Select, Space, SideSheet } from "@douyinfe/semi-ui"
import { isTauriAppContext } from "../../App"
import "./crontab-paser.scss"
import { useWasmAPI } from '../libs/hooks/wasm-api'
import { useState } from "react"
import cronstrue from "cronstrue"
import { defaultMaxListeners } from "events"
import inputGroup from "@douyinfe/semi-ui/lib/es/input/inputGroup"
import { Record } from "@icon-park/react"
import { CrontabRes } from "wasm-api"
import { IconHelpCircle } from "@douyinfe/semi-icons"

type crontabExample = {
	des: string,
	exp: string
}

const exampleCrontabs: Array<crontabExample> = [
	{ des: "Every minute", exp: "* * * * *" },
	{ des: "Every Five Minutes", exp: "*/5 * * * *" },
	{ des: "Every Hour", exp: "0 * * * *" },
	{ des: "Every Six Hours", exp: "*/6 * * * *" },
	{ des: "Evry 5 minutes from 9am to 5pm", exp: "*/5 9-17 * * *" },
	{ des: "Every minute on Sunday", exp: "* * * * SUN" },
	{ des: "Every day at 2am", exp: "0 2 * * *" },
	{ des: "On October 1st at 3pm", exp: "0 15 1 10 *" },
]

const CrontabParser = () => {
	return (
		<isTauriAppContext.Consumer>
			{(isTauri) => (
				<></>
			)}
		</isTauriAppContext.Consumer>
	)
}

const CrontabParserResDisplay = () => {
	return <></>
}

const CrontabHelp = () => {
	return <Row>
		<Col>
			<Row>
				<Col>
				</Col>
			</Row>
			<Row>
				<Col>
					<table>
						<thead>
							<tr>
								<th>Field</th>
								<th>Required</th>
								<th>Allowed values</th>
								<th>Allowed special characters</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Minutes</td>
								<td>Yes</td>
								<td>0–59</td>
								<td>* , - /</td>
							</tr>
							<tr>
								<td>Hours</td>
								<td>Yes</td>
								<td>0–23</td>
								<td>* , - /</td>
							</tr>
							<tr>
								<td>Day of month</td>
								<td>Yes</td>
								<td>1–31</td>
								<td>* , - /</td>
							</tr>
							<tr>
								<td>Month</td>
								<td>Yes</td>
								<td>1–12 or Jan-Dec</td>
								<td>* , - /</td>
							</tr>
							<tr>
								<td>Day of week</td>
								<td>Yes</td>
								<td>1–7 or Sun-Sat</td>
								<td>* , - /</td>
							</tr>
						</tbody>
					</table>
				</Col>
			</Row>

		</Col>
	</Row>
}

export const CrontabParserBlock = () => {
	const { Text } = Typography
	const wasmAPI = useWasmAPI()

	const [explain, setExplain] = useState("")
	const [isErroCron, setIsErrorCron] = useState(false)
	const [showCrontabHelp, setShowCrontabHelp] = useState(false)
	const [inputExp, setInputExp] = useState("")

	const onInpuExpChanged = (value: string) => {
		setInputExp(value)
		if (!value) {
			setExplain("")
			setIsErrorCron(false)
			return
		}
		const defautlErr = () => {
			setExplain(`Invalid Expression`)
			setIsErrorCron(true)
		}
		try {
			const parseRes = wasmAPI?.parse_crontab_string(value)
			try {
				const explain = cronstrue.toString(value)
				setExplain(explain.replace("aN:", "00:"))
				setIsErrorCron(false)
			} catch (_) {
				defautlErr()
			}
		} catch (e) {
			let errMsg = `${e}`;
			if (errMsg.startsWith("RuntimeError")) {
				defautlErr();
				return;
			}
			setExplain(errMsg)
			setIsErrorCron(true)
		}
	}

	// @ts-ignore
	const onExampleSelected = (index: any) => {
		const exp = exampleCrontabs[index].exp
		setInputExp(exp)
		onInpuExpChanged(exp)
	}

	return (
		<Row className={'g-tool-block-container'}>
			<SideSheet
				size={'medium'}
				visible={showCrontabHelp}
				onCancel={() => {
					setShowCrontabHelp(false)
				}}
			>
				<CrontabHelp />
			</SideSheet>
			<Row className={'crontab-input-actions'}>
				<Row>
					<Space>
						<Button onClick={() => { }} > Clipboard </Button>
						<Button onClick={() => { }} > Sample </Button>
						<Button onClick={() => { }} > Clear </Button>
						<Button onClick={() => { }} > Copy </Button>
					</Space>
				</Row>
			</Row>
			<Row className={'crontab-input-container'}>
				<Col span={1}>
					<Button
						icon={<IconHelpCircle />}
						onClick={() => {
							setShowCrontabHelp(true)
						}}
					/>
				</Col>
				<Col span={11} style={{ paddingLeft: "5px" }}>
					<Input placeholder="* * * * *" value={inputExp} onChange={onInpuExpChanged}></Input> </Col>
				<Col span={12} style={{ paddingLeft: "10px" }}>
					<Select style={{ width: "100%" }}
						placeholder="Pick an example ..."
						onSelect={onExampleSelected}>
						{
							exampleCrontabs.map((exp, idx) => {
								return <Select.Option
									key={idx}
									value={idx}>{`${exp.des} (${exp.exp})`}</Select.Option>
							})
						}
					</Select>
				</Col>
			</Row>
			<Row className={'crontab-explain'}>
				<Col span={24}>
					<Text type={isErroCron ? "danger" : "secondary"}>{explain}</Text>
				</Col>
			</Row>
		</Row >
	)
}
