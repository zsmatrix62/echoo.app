import { Layout, Notification } from "@douyinfe/semi-ui";
import Sider from "@douyinfe/semi-ui/lib/es/layout/Sider";
import { useObservableState } from "observable-hooks";
import { ReactNode, useContext, useEffect } from "react";
import { SharedSubjectContext } from "../context/shared-subjects";
import { MainFooter } from "../shared/main-footer";
import { MainNav } from "../shared/main-nav";
import { ToolsSider } from "../shared/tools-sider";
import { isTauriAppContext } from "../../App";
import "./main-page.scss";

export const MainPage = () => {
  const { Header, Content } = Layout;
  const sharedSubs = useContext(SharedSubjectContext);
  const isTauri = useContext(isTauriAppContext);
  const [activeToolNode, setActiveToolNode] = useObservableState<ReactNode>(
    (obs) => {
      obs.subscribe((node) => {
        console.debug(`active tool node set: ${node}`);
      });
      return obs;
    },
    null
  );

  // hooks
  useEffect(() => {
    sharedSubs.activeToolNode$.subscribe((node) => {
      console.debug(`activeToolNode$ received next: ${node}`);
      setActiveToolNode(node);
    });
  }, [setActiveToolNode, sharedSubs]);

  useEffect(() => {
    if (isTauri) {
      // @ts-ignore
      let tauri = window.__TAURI__;
      tauri.event.listen("be-error", (event: object) => {
        Notification.error({
          // @ts-ignore
          content: event["payload"] as string,
          position: "topRight",
          showClose: false,
        });
      });

      tauri.event.listen("be-success", (event: object) => {
        Notification.success({
          // @ts-ignore
          content: event["payload"] as string,
          position: "topRight",
          showClose: false,
        });
      });
    }
  }, [isTauri]);

  return (
    <isTauriAppContext.Consumer>
      {(isTauriApp) => (
        <Layout className="main-layout">
          {!isTauriApp && (
            <Header>
              <MainNav />
            </Header>
          )}
          <Layout className="central-layout">
            <Sider children={<ToolsSider />} />
            <Content children={activeToolNode} />
          </Layout>
          {!isTauriApp && (
            <Layout.Footer className="main-footer-container">
              <MainFooter />
            </Layout.Footer>
          )}
        </Layout>
      )}
    </isTauriAppContext.Consumer>
  );
};
