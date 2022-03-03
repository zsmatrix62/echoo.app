import {Banner, Button, Col, Input, Row, Select, SideSheet, Space, Toast} from "@douyinfe/semi-ui";
import "./json-formatter.scss"
import {IconArrowUp, IconCopy, IconHelpCircle, IconLayers} from "@douyinfe/semi-icons";
import * as React from "react";
import {useContext, useEffect, useRef, useState} from "react";
import {APIServiceContext} from "../context/api";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {useObservableState} from "observable-hooks";
import {useMount} from "react-use";
import {AutoFitTextAreaWithRef} from "../wigetds/autofit-textarea";
import {InValidateJson, OutValidateJson} from "../libs/proto/json-formatter_pb";
import {debounceTime} from "rxjs";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import useClipboard from "use-clipboard-hook";
import {JSONPath} from "jsonpath-plus";
import {JsonPathGuide} from "../wigetds/json-path-guide";
import {Pref} from "../context/pref";
import {Record} from "@icon-park/react";
import {json} from "@codemirror/lang-json";
import ReactCodeMirror, {Extension} from "@uiw/react-codemirror";
import {isTauriAppContext} from "../../App";

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
    let inputPlaceholder = "Enter your text, Drag/drop files, Right click to load file";
    const jsonIndentState = useObservableState<number>(Pref.getInstance().jsonFormatterDefaultIndentSpace.$)
    const [jsonPathValue, setJsonPathValue] = useState<string>('')
    const [showJsonPathGuide, setShowJsonPathGuide] = useState<boolean>(false)
    const api = useContext(APIServiceContext)
    const inputRef = useRef<HTMLTextAreaElement>(null)
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

        // setInputValue(`[{"category":"porro","sold":true,"author":"Mr. Clotilde Rohan","title":"eos magni sint corporis itaque eos.","price":7.0,"isbn":"504fa9b5-0499-43a6-97c3-61ab5293db58","email":"eddie_inventore@yahoo.com"},{"category":"voluptas","sold":false,"author":"Miss Jaleel Green","title":"suscipit labore ea ducimus harum.","price":7.0,"isbn":"504fa9b5-0499-43a6-97c3-61ab5293db58","email":"dariana_tenetur@gmail.com"},{"category":"est","sold":false,"author":"Miss Zane Hintz","title":"quia sit et velit pariatur et repudiandae.","price":7.0,"isbn":"504fa9b5-0499-43a6-97c3-61ab5293db58","email":"kiera_ea@yahoo.com"},{"category":"dolor","sold":false,"author":"Mr. Domenico Hayes","title":"modi voluptas enim aut sunt voluptatibus velit non.","price":7.0,"isbn":"504fa9b5-0499-43a6-97c3-61ab5293db58","email":"autumn_quis@yahoo.com"}]`)
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

    const isSidebarCollapsed = useObservableState(Pref.getInstance().toolsSiderCollapsed.$)

    // const cmRef = useRef<ReactCodeMirrorRef>(null);

    // useEffect(() => {
    //     if (ref?.current?.view) {
    //         console.log("reconfigure");
    //         ref.current.view.dispatch({
    //             filter: true
    //         });
    //     }
    // });

    // noinspection RequiredAttributes
    return (
        <isTauriAppContext.Consumer>
            {(isTauri) => (
                <Row className='json-formatter-container'>

                    <SideSheet
                        size={'large'}
                        visible={showJsonPathGuide} onCancel={() => {
                        setShowJsonPathGuide(false)
                    }}>
                        <JsonPathGuide/>
                    </SideSheet>

                    <Row className='json-formatter-container-child' gutter={10}>
                        <Col span={12} className={`input-block ${isTauri ? 'mod-input-block-is-tauri' : ''}`}>
                            <Row style={{padding: "10px 0"}}>
                                <Space> <Button onClick={setRandomJson}>Sample</Button> <Button
                                    onClick={onClearClicked}>Clear</Button> </Space>
                            </Row>
                            <Row style={{height: "100%"}}>
                                <AutoFitTextAreaWithRef
                                    value={inputValue}
                                    onChange={onInputChanged}
                                    forwardedRef={inputRef}
                                    isOnError={validationErrors}
                                    placeholder={inputPlaceholder}
                                    isLoading={isAPILoading}
                                />
                            </Row>
                        </Col>
                        <Col span={12} className={`input-block ${isTauri ? 'mod-input-block-is-tauri' : ''}`}>
                            <Row style={{padding: "10px 0", flexDirection: "row-reverse"}} type={"flex"}>
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
                                    <Button disabled={!outputValue}
                                            onClick={onCopy} icon={<IconCopy/>}>Copy</Button>
                                </Space>
                            </Row>
                            <Row className='cm-block'>
                                {
                                    validationErrors.length > 0 ?
                                        <Banner
                                            className='validation-error'
                                            fullMode={false} type="danger" bordered icon={null} closeIcon={null}
                                            description={<ErrorDisplay
                                                onFirstErrorRange={(start, end) => {
                                                    // inputRef?.current?.setSelectionRange(start, end)
                                                }
                                                }
                                                input={inputValue} errors={validationErrors}/>}
                                        />
                                        :
                                        <Row className={`cm-block-group 
                                        ${isTauri ? 'mod-cm-in-tauri' : 'mod-cm-in-browser'}
                                        ${isSidebarCollapsed ? 'mod-cm-sider-collapsed' : 'mod-cm-sider-expanded'}
                                        `} type={"flex"} gutter={10}>
                                            <Row>
                                                <ReactCodeMirror
                                                    // ref={cmRef}
                                                    value={outputValue}
                                                    lang="json"
                                                    extensions={[json()]}
                                                    theme={editorTheme! as 'light' | 'dark' | Extension}
                                                />
                                            </Row>
                                            <Row>
                                                <Space style={{width: "100%"}}>
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
                                                    <Button
                                                        icon={<IconHelpCircle/>}
                                                        onClick={() => {
                                                            setShowJsonPathGuide(true)
                                                        }
                                                        }/>
                                                </Space>
                                            </Row>
                                        </Row>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Row>
            )}

        </isTauriAppContext.Consumer>


    );
};