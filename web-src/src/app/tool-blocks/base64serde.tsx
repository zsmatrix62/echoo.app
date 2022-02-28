import * as React from 'react';
import {useRef, useState} from 'react';
import {Button, Layout, Radio, RadioGroup, Space, TabPane, Tabs, Toast} from "@douyinfe/semi-ui";
import "./base64serde.scss"
import "./tool-content-layout.scss"
import {IconArrowUp, IconCopy, IconFile} from "@douyinfe/semi-icons";
import {AutoFitTextAreaWithRef} from "../wigetds/autofit-textarea";
import {useMount} from "react-use";
import {useSearchParams} from "react-router-dom";
import {useObservableState} from "observable-hooks";
import useClipboard from "use-clipboard-hook";
import {base64decode, base64encode} from "../libs/helpers";
import {randSentence} from "@ngneat/falso"

export const Base64Serde = () => {
    const [defaultTabIdx, setDefaultTabIdx] = useObservableState<string>(
        obs => {
            obs.subscribe(idx => {
                const search = window.location.search;
                const params = new URLSearchParams(search);
                params.set("tab", idx)
                setSearchParams(params)
            })
            return obs
        },
        "1")
    const [searchParams, setSearchParams] = useSearchParams();

    useMount(() => {
        let tabIndex = searchParams.get("tab")
        if (tabIndex) {
            setDefaultTabIdx(tabIndex);
        }
    })

    return (
        <Layout className="outer-container">
            <Layout.Header> </Layout.Header>
            <Layout.Content>
                <Tabs defaultActiveKey={defaultTabIdx}
                      activeKey={defaultTabIdx}
                      onChange={(key) => {
                          setDefaultTabIdx(key)
                      }}>
                    <TabPane tab={<span> <IconFile/> String </span>} itemKey="1">
                        <Base64SerdeStringBlockBlock/>
                    </TabPane>
                    {/*<TabPane tab={<span> <IconImage/> Image </span>} itemKey="2">*/}
                    {/*    <Base64SerdeImageBlockBlock/>*/}
                    {/*</TabPane>*/}
                </Tabs>
            </Layout.Content>
        </Layout>
    );
};

export const Base64SerdeStringBlockBlock = () => {
    const sectionRef1 = useRef<HTMLDivElement>(null)
    const [codingType, setCodingType] = useState<number>(0)
    const [inValue, setInValue] = useObservableState<String>(obs => {
            return obs
        }, ''
    )
    const [outValue, setOutValue] = useObservableState<String>(obs => {
        return obs
    }, '')
    const {copy} = useClipboard({
        onSuccess: _ => {
                Toast.success(`${codingType === 0 ? 'encoded' : 'decoded'} content copied`,)
            }
        });

        const setInputForm = (value: string) => {
            setInValue(value)
            setOutValue(codingType === 0 ? base64encode(value) : base64decode(value))
        }

        const onGenSampleClicked = () => {
            setInputForm(randSentence({length: 1})[0])
        }

        const onClearClicked = () => {
            setInputForm("")
        }

        const onCopy = () => {
            copy(outValue.valueOf())
        }

        const onUseAsInputClicked = () => {
            setOutValue("");
            setInValue(outValue)
        }

        return (
            <div className='section-container' ref={sectionRef1}>
                <Layout className='section'>
                    <Layout.Header className='section-header'>
                        <div className='section-header-inner'>
                            <Space>
                                <Button onClick={onGenSampleClicked}>Sample</Button>
                                <Button onClick={onClearClicked}>Clear</Button>
                            </Space>
                            <RadioGroup defaultValue={codingType} value={codingType} onChange={(v) => {
                                setCodingType(v.target.value as number)
                                if (inValue !== '') {
                                    try {
                                        setOutValue(codingType === 1 ? base64encode(inValue.valueOf()) : base64decode(inValue.valueOf()))
                                    } catch (e) {
                                        setOutValue("")
                                    } finally {
                                    }
                                }
                            }}>
                                <Radio value={0}>Encode</Radio>
                                <Radio value={1}>Decode</Radio>
                            </RadioGroup>
                        </div>
                    </Layout.Header>
                    <Layout.Content className='section-content'>
                        <AutoFitTextAreaWithRef value={inValue.valueOf()} onChange={(value) => {
                            setInputForm(value)
                        }}/>
                    </Layout.Content>
                </Layout>
                <Layout className='section'>
                    <Layout.Header className='section-header'>
                        <div className='section-header-inner'>
                            <Space>
                                <Button onClick={onCopy} disabled={outValue === ''} icon={<IconCopy/>}>Copy</Button>
                                <Button onClick={onUseAsInputClicked} disabled={outValue === ''} icon={<IconArrowUp/>}>Use
                                    as input</Button>
                            </Space>
                        </div>
                    </Layout.Header>
                    <Layout.Content className='section-content'>
                        <AutoFitTextAreaWithRef value={outValue.valueOf()}/> </Layout.Content>
                </Layout>
            </div>
        );
    }
;

export const Base64SerdeImageBlockBlock = () => {
    return (
        <Layout className='inner-block'>

        </Layout>
    );
};
