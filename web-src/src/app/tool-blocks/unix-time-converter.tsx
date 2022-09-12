import { BaseFormApi } from "@douyinfe/semi-foundation/lib/es/form/interface";
import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Row,
	Space,
	Typography,
} from "@douyinfe/semi-ui";
import Label from "@douyinfe/semi-ui/lib/es/form/label";
import { Copy } from "@icon-park/react";
import Correct from "@icon-park/react/es/icons/Correct";
import { dataDir } from "@tauri-apps/api/path";
import { useRef, useState } from "react";
import useClipboard from "use-clipboard-hook";
import { theDay, theWeek, isLeap, dateFormat } from "../../utils/calendar";
import { CopyableInput } from "../shared/copyableInput";

const WEEK_STR = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];
const MONTH_STR = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"June",
	"July",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export const UnixTimeConverterPage = () => {
	const [dateType, setDateType] = useState<String>("ms");
	const [curDate, setCurDate] = useState<Date>(new Date());
	const formApi = useRef<BaseFormApi<any>>();

	const itemStyle = { width: "90%" };

	const renderLabelText = (text: String, _: string) => {
		return (
			<div>
				<span style={{ fontWeight: 600 }}>{text}</span>
			</div>
		);
	};
	//是否为Date对象
	const isValidDate = (date: any) => {
		return date instanceof Date && !isNaN(date.getTime());
	};

	const setOtherField = (
		timestamp: number,
		curField: string,
		type = dateType
	) => {
		let t = timestamp;
		if (curField === "timestamp" && type === "s") {
			t = Number((t * 1000).toFixed(0));
		}
		const date = new Date(t);
		if (isValidDate(date)) {
			const setField = curField === "timestamp" ? "date" : "timestamp";
			const setValue =
				setField === "timestamp"
					? type === "s"
						? (t / 1000).toFixed(0)
						: String(t)
					: date;
			formApi.current?.setValue(setField, setValue);
			formApi.current?.setError(curField, "");
			setCurDate(date);
		} else {
			formApi.current?.setError(curField, "Invalid Date");
		}
	};

	const presetsTimes = [
		() => {
			return {
				text: "Now",
				start: new Date(),
				end: new Date(),
			};
		},
	];

	return (
		<Form
			style={{ padding: "0 20px", width: "100%", boxSizing: "border-box" }}
			getFormApi={(api) => (formApi.current = api)}
			onValueChange={(_, changeValue) => {
				for (let i in changeValue) {
					//任意输入为空、全部设置空
					if (!changeValue[i]) {
						formApi.current?.setValues({});
					}
				}
			}}
		>
			<Row>
				<Col span={8}>
					<Form.InputGroup
						style={itemStyle}
						label={{ text: renderLabelText("Unix Timestamp", "timestamp") }}
					>
						<Form.Input
							style={{ width: "50%" }}
							field="timestamp"
							initValue={curDate.getTime()}
							onChange={(value: any) => {
								setOtherField(Number(value), "timestamp");
							}}
						></Form.Input>
						<Form.Select
							field="dateType"
							style={{ width: "50%" }}
							initValue={dateType}
							onChange={(value: any) => {
								setDateType(value);
								setOtherField(
									Number(formApi.current?.getValue("date")),
									"date",
									value
								);
							}}
						>
							<Form.Select.Option value="ms">Milliseconds</Form.Select.Option>
							<Form.Select.Option value="s">Seconds</Form.Select.Option>
						</Form.Select>
					</Form.InputGroup>
				</Col>
				<Col span={5}>
					<Form.DatePicker
						presets={presetsTimes}
						field="date"
						label={renderLabelText("Choose Time", "date")}
						style={itemStyle}
						initValue={curDate}
						type="dateTime"
						placeholder="Select Time"
						onChange={(value: any) => {
							if (value && isValidDate(value)) {
								formApi.current?.setValue("dateType", "ms");
								setOtherField(new Date(value).getTime(), "date");
							}
						}}
					/>
				</Col>
			</Row>
			<Card>
				<Row gutter={[20, 20]}>
					<Col span={8}>
						<Label style={{ fontWeight: 600 }}>Now</Label>
						<CopyableInput content={curDate.toString()} />
					</Col>
					<Col span={8}>
						<Label style={{ fontWeight: 600 }}>UTC</Label>
						<CopyableInput content={curDate.toUTCString()} />
					</Col>
					<Col span={8}>
						<Label style={{ fontWeight: 600 }}>ISO</Label>
						<CopyableInput content={curDate.toString()} />
					</Col>
				</Row>
			</Card>
			<Card style={{ marginTop: "10px" }}>
				<Row gutter={[20, 20]}>
					<Col span={8}>
						<Label style={{ fontWeight: 600 }}>Day of Year</Label>
						<CopyableInput content={theDay(curDate)} />
					</Col>
					<Col span={8}>
						<Label style={{ fontWeight: 600 }}>Week of Year</Label>
						<CopyableInput content={theWeek(curDate)} />
					</Col>
					<Col span={8}>
						<Label style={{ fontWeight: 600 }}>Leap Year:</Label>
						<CopyableInput content={isLeap(curDate) ? "Yes" : "No"} />
					</Col>
				</Row>
			</Card>

			<Card title="Other formats (local)" style={{ marginTop: "10px" }}>
				<Row gutter={[0, 20]}>
					<Col>
						<CopyableInput
							content={`${MONTH_STR[curDate.getMonth()]},${WEEK_STR[curDate.getDay()]
								}${dateFormat(curDate.getTime(), " d, Y")}`}
						/>
					</Col>
					<Col>
						<CopyableInput content={dateFormat(curDate.getTime(), "d/m/Y")} />
					</Col>
					<Col>
						<CopyableInput content={dateFormat(curDate.getTime(), "Y-m-d")} />
					</Col>
					<Col>
						<CopyableInput
							content={dateFormat(curDate.getTime(), "d-m-Y H:i")}
						/>
					</Col>
					<Col>
						<CopyableInput
							content={dateFormat(curDate.getTime(), "Y-m-d H:i")}
						/>
					</Col>
				</Row>
			</Card>
		</Form>
	);
};
