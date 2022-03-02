// @flow
import * as React from 'react';
import {Space, Tooltip, Typography} from "@douyinfe/semi-ui";
import "./log.scss"
import logo from "../../icon.png";
import {useObservableState} from "observable-hooks";
import {Pref} from "../context/pref";

export const LogoComponent = () => {
    const darkMode = useObservableState<boolean>(Pref.getInstance().darkModeEnabled.$)

    return (
        <Tooltip content={"Utilities for developers"}>
            <a href="/" style={{textDecoration: 'none'}}>
                <Space spacing={10} align={"center"}>
                    <img src={logo} alt='Utilities for developers'/>
                    <Space spacing={5} align={"baseline"}>
                        <Space spacing={3} align={"baseline"}>
                            <Typography.Title heading={2} type={"primary"}>Echoo</Typography.Title>
                            <Typography.Title heading={6} type={"tertiary"}>.app</Typography.Title>
                        </Space>
                    </Space>
                </Space>
            </a>
        </Tooltip>
    );
};