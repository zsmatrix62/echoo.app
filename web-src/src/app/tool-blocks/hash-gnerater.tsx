import { Row, Col, Space, Typography, Button, TextArea, Input, Divider } from "@douyinfe/semi-ui"
import { randSentence } from "@ngneat/falso"
import { useObservableCallback, useObservableState, useSubscription } from "observable-hooks"
import { useContext, useEffect, useRef, useState } from "react"
import { useMount, useStateList } from "react-use"
import { BehaviorSubject } from "rxjs"
import { convertToObject } from "typescript"
import { isTauriAppContext } from "../../App"
import { useWasmAPI } from "../libs/hooks/wasm-api"
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
	onInputChanged: (v: Uint8Array) => void
}) => {

	const [inputValue, setInputValue] = useState("")

	const onTextChanged = (v: string) => {
		setInputValue(v)
		props.onInputChanged(new Uint8Array(convertFromStringToBuffer(v)))
	}

	const fileReaderRef = useRef<HTMLInputElement>(null)
	const handelInputChange = () => {
		if (fileReaderRef?.current?.files) {
			const selectedFile = fileReaderRef!.current!.files![0];
			// setIsLoadingFile(true)
			selectedFile.arrayBuffer().then((data) => {
				props.onInputChanged(new Uint8Array(data))
			}).finally(
				() => {
					// setIsLoadingFile(false)
				}
			)
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
						props.onInputChanged(data)
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
		<Space vertical style={{ width: "100%" }} align="start">
			<Space>
				<Typography.Text>Input</Typography.Text>
				<Button onClick={() => {
					onTextChanged(randSentence({ length: 1 })[0])
				}}>Sample</Button>
				<Button onClick={onLoadFileClicked}>Loadfile...</Button>
				<Button>Clear</Button>
			</Space>
			<TextArea value={inputValue}
				onChange={onTextChanged}></TextArea>
		</Space>
	</>
}
const RightBlock = (props: { source: Uint8Array }) => {
	type hashField = {
		title: string,
		content: string
	}
	const [hashFields, setHashFields] = useObservableState<hashField[]>(obs => obs, [])
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
			return { title: algo.toUpperCase(), content: "" }
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
			setHashFields(Object.keys(_items).map(algo => {
				//@ts-ignore
				const genFunc = _items[algo];
				return { title: algo.toUpperCase(), content: genFunc ? genFunc(props.source) : "" }
			}))
		})
	}, [props])

	return <Row gutter={4} style={{ width: "100%" }}>
		<Col span={20} style={{ width: "100%", paddingRight: "20px" }} >
			<Space vertical align="start" style={{ width: "100%" }} >
				<Typography.Text>Match hash:</Typography.Text>
				<Input placeholder={"Input hash string to match below calculated"} style={{ width: "100%" }} />
			</Space>
		</Col>

		<Col span={20} style={{ width: "100%" }}>
			<Divider style={{ paddingTop: "15px" }}></Divider>
		</Col>

		<Col span={20} style={{ width: "100%" }}>
			<Row gutter={4}>
				{hashFields.map((f, idx) => {
					return <Col span={12} style={{ padding: "10px", }} key={idx}>
						<Space key={idx} vertical align="start" style={{ width: "100%" }}>
							<Typography.Text>{f.title}:</Typography.Text>
							<CopyableInput content={f.content} width="100%"></CopyableInput>
						</Space>
					</Col>
				})}
			</Row>
		</Col>
	</Row >
}

export const HashGeneratorBlock = () => {
	const [input, setInput] = useState<Uint8Array>(new Uint8Array())

	return <>
		<Row>
			<Col span={8} style={{ padding: "10px 0 0 10px" }}>
				<LeftBlock onInputChanged={(v) => setInput(v)}></LeftBlock>
			</Col>
			<Col span={16} style={{ padding: "10px 0 0 10px" }}><RightBlock source={input}></RightBlock> </Col>
		</Row>
	</>
}
