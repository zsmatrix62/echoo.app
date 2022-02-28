import * as React from 'react';
import {useRef, useState} from 'react';
import {Button, Layout, Radio, RadioGroup, Space, TabPane, Tabs, Toast, Tooltip} from "@douyinfe/semi-ui";
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
    const regImgTagSrcBase64 = `<img.*?src=('|")data:image\\/([a-zA-Z]*);base64,([^\\('|")]*) `

    const createImage = (data: string) => {
        let src = "data:image/jpeg;base64,";
        src += data
        let newImage = document.createElement("img");
        newImage.src = src
        newImage.onerror = function (s) {
            newImage.src = ""
        }
        return newImage
    }

    const [base64SourceType, setBase64SourceType] = useObservableState<number>((obs) => {
        obs.subscribe(t => {
            onInValueChanged("")
        })
        return obs
    }, 0)

    const [imgSize, setImageSize] = useState<[number, number]>([0, 0])
    const [imgTag, setImgTag] = useObservableState<HTMLImageElement | null>(obs => {
        // calculate input base64 size
        obs.subscribe(async tag => {
            let blobSize = 0
            if (tag) {
                let src = ""
                try {
                    src = tag?.src
                } catch (e) {
                }
                try {
                    const base64Response = await fetch(src ?? "");
                    blobSize = (await base64Response.blob()).size
                } catch (e) {
                    blobSize = 0
                } finally {
                }
            }
            setImageBlobSize(blobSize)
        })
        return obs
    }, null)

    const [imgBlobSize, setImageBlobSize] = useState<number>(0)

    const [inValue, setInValue] = useObservableState<string>(obs => {
        return obs
    }, "")
    const imgContainerRef = useRef<HTMLDivElement>(null)


    const onGenSampleClicked = () => {
        let data = sampleData.data
        if (base64SourceType === 1) {
            data = sampleData.data1
        }
        onInValueChanged(data);
    }

    const onClearClicked = () => {
        onInValueChanged("")
    }

    useMount(() => {
        onGenSampleClicked()
    })

    const extractBase64 = (inData: string) => {
        if (!inData) {
            return ""
        }
        if (base64SourceType == 0) {
            return inData
        }
        // source in image tag
        if (base64SourceType === 1) {
            let matches = inData.match(/data:image\/[^;]+;base64[^"]+/igm);
            if (matches && matches.length > 0) {
                let fistMatch = matches[0]
                let base64Data = fistMatch.split("base64,")[1]
                base64Data = base64Data.slice(0, base64Data.length - 1);
                return base64Data
            }
        }
        return '';
    }

    const onInValueChanged = (data: string) => {
        setInValue(data);

        // data might be raw base64 string, image html tag, or css url pattern
        let base64String = extractBase64(data)

        let originalImageResized = document.getElementById("created-img-resized") as HTMLImageElement;

        let imgContainer = imgContainerRef.current
        const removeExisting = () => {
            if (imgContainer && originalImageResized) {
                imgContainer.removeChild(originalImageResized)
                setImgTag(null)
            }
        }

        removeExisting()

        if (base64String === "") {
            setImageSize([0, 0])
            return
        } else {
            try {
                originalImageResized = createImage(base64String);
            } catch (e) {
                setImageSize([0, 0])
                return
            } finally {

            }
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
                    <Space className="section-header-inner" style={{justifyContent: "space-between"}}>
                        <Space>
                            <Button onClick={onGenSampleClicked}>Sample</Button>
                            <Button onClick={onClearClicked}>Clear</Button>
                        </Space>
                        <RadioGroup
                            style={{paddingRight: 10}}
                            defaultValue={base64SourceType} value={base64SourceType}
                            onChange={(evt) => {
                                setBase64SourceType(evt.target.value as number)
                            }}>

                            <Tooltip content={"Raw base64 string"}>
                                <Radio value={0}>
                                    Raw String
                                </Radio>
                            </Tooltip>
                            <Tooltip content={"HTML/CSS containing base64 string"}>
                                <Radio value={1}>HTML / CSS</Radio>
                            </Tooltip>
                        </RadioGroup>
                    </Space>
                </Layout.Header>
                <Layout.Content className="mod-padding-vertical">
                    <AutoFitTextAreaWithRef value={inValue} onChange={(val) => {
                        onInValueChanged(val)
                    }}/>
                </Layout.Content>
                <Layout.Footer>
                    <span style={{display: "flex", flexDirection: "row-reverse"}}>
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
                    <Text><code>{imgSize.join("x")} | {formatBytes(imgBlobSize)}</code></Text>
                </Layout.Footer>
            </Layout>
        </div>
    );
};
