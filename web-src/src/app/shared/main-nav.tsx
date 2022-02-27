import {IconGithubLogo} from "@douyinfe/semi-icons";
import {Button, Nav, Space} from "@douyinfe/semi-ui";
import {DownloadThree} from "@icon-park/react";
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
            <Button size={"large"} onClick={onDownloadClicked}
                    icon={<DownloadThree theme="outline" size="21" fill="var(--semi-color-primary)"/>}/>
            {/*<Button size={"large"}*/}
            {/*        icon={<Dollar theme="outline" size="21" fill="var(--semi-color-primary)"/>}/>*/}
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
