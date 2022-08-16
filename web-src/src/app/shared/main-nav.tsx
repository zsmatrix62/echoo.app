import { IconGithubLogo } from "@douyinfe/semi-icons";
import { Button, Nav, Space, Tooltip, Typography } from "@douyinfe/semi-ui";
import "./main-nav.scss"

import { LogoComponent } from "../wigetds/logo";
import { GITHUB_HOMEPAGE, RELEASE_DOWNLOAD_PAGE } from "../consts/literals";
import { Computer } from "@icon-park/react/es";
import { useMount } from "react-use";
import { useState } from "react";

export const MainNav = () => {

	const onDownloadClicked = () => {
		window.open(RELEASE_DOWNLOAD_PAGE, "blank",)
	}

	const onHomePageClicked = () => {
		window.open(GITHUB_HOMEPAGE, "blank",)
	}

	const [isMac, setIsMac] = useState(false)
	useMount(() => {
		setIsMac(window.navigator.userAgent.includes("Macintosh"))
	})

	const headerNode = <Nav.Header>
		<LogoComponent />
	</Nav.Header>

	const navFooter = <Nav.Footer>
		<Space align="center">
			<Tooltip content={"Desktop client"}
				position='bottomLeft' >
				{
					isMac ?
						<a href="https://apps.apple.com/cn/app/echoo-app/id1612383544?mt=12" target="_blank"><img src={process.env.PUBLIC_URL + "/mac-app-store-badge.svg"} /></a>
						:
						<Button size={"large"} onClick={onDownloadClicked}
							icon={<Computer theme="outline" size="21" fill="var(--semi-color-primary)" />} />
				}
			</Tooltip>
			<Button size={"large"} icon={<IconGithubLogo size={"extra-large"} onClick={onHomePageClicked}
			/>} />
		</Space>
	</Nav.Footer>

	return (
		<Nav defaultOpenKeys={["Home"]} mode="horizontal" style={{ userSelect: "none" }}>
			{headerNode}
			{navFooter}
		</Nav>
	)
};
