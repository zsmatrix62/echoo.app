import {Layout} from "@douyinfe/semi-ui";
import Sider from "@douyinfe/semi-ui/lib/es/layout/Sider";
import {useObservableState} from "observable-hooks";
import React, {ReactNode, useContext, useEffect, useRef} from "react";
import {SharedSubjectContext} from "../context/shared-subjects";
import {MainFooter} from "../shared/main-footer";
import {MainNav} from "../shared/main-nav";
import {ToolsSider} from "../shared/tools-sider";
import {isTauriAppContext} from "../../App";
import "./main-page.scss"


export const MainPage = () => {
    const {Header, Footer, Content} = Layout;
    const sharedSubs = useContext(SharedSubjectContext);
    const [activeToolNode, setActiveToolNode] =
        useObservableState<ReactNode>((obs) => {
            obs.subscribe((node) => {
                console.debug(`active tool node set: ${node}`);
            });
            return obs;
        }, null);

    // hooks
    useEffect(() => {
        sharedSubs.activeToolNode$.subscribe((node) => {
            console.debug(`activeToolNode$ received next: ${node}`);
            setActiveToolNode(node);
        });
    }, [setActiveToolNode, sharedSubs]);

    // listen resize window event and adjust content height
    const centerContainerRef = useRef<Layout>(null)

    return (
        <isTauriAppContext.Consumer>
            {
                (isTauriApp) => (

                    <Layout className="main-layout">
                        {!isTauriApp && <Header> <MainNav/> </Header>}
                        <Layout className="central-layout">
                            <Sider children={<ToolsSider/>}/>
                            <Content children={activeToolNode} ref={centerContainerRef}/>
                        </Layout>
                        {!isTauriApp &&
                            <Layout.Footer className='main-footer-container'> <MainFooter/> </Layout.Footer>}
                    </Layout>
                )
            }
        </isTauriAppContext.Consumer>
    );
};
