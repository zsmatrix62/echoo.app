import { Row, Col, Space, Typography, Button, TextArea, Input, Divider } from "@douyinfe/semi-ui"
import { ValidateStatus } from "@douyinfe/semi-ui/lib/es/timePicker"
import { randSentence } from "@ngneat/falso"
import { match } from "assert"
import { useObservableState } from "observable-hooks"
import { useContext, useEffect, useRef, useState } from "react"
import { useMount } from "react-use"
import { isTauriAppContext } from "../../App"
import { CopyableInput } from "../shared/copyableInput"

function convertFromStringToBuffer(value: string): ArrayBuffer {
	// Encode with UTF-8
	const encoder = new TextEncoder();
	return encoder.encode(value);
}
function convertFromBufferToString(value: ArrayBuffer): string {
	// Decode with UTF-8
	const decoder = new TextDecoder();
	return decoder.decode(value);
}

const LeftBlock = (props: {
	onInputChanged: (v: Uint8Array, is_sample: boolean) => void
}) => {

	const [inputValue, setInputValue] = useState("")

	const onTextChanged = (v: string, is_sample?: boolean) => {
		setInputValue(v)
		props.onInputChanged(new Uint8Array(convertFromStringToBuffer(v)), !!is_sample)
	}

	const fileReaderRef = useRef<HTMLInputElement>(null)
	const handelInputChange = () => {
		if (fileReaderRef?.current?.files) {
			const selectedFile = fileReaderRef!.current!.files![0];
			// setIsLoadingFile(true)
			selectedFile.arrayBuffer().then((data) => {
				props.onInputChanged(new Uint8Array(data), false)
			}).finally()
		}
	}

	const isTauri = useContext(isTauriAppContext)

	const onLoadFileClicked = async () => {
		if (fileReaderRef.current) {
			// setIsLoadingFile(true)
			if (isTauri) {
				// @ts-ignore
				const tauri = window.__TAURI__;
				let filePath = await tauri.dialog.open();
				if (filePath) {
					tauri.invoke("read_binary_file", { "path": filePath }).then((invokeRes: [string, Uint8Array]) => {
						let data = invokeRes[1]
						props.onInputChanged(data, false)
					});
				}
			} else {
				fileReaderRef.current.click()
			}
			// setIsLoadingFile(false)
		}
	}

	return <>
		<input type={"file"} style={{ display: "none" }} ref={fileReaderRef}
			onChange={handelInputChange} />
		<Space vertical style={{ width: "100%", height: '100%', display: 'flex', flexDirection: 'column' }} align="start">
			<Space>
				<Typography.Text>Input</Typography.Text>
				<Button onClick={() => {
					onTextChanged(randSentence({ length: 1 })[0], true)
				}}>Sample</Button>
				<Button onClick={onLoadFileClicked}>Loadfile...</Button>
				<Button onClick={() => { onTextChanged("") }}>Clear</Button>
			</Space >
			<TextArea style={{ flex: 1, marginBottom: '10px' }} value={inputValue}
				onChange={(v) => { onTextChanged(v) }} ></TextArea >

		</Space>
	</>
}
const RightBlock = (props: { source: Uint8Array, selectSample: boolean }) => {
	type hashField = {
		title: string,
		content: string,
		state: ValidateStatus
	}
	const [hashFields, setHashFields] = useObservableState<hashField[]>(obs => obs, [])
	const [matchField, setMatchField] = useObservableState<string>(obs => obs, "")

	const algoItems = (wasm?: any) => {
		return {
			"md5": wasm?.digest_md5,
			"sha224": wasm?.digest_sha224,
			"sha256": wasm?.digest_sha256,
			"sha348": wasm?.digest_sha348,
			"sha512": wasm?.digest_sha512,
			"sha3-224": wasm?.digest_sha3_224,
			"sha3-256": wasm?.digest_sha3_256,
			"sha3-384": wasm?.digest_sha3_384,
			"sha3-512": wasm?.digest_sha3_512,
		}
	}

	const resetFields = () => {
		setHashFields(Object.keys(algoItems()).map(algo => {
			return { title: algo.toUpperCase(), content: "", state: "default" }
		}))
	}

	useMount(() => {
		resetFields();
	})

	useEffect(() => {
		if (props.source.length == 0) {
			resetFields()
			return
		}
		import("wasm-api").then(wasm => {
			const _items = algoItems(wasm);
			const fields = Object.keys(_items).map(algo => {
				//@ts-ignore
				const genFunc = _items[algo];
				const content = genFunc ? genFunc(props.source) : ""
				return {
					title: algo.toUpperCase(), content: content,
					state: content == matchField && content != "" ? 'warning' : "default"
				}
			})
			//@ts-ignore
			setHashFields(fields)
		})
	}, [props, matchField])

	useEffect(() => {
		if (props.selectSample) {
			const contents: string[] = hashFields.map(f => f.content)
			const sample = contents[Math.floor(Math.random() * contents.length)]
			inputMatchFieldChanged(sample)
			hashFields.forEach(f => { f.state = sample == f.content ? "warning" : "default" })
		}
	}, [hashFields,])

	const inputMatchFieldChanged = (v: string) => {
		setMatchField(v)
	}

	return <Row gutter={4} style={{ width: "100%" }}>
		<Col span={20} style={{ width: "100%", paddingRight: "20px" }} >
			<Space vertical align="start" style={{ width: "100%" }} >
				<Typography.Text><b>Match Hash:</b></Typography.Text>
				<Input placeholder={"Input hash string to match below calculated"} style={{ width: "100%" }}
					value={matchField}
					onChange={inputMatchFieldChanged}
				/>
			</Space>
		</Col>

		<Col span={20} style={{ width: "100%" }}>
			<Divider style={{ paddingTop: "15px" }}></Divider>
		</Col>

		<Col span={20} style={{ width: "100%" }}>
			<Row gutter={4}>
				{hashFields.map((f, idx) => {
					const matched = f.state == "warning" ? "warning" : undefined;
					const weight = f.state == "warning" ? "bold" : undefined;
					return <Col span={12} style={{ padding: "10px", }} key={idx}>
						<Space key={idx} vertical align="start" style={{ width: "100%" }}>
							<Typography.Text type={matched} style={{ fontWeight: weight }}>{f.title}:{f.state == 'warning' ? ' ✅' : ''}</Typography.Text>
							<CopyableInput
								state={f.state}
								content={f.content}
								width="100%" />
						</Space>
					</Col>
				})}
			</Row>
		</Col>
	</Row >
}

export const HashGeneratorBlock = () => {
	const [input, setInput] = useState<Uint8Array>(new Uint8Array())
	const [isSample, setIsSample] = useState<boolean>(false)

	return <>
		<Row style={{ height: '100%' }}>
			<Col span={8} style={{ padding: "10px 0 0 10px" }}>
				<LeftBlock onInputChanged={(v, is_sample) => {
					setInput(v)
					setIsSample(is_sample)
				}}></LeftBlock>
			</Col>
			<Col span={16} style={{ padding: "20px 0 0 10px" }}><RightBlock source={input} selectSample={isSample}></RightBlock> </Col>
		</Row>
	</>
}
