import {IconGithubLogo} from "@douyinfe/semi-icons";
import {Button, Nav, Space, Tooltip} from "@douyinfe/semi-ui";
import {DownloadOne} from "@icon-park/react";
import "./main-nav.scss"

import {LogoComponent} from "../wigetds/logo";
import {GITHUB_HOMEPAGE, RELEASE_DOWNLOAD_PAGE} from "../consts/literals";

export const MainNav = () => {

    const onDownloadClicked = () => {
        window.open(RELEASE_DOWNLOAD_PAGE, "blank",)
    }

    const onHomePageClicked = () => {
        window.open(GITHUB_HOMEPAGE, "blank",)
    }

    const headerNode = <Nav.Header>
        <LogoComponent/>
    </Nav.Header>

    const navFooter = <Nav.Footer>
        <Space>
            <Tooltip content='Download Offline Client'
                     position='bottomLeft'>
                <Button size={"large"} onClick={onDownloadClicked}
                        icon={<DownloadOne theme="outline" size="21" fill="var(--semi-color-primary)"/>}/>
            </Tooltip>
            <Tooltip content='Github Repository'
                     position='bottomLeft'>
                <Button size={"large"} icon={<IconGithubLogo size={"extra-large"} onClick={onHomePageClicked}
                />}/>
            </Tooltip>
        </Space>
    </Nav.Footer>

    return (
        <Nav defaultOpenKeys={["Home"]} mode="horizontal" style={{userSelect: "none"}}>
            {headerNode}
            {navFooter}
        </Nav>
    )
};
