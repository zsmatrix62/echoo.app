import {
  Button,
  Col,
  Descriptions,
  Row,
  Space,
  Tabs,
  Toast,
} from "@douyinfe/semi-ui";
import { useObservableState } from "observable-hooks";
import { useSearchParams } from "react-router-dom";
import { useMount } from "react-use";
import "../shared/styles/h-layout.scss";
import { isTauriAppContext } from "../../App";
import { Percentage } from "@icon-park/react";
import "./url-parser.scss";
import { AutoFitTextAreaWithRef } from "../wigetds/autofit-textarea";
import { Pref } from "../context/pref";
import { IconCopy } from "@douyinfe/semi-icons";
import parseUrl from "parse-url";
import useClipboard from "use-clipboard-hook";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

export const UrlParser = () => {
  // noinspection DuplicatedCode
  const [defaultTabIdx, setDefaultTabIdx] = useObservableState<string>(
    (obs) => {
      obs.subscribe((idx) => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        params.set("tab", idx);
        setSearchParams(params);
      });
      return obs;
    },
    "1"
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useMount(() => {
    let tabIndex = searchParams.get("tab");
    if (tabIndex) {
      setDefaultTabIdx(tabIndex);
    }
  });

  return (
    <isTauriAppContext.Consumer>
      {(isTauri) => (
        <Tabs
          defaultActiveKey={defaultTabIdx}
          activeKey={defaultTabIdx}
          onChange={(key) => {
            setDefaultTabIdx(key);
          }}
          className={`h-layout-container ${isTauri ? "mod-is-tauri" : ""}`}
        >
          <Tabs.TabPane
            tab={
              <Space>
                <Percentage style={{ height: 18 }} /> <span>Parse</span>{" "}
              </Space>
            }
            itemKey={"1"}
          >
            <UrlParserBlock />
          </Tabs.TabPane>
          {/*<Tabs.TabPane tab={<Space><LinkTwo style={{height: 18}}/> <span>Encode/Decode</span> </Space>}*/}
          {/*              itemKey={"2"}>*/}
          {/*</Tabs.TabPane>*/}
        </Tabs>
      )}
    </isTauriAppContext.Consumer>
  );
};

export const UrlParserBlock = () => {
  const SAMPLE_URL =
    "https://www.google.com:443/search?sxsrf=ALeKk03TpCS68ykjCqWWm7_5xDzmkdCBsw%3A1591797655810&ei=l-fgXsOCMcyl-Qaq8p6AAw&q=sample+long+query+string+url&oq=sample+long+query+string+url&gs_lcp=CgZwc3ktYWIQAzoECAAQRzoCCAA6BggAEBYQHjoICCEQFhAdEB46BAgjECc6BwgAEBQQhwI6BwgjELACECc6BAgAEA06CAgAEAgQDRAeOgoIABAIEA0QChAeUIcLWP4vYIAyaAFwAXgAgAF-iAHQC5IBAzkuNpgBAKABAaoBB2d3cy13aXo&sclient=psy-ab&ved=0ahUKEwiDqtCutPfpAhXMUt4KHSq5BzAQ4dUDCAw&uact=5&bb[]=1&bb[]=ab&&bb[]=x#some-hash";

  const { copy } = useClipboard({
    onSuccess: (_) => {
      Toast.success({
        content: `query content copied`,
      });
    },
  });

  interface ParsedUrl {
    protocols: string[];
    protocol: string;
    port?: string;
    resource: string;
    user: string;
    pathname: string;
    hash: string;
    search: string;
    href: string;
    query: {
      [key: string]: any;
    };
  }

  const [parsedUrl, setParsedUrl] = useObservableState<ParsedUrl | null>(
    (obs) => {
      obs.subscribe((d) => {
        if (!d) {
          setOutValue("");
          return;
        }
        setOutValue(JSON.stringify(d?.query ?? {}, null, "\t"));
      });
      return obs;
    },
    null
  );
  const [outValue, setOutValue] = useObservableState<string>((obs) => obs, "");
  const [inValue, setInValue] = useObservableState<string>((obs) => {
    obs.subscribe((changed) => {
      if (!changed) {
        setParsedUrl(null);
        return;
      }
      let parsedUrlObj = parseUrl(changed);
      setParsedUrl(parsedUrlObj);
    });
    return obs;
  }, "");

  return (
    <Row className={"parser-block-container"}>
      <Row className={"url-input-container"}>
        <Row className="actions">
          <Space>
            <Button
              onClick={() => {
                setInValue(SAMPLE_URL);
              }}
            >
              Sample
            </Button>
            <Button
              onClick={() => {
                setInValue("");
              }}
            >
              Clear
            </Button>
          </Space>
        </Row>
        <Row className="url-input-element">
          <AutoFitTextAreaWithRef
            value={inValue.valueOf()}
            onChange={(v) => {
              setInValue(v);
            }}
            placeholder="Input/Paste URL here ..."
          />
        </Row>
      </Row>
      <Row className="output-container">
        <Col span={10} className="segments">
          <Descriptions align={"left"} className="des">
            <Descriptions.Item itemKey={"Protocol"}>
              {parsedUrl?.protocol ?? " - "}
            </Descriptions.Item>
            {parsedUrl?.port ? (
              <Descriptions.Item itemKey={"Port"}>
                {parsedUrl?.port ?? " - "}
              </Descriptions.Item>
            ) : (
              <></>
            )}
            <Descriptions.Item itemKey={"Host"}>
              {parsedUrl?.resource ?? " - "}
            </Descriptions.Item>
            <Descriptions.Item itemKey={"Path"}>
              {parsedUrl?.pathname ?? " - "}
            </Descriptions.Item>
            {parsedUrl?.user ? (
              <Descriptions.Item itemKey={"User"}>
                {parsedUrl?.user ?? " - "}
              </Descriptions.Item>
            ) : (
              <></>
            )}
            {parsedUrl?.hash ? (
              <Descriptions.Item itemKey={"Hash"}>
                {parsedUrl?.hash ?? " - "}
              </Descriptions.Item>
            ) : (
              <></>
            )}
            <Descriptions.Item itemKey={"Query"} className={"query"}>
              {" "}
              {parsedUrl?.search ?? " - "}{" "}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={14} style={{ paddingLeft: 10 }}>
          <Row>
            <Button
              icon={<IconCopy />}
              onClick={() => {
                copy(outValue);
              }}
              disabled={!outValue}
            >
              Copy
            </Button>
          </Row>
          <Row>
            <CodeMirror
              editable={false}
              value={outValue}
              className="query-json"
              lang="json"
            />
          </Row>
        </Col>
      </Row>
    </Row>
  );
};
