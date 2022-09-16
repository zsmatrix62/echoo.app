import {
  Banner,
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  SideSheet,
  Space,
  Toast,
} from "@douyinfe/semi-ui";
import "./json-formatter.scss";
import {
  IconArrowUp,
  IconCopy,
  IconHelpCircle,
  IconLayers,
} from "@douyinfe/semi-icons";
import { useEffect, useRef, useState } from "react";
import {
  useObservableCallback,
  useObservableState,
  useSubscription,
} from "observable-hooks";
import { useMount, useSetState } from "react-use";
import { AutoFitTextAreaWithRef } from "../wigetds/autofit-textarea";
import Text from "@douyinfe/semi-ui/lib/es/typography/text";
import useClipboard from "use-clipboard-hook";
import { JSONPath } from "jsonpath-plus";
import { JsonPathGuide } from "../wigetds/json-path-guide";
import { Pref } from "../context/pref";
import { isTauriAppContext } from "../../App";
import { useWasmAPI } from "../libs/hooks/wasm-api";
import { ValidationError } from "wasm-api";
// import AceEditor from "react-ace";
import MonacoEditor from "react-monaco-editor";
// import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/theme-tomorrow_night";
// import "ace-builds/src-noconflict/ext-language_tools";
import { NewProperAPIClient } from "../../libs/api/client";
import {
  InDownloadPioBinary,
  InTryPioBinary,
} from "../../libs/api/proto/tools_pb";

const ErrorDisplay = ({
  input,
  errors,
  onFirstErrorRange,
}: {
  input?: string;
  errors: Array<ValidationError>;
  onFirstErrorRange?: (start: number, end: number) => void;
}) => {
  const [errorTags, setErrorTags] = useState<Array<JSX.Element>>([]);
  useEffect(() => {
    if (errors.length === 0) {
      return;
    }
    if (!input) {
      return;
    }

    const prefixCount = 10;
    const ellipsePlaceHolderStart = "... ";
    const ellipsePlaceHolderEnd = " ...";
    let tags = errors.map((vErr, idx) => {
      let errAtGreaterThan = Number(vErr.index_start) - prefixCount > 0;
      let errHasLeftContent =
        Number(vErr.index_end) + prefixCount < input.length;

      let startAt = errAtGreaterThan
        ? Number(vErr.index_start) - prefixCount
        : 0;
      let endAt = errHasLeftContent
        ? Number(vErr.index_end) + prefixCount
        : Number(vErr.index_end);

      const errorHintText = `${
        errAtGreaterThan ? ellipsePlaceHolderStart : ""
      } ${input.slice(startAt, endAt)}${
        errHasLeftContent ? ellipsePlaceHolderEnd : ""
      }`;

      let cursorPositionStart = errAtGreaterThan
        ? startAt - ellipsePlaceHolderStart.length
        : startAt;
      let cursorPositionEnd = Number(vErr.index_start);

      if (endAt === input.length) {
        cursorPositionStart = endAt - errorHintText.length;
        cursorPositionEnd = endAt - 1;
      }

      if (onFirstErrorRange) {
        onFirstErrorRange!(startAt, endAt);
      }

      return (
        <div key={idx}>
          <Space vertical align={"start"} spacing={10}>
            <Text type={"danger"}>
              <code>{errorHintText}</code>
            </Text>
            <Text type={"danger"}>
              <code
                style={{
                  visibility: "hidden",
                  padding: 0,
                }}
              >
                {input.slice(cursorPositionStart, cursorPositionEnd)}
              </code>
              <IconArrowUp />
            </Text>
            <code>
              <Text type="danger" style={{ fontSize: 18 }}>
                {vErr.description}
              </Text>
            </code>
          </Space>
        </div>
      );
    });
    setErrorTags(tags);
  }, [errors, input, onFirstErrorRange]);
  return <Space>{errorTags}</Space>;
};

export const JsonFormatterBlock = () => {
  let inputPlaceholder =
    "Enter your text, Drag/drop files, Right click to load file";
  const jsonIndentState = useObservableState<number>(
    Pref.getInstance().jsonFormatterDefaultIndentSpace.$
  );
  const [jsonPathValue, setJsonPathValue] = useState<string>("");
  const [showJsonPathGuide, setShowJsonPathGuide] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const jsonPathRef = useRef<HTMLInputElement>(null);
  const { copy } = useClipboard({
    onSuccess: (_) => {
      Toast.success("JSON copied");
    },
  });

  const wasmAPI = useWasmAPI();

  const [inputValue, setInputValue] = useObservableState<string | undefined>(
    (obs) => {
      obs.subscribe((changedInput) => {
        import("wasm-api").then((wasm) => {
          let error = wasm?.validate_json(changedInput!);
          if (error) {
            if (error.code === "E100") {
              return;
            }
            setValidationErrors([error]);
          }
        });
      });

      const setOutput = (changed: string) => {
        Pref.getInstance().jsonFormatterDefaultIndentSpace.subscribe({
          next: (indent) => {
            setValidationErrors([]);
            setOutputJson(changed === "" ? "{}" : changed, indent);
          },
        });
      };

      obs.subscribe((changed) => {
        setOutput(changed ?? "");
      });
      return obs;
    },
    undefined
  );

  const [monacoM, setMonacoM] = useSetState<any>();

  const editorDidMount = (editor: any, monaco: any) => {
    setMonacoM([editor, monaco]);
  };

  const [outValue, _setOutValue] = useObservableState<string>((obs) => {
    return obs;
  }, "");

  const [setOutValue$, outValue$] = useObservableCallback<string, string>(
    (e$) => e$
  );

  useSubscription(outValue$, (obs) => {
    _setOutValue(obs);
    const editor = monacoM[0];
    const monaco = monacoM[1];
    setTimeout(() => {
      editor.setSelection(new monaco.Selection(0, 0, 0, 0));
    }, 50);
  });

  const [editorTheme, setEditorTheme] = useObservableState<string | undefined>(
    (obs) => {
      return obs;
    },
    undefined
  );

  const [validationErrors, setValidationErrors] = useObservableState<
    Array<any>
  >((obs) => {
    return obs;
  }, []);

  useMount(() => {
    Pref.getInstance().darkModeEnabled.subscribe({
      next: (enabled) => {
        setEditorTheme(enabled ? "dark" : "light");
      },
    });
  });

  const setOutputJson = (val?: string, indent?: number | string) => {
    let outObj = {};
    let content = "";
    try {
      if (val) {
        outObj = JSON.parse(val);
        if (indent === 91) {
          indent = "\t";
        }
        content = JSON.stringify(outObj, null, indent);
      }
    } catch (e) {
    } finally {
      setOutValue$(content);
    }
  };

  const onInputChanged = (val: string) => {
    setInputValue(val);
    setJsonPathValue("");
  };

  const onCopy = () => {
    copy(outValue);
  };

  function setRandomJson() {
    const inputVal = wasmAPI?.get_random_json();
    setInputValue(inputVal);
  }

  function onCompressClicked() {
    onIndentSelectionChanged(0);
  }

  function onClearClicked() {
    setInputValue("");
  }

  function onIndentSelectionChanged(
    value: string | number | any[] | Record<string, any> | undefined
  ) {
    const indent = value as number;
    console.debug(`setting output json as ${indent} spaces indent`);
    setOutputJson(outValue, indent);
    Pref.getInstance().jsonFormatterDefaultIndentSpace.value = indent;
  }

  const isSidebarCollapsed = useObservableState(
    Pref.getInstance().toolsSiderCollapsed.$
  );

  // noinspection RequiredAttributes
  return (
    <isTauriAppContext.Consumer>
      {(isTauri) => (
        <Row className="json-formatter-container" style={{ height: "100%" }}>
          <SideSheet
            size={"large"}
            visible={showJsonPathGuide}
            onCancel={() => {
              setShowJsonPathGuide(false);
            }}
          >
            <JsonPathGuide />
          </SideSheet>

          <Row
            className="json-formatter-container-child"
            gutter={10}
            style={{ display: "flex" }}
          >
            <Col
              span={9}
              className={`input-block ${
                isTauri ? "mod-input-block-is-tauri" : ""
              }`}
            >
              <Row style={{ padding: "10px 0" }}>
                <Space>
                  <Button onClick={setRandomJson}>Sample</Button>
                  <Button onClick={onClearClicked}>Clear</Button>
                </Space>
              </Row>
              <Row style={{ height: "100%" }}>
                <AutoFitTextAreaWithRef
                  value={inputValue}
                  onChange={onInputChanged}
                  forwardedRef={inputRef}
                  isOnError={validationErrors}
                  placeholder={inputPlaceholder}
                />
              </Row>
            </Col>
            <div
              className={`input-block ${
                isTauri ? "mod-input-block-is-tauri" : ""
              }`}
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                flex: 1,
              }}
            >
              <Row
                style={{
                  padding: "10px 0",
                  flexDirection: "row-reverse",
                  overflow: "auto",
                }}
                type={"flex"}
              >
                <Space>
                  <Button
                    disabled={!outValue}
                    onClick={onCompressClicked}
                    icon={<IconLayers />}
                  >
                    Compress
                  </Button>
                  <Select
                    disabled={!outValue}
                    value={jsonIndentState}
                    defaultValue={jsonIndentState}
                    style={{ width: 120 }}
                    onChange={onIndentSelectionChanged}
                  >
                    <Select.Option value={2}>2 spaces</Select.Option>
                    <Select.Option value={4}>4 spaces</Select.Option>
                    <Select.Option value={91}>1 tab</Select.Option>
                    <Select.Option value={0}>minified</Select.Option>
                  </Select>
                  <Button
                    disabled={!outValue}
                    onClick={onCopy}
                    icon={<IconCopy />}
                  >
                    Copy
                  </Button>
                </Space>
              </Row>
              <Row className="cm-block" style={{ flex: 1, overflow: "hidden" }}>
                {validationErrors.length > 0 ? (
                  <Banner
                    className="validation-error"
                    fullMode={false}
                    type="danger"
                    bordered
                    icon={null}
                    closeIcon={null}
                    description={
                      <ErrorDisplay
                        onFirstErrorRange={(_start, _end) => {
                          // inputRef?.current?.setSelectionRange(start, end)
                        }}
                        input={inputValue}
                        errors={validationErrors}
                      />
                    }
                  />
                ) : (
                  <Row
                    className={`cm-block-group`}
                    style={{
                      flex: "1",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    gutter={10}
                  >
                    <div
                      style={{
                        width: "100%",
                        flex: 1,
                        padding: "2px",
                        boxSizing: "border-box",
                      }}
                    >
                      {/* <CodeMirror
                        value={outValue}
                        // extensions={[json()]}
                        theme={editorTheme! as 'light' | 'dark'}
                      /> */}
                      {/* <AceEditor
                        mode="json"
                        width='100%'
                        height='100%'
                        theme={
                          editorTheme == 'dark' ? 'tomorrow_night' : 'github'
                        }
                        value={outValue}
                        name="UNIQUE_ID_OF_Col"
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                          enableBasicAutocompletion: true,
                          enableLiveAutocompletion: true,
                          enableSnippets: true,
                        }}
                        readOnly={true}
                      /> */}

                      <MonacoEditor
                        width="100%"
                        height="100%"
                        value={outValue}
                        language="json"
                        theme={editorTheme == "dark" ? "vs-dark" : "vs"}
                        options={{
                          scrollbar: {
                            vertical: "hidden",
                            horizontal: "hidden",
                          },
                          automaticLayout: true,
                          readOnly: true,
                          minimap: { enabled: false },
                        }}
                        editorDidMount={editorDidMount}
                      ></MonacoEditor>
                    </div>
                    <Col>
                      <Space style={{ width: "100%", padding: "10px 0 0 0" }}>
                        <Input
                          type="text"
                          disabled={!validationErrors || !outValue}
                          placeholder={"JSON Path"}
                          ref={jsonPathRef}
                          value={jsonPathValue}
                          onChange={(val) => {
                            setJsonPathValue(val);
                            if (val) {
                              let res = JSONPath({
                                path: val,
                                json: JSON.parse(inputValue!),
                              });
                              setOutputJson(
                                JSON.stringify(res),
                                jsonIndentState
                              );
                            } else {
                              setInputValue(inputValue);
                            }
                          }}
                        />
                        <Button
                          icon={<IconHelpCircle />}
                          onClick={() => {
                            setShowJsonPathGuide(true);
                          }}
                        />
                      </Space>
                    </Col>
                  </Row>
                )}
              </Row>
            </div>
          </Row>
        </Row>
      )}
    </isTauriAppContext.Consumer>
  );
};
