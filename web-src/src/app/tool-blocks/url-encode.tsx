import {
  Button,
  Col,
  Radio,
  RadioGroup,
  Row,
  Space,
  Notification,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
import Textarea from "@douyinfe/semi-ui/lib/es/input/textarea";
import { RadioChangeEvent } from "@douyinfe/semi-ui/lib/es/radio";
import { ArrowDown, ArrowUp, Copy, CornerLeftUp } from "@icon-park/react";
import { type } from "os";
import { useEffect, useState } from "react";
import useClipboard from "use-clipboard-hook";
import { isTauriAppContext } from "../../App";
import { AutoFitTextAreaWithRef } from "../wigetds/autofit-textarea";
import "./url-encode.scss";

const exampleString = "abc 0123 !@#$%^&*()|+?<>',.;:`";
const inputPlaceholder = `Input`;
const outputPlaceholder = `Output`;

export const UrlEncodePage = () => {
  const typeRadios = [
    "Encode",
    "Decode",
    "Encode Component",
    "Decode Component",
  ];
  const [curType, setCurType] = useState("Encode");
  const [outputValue, setOutputValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const { copy } = useClipboard({
    onSuccess: (_) => {
      Toast.success("copied content!");
    },
  });
  const inputChange = (type: string, value: string) => {
    try {
      if (type === "Encode") {
        setOutputValue(encodeURI(value));
      } else if (type === "Decode") {
        setOutputValue(decodeURI(value));
      } else if (type === "Encode Component") {
        setOutputValue(encodeURIComponent(value));
      } else if (type === "Decode Component") {
        setOutputValue(decodeURIComponent(value));
      }
    } catch (err: any) {
      Toast.error({ content: err.toString(), duration: 3 });
      setOutputValue("");
    }
  };
  useEffect(() => {
    inputChange(curType, inputValue);
  }, [inputValue, curType]);
  return (
    <isTauriAppContext.Consumer>
      {(isTauri) => (
        <div className="url-encode-container">
          <div className="action-bar">
            <div>
              <Space>
                <Typography.Text>Input:</Typography.Text>
                <Button
                  onClick={() => {
                    setInputValue(exampleString);
                  }}
                >
                  Sample
                </Button>
                <Button
                  onClick={() => {
                    setInputValue("");
                  }}
                >
                  Clear
                </Button>
              </Space>
            </div>
            <div>
              <RadioGroup
                onChange={(e) => {
                  setCurType(e.target.value);
                }}
                value={curType}
              >
                {typeRadios.map((item, index) => {
                  return (
                    <Radio key={index} value={item}>
                      {item}
                    </Radio>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
          <div className="input-wrap">
            <AutoFitTextAreaWithRef
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(value) => {
                setInputValue(value);
              }}
            ></AutoFitTextAreaWithRef>
          </div>
          <div className="action-bar">
            <Space>
              <Typography.Text>Output:</Typography.Text>
              <Button icon={<CornerLeftUp theme="outline" />}>
                Use as input
              </Button>
            </Space>
            <Button
              icon={<Copy theme="outline" />}
              onClick={() => {
                if (outputValue) {
                  copy(outputValue);
                }
              }}
            >
              Copy
            </Button>
          </div>
          <div className="input-wrap">
            <AutoFitTextAreaWithRef
              value={outputValue}
              placeholder={outputPlaceholder}
            ></AutoFitTextAreaWithRef>
          </div>
        </div>
      )}
    </isTauriAppContext.Consumer>
  );
};
