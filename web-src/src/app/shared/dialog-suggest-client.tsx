import * as React from 'react';
import {ReactNode, useEffect} from 'react';
import {Button, List, Modal, Space} from "@douyinfe/semi-ui";
import {IconGithubLogo} from "@douyinfe/semi-icons";
import {CircleFiveLine, LinkCloudFaild} from "@icon-park/react";
import "./dialog-suggest-client.scss"
import {RELEASE_DOWNLOAD_PAGE} from "../consts/literals";
import {useObservableState} from "observable-hooks";

const defaultData = [
    {
        icon: <IconGithubLogo style={{fontSize: 48, color: "var(--semi-color-primary)"}}/>,
        title: 'Open Source & Free',
        content: 'Echoo client is a completely open sourced software'
    },
    {
        icon: <LinkCloudFaild style={{fontSize: 48, color: "var(--semi-color-primary)"}}/>,
        title: 'Offline Features',
        content: "You can use all functionalities the same like those hosted on this site, and it's completely offline"
    },
    {
        icon: <CircleFiveLine style={{fontSize: 48, color: "var(--semi-color-primary)"}}/>,
        title: 'Extended',
        content: 'Limitations in web application are unlocked in client.'
    },
];

type Props = {
    visible: boolean,
    onClosed: () => void,
    title?: string
    desNode?: ReactNode
    data?: { icon: JSX.Element, title: string, content: string }[]
};
export const DialogSuggestClient = (props: Props) => {
    useEffect(() => {
        setShow(props.visible)
    }, [props])

    const [show, setShow] = useObservableState<boolean>(obs => {
        obs.subscribe(s => {
            if (!s) {
                props.onClosed()
            }
        })
        return obs
    }, false)

    const handleOk = () => {
        window.open(RELEASE_DOWNLOAD_PAGE, "blank",)
        setShow(false)
    }

    const handleDownload = () => {
        setShow(false)
    }

    const btnStyle = {
        width: 240,
        margin: '4px 50px',
    };
    const footer = (
        <div style={{textAlign: 'center'}}>
            <Button type="primary" icon={<IconGithubLogo/>} theme="solid" onClick={handleOk} style={btnStyle}>
                Continue
            </Button>
            <Button type="primary" theme="borderless" onClick={handleDownload} style={btnStyle}>
                Cancel
            </Button>
        </div>
    );
    const titleNode = <h4 style={{
        textAlign: 'center',
        fontSize: 24,
        margin: 40
    }}>{props.title ?? '🎉 Offline client is available!'}</h4>
    // noinspection RequiredAttributes
    return (
        <Modal
            header={null}
            visible={show}
            onOk={handleOk}
            footer={footer}
            keepDOM={true}
            className='suggest-client'
        >
            <Space vertical align={"center"}>
                {props.title === undefined ? null : titleNode}
                {props.desNode}
                <List
                    dataSource={props.data ?? defaultData}
                    split={false}
                    renderItem={item => (
                        <List.Item
                            header={item.icon}
                            main={
                                <div>
                                    <h6 style={{margin: 0, fontSize: 16}}>{item.title}</h6>
                                    <p style={{marginTop: 4, color: 'var(--semi-color-text-1)'}}>{item.content}</p>
                                </div>
                            }
                        />)
                    }
                />
            </Space>
        </Modal>
    );
};