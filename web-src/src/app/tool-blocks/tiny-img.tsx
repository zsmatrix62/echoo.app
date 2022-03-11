import {
    Banner,
    Button,
    Col,
    Modal,
    Row,
    Space,
    Table,
    TextArea,
    Toast,
    Tooltip,
    Typography,
    Upload
} from '@douyinfe/semi-ui';
import * as React from 'react';
import {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {isTauriAppContext} from "../../App";
import "./tiny-img.scss";
import {ColumnProps} from "@douyinfe/semi-ui/lib/es/table";
import {APIServiceContext} from "../context/api";
import {Subject} from "rxjs";
import {useMount} from "react-use";
import {InCompressImage} from "../libs/proto/tiny-img_pb";
import {Clear, Close, Correct} from "@icon-park/react";
import {IconCode, IconCopy, IconDownload} from "@douyinfe/semi-icons";
import useClipboard from "use-clipboard-hook";
import {DialogSuggestClient} from "../shared/dialog-suggest-client";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import {useObservableState} from "observable-hooks";

type resRowRecord = {
    key: string,
    fileName: string,
    origSize: number,
    status: -1 | 0 | 1 | 2 | 3, // new, processing, success, failed, downloaded
    compressedSize: number
    download?: Blob,
    downloadBase64?: string
}

export const TinyImg = () => {
    const isTauri = useContext(isTauriAppContext);
    const maxFileBytesLimitClient = 1024 * 1024 * 50
    const maxFileBytesLimitWeb = 1024 * 1024 * 2
    const maxFileBytesLimit = !isTauri ? maxFileBytesLimitWeb : maxFileBytesLimitClient
    const maxFileCountLimitClient = 100
    const maxFileCountLimitWeb = 2
    const maxFileCountLimit = !isTauri ? maxFileCountLimitWeb : maxFileCountLimitClient

    const api = useContext(APIServiceContext)

    const getButtonDownloadType = (s: number) => {
        switch (s) {
            case -1:
                return "primary"
            case 1:
                return "primary"
            case 2:
                return "danger"
            case 3:
                return "tertiary"
            default:
                return "warning"
        }
    }

    const getButtonText = (s: number) => {
        switch (s) {
            case 0:
                return ""
            case 1:
                return "Download"
            case 2:
                return "Failed"
            case 3:
                return "Downloaded"
            default:
                return "Ready"
        }
    }

    const {copy} = useClipboard({
        onSuccess: (_) => {
            Toast.success({
                content: "copied base64 encoded image source",
            },)
        }
    });

    let resColumns: Array<ColumnProps<resRowRecord>> = [
        {
            dataIndex: "fileName",
            render: (_text, record, _idx) => {
                return <Typography.Text ellipsis={{collapsible: true, rows: 1, collapseText: "..."}}>
                    <b>{record.fileName}</b>
                </Typography.Text>
            }
        },
        {
            dataIndex: "origSize", render: (_text, item, _idx) => {
                return formatSize(item.origSize)
            }
        },

        {
            dataIndex: "compressedSize", render: (_text, item, _idx) => {
                if (item.compressedSize === 0) {
                    return "-"
                }
                return formatSize(item.compressedSize);
            }
        },
        {
            dataIndex: "compressedRatio", render: (_text, item, _idx) => {
                if (item.compressedSize === 0) {
                    return "-"
                }
                return `${((item.origSize - item.compressedSize) / item.origSize * 100).toFixed(2)}%`;
            }
        },
        {
            dataIndex: "download", render: (_text, item, _idx) => {
                return <Space>
                    <Button
                        type={getButtonDownloadType(item.status)}
                        icon={item.status === 1 ? <IconDownload/> : <></>}
                        loading={item.status === 0}
                        onClick={
                            async () => {

                                if (isTauri) {
                                    // @ts-ignore
                                    let tauri = window.__TAURI__;
                                    tauri.invoke("write_binary_file", {
                                        "data": item.downloadBase64,
                                        "fileName": `${item.fileName}`
                                    })
                                        .catch((err: string) => {
                                            Toast.error(err)
                                        })
                                } else {
                                    const blobUrl = URL.createObjectURL(item.download!);
                                    const link = document.createElement("a");
                                    link.href = blobUrl;
                                    link.id = `download_compressed_${item.key}`
                                    link.download = item.fileName;
                                    document.body.appendChild(link);
                                    // @ts-ignore
                                    document.querySelector(`#download_compressed_${item.key}`)?.click()
                                }
                            }
                        }>
                        {
                            item.status !== 0 ?
                                getButtonText(item.status) :
                                null
                        }
                    </Button>

                    {
                        item.status === 1 &&
                        <Tooltip content="copy base64 image">
                            <Button icon={<IconCode/>} onClick={() => {
                                let content = `<img src="data:image/png;base64,${item.downloadBase64}" alt"">`
                                setBase64Encoded(content)
                            }
                            }/>
                        </Tooltip>
                    }
                </Space>
            }
        },
    ]
    const [tableRows, setTableRows] = useState<Array<resRowRecord>>([])
    const formatSize = (s: number) => {
        if (s > 1024 * 1024) {
            return `${(s / 1024 / 1024).toFixed(2)}MB`
        }
        if (s <= 1024 * 1024) {
            return `${(s / 1024).toFixed(2)}KB`
        }
    }

    // type fileCallback = { key: string, buffer: Array<ArrayBuffer> }
    const fileCallback$ = useMemo(() => {
        return new Subject<resRowRecord>()
    }, [])
    useEffect(() => {
        fileCallback$.subscribe(fcb => {
            // console.log(`received api row: ${JSON.stringify(fcb)}`)
            setTableRows((preRows) => {
                return [...preRows.map((row,) => {
                    if (row.key === fcb.key) {
                        return fcb
                    }
                    return row;
                })]
            });
        })
    }, [fileCallback$])


    const callCompressAPI = (row: resRowRecord, fileExt: string, buffer: ArrayBuffer) => {

        let rqst = new InCompressImage()
        rqst.setData(new Uint8Array(buffer))
        rqst.setExt(fileExt)
        rqst.setQuality(50)

        let apiCallRqst = api.TinyImageClient.compressImage(rqst, (error, responseMessage) => {
            const returnErr = () => {
                row.status = 2
                fileCallback$.next(row)
                return
            }
            if (error) {
                return returnErr()
            }
            if (!responseMessage) {
                return returnErr()
            }
            row.download = new Blob([responseMessage?.getData_asU8() ?? new Uint8Array()]);
            row.downloadBase64 = responseMessage?.getData_asB64() ?? ""
            row.status = 1
            row.compressedSize = row.download.size
            fileCallback$.next(row)
        })
        window.addEventListener('beforeunload', function (event) {
            apiCallRqst.cancel()
        });

    }

    const newFileResRecord = async (uid: string, fileName: string, fileSize: number, fileExt: string, buffer: ArrayBuffer) => {
        let row: resRowRecord = {
            key: uid,
            fileName: fileName,
            origSize: fileSize,
            compressedSize: 0,
            status: -1,
            download: undefined
        };

        row.status = 0

        return row
    }

    // status should be one of: 'success' | 'uploadFail' | 'validateFail' | 'validating' | 'uploading' | 'wait'
    const customUpload = (files: Array<File>) => {
        files.forEach(file => {
            const fileExt = file.type.split("/")[1]
            file.arrayBuffer().then(buffer => {
                newFileResRecord(file.name, file.name,
                    file.size,
                    fileExt,
                    buffer
                ).then(row => {
                    return [row, fileExt, buffer]
                }).then(async ([row, ext, buf]) => {
                    callCompressAPI(row as resRowRecord, ext as string, buf as ArrayBuffer)
                    fileCallback$.next(row as resRowRecord)
                })
            })
        })
    }


    const onFileChanged = (files: Array<File>) => {
        const stop = () => {
            if (isTauri) {
                setShowHint(true)
            } else {
                setShowSuggest(true)
            }
            return
        }

        // validate file count
        if (files.length > maxFileCountLimit) {
            return stop()
        }

        // validate file size
        for (let file of files) {
            if (file.size > maxFileBytesLimit) {
                return stop()
            }
        }

        setTableRows(files.map(file => {
            return {
                fileName: file.name,
                status: 0,
                key: file.name,
                origSize: file.size,
                compressedSize: 0
            }
        }))

        customUpload(files)
    }

    const [base64Encoded, setBase64Encoded] = useState<string>("")
    const fileReaderRef = useRef<Upload>(null)
    const [showSuggest, setShowSuggest] = useObservableState<boolean>(obs => obs, false)
    const [showHint, setShowHint] = useState<boolean>(false)

    // handle upload frame clicking in tauri
    useMount(() => {
        if (isTauri) {
            let uploadNodes = document.getElementsByClassName("semi-upload")
            if (uploadNodes.length) {
                let node = (uploadNodes.item(0) as HTMLDivElement);
                node.onclick = (ev: MouseEvent) => {
                    ev.stopPropagation()
                    ev.preventDefault()

                    // @ts-ignore
                    const tauri = window.__TAURI__;
                    tauri.dialog.open({
                        filters: [{
                            name: "image",
                            extensions: ['png', 'webp', "jpg", "jpeg"]
                        }],
                        multiple: true
                    }).then((filePaths: string[] | null) => {
                        if (!filePaths) {
                            return
                        }
                        filePaths.forEach(filePath => {
                            tauri.invoke("read_binary_file", {"path": filePath}).then((invokeRes: [string, ArrayBuffer]) => {
                                let digest = invokeRes[0]
                                let data = invokeRes[1]

                                let fileParts = filePath.split("/")
                                if (!fileParts) {
                                    fileParts = filePath.split("\\")
                                }

                                if (!fileParts) {
                                    return
                                }

                                const fileName = fileParts[fileParts.length - 1]
                                const fileExt = fileName.split(".").pop()

                                // simulate browser file upload
                                newFileResRecord(
                                    digest,
                                    fileName,
                                    new Blob([data]).size,
                                    fileExt ?? "",
                                    data
                                ).then(row => {
                                    setTableRows((preRows) => {
                                        return [row, ...preRows,]
                                    });
                                    return [row, fileExt, data]
                                }).then(async ([row, ext, buf]) => {
                                    callCompressAPI(row as resRowRecord, ext as string, buf as ArrayBuffer)
                                    fileCallback$.next(row as resRowRecord)
                                })
                            })
                        });
                    })
                }
            }
        }
    },)

    const hintNode = <Typography.Text type={"primary"}>Up to {maxFileCountLimit} images,
        max {formatSize(maxFileBytesLimit)} each.</Typography.Text>

    const getUploadNodeClass = () => {
        let cls = isTauri ? `drag-container mod-is-tauri` : `drag-container`;
        if (tableRows.length == 0) {
            cls += ` mod-only-upload`
        }

        return cls;
    }

    // noinspection RequiredAttributes
    const mainContent = <>
        <Row style={{width: "100%"}}>
            <Space vertical align={"end"}
                   className={getUploadNodeClass()}>
                <Upload
                    ref={fileReaderRef}
                    className="upload"
                    draggable={true}
                    multiple={true}
                    uploadTrigger={"custom"}
                    accept={'.jpg,.jpeg,.png,.webp'}
                    dragMainText={<Typography.Text type={'primary'}>Drop your WebP, PNG or JPEG files
                        here!</Typography.Text>}
                    dragSubText={hintNode}
                    onFileChange={onFileChanged}
                    action=""
                ></Upload>

                <Row type={"flex"} justify={"space-between"} style={{width: "100%"}}>

                    <Space>
                        <Button icon={<Clear/>} disabled={tableRows.length === 0} onClick={() => {
                            setTableRows([])
                        }}>Clear</Button>
                        <Modal
                            visible={showHint}
                            closeOnEsc={true}
                            maskClosable={true}
                            hasCancel={false}
                            keepDOM={true}
                            onCancel={() => {
                                setShowHint(false)
                            }
                            }
                            onOk={() => {
                                setShowHint(false)
                            }}>
                            <b>Limited</b>: {hintNode}
                        </Modal>
                    </Space>

                    {/*<Space style={{visibility: tableRows.length ? "visible" : "hidden"}}>*/}
                    {/*    <Typography.Text type={"warning"} className='count-indicator'>{*/}
                    {/*        tableRows.filter(item => item.status === 0).length*/}
                    {/*    }</Typography.Text>*/}
                    {/*    <Typography.Text type={"success"} className='count-indicator'>*/}
                    {/*        {*/}
                    {/*            tableRows.filter(item => item.status === 1).length*/}
                    {/*        }*/}
                    {/*    </Typography.Text>*/}
                    {/*    <Typography.Text type={"danger"} className='count-indicator'>*/}
                    {/*        {*/}
                    {/*            tableRows.filter(item => item.status === 2).length*/}
                    {/*        }*/}
                    {/*    </Typography.Text>*/}
                    {/*</Space>*/}
                </Row>
            </Space>
        </Row>
        {
            tableRows.length > 0 ? <Row className={isTauri ? `result-container mod-is-tauri` : `result-container`}>
                <Table columns={resColumns} showHeader={false} pagination={false}
                       dataSource={tableRows}/>
            </Row> : null
        }
    </>

    const suggestClientNode = <Banner closeIcon={null} fullMode={false} type={"warning"} icon={null}
                                      style={{marginTop: 10, marginBottom: 10}}>
        <Space vertical>
            <div>
                <Space spacing={30}>
                    <Close
                        style={{
                            fontSize: 24,
                            color: "var(--semi-color-danger)"
                        }}></Close>
                    <p>
                        Web version supports up to:
                        <b style={{color: "red"}}> {maxFileCountLimitWeb}</b> images
                        and
                        max <b
                        style={{color: "red"}}>{formatSize(maxFileBytesLimitWeb)}</b> each.
                    </p>
                </Space>
            </div>
            <div>
                <Space spacing={30}>
                    <Correct
                        style={{fontSize: 24, color: "var(--semi-color-success)"}}/>
                    <p>
                        <Text type={'success'} style={{
                            width: 300,
                        }}>

                            Offline client supports up to <b
                            style={{color: "green"}}>
                            <u>{maxFileCountLimitClient}</u></b> images and
                            max <b><u>{formatSize(maxFileBytesLimitClient)}</u></b> each.
                        </Text>
                    </p>
                </Space>
            </div>
        </Space>
    </Banner>

    // noinspection RequiredAttributes
    return (
        <>
            <DialogSuggestClient visible={showSuggest}
                                 onClosed={() => {
                                     setShowSuggest(false)
                                 }}
                                 desNode={suggestClientNode}/>

            <Modal visible={!!base64Encoded} closeOnEsc={true}
                   maskClosable={true}
                   header={null}
                   keepDOM={true}
                   hasCancel={false}
                   onCancel={() => {
                       setBase64Encoded("")
                   }}
                   bodyStyle={{marginTop: 20}}
                   footer={
                       <Button
                           style={{width: 150}}
                           type={"primary"}
                           icon={<IconCopy/>} onClick={() => {
                           copy(base64Encoded)
                       }}>
                           <Space>
                               <span>Copy</span>
                               <Typography.Text type={"tertiary"} style={{marginRight: 5}}>
                                   {formatSize(new Blob([base64Encoded]).size)}
                               </Typography.Text>
                           </Space>
                       </Button>
                   }
            >
                <TextArea rows={20} contentEditable={false} defaultValue={base64Encoded}/>
            </Modal>

            <Row className={isTauri ? `tiny-img-container mod-is-tauri` : `tiny-img-container`}>
                {
                    isTauri ?
                        <Col span={22} push={1} style={{height: "inherit"}}> {mainContent} </Col> :
                        <Col span={16} offset={4} style={{height: "inherit", maxWidth: "60vw"}}>
                            {mainContent}
                        </Col>
                }
            </Row>
        </>
    );
};