import {Layout} from "@douyinfe/semi-ui";
import Sider from "@douyinfe/semi-ui/lib/es/layout/Sider";
import {useObservableState} from "observable-hooks";
import React, {Component, ReactNode, useContext, useEffect, useRef} from "react";
import {SharedSubjectContext} from "../context/shared-subjects";
import {MainFooter} from "../shared/main-footer";
import {MainNav} from "../shared/main-nav";
import {ToolsSider} from "../shared/tools-sider";
import "./main-page.scss"
import {useMount} from "react-use";
import {findDOMNode} from "react-dom";
import {BasicProps} from "@douyinfe/semi-ui/lib/es/layout";
import {isTauriAppContext} from "../../App";


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
    const headerRef = useRef<Component<BasicProps, any, any>>(null)
    const footerRef = useRef<Component<BasicProps, any, any>>(null)
    useMount(() => {
        sharedSubs.windowSizeChange$.subscribe(([iw, ih]) => {
            console.debug(`window resize event received: ${JSON.stringify([iw, ih])}`)
            let node = findDOMNode(centerContainerRef.current);
            if (node instanceof HTMLElement) {
                const headerNode = findDOMNode(headerRef.current) as HTMLElement
                const footerNode = findDOMNode(footerRef.current) as HTMLElement
                const headerNodeHeight = headerNode.offsetHeight ?? 0
                const footerNodeHeight = footerNode.offsetHeight ?? 0
                const height = ih - (headerNodeHeight) - (footerNodeHeight)
                console.debug(`setting center container height: ${height}`)
                node.style.height = `${height}px`;
            }
        })
    })
    return (
        <isTauriAppContext.Consumer>
            {
                (isTauriApp) => (
                    <Layout style={{height: "100vh"}}>
                        {!isTauriApp &&
                            <Header ref={headerRef}>
                                <MainNav/>
                            </Header>
                        }
                        <Layout className='center-container-inner' ref={centerContainerRef}>
                            <Sider children={<ToolsSider onWidthChanged={(navWidth) => {
                                sharedSubs.windowSizeChange$.subscribe(([iw, _]) => {
                                    const width = iw - navWidth;
                                    console.debug(`tool content width changed: ${width}`)
                                    sharedSubs.toolContentWidthChanged$.next(width)
                                })
                            }}/>} className='sider-container'/>
                            <Content children={activeToolNode} className='content-container'/>
                        </Layout>
                        {!isTauriApp && <Footer className='footer-container' ref={footerRef}>
                            <MainFooter/>
                        </Footer>}
                    </Layout>
                )
            }
        </isTauriAppContext.Consumer>
    );
};
