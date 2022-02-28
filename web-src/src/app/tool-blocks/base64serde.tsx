import * as React from 'react';
import {useRef, useState} from 'react';
import {Button, Layout, Radio, RadioGroup, Space, TabPane, Tabs, Toast} from "@douyinfe/semi-ui";
import "./base64serde.scss"
import "./tool-content-layout.scss"
import {IconArrowUp, IconCopy, IconDownload, IconFile, IconImage} from "@douyinfe/semi-icons";
import {AutoFitTextAreaWithRef} from "../wigetds/autofit-textarea";
import {useMount} from "react-use";
import {useSearchParams} from "react-router-dom";
import {useObservableState} from "observable-hooks";
import useClipboard from "use-clipboard-hook";
import {base64decode, base64encode, formatNumber} from "../libs/helpers";
import {randSentence} from "@ngneat/falso"
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import sampleData from "../../assets/base64-img-sample.json"

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
                    <TabPane tab={<span> <IconImage/> Image </span>} itemKey="2">
                        <Base64SerdeImageBlockBlock/>
                    </TabPane>
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
                    <Layout.Header className='section-header _section_header'>
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
                    <Layout.Header className='section-header _section_header'>
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
    const createImage = (data: string) => {
        let src = "data:image/jpeg;base64,";
        src += data
        let newImage = document.createElement("img");
        newImage.src = src
        return newImage
    }

    const [imgSize, setImageSize] = useState<[number, number]>([0, 0])
    const [imgTag, setImgTag] = useObservableState<HTMLImageElement | null>(obs => {
        // calculate input base64 size
        obs.subscribe(async tag => {
            const base64Response = await fetch(tag?.src ?? "");
            setImageBlobSize((await base64Response.blob()).size)
        })
        return obs
    }, null)

    const [imgBlobSize, setImageBlobSize] = useState<number>(0)

    const [inValue, setInValue] = useObservableState<string>(obs => {
        return obs
    }, "")
    const imgContainerRef = useRef<HTMLDivElement>(null)


    const onGenSampleClicked = () => {
        onInValueChanged(sampleData.data)
    }

    const onClearClicked = () => {
        onInValueChanged("")
    }

    useMount(() => {
        onGenSampleClicked()
        // css
        // setInValue("background-image: url(data:image/png;base64,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)")
        // image source
        // setInvalue("<img src='data:image/png;base64,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'/>")
    })


    const onInValueChanged = (data: string) => {
        setInValue(data);
        let originalImageResized = document.getElementById("created-img-resized") as HTMLImageElement;

        let imgContainer = imgContainerRef.current
        const removeExisting = () => {
            if (imgContainer && originalImageResized) {
                imgContainer.removeChild(originalImageResized)
                setImgTag(null)
            }
        }

        removeExisting()

        if (data === "") {
            return
        } else {
            originalImageResized = createImage(data);
            originalImageResized.id = "created-img-resized"
            originalImageResized.onload = function () {
                setImageSize([originalImageResized.naturalWidth, originalImageResized.naturalHeight])
            }
            if (imgContainer) {
                imgContainer.appendChild(originalImageResized)
                setImgTag(originalImageResized)
            }
        }
    }

    const formatBytes = (n: number) => {
        if (n >= 1024 && n <= 1024 * 1024) {
            return `${formatNumber(n / 1024, 2)} kB`
        }
        if (n >= 1024 * 1024) {
            return `${formatNumber(n / (1024 * 1024), 2)} MB`
        }

        return `${formatNumber(n)} bytes`;
    }

    return (
        <div className='section-container mod-section-container-row' style={{flexBasis: 50}}>
            <Layout className='section mod-fix-45vw' style={{paddingTop: 10, paddingRight: 5}}>
                <Layout.Header className="section-header">
                    <Space className="section-header-inner" style={{justifyContent: "start"}}>
                        <Button onClick={onGenSampleClicked}>Sample</Button>
                        <Button onClick={onClearClicked}>Clear</Button>
                    </Space>
                </Layout.Header>
                <Layout.Content className="mod-padding-vertical">
                    <AutoFitTextAreaWithRef value={inValue} onChange={(val) => {
                        onInValueChanged(val)
                    }}/>
                </Layout.Content>
                <Layout.Footer>
                    <span style={{display: "flex", justifyContent: "space-between"}}>
                        <RadioGroup> // todo
                            <Radio>Raw String</Radio>
                            <Radio>Data URL</Radio>
                            <Radio>CSS Attribute</Radio>
                        </RadioGroup>
                        <Text><code>{formatBytes(new Blob([inValue]).size)}</code></Text>
                    </span>
                </Layout.Footer>
            </Layout>
            <Layout className='section' style={{paddingTop: 10, paddingLeft: 5,}}>
                <Layout.Header className='section-header'>
                    <Space className="section-header-inner" style={{justifyContent: "start"}}>
                        <Button icon={<IconFile/>} children={"Load File ..."}/>
                        <Button children={"Clear"}/>
                        <Button icon={<IconDownload/>} children={"Save"}/>
                        <Button icon={<IconCopy/>} children={"Copy"}/>
                    </Space>
                </Layout.Header>
                <Layout.Content className="mod-padding-vertical">
                    <div className='img-container' ref={imgContainerRef}/>
                </Layout.Content>
                <Layout.Footer style={{display: "flex", flexDirection: "row-reverse"}}>
                    {
                        imgTag && <Text><code>{imgSize.join("x")} | {formatBytes(imgBlobSize)}</code></Text>
                    }
                </Layout.Footer>
            </Layout>
        </div>
    );
};
