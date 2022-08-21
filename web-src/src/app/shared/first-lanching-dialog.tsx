import { useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  SideSheet,
  Space,
  Typography,
} from "@douyinfe/semi-ui";
import Section from "@douyinfe/semi-ui/lib/es/form/section";
import { Github, LinkOne, Protect } from "@icon-park/react";
import { useLocalStore } from "../libs/hooks/localstore";
import { Pref } from "../context/pref";
import { PersonalPrivacy } from "@icon-park/react/es";
import { PrivacyPage } from "./privacy";

export type FirstLanchingModalSettings = {
  "allow-analytics": string;
};

export const FirstLanchingModalSettingsDefault: FirstLanchingModalSettings = {
  "allow-analytics": "",
};

type props = { onVisibleChange: (v: FirstLanchingModalSettings) => void };

export const FirstLanchingModal = ({ onVisibleChange }: props) => {
  const [settings, setSettings] = useLocalStore(
    "first-launching-settings",
    FirstLanchingModalSettingsDefault
  );
  const formRef = useRef<Form>(null);

  const onChangeOfAnyField = (v: any) => {
    // @ts-ignore
    setSettings(v);
  };

  const [showPrivacy, setShowPrivacy] = useState(false);
  // noinspection RequiredAttributes
  return (
    <Modal
      centered
      visible={true}
      footer={
        <Button
          // @ts-ignore
          type={settings["allow-analytics"] == "" ? "tertiary" : "primary"}
          onClick={() => {
            // @ts-ignore
            let allow = settings["allow-analytics"] == "yes";
            Pref.getInstance().allowAnalytics.$.next(allow);
            onVisibleChange(settings as FirstLanchingModalSettings);
          }}
          // @ts-ignore
          disabled={settings["allow-analytics"] == ""}
        >
          Continue
        </Button>
      }
      closable={false}
      width={"600px"}
      height={"auto"}
      keepDOM={true}
      bodyStyle={{ overflow: "auto", height: "380px", width: "auto" }}
    >
      <SideSheet
        size="medium"
        visible={showPrivacy}
        onCancel={() => {
          setShowPrivacy(false);
        }}
      >
        <PrivacyPage />
      </SideSheet>
      <Form
        initValues={settings}
        ref={formRef}
        onValueChange={onChangeOfAnyField}
        style={{ height: "100%" }}
      >
        <Section
          text={
            <Space>
              {" "}
              <PersonalPrivacy size={28} />{" "}
              <Typography.Text style={{ fontSize: 18 }}>
                Anonymouse Analysis Notice
              </Typography.Text>{" "}
            </Space>
          }
        >
          <Row>
            <Col>
              <Typography.Paragraph
                style={{ padding: "20px 0" }}
                spacing="extended"
              >
                <Typography.Paragraph>
                  Echoo.app uses anonymouse analysis to trackdown usage and
                  website traffic, we use this kind of data to improve this
                  application. You can always opt-out the analysis by adding
                  browser add-on or un-check below option and continue.
                </Typography.Paragraph>
                <br />
                <Typography.Text
                  link
                  icon={<LinkOne />}
                  onClick={() => {
                    setShowPrivacy(true);
                  }}
                >
                  Check Echoo.app's Privacy Policy
                </Typography.Text>
              </Typography.Paragraph>
              <Typography.Title heading={4}>
                Echoo.app guarentees:
              </Typography.Title>
              <br />
              <Typography.Paragraph spacing="extended">
                <Space align="center">
                  <Protect size={24.5} />
                  <span>
                    Will NOT collect any of your data input into this
                    application.
                  </span>
                </Space>
                <Space align="center" style={{ marginTop: "10px" }}>
                  <Github size={24.5} />
                  <Typography.Text>
                    Aways be an{" "}
                    <a
                      rel="noreferrer"
                      href="https://github.com/zsmatrix62/echoo.app"
                      target="_blank"
                    >
                      {" "}
                      open source software
                    </a>
                  </Typography.Text>
                </Space>
              </Typography.Paragraph>
            </Col>
          </Row>
          <Row style={{ position: "fixed", width: "100%", bottom: "60px" }}>
            <Col span={14}>
              <Form.RadioGroup
                field="allow-analytics"
                label="Share anonymouse data with Echoo.app?"
                initValue={undefined}
                rules={[
                  {
                    required: true,
                    message: "Will you share anonymouse data with Echoo.app?",
                  },
                ]}
              >
                <Form.Radio value={"no"}>No</Form.Radio>
                <Form.Radio value={"yes"}>Yes</Form.Radio>
              </Form.RadioGroup>
            </Col>
          </Row>
        </Section>
      </Form>
    </Modal>
  );
};
