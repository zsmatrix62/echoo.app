// @flow
import * as React from 'react';
import {Space} from "@douyinfe/semi-ui";
import "./log.scss"
import {Image} from "@douyinfe/semi-ui/lib/es/skeleton/item";
import logoDark from "../../logo-dark.png"
import logoLight from "../../logo-light.png"
import {useObservableState} from "observable-hooks";
import {Pref} from "../context/pref";

export const LogoComponent = () => {
    const darkMode = useObservableState<boolean>(Pref.getInstance().darkModeEnabled.$)

    return (
        <a href="/">
            <Space spacing={1} align={"center"}>
                <Image style={{backgroundColor: "transparent"}}>
                    {
                        darkMode ?
                            <img src={logoDark} alt='Making tools for developers'/>
                            :
                            <img src={logoLight} alt='Making tools for developers'/>
                    }
                </Image>
            </Space>
        </a>
    );
};