import {Layout} from "@douyinfe/semi-ui";
import Sider from "@douyinfe/semi-ui/lib/es/layout/Sider";
import {useObservableState} from "observable-hooks";
import React, {ReactNode, useContext, useEffect, useRef} from "react";
import {SharedSubjectContext} from "../context/shared-subjects";
import {MainFooter} from "../shared/main-footer";
import {MainNav} from "../shared/main-nav";
import {ToolsSider} from "../shared/tools-sider";
import "./main-page.scss"
import {isTauriAppContext} from "../../App";


export const MainPage = () => {
    const {Header, Footer, Content} = Layout;
    const sharedSubs = useContext(SharedSubjectContext);
    const isTauri = useContext(isTauriAppContext)
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

    // useMount(() => {
    //     sharedSubs.windowSizeChange$.subscribe(([iw, ih]) => {
    //         let sectionContainerNodes = document.getElementsByClassName("section-container");
    //         for (let sectionContainerNodesKey in sectionContainerNodes) {
    //             const node = sectionContainerNodes[sectionContainerNodesKey];
    //             if (node instanceof HTMLElement) {
    //                 node.style.height = isTauri ? "100vh" : "calc(100vh - 120px);"
    //             }
    //         }
    //     })
    // })

    // listen resize window event and adjust content height
    const centerContainerRef = useRef<Layout>(null)

    return (
        <isTauriAppContext.Consumer>
            {
                (isTauriApp) => (
                    <Layout style={{height: "100vh"}}>
                        <Header style={{display: isTauriApp ? 'none' : 'block'}}>
                            <MainNav/>
                        </Header>
                        <Layout className='center-container-inner'>
                            <Sider children={<ToolsSider/>} className='sider-container'/>
                            <Content children={activeToolNode} className='content-container' ref={centerContainerRef}/>
                        </Layout>
                        <Footer style={{display: isTauriApp ? 'none' : 'block'}} className='footer-container'>
                            <MainFooter/>
                        </Footer>
                    </Layout>
                )
            }
        </isTauriAppContext.Consumer>
    );
};
