import * as React from 'react';
import {useContext, useRef, useState} from 'react';
import {Button, Radio, RadioGroup, Row, Space, TabPane, Tabs, Toast, Tooltip} from "@douyinfe/semi-ui";
import "./base64serde.scss"
import "../shared/styles/h-layout.scss"
import {IconArrowUp, IconCopy, IconDownload, IconFile, IconImage} from "@douyinfe/semi-icons";
import {AutoFitTextAreaWithRef} from "../wigetds/autofit-textarea";
import {useMount} from "react-use";
import {useSearchParams} from "react-router-dom";
import {useObservableState} from "observable-hooks";
import useClipboard from "use-clipboard-hook";
import {arrayBufferToBase64, base64decode, base64encode, formatNumber, saveBase64AsFile} from "../libs/helpers";
import {randSentence} from "@ngneat/falso"
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import sampleData from "../../assets/base64-img-sample.json"
import {isTauriAppContext} from '../../App';

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

        <isTauriAppContext.Consumer>
            {
                (isTauri) => (
                    <Tabs defaultActiveKey={defaultTabIdx}
                          activeKey={defaultTabIdx}
                          onChange={(key) => {
                              setDefaultTabIdx(key)
                          }}
                          className={`h-layout-container ${isTauri ? 'mod-is-tauri' : ''}`}
                    >
                        <TabPane tab={<span> <IconFile/> String </span>} itemKey="1">
                            <Base64SerdeStringBlockBlock/>
                        </TabPane>
                        <TabPane tab={<span> <IconImage/> Image </span>} itemKey="2">
                            <Base64SerdeImageBlockBlock/>
                        </TabPane>
                    </Tabs>
                )
            }
        </isTauriAppContext.Consumer>
    );
};

export const Base64SerdeStringBlockBlock = () => {
    const [codingType, setCodingType] = useState<number>(0)
    const [inValue, setInValue] = useObservableState<String>(obs => {
            return obs
        }, ''
    )
    const [outValue, setOutValue] = useObservableState<String>(obs => {
        return obs
    }, '')
    const {copy} = useClipboard({
        onSuccess: (_) => {
            Toast.success({
                content: `${codingType === 0 ? 'encoded' : 'decoded'} content copied`,
            },)
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
        <Row className='h-layout-child-container' type={"flex"}>
            <Row className={'h-layout-child'}>
                <Row type='flex' className='header' style={{justifyContent: "space-between", alignItems: "center"}}>
                    <Space>
                        <Button onClick={onGenSampleClicked}>Sample</Button>
                        <Button onClick={onClearClicked} disabled={!inValue}>Clear</Button>
                    </Space>
                    <RadioGroup
                        style={{paddingRight: 5}}
                        defaultValue={codingType} value={codingType} onChange={(v) => {
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
                </Row>
                <Row className={'mod-section-content mod-no-footer'}>
                    <AutoFitTextAreaWithRef value={inValue.valueOf()} onChange={(value) => {
                        setInputForm(value)
                    }}/>
                </Row>
            </Row>
            <Row className={'h-layout-child'}>
                <Row className='header'>
                    <Space>
                        <Button onClick={onCopy} disabled={outValue === ''} icon={<IconCopy/>}>Copy</Button>
                        <Button onClick={onUseAsInputClicked} disabled={outValue === ''} icon={<IconArrowUp/>}>Use
                            as input</Button>
                    </Space>
                </Row>
                <Row className={'mod-section-content mod-no-footer'}>
                    <AutoFitTextAreaWithRef value={outValue.valueOf()}/>
                </Row>
            </Row>
        </Row>
        );
    }
;

// noinspection JSUnusedGlobalSymbols
export const Base64SerdeImageBlockBlock = () => {
    const isTauri = useContext(isTauriAppContext)
    const createImage = (data: string, fileType = "image/jpeg") => {
        let src = `data:${fileType};base64,`;
        src += data
        let newImage = document.createElement("img");
        newImage.src = src
        newImage.onerror = function (_) {
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
    const [_, setImgSrc] = useObservableState<string>(obs => {
        return obs
    }, '')
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
                    const imgSrc = src ?? ""
                    setImgSrc(imgSrc)
                    const base64Response = await fetch(imgSrc);
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

    const extractBase64 = (inData: string) => {
        if (!inData) {
            return ""
        }

        // source in image tag
        let matches = inData.match(/data:image\/[^;]+;base64[^"]+/igm);
        if (matches && matches.length > 0) {
            let fistMatch = matches[0]
            let base64Data = fistMatch.split("base64,")[1]
            base64Data = base64Data.slice(0, base64Data.length);
            return base64Data
        }
        return inData;
    }

    const onInValueChanged = (data: string, fileType: string = "image/jpeg") => {
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
                originalImageResized = createImage(base64String, fileType);
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

    //<editor-fold desc="Read image from fs">
    const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false)
    const fileReaderRef = useRef<HTMLInputElement>(null)
    const fillBase64FormFromFile = (data: Uint8Array, fileType: string = "image/jpeg") => {
        const base64String = arrayBufferToBase64(data)

        let img = createImage(base64String, fileType)
        img.hidden = true
        img.id = "temp_img"
        if (base64SourceType === 0) {
            onInValueChanged(base64String, fileType)
        }
        if (base64SourceType === 1) {
            onInValueChanged(`<img src="${img.src}" alt="">`, fileType)
        }

        setIsLoadingFile(false)
        img.parentElement?.removeChild(img)
    }
    const handelInputChange = () => {
        if (fileReaderRef?.current?.files) {
            const selectedFile = fileReaderRef!.current!.files![0];
            setIsLoadingFile(true)
            selectedFile.arrayBuffer().then((data) => {
                fillBase64FormFromFile(new Uint8Array(data), selectedFile.type)
            }).finally(
                () => {
                    setIsLoadingFile(false)
                }
            )
        }
    }

    async function onLoadFileClicked() {
        if (fileReaderRef.current) {
            setIsLoadingFile(true)
            if (isTauri) {
                // @ts-ignore
                const tauri = window.__TAURI__;
                let filePath = await tauri.dialog.open();
                if (filePath) {
                    let data: Uint8Array = await tauri.invoke("read_binary_file", {"path": filePath});
                    fillBase64FormFromFile(data)
                }
            } else {
                fileReaderRef.current.click()
            }
            setIsLoadingFile(false)
        }
    }

    //</editor-fold>

    return (
        <Row className='h-layout-child-container'>
            <Row className='h-layout-child'>
                <Space className='header'>
                    <Space>
                        <Button onClick={onGenSampleClicked}>Sample</Button>
                        <Button onClick={onClearClicked} disabled={!inValue}>Clear</Button>
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
                <Row className='mod-section-content'>
                    <AutoFitTextAreaWithRef value={inValue} onChange={(val) => {
                        onInValueChanged(val)
                    }}/>
                </Row>
                <Row className='footer'>
                    <span style={{display: "flex", flexDirection: "row-reverse"}}>
                        <Text><code>{formatBytes(new Blob([inValue]).size)}</code></Text>
                    </span>
                </Row>
            </Row>
            <Row className='h-layout-child'>
                <Row className='header'>
                    <Space>
                        <input type={"file"} style={{display: "none"}} ref={fileReaderRef}
                               onChange={handelInputChange}/>
                        <Button loading={isLoadingFile} icon={<IconFile/>} children={"Load File ..."}
                                onClick={onLoadFileClicked}/>
                        <Button onClick={onClearClicked} disabled={!imgTag}>Clear</Button>
                        <Button icon={<IconDownload/>} children={"Save"} disabled={!imgTag} onClick={async () => {
                            const base64Raw = base64SourceType === 0 ? inValue : extractBase64(inValue);
                            if (imgTag) {
                                let fileExt = ""
                                fileExt = imgTag.src.split("image/")[1].split(";")[0] ?? ""
                                if (imgTag.src) {
                                    if (isTauri) {
                                        // @ts-ignore
                                        let tauri = window.__TAURI__;
                                        tauri.invoke("write_binary_file", {
                                            "data": base64Raw,
                                            "fileName": `img.${fileExt}`
                                        })
                                            .catch((err: string) => {
                                                Toast.error(err)
                                            })
                                    } else {

                                        saveBase64AsFile(base64Raw, `img.${fileExt}`);
                                    }
                                }
                            }
                        }}/>
                        {/*<Button icon={<IconCopy/>} children={"Copy"} onClick={() => {*/}
                        {/*    if (imgTag) {*/}
                        {/*        getBlobFromImageElement(imgTag).then(blob => {*/}
                        {/*            return copyBlobToClipboard(blob)*/}
                        {/*        }).then(() => {*/}
                        {/*            Notification.success({*/}
                        {/*                content: "Image copied successfully",*/}
                        {/*                position: "bottom",*/}
                        {/*                showClose: false*/}
                        {/*            })*/}
                        {/*        }).catch(e => {*/}
                        {/*            Notification.error({*/}
                        {/*                content: `Image copy failed: ${e}`,*/}
                        {/*                position: "bottom",*/}
                        {/*                showClose: false*/}
                        {/*            })*/}
                        {/*        })*/}
                        {/*    }*/}
                        {/*}}/>*/}
                    </Space>
                </Row>
                <Row className='mod-section-content'>
                    <div className='img-container' ref={imgContainerRef}/>
                </Row>

                <Row className='footer' style={{display: "flex", flexDirection: "row-reverse"}}>
                    <Text><code>{imgSize.join("x")} | {formatBytes(imgBlobSize)}</code></Text>
                </Row>
            </Row>
        </Row>
    );
};
