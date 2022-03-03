import {Button, Input, Nav, Space} from "@douyinfe/semi-ui";
import {OnSelectedData} from "@douyinfe/semi-ui/lib/es/navigation";
import React, {useContext, useRef} from "react";
import ToolSiderConfigs from "../consts/tool-sider-configs";
import toolSiderConfigs from "../consts/tool-sider-configs";
import {SharedSubjectContext} from "../context/shared-subjects";
import {useMount} from "react-use";
import {useSearchParams} from 'react-router-dom';
import "./tools-sider.scss"
import {useObservableState} from "observable-hooks/dist/esm2015";
import {GlobalHotKeys} from "react-hotkeys";
import {IconMoon, IconSidebar, IconSun} from "@douyinfe/semi-icons";
import {findDOMNode} from "react-dom";
import {Pref} from "../context/pref";

export const ToolsSider = () => {
    const sharedSubsCtx = useContext(SharedSubjectContext);
    const navRef = useRef<Nav>(null)
    const [selectedItems, setSelectedItems] = useObservableState<Array<string>>(obs => {
        return obs
    }, ["json-formatter"])
    const [tools, setTools] = useObservableState((obs) => {
        return obs
    }, Object.values(ToolSiderConfigs).map((i) => {
        return i.navItemProps;
    }))

    const [, setToolSearchKeyword] = useObservableState<string>(obs => {
        obs.subscribe(keyword => {
            let filteredTools = Object.values(ToolSiderConfigs).filter(i => {
                return (i.navItemProps.text as string).toUpperCase().trim().includes(keyword.toUpperCase().trim())
            }).map((i) => {
                return i.navItemProps;
            })
            setTools(filteredTools)
            let filteredItemKeys = filteredTools.map(i => {
                return i.itemKey as string
            });
            if (filteredItemKeys.length >= 1) {
                console.debug(`filtered tool item keys: ${filteredItemKeys}`);
                let firstKey = filteredItemKeys[0]
                console.debug(`filtered first key: ${firstKey}`)
                setSelectedItems([firstKey])
                // send first node to content
                sharedSubsCtx.activeToolNode$.next(ToolSiderConfigs[firstKey].node);
            }
        })
        return obs
    }, "")

    const darkModEnabled = useObservableState<boolean>(Pref.getInstance().darkModeEnabled.$)

    const [searchParams, setSearchParams] = useSearchParams();
    const [sidebarCollapsed, setSideBarCollapsed] = useObservableState<boolean>(obs => {
        obs.subscribe(collapsed => {
            Pref.getInstance().toolsSiderCollapsed.value = collapsed as boolean
            hideSearchBar(collapsed)
        })
        return obs
    }, Pref.getInstance().toolsSiderCollapsed.value);

    const hideSearchBar = (hide: Boolean) => {
        // if collapsed remove header blank from nav header which is
        // <div class="semi-navigation-header semi-navigation-header-collapsed"></div>
        // the header left a blank because <GlobalHotKeys> is blocking the place
        let navNode = findDOMNode(navRef.current) as Element
        if (navNode) {
            let nodes = navNode.getElementsByClassName("semi-navigation-header")
            if (nodes.length >= 0) {
                let node = nodes.item(0) as HTMLElement
                node!.style!.display = hide ? "none" : "block"
            }
        }
    }

    // handle events
    const onSiderToolSelected = (data: OnSelectedData) => {
        let siderToolItem = ToolSiderConfigs[data.itemKey];
        if (siderToolItem) {
            console.log(`tool <${data.itemKey}> activated`);
            sharedSubsCtx.activeToolNode$.next(siderToolItem.node);
            let itemKey = data.itemKey as string
            setSelectedItems([itemKey])
            setSearchParams({"tk": itemKey})
        }
    };

    // const search = useLocation().search

    // hooks
    useMount(() => {
        hideSearchBar(sidebarCollapsed)
    })

    useMount(() => {
        const toolItemKey = searchParams.get("tk")

        // init tool node
        // default show json-formatter
        let defaultKey = selectedItems[0]
        if (toolItemKey && Object.keys(toolSiderConfigs).map(k => {
            return k.toUpperCase().trim()
        }).includes(toolItemKey?.toUpperCase().trim())) {
            defaultKey = toolItemKey.toLowerCase().trim()
            setSelectedItems([defaultKey])
        }
        sharedSubsCtx.activeToolNode$.next(ToolSiderConfigs[defaultKey].node);
    });

    //<editor-fold desc="Define hot keys">
    const searchToolInputRef = useRef<HTMLInputElement>(null)
    const onFocusSearchTools = React.useCallback((ke: (KeyboardEvent | undefined)) => {
        console.debug("hotkey invoked: focus search tools", JSON.stringify(ke))
        setSideBarCollapsed(false)
        searchToolInputRef.current?.focus();
    }, [setSideBarCollapsed])
    const hotkeyHandlers = {
        SEARCH_TOOLS: onFocusSearchTools
    }
    const keyMap = {
        SEARCH_TOOLS: "command+."
    };
    //</editor-fold>

    const HeaderNode =
        <Input ref={searchToolInputRef}
               onChange={(value) => {
                   setToolSearchKeyword(value)
               }}
               placeholder="Search by ⌘ + ."/>

    const FooterNode = <Space vertical={sidebarCollapsed}>
        <Button icon={<IconSidebar/>} onClick={() => {
            if (sidebarCollapsed) {
                setSideBarCollapsed(false);
            } else {
                setSideBarCollapsed(true)
            }

        }}/>
        <Button icon={darkModEnabled ? <IconMoon/> : <IconSun/>}
                onClick={() => {
                    Pref.getInstance().darkModeEnabled.toggle()
                }}/>
    </Space>

    return (
        <Nav
            ref={navRef}
            selectedKeys={selectedItems}
            multiple={false}
            style={{}}
            mode="vertical"
            items={tools}
            isCollapsed={sidebarCollapsed as boolean}
            footer={{
                collapseButton: true,
                children: FooterNode
            }}
            header={<GlobalHotKeys handlers={hotkeyHandlers}
                                   keyMap={keyMap}>{!sidebarCollapsed ? HeaderNode : null}</GlobalHotKeys>}
            onSelect={onSiderToolSelected}
            className={'tools-sider'}
        />
    );
};
