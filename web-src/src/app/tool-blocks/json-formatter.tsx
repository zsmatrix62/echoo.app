import {Banner, Button, Input, Layout, Select, SideSheet, Space, Toast} from "@douyinfe/semi-ui";
import "./json-formatter.scss"
import {IconArrowUp, IconCopy, IconHelpCircle, IconLayers} from "@douyinfe/semi-icons";
import * as React from "react";
import {useContext, useEffect, useRef, useState} from "react";
import {APIServiceContext} from "../context/api";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {useObservableState} from "observable-hooks";
import {useMount} from "react-use";
import CodeMirror, {ReactCodeMirrorRef} from '@uiw/react-codemirror';
import {Extension} from "@codemirror/state";
import {json} from "@codemirror/lang-json";
import {AutoFitTextAreaWithRef} from "../wigetds/autofit-textarea";
import {InValidateJson, OutValidateJson} from "../libs/proto/json-formatter_pb";
import {debounceTime} from "rxjs";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import useClipboard from "use-clipboard-hook";
import {JSONPath} from "jsonpath-plus";
import {JsonPathGuide} from "../wigetds/json-path-guide";
import {Pref} from "../context/pref";
import {Record} from "@icon-park/react";
import "./tool-content-layout.scss"

const ErrorDisplay = ({input, errors, onFirstErrorRange}: {
    input?: string,
    errors: Array<OutValidateJson.ValidationError>,
    onFirstErrorRange?: (start: number, end: number) => void
}) => {
    const [errorTags, setErrorTags] = useState<Array<JSX.Element>>([])
    useEffect(() => {
        if (errors.length === 0) {
            return
        }
        if (!input) {
            return
        }

        const prefixCount = 10;
        const ellipsePlaceHolderStart = '... ';
        const ellipsePlaceHolderEnd = ' ...';
        let tags = errors.map((vErr, idx) => {

            let errAtGreaterThan = vErr.getIndexstart() - prefixCount > 0
            let errHasLeftContent = vErr.getIndexend() + prefixCount < input.length

            let startAt = errAtGreaterThan ? vErr.getIndexstart() - prefixCount : 0
            let endAt = errHasLeftContent ? vErr.getIndexend() + prefixCount : vErr.getIndexend()

            const errorHintText = `${errAtGreaterThan ? ellipsePlaceHolderStart : ''} ${input.slice(startAt, endAt)}${errHasLeftContent ? ellipsePlaceHolderEnd : ''}`

            let cursorPositionStart = (errAtGreaterThan ? startAt - ellipsePlaceHolderStart.length : startAt)
            let cursorPositionEnd = vErr.getIndexstart()

            if (endAt === input.length) {
                cursorPositionStart = endAt - errorHintText.length
                cursorPositionEnd = endAt - 1
            }

            if (onFirstErrorRange) {
                onFirstErrorRange!(startAt, endAt)
            }

            return (
                <div key={idx}>
                    <Space vertical align={"start"} spacing={10}>
                        <Text type={'danger'}><code>{errorHintText}</code></Text>
                        <Text type={'danger'}>
                            <code style={{
                                visibility: "hidden",
                                padding: 0
                            }}>{input.slice(cursorPositionStart, cursorPositionEnd)}</code><IconArrowUp/>
                        </Text>
                        <code><Text type='danger' style={{fontSize: 18}}>
                            {vErr.getDescription()}</Text></code>
                    </Space>
                </div>
            );
        });
        setErrorTags(tags)
    }, [errors, input, onFirstErrorRange])
    return (
        <Space>
            {errorTags}
        </Space>
    )
}


export const JsonFormatterBlock = () => {
    const {Header, Content, Footer} = Layout;
    let inputPlaceholder = "Enter your text, Drag/drop files, Right click to load file";
    const jsonIndentState = useObservableState<number>(Pref.getInstance().jsonFormatterDefaultIndentSpace.$)
    const [jsonPathValue, setJsonPathValue] = useState<string>('')
    const [showJsonPathGuide, setShowJsonPathGuide] = useState<boolean>(false)
    const api = useContext(APIServiceContext)
    const jsonFormatterRef = useRef<Layout>(null)
    const leftRef = useRef<Layout>(null)
    const rightRef = useRef<Layout>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const outputRef = useRef<ReactCodeMirrorRef>(null)
    const jsonPathRef = useRef<HTMLInputElement>(null)
    const [isAPILoading, setIsAPILoading] = useObservableState<boolean>(obs => {
        return obs
    }, false)
    const {copy} = useClipboard({
        onSuccess: _ => {
            Toast.success("JSON copied",)
        }
    });

    const [inputValue, setInputValue] = useObservableState<string | undefined>((obs) => {
        obs.pipe(debounceTime(800)).subscribe((changedInput) => {
            // call api to validate input json
            const req = new InValidateJson();
            req.setInput(changedInput!)
            setIsAPILoading(true)
            inputRef?.current?.setSelectionRange(null, null)
            api.JsonFormatterAPI.validateJson(req, (err, res) => {
                if (res) {
                    let errors = res.getErrorsList().filter(e => {
                        return e.getCode() !== "E100"
                    });
                    setValidationErrors(errors)
                }
                setIsAPILoading(false)
            })
        })
        obs.subscribe(changed => {
            Pref.getInstance().jsonFormatterDefaultIndentSpace.subscribe({
                next: indent => {
                    console.debug(`setting output json for indent: ${indent}`)
                    setOutputJson(changed, indent)
                }
            })
        })
        return obs
    }, undefined)

    const [outputValue, setOutputValue] = useObservableState<string | undefined>((obs) => {
        return obs
    }, undefined)

    const [editorTheme, setEditorTheme] = useObservableState<string | undefined>((obs) => {
        return obs
    }, undefined)

    const [validationErrors, setValidationErrors] = useObservableState<Array<OutValidateJson.ValidationError>>((obs) => {
        return obs
    }, [])

    useMount(() => {
        Pref.getInstance().darkModeEnabled.subscribe({
            next: enabled => {
                setEditorTheme(enabled ? "dark" : "light")
            }
        })
    })

    const setOutputJson = (val?: string, indent?: number) => {
        let outObj = {}
        let content = ''
        try {
            if (val) {
                outObj = JSON.parse(val)
                content = JSON.stringify(outObj, null, indent)
            }
        } catch (e) {

        } finally {
            setOutputValue(content)
        }
    }

    const onInputChanged = (val: string) => {
        setInputValue(val)
        setJsonPathValue('')
    }

    const onCopy = () => {
        copy(outputValue)
    }

    function setRandomJson() {
        api.JsonFormatterAPI.getRandomJson(new Empty(), (err, res) => {
            const inputVal = res?.getInputsample() ?? "{}"
            setInputValue(inputVal)
        })
    }

    function onCompressClicked() {
        onIndentSelectionChanged(0)
    }

    function onClearClicked() {
        setInputValue("")
    }

    function onIndentSelectionChanged(value: string | number | any[] | Record<string, any> | undefined) {
        const indent = value as number
        console.debug(`setting output json as ${indent} spaces indent`)
        setOutputJson(outputValue, indent)
        Pref.getInstance().jsonFormatterDefaultIndentSpace.value = indent
    }

    // noinspection RequiredAttributes
    return (
        <Layout className='outer-container' ref={jsonFormatterRef}>

            <SideSheet
                size={'large'}
                visible={showJsonPathGuide} onCancel={() => {
                setShowJsonPathGuide(false)
            }}>
                <JsonPathGuide/>
            </SideSheet>

            <Content>
                <Space className='section-container mod-section-container-row'>
                    <Layout className='section json-formatter-section' ref={leftRef}>
                        <Header className="section-header">
                            <Space className='section-header-inner'>
                                <Space>
                                    <Button onClick={setRandomJson}>Sample</Button>
                                    <Button onClick={onClearClicked}>Clear</Button>
                                </Space>
                            </Space>
                        </Header>
                        <Content className='content section-content'>
                            <AutoFitTextAreaWithRef
                                value={inputValue}
                                onChange={onInputChanged}
                                forwardedRef={inputRef}
                                isOnError={validationErrors}
                                placeholder={inputPlaceholder}
                                isLoading={isAPILoading}
                            />
                        </Content>
                    </Layout>
                    <Layout className='section json-formatter-section' ref={rightRef}>
                        <Header className="section-header">
                            <Space className='section-header-inner'>
                                <Space>
                                    <Button disabled={!outputValue}
                                            onClick={onCompressClicked} icon={<IconLayers/>}>Compress</Button>
                                    <Select
                                        disabled={!outputValue}
                                        value={jsonIndentState}
                                        defaultValue={jsonIndentState}
                                        style={{width: 120}}
                                        onChange={onIndentSelectionChanged}>
                                        <Select.Option value={2}>2 spaces</Select.Option>
                                        <Select.Option value={4}>4 spaces</Select.Option>
                                        <Select.Option value={0}>minified</Select.Option>
                                    </Select>
                                </Space>
                                <Button disabled={!outputValue}
                                        onClick={onCopy} icon={<IconCopy/>}>Copy</Button>
                            </Space>
                        </Header>
                        <Content className='content section-content'>
                            {
                                validationErrors.length > 0 ?
                                    <Banner
                                        className='validation-error'
                                        fullMode={false} type="danger" bordered icon={null} closeIcon={null}
                                        description={<ErrorDisplay
                                            onFirstErrorRange={(start, end) => {
                                                inputRef?.current?.setSelectionRange(start, end)
                                            }
                                            }
                                            input={inputValue} errors={validationErrors}/>}
                                    />
                                    :
                                    <Space vertical className='editor-group'>
                                        <CodeMirror
                                            className={'json-editor'}
                                            value={outputValue}
                                            ref={outputRef}
                                            lang="json"
                                            extensions={[json()]}
                                            theme={editorTheme! as 'light' | 'dark' | Extension}
                                            editable={false}
                                        />
                                        <Space className='json-path-input-group'>
                                            <Input type='text'
                                                   disabled={!validationErrors || !outputValue}
                                                   placeholder={"JSON Path"}
                                                   ref={jsonPathRef}
                                                   value={jsonPathValue}
                                                   onChange={(val) => {
                                                       setJsonPathValue(val)
                                                       if (val) {
                                                           let res = JSONPath({
                                                               path: val,
                                                                   json: JSON.parse(inputValue!)
                                                               }
                                                           )
                                                           setOutputJson(JSON.stringify(res), jsonIndentState)
                                                       } else {
                                                           setInputValue(inputValue)
                                                       }
                                                   }}/>
                                            <Button icon={<IconHelpCircle/>} onClick={() => {
                                                setShowJsonPathGuide(true)
                                            }
                                            }/>
                                        </Space>
                                    </Space>
                            }
                        </Content>
                    </Layout>
                </Space>
            </Content>
        </Layout>
    );
};
