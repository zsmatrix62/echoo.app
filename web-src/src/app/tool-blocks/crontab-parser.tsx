import { Button, Typography, Col, Input, Row, Select, Space, SideSheet, Descriptions, List, Toast } from "@douyinfe/semi-ui"
import { isTauriAppContext } from "../../App"
import "./crontab-paser.scss"
import { useWasmAPI } from '../libs/hooks/wasm-api'
import { useEffect, useState } from "react"
import cronstrue from "cronstrue"
import { IconHelpCircle } from "@douyinfe/semi-icons"
import { Data, DescriptionsItemProps } from "@douyinfe/semi-ui/lib/es/descriptions"
import useClipboard from "use-clipboard-hook"

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

let defaultData: Array<Data> = [
	{ key: "Minutes", value: "-" },
	{ key: "Hours", value: "-" },
	{ key: "Day of Month", value: "-" },
	{ key: "Months", value: "-" },
	{ key: "Day of Week", value: "-" },
	{ key: "Next executions", value: "-" },
]
const CrontabParserResDisplay = (props: { data: Array<Data> }) => {
	const [data, setData] = useState<Array<Data> | undefined>()

	useEffect(() => {
		setData(props.data)
	}, [props])

	return <Descriptions
		align={'left'}
		style={{ width: "100%" }} data={data}> </Descriptions>
}

const CrontabHelp = () => {
	return <Row>
		<Col>
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
	const { Text, Title } = Typography
	const wasmAPI = useWasmAPI()

	const defaultExplain = "Please enter a cron expression"
	const [explain, setExplain] = useState(defaultExplain)
	const [isErroCron, setIsErrorCron] = useState(false)
	const [showCrontabHelp, setShowCrontabHelp] = useState(false)
	const [inputExp, setInputExp] = useState("")
	const [data, setData] = useState<Array<Data>>(defaultData)
	const [exmapleIdx, setExampleIdx] = useState<number | undefined>()

	const onInpuExpChanged = (exp: string) => {
		setInputExp(exp)
		setExampleIdx(undefined)
		if (!exp) {
			setExplain(defaultExplain)
			setIsErrorCron(false)
			return
		}
		const defautlErr = () => {
			setExplain(`Invalid Expression`)
			setIsErrorCron(true)
		}
		try {
			const parseRes = wasmAPI?.parse_crontab_string(exp)
			try {
				const explain = cronstrue.toString(exp)
				setExplain(explain.replace("aN:", "00:"))
				setIsErrorCron(false)
				const expSegs = exp.replace(/\s\s/g, '').split(" ")
				const isAllMinutes = expSegs[0] === "*"
				const isAllHours = expSegs[1] === "*"
				const isAllDays = expSegs[2] === "*"
				const isAllMonths = expSegs[3] === "*"
				const isAllWeekdays = expSegs[4] === "*"
				setData([
					{
						key: "Minutes", value: isAllMinutes ? "(All)" : Array.from(new Set(parseRes?.minutes)).map((m: Number) => { return ":" + `${m}`.padStart(2, "0") }).join(', '),
					},
					{
						key: "Hours", value: isAllHours ? "(All)" : Array.from(new Set(parseRes?.hours)).map((m: Number) => { return `${m}`.padStart(2, "0") }).join(', '),
					},
					{ key: "Days", value: isAllDays ? "(All)" : Array.from(new Set(parseRes?.days)).map((m: Number) => { return `${m}` }).join(', '), },
					{
						key: "Day of Month", value: isAllMonths ? "(All)" : Array.from(new Set(parseRes?.months)).map((m: Number) => {
							return [
								"January",
								"February",
								"March",
								"April",
								"May",
								"June",
								"July",
								"August",
								"September",
								"October",
								"November",
								"December"

							][(m) as number - 1]
						}).join(', '),
					},
					{
						key: "Day of Week", value: isAllWeekdays ? "(All)" : Array.from(new Set(parseRes?.weekdays)).map((m: Number) => {
							return {
								0: "Sunday",
								1: "Monday",
								2: "Tuesday",
								3: "Wedensday",
								4: "Thursday",
								5: "Friday",
								6: "Saturday",

							}[(m) as number - 1]
						}).join(', '),
					},
					{
						key: "Next executions", value:
							<Space vertical={true}>
								{parseRes?.next_executions.split("#").map(n => {
									let [local, utc] = n.split(",");
									return <Space>
										<Text code>{local}</Text>
										<span>{utc}</span>
									</Space>
								})}
							</Space>

					}
				])
			} catch (_) {
				defautlErr()
			}
		} catch (e) {
			let errMsg = `${e}`;
			if (errMsg.startsWith("RuntimeError")) {
				console.error(e)
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

	const { copy } = useClipboard({
		onSuccess: (_) => {
			Toast.success({
				content: `Copied Crontab expression.`,
			})
		},
	})

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
						<Button onClick={() => {
							let idx = Math.floor(exampleCrontabs.length * Math.random());
							const exp = exampleCrontabs[idx].exp
							setInputExp(exp)
							setExplain(defaultExplain)
							onInpuExpChanged(exp)
							setExampleIdx(idx)
						}} > Sample </Button>
						<Button onClick={() => {
							setInputExp("")
							setExplain(defaultExplain)
							onInpuExpChanged("")
							setData(defaultData)
						}} > Clear </Button>
						<Button onClick={() => {
							copy(inputExp)
						}} > Copy </Button>
					</Space>
				</Row>
			</Row>
			<Row className={'crontab-input-container'}>
				<Col span={11} style={{ paddingLeft: "5px" }}>
					<Space style={{ width: "100%" }} >
						<Button
							icon={<IconHelpCircle />}
							onClick={() => {
								setShowCrontabHelp(true)
							}}
						/>
						<Input
							placeholder="* * * * *" value={inputExp} onChange={onInpuExpChanged}></Input>
					</Space>

				</Col>
				<Col span={11} style={{ paddingLeft: "10px" }}>
					<Select style={{ width: "100%" }}
						placeholder="Pick an example ..."
						onSelect={onExampleSelected}
						defaultValue={undefined}
						value={exmapleIdx}
					>
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
			<Row className="crontab-content">
				<Row className={'crontab-explain'}>
					<Col span={24}>
						<Text type={isErroCron ? "danger" : "secondary"}>{explain}</Text>
					</Col>
				</Row>
				<Row style={{ marginTop: "20px" }}>
					<Col>
						<CrontabParserResDisplay data={data} />
					</Col>
				</Row>
			</Row>
		</Row >
	)
}
