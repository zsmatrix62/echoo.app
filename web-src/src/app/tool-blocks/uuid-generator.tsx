import { Button, Card, Checkbox, Col, Input, InputNumber, Row, Select, Space, TabPane, Tabs, TextArea, Toast, Typography } from "@douyinfe/semi-ui"
import { CheckboxEvent } from "@douyinfe/semi-ui/lib/es/checkbox"
import { useObservableCallback, useObservableState, useSubscription } from "observable-hooks"
import { useRef, useState } from "react"
import { BehaviorSubject, map } from "rxjs"
import useClipboard from "use-clipboard-hook"
import { UUIDRes } from "wasm-api"
import { CopyableInput } from "../shared/copyableInput"

const VerCopyItem = (props: { title: string, content: string }) => {
	return <Space vertical style={{ marginTop: '10px', width: '100%' }} align='start'>
		<Typography.Text>{props.title}</Typography.Text>
		<CopyableInput content={props.content} width="100%" ></CopyableInput>
	</Space>
}

const LeftBlock = () => {
	const decodeUuidUpperCased$ = new BehaviorSubject<boolean>(false)

	const [decodeUuidRes, setDecodeUuidRes] = useObservableState<UUIDRes | undefined>(obs => obs, undefined)

	const [decodeUuidResV1Tm, setDecodeUuidResV1Tm] = useObservableState<[string, string]>(obs => obs, ["", ""])

	const [decodeUuidUpperCased, setDecodeUuidUpperCased] = useObservableState(obs => {
		obs.subscribe(checked => { decodeUuidUpperCased$.next(checked) })
		return obs
	}, false)

	const [decodeInputValue, setDecodeInputValue] = useObservableState<string | undefined>(obs => obs, undefined);
	const [_, setDecodeInput] = useObservableState(obs => {
		obs.subscribe(inputChange => {
			setDecodeInputValue(inputChange)
			import("wasm-api").then(wasm => {
				try {
					const uuid = wasm.decode_uuid(inputChange);
					decodeUuidUpperCased$.subscribe(yes => {
						setDecodeUuidRes(transUUIDResCase(uuid, yes))
						if (uuid.version_num === 1) {
							let clock = uuid.rfc4122.clock;
							setDecodeUuidResV1Tm([uuid.rfc4122.epcho, clock])
						}
					})
				} catch (e) {
					setDecodeUuidRes(undefined)
					// TODO: show tooltip of error message until new uuid is input
				}
			})
		});
		return obs
	}, "")

	const sampleUUID = () => {
		import("wasm-api").then(wasm => {
			try {
				const uuid: string = [wasm.gen_uuid_v1().std_string, wasm.gen_uuid_v4().std_string][
					Math.floor((Math.random() * 2))
				];
				setDecodeInput(uuid)
			} catch (_) {
			}
		})
	}

	const transUUIDResCase = (res?: UUIDRes, uupercase?: boolean) => {
		if (res) {
			if (!!uupercase) {
				res.std_string = res.std_string.toUpperCase()
				res.urn_string = res.urn_string.toUpperCase()
				res.simple_string = res.simple_string.toUpperCase()
				res.raw_content = res.raw_content.toUpperCase()
			} else {
				res.std_string = res.std_string.toLowerCase()
				res.urn_string = res.urn_string.toLowerCase()
				res.simple_string = res.simple_string.toLowerCase()
				res.raw_content = res.raw_content.toLowerCase()
			}
		}
		return res
	}

	return <>
		<Row style={{ padding: '0 0 20px 0' }}>
			<Space spacing={'medium'}>
				<Space>
					<Typography.Text>Input:</Typography.Text>
					<Button onClick={sampleUUID}>Sample</Button>
					<Button onClick={() => { setDecodeInput("") }}>Clear</Button>
				</Space>
				<Checkbox checked={decodeUuidUpperCased} onChange={(e: CheckboxEvent) => {
					const checked = !!e.target.checked;
					setDecodeUuidUpperCased(checked)
					setDecodeUuidRes(transUUIDResCase(decodeUuidRes, checked))
				}}>Uppercase</Checkbox>
			</Space>
		</Row>
		<Row style={{ width: "100%" }}>
			<Input
				style={{ paddingLeft: "0" }}
				placeholder={'00000000-0000-0000-0000-000000000000'}
				onChange={setDecodeInput}
				value={decodeInputValue}
			/>
		</Row>
		<Row> <VerCopyItem title="Standard String Format" content={decodeUuidRes?.std_string ?? ''}></VerCopyItem> </Row>
		<Row> <VerCopyItem title="URN Format" content={decodeUuidRes?.urn_string ?? ''}></VerCopyItem> </Row>
		<Row> <VerCopyItem title="Simple Format" content={decodeUuidRes?.simple_string ?? ''}></VerCopyItem> </Row>
		<Row> <VerCopyItem title="Single Integer Value" content={decodeUuidRes?.integer_value ?? ''}></VerCopyItem> </Row>
		<Row> <VerCopyItem title="Version" content={decodeUuidRes ? (`v${decodeUuidRes?.version_num ?? ''} (${decodeUuidRes?.version ?? ''})`) : ''}></VerCopyItem> </Row>
		<Row> <VerCopyItem title="Variant" content={decodeUuidRes?.variant ?? ''}></VerCopyItem> </Row>
		<Row> <VerCopyItem title="Raw Contents" content={decodeUuidRes?.raw_content ?? ''}></VerCopyItem> </Row>

		{decodeUuidRes?.version_num == 1 ?
			<>
				<Row> <VerCopyItem title="Content - Time" content={decodeUuidResV1Tm[0]}></VerCopyItem> </Row>
				<Row> <VerCopyItem title={"Content - Clock ID"} content={decodeUuidResV1Tm[1]}></VerCopyItem> </Row>
				<Row> <VerCopyItem title="Content - Node" content={decodeUuidRes?.raw_content.split(":").reverse().slice(0, 6).reverse().join(":") ?? ''}></VerCopyItem> </Row>
			</>
			: null}

	</>
}

const Uuid35Input = (props: { cb: (uuid: string, name: string) => void }) => {
	const namespaces = ["ns:DNS", "ns:URL", "ns:OID", "ns:X500", 'Random']

	const [inputUuid, setInputUuid] = useObservableState(obs => obs, "")
	const [inputName, setInputName] = useObservableState(obs => obs, "")
	const [_, setNs] = useObservableState(obs => {
		obs.subscribe(ns => {
			props.cb(ns[0], ns[1])
		})
		return obs
	}, ["", ""])

	const onNamespaceClicked = (ns: string) => {
		import("wasm-api").then(wasm => {
			let ns_uuid = ""
			if (ns.startsWith("ns:")) {
				ns_uuid = wasm.uuid_namespace(ns.toLowerCase());
			} else {
				try {
					ns_uuid = [wasm.gen_uuid_v1().std_string, wasm.gen_uuid_v4().std_string][
						Math.floor((Math.random() * 2))
					];
				} catch (_) {
				}
			}
			onInputUuidChanged(ns_uuid)
		})
	}

	const onInputUuidChanged = async (v: string) => {
		setInputUuid(v)
		setNs([v, inputName])
	}

	const onInputNameChanged = (v: string) => {
		setInputName(v)
		setNs([inputUuid, v])
	}

	return (
		<Space vertical={true} style={{ width: '100%' }} align='start'>
			<Space>
				{namespaces.map((n, idx) => {
					return <Button key={idx} onClick={() => { onNamespaceClicked(n) }}>{n}</Button>
				})}
			</Space>
			<Input
				value={inputUuid}
				placeholder={'00000000-0000-0000-0000-000000000000'}
				validateStatus={/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(inputUuid) ? "default" : "error"}
				onChange={onInputUuidChanged} />
			<Input
				placeholder={'Anything: web.echoo.app'}
				value={inputName}
				onChange={onInputNameChanged}
				validateStatus={inputName ? "default" : "error"}
			/>
		</Space>
	)
}

const RightBlock = () => {
	const IDsTextArea = (props: { rows: number | string, content: string }) => {
		return <TextArea
			contentEditable={false}
			style={{ overflow: "scroll", height: "400px" }} rows={props.rows as number} value={props.content}></TextArea>
	}

	const tabRef = useRef<Tabs>(null)

	const tabKeyMap = {
		"1": "Standard",
		"2": "URN",
		"3": "Simple",
	}
	const [visibleTabs, setVisibleTabs] = useObservableState<string>(obs => obs, "123")
	const [uuidCount, setUuidCount] = useObservableState(obs => {
		obs.subscribe(c => {
			setUuids([])
			if (!!!c) { return }
			if (c <= 9999) {
				onGenerateClicked(c)
			}
		})
		return obs
	}, 100)

	const [uuidsState, setUuidsSate] = useState<UUIDRes[]>([])
	const [setUuids, uuids$] = useObservableCallback<UUIDRes[], UUIDRes[]>(e$ => e$,)
	useSubscription(uuids$, (uuids => {
		fillTextArea(uuids)
		setUuidsSate(uuids)
	}))

	const [setUuidStrings, uuidString$] = useObservableCallback<string, string[]>(
		e$ => {
			return e$.pipe(map(strings => {
				const uuidString = strings.join("\n");
				return (uuidString)
			}))
		}
	)
	useSubscription(uuidString$, s => {
		const transCase = (u: string) => {
			return uppercase ? u.toUpperCase() : u.toLowerCase()
		}
		setUuidString(transCase(s))
	})

	const [uuidString, setUuidString] = useObservableState<string>(obs => obs, "")
	const [enableUuidCount, setEnableUuidCount] = useObservableState<boolean>(obs => obs, true)

	const [nsName, setNsName] = useObservableState(obs => obs, ["", ""])

	const [genVersion, setGenVersion] = useObservableState(obs => obs, 'uuidv1')

	const [uppercase, setUppserCase] = useObservableState(obs => obs, false)
	const [onUppercaseChanged, uppercase$] = useObservableCallback<boolean, CheckboxEvent>(e => { return e.pipe(map(ie => !!ie.target.checked)) },)
	useSubscription(uppercase$, (checked) => {
		setUppserCase(checked)
		setUuidString(checked ? uuidString.toUpperCase() : uuidString.toLowerCase())
	})

	const [setActiveIndex, activeIndexChanged$] = useObservableCallback<string, string>($e => $e)
	useSubscription(activeIndexChanged$, key => {
		fillTextArea(uuidsState, key)
	})

	const fillTextArea = (uuids: UUIDRes[], activeKey?: string,) => {
		const key = tabRef!.current?.state.activeKey as string
		switch (activeKey || key) {
			case "1": setUuidStrings(uuids.map(u => (u.std_string))); break;
			case "2": setUuidStrings(uuids.map(u => (u.urn_string))); break;
			case "3": setUuidStrings(uuids.map(u => (u.simple_string))); break;
		}
	}

	const onGenerateClicked = (c?: number) => {
		import("wasm-api").then(wasm => {
			const genRange = new Array(c || uuidCount || 0).fill(0);
			const [ns, n] = nsName;
			switch (genVersion) {
				case "uuidv1":
					setUuids(genRange.map(_ => { return wasm.gen_uuid_v1() }))
					break;
				case "uuidv3":
					if (!!!ns || !!!n) { break }
					setUuids(genRange.map(_ => { return wasm.gen_uuid_v3(ns, n) }))
					break;
				case "uuidv4":
					setUuids(genRange.map(_ => { return wasm.gen_uuid_v4() }))
					break;
				case "uuidv5":
					if (!!!ns || !!!n) { break }
					setUuids(genRange.map(_ => { return wasm.gen_uuid_v5(ns, n) }))
					break;
				case "nanoid":
					setUuids(genRange.map(_ => {
						const nanoid = wasm.gen_nanoid();
						// @ts-ignore
						let uuidRes: UUIDRes = { std_string: nanoid, };
						return uuidRes;
					}))
					break;
			}
		})
	}

	//@ts-ignore
	const onGenversionSelected = (ver) => {
		setUuids([])
		setGenVersion(ver)
		if (["uuidv1", "uuidv3", "uuidv4", "uuidv5"].includes(ver)) {
			setVisibleTabs("123")
		}
		if (["uuidv3", "uuidv5"].includes(ver)) {
			setUuidCount(1)
			setEnableUuidCount(false)
		} else {
			setEnableUuidCount(true)
		}
		if (ver == "nanoid") {
			setVisibleTabs("1")
		}
	}

	const { copy } = useClipboard({
		onSuccess: (_) => {
			Toast.success({
				content: `content copied`,
			});
		},
	});

	// @ts-ignore
	const onCopy = () => {
		copy(uppercase ? uuidString.toUpperCase() : uuidString.toLowerCase())
	};

	return <Row>
		<Row type="flex" style={{ justifyContent: 'space-between' }}>
			<Col > <Typography.Text>Generate new IDs</Typography.Text> </Col>
			<Col >
				<Space>
					<Select
						value={genVersion}
						defaultValue="uuidv1"
						style={{ width: 120 }}
						onChange={onGenversionSelected}
					>
						<Select.Option value='uuidv1'>UUID v1</Select.Option>
						<Select.Option value='uuidv3'>UUID v3</Select.Option>
						<Select.Option value='uuidv4'>UUID v4</Select.Option>
						<Select.Option value='uuidv5'>UUID v5</Select.Option>
						<Select.Option value='nanoid'>Nano ID</Select.Option>
					</Select>
					<Typography.Text>X</Typography.Text>
					<InputNumber
						disabled={!enableUuidCount}
						style={{ width: "70px" }} min={1} max={9999} defaultValue={uuidCount} value={uuidCount} hideButtons onChange={v => {
							setUuidCount(v as number)
						}} />
				</Space>
			</Col>
		</Row>
		{
			<Row style={(!['uuidv3', 'uuidv5'].includes(genVersion) ? { display: "none" } : {})} >
				<Uuid35Input cb={(ns, n) => { setNsName([ns, n]) }}></Uuid35Input>
			</Row>
		}
		<Row type='flex' justify="space-between" style={{ paddingTop: '10px' }} >
			<Col>
				<Space>
					<Button onClick={() => { onGenerateClicked() }}>Generate</Button>
					<Button disabled={uuidString.length == 0} onClick={() => { onCopy() }}>Copy</Button>
					<Button disabled={uuidString.length == 0} onClick={() => { setUuids([]) }}>Clear</Button>
				</Space>
			</Col>
			<Col>
				<Checkbox style={{ padding: '7px 0' }} value={uppercase} onChange={onUppercaseChanged}>Uppercase</Checkbox>
			</Col>
		</Row >
		<Row style={{ paddingTop: '10px' }}>
			<Tabs tabPosition="left" ref={tabRef} onChange={setActiveIndex}>
				{Object.keys(tabKeyMap).map((k) => {
					return (
						//@ts-ignore
						<TabPane tab={tabKeyMap[k]} itemKey={k} key={k} disabled={!visibleTabs.includes(k)}>
							<IDsTextArea rows={uuidCount} content={uuidString}></IDsTextArea>
						</TabPane>
					)
				})}
			</Tabs>
		</Row>
	</Row >
}

export const UUIDGeneratorBlock = () => {
	return (
		<Row style={{ height: '100%' }}>
			<Col span={8} style={{ padding: "16px 10px 10px 10px", height: '100%' }}>
				<Card title={"Decoder"} headerStyle={{ padding: "10px 10px" }} style={{ height: '100%', overflow: 'auto', scrollbarWidth: 'none' }}>
					<LeftBlock />
				</Card>
			</Col>
			<Col span={16} style={{ padding: "16px 10px 10px 10px", height: '100%' }}>
				<Card title="Generator" headerStyle={{ padding: "10px 10px" }} style={{ height: '100%' }}>
					<RightBlock />
				</Card>
			</Col>
		</Row >
	)
}
