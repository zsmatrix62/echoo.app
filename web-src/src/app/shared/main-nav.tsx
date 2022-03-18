import {IconGithubLogo} from "@douyinfe/semi-icons";
import {Button, Nav, Space, Tooltip} from "@douyinfe/semi-ui";
import "./main-nav.scss"

import {LogoComponent} from "../wigetds/logo";
import {GITHUB_HOMEPAGE, RELEASE_DOWNLOAD_PAGE} from "../consts/literals";
import {Computer} from "@icon-park/react/es";

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
            <Tooltip content='Offline desktop client'
                     position='bottomLeft'>
                <Button size={"large"} onClick={onDownloadClicked}
                        icon={<Computer theme="outline" size="21" fill="var(--semi-color-primary)"/>}/>
            </Tooltip>
            <Button size={"large"} icon={<IconGithubLogo size={"extra-large"} onClick={onHomePageClicked}
            />}/>
        </Space>
    </Nav.Footer>

    return (
        <Nav defaultOpenKeys={["Home"]} mode="horizontal" style={{userSelect: "none"}}>
            {headerNode}
            {navFooter}
        </Nav>
    )
};
