import { Row, Col, Space, Typography, Button, TextArea } from "@douyinfe/semi-ui"
import { stringToArrayBuffer } from "@improbable-eng/grpc-web/dist/typings/transports/http/xhr"
import { useObservableCallback, useObservableState, useSubscription } from "observable-hooks"
import { useEffect, useState } from "react"
import { useMount, useStateList } from "react-use"
import { BehaviorSubject } from "rxjs"
import { convertToObject } from "typescript"
import { useWasmAPI } from "../libs/hooks/wasm-api"
import { CopyableInput } from "../shared/copyableInput"

const VerCopyItem = (props: { title: string, content: string }) => {
	return <Space vertical style={{ marginTop: '10px', width: '100%' }} align='start'>
		<Typography.Text>{props.title}</Typography.Text>
		<CopyableInput content={props.content} width="100%" ></CopyableInput>
	</Space>
}

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
	onTextChanged: (v: string) => void
}) => {
	return <>

		<Space vertical style={{ width: "100%" }} align="start">
			<Space>
				<Typography.Text>Input</Typography.Text>
				<Button>Sample</Button>
				<Button>Loadfile...</Button>
				<Button>Clear</Button>
			</Space>
			<TextArea onChange={props.onTextChanged}></TextArea>
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
			"sha256": wasm?.digest_sha256,
			"sha512": wasm?.digest_sha512,
			"sha348": wasm?.digest_sha348,
			"sha224": wasm?.digest_sha224
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
		import("wasm-api").then(wasm => {
			const _items = algoItems(wasm);
			setHashFields(Object.keys(_items).map(algo => {
				//@ts-ignore
				const genFunc = _items[algo];
				return { title: algo.toUpperCase(), content: genFunc ? genFunc(props.source) : "" }
			}))
		})
	}, [props])

	return <Row gutter={4} >
		{hashFields.map((f, idx) => {

			return <Col span={12} style={{ padding: "10px", }} key={idx}>
				<Space key={idx} vertical align="start" style={{ width: "100%" }}>
					<Typography.Text>{f.title}:</Typography.Text>
					<CopyableInput content={f.content} width="100%"></CopyableInput>
				</Space>
			</Col>
		})}
	</Row>
}

export const HashGeneratorBlock = () => {
	const [input, setInput] = useState<Uint8Array>(new Uint8Array())

	return <>
		<Row>
			<Col span={8} style={{ padding: "10px 0 0 10px" }}>
				<LeftBlock onTextChanged={(v) => setInput(new Uint8Array(convertFromStringToBuffer(v)))}></LeftBlock>
			</Col>
			<Col span={16} style={{ padding: "10px 0 0 10px" }}><RightBlock source={input}></RightBlock> </Col>
		</Row>
	</>
}
