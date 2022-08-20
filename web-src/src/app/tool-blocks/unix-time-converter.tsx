import { BaseFormApi } from '@douyinfe/semi-foundation/lib/es/form/interface'
import { IconCopy } from '@douyinfe/semi-icons'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputGroup,
  Row,
  Select,
  Space,
  TimePicker,
  Toast,
  Typography,
} from '@douyinfe/semi-ui'
import Label from '@douyinfe/semi-ui/lib/es/form/label'
import React, { useEffect, useRef, useState } from 'react'
import useClipboard from 'use-clipboard-hook'
import { isTauriAppContext } from '../../App'
import { theDay, theWeek, isLeap, dateFormat } from '../../utils/calendar'

const WEEK_STR = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]
const MONTH_STR = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
export const UnixTimeConverterPage = () => {
  const [dateType, setDateType] = useState<String>('ms')
  const [curDate, setCurDate] = useState<Date>(new Date())
  const [nowDate, setNowDate] = useState<Date>(new Date())
  const formApi = useRef<BaseFormApi<any>>()
  const { copy } = useClipboard({
    onSuccess: (_) => {
      Toast.success('copied content!')
    },
  })

  const itemStyle = { width: '90%' }

  const renderLabelText = (text: String, field: string) => {
    return (
      <div>
        <span style={{ fontWeight: 600 }}>{text}</span>
        <Button
          style={{ marginLeft: '10px' }}
          icon={<IconCopy />}
          size="small"
          aria-label="Copy"
          onClick={() => {
            copy(formApi.current?.getValue(field).toString())
          }}
        />
      </div>
    )
  }
  //是否为Date对象
  const isValidDate = (date: any) => {
    console.log(date instanceof Date, !isNaN(date.getTime()))
    return date instanceof Date && !isNaN(date.getTime())
  }

  const setOtherField = (
    timestamp: number,
    curField: string,
    type = dateType
  ) => {
    let t = timestamp
    if (curField == 'timestamp' && type == 's') {
      t = Number((t * 1000).toFixed(0))
    }
    const date = new Date(t)
    if (isValidDate(date)) {
      const setField = curField == 'timestamp' ? 'date' : 'timestamp'
      const setValue =
        setField == 'timestamp'
          ? type == 's'
            ? (t / 1000).toFixed(0)
            : String(t)
          : date
      formApi.current?.setValue(setField, setValue)
      formApi.current?.setError(curField, '')
      setCurDate(date)
    } else {
      formApi.current?.setError(curField, 'Invalid Date')
    }
  }

  const loadNowTime = () => {
    const nowTimeStamp = new Date().getTime()
    const step = 1000 - (nowTimeStamp % 1000)
    setTimeout(() => {
      loadNowTime()
      setNowDate(new Date(nowTimeStamp + step))
    }, step)
  }
  useEffect(() => {
    loadNowTime()
  }, [])

  const presetsTimes = [
    {
      text: 'Now',
      start: new Date(),
      end: new Date(),
    },
  ]
  const { Paragraph } = Typography

  return (
    <isTauriAppContext.Consumer>
      {(isTauri) => (
        <Form
          style={{ padding: '0 20px', width: '100%', boxSizing: 'border-box' }}
          getFormApi={(api) => (formApi.current = api)}
          onValueChange={(values, changeValue) => {
            for (let i in changeValue) {
              //任意输入为空、全部设置空
              if (!changeValue[i]) {
                formApi.current?.setValues({})
              }
            }
          }}
        >
          <Row>
            <Col span={12}>
              <Form.InputGroup
                style={itemStyle}
                label={{ text: renderLabelText('Unix Timestamp', 'timestamp') }}
              >
                <Form.Input
                  style={{ width: '60%' }}
                  field="timestamp"
                  initValue={curDate.getTime()}
                  onChange={(value: any) => {
                    setOtherField(Number(value), 'timestamp')
                  }}
                ></Form.Input>
                <Form.Select
                  field="dateType"
                  style={{ width: '40%' }}
                  initValue={dateType}
                  onChange={(value: any) => {
                    setDateType(value)
                    setOtherField(
                      Number(formApi.current?.getValue('date')),
                      'date',
                      value
                    )
                  }}
                >
                  <Form.Select.Option value="ms">
                    Milliseconds
                  </Form.Select.Option>
                  <Form.Select.Option value="s">Seconds</Form.Select.Option>
                </Form.Select>
              </Form.InputGroup>
            </Col>
            <Col span={12}>
              <Form.DatePicker
                presets={presetsTimes}
                field="date"
                label={renderLabelText('Choose Time', 'date')}
                style={itemStyle}
                initValue={curDate}
                type="dateTime"
                placeholder="Select Time"
                onChange={(value: any) => {
                  if (value && isValidDate(value)) {
                    setOtherField(new Date(value).getTime(), 'date')
                  }
                }}
              />
            </Col>
          </Row>
          <Card>
            <Row gutter={[20, 20]}>
              <Col span={8}>
                <Label style={{ fontWeight: 600 }}>Now</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: 'copied content' }),
                  }}
                >
                  {nowDate.toString()}
                </Paragraph>
              </Col>
              <Col span={8}>
                <Label style={{ fontWeight: 600 }}>UTC</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: 'copied content' }),
                  }}
                >
                  {curDate.toUTCString()}
                </Paragraph>
              </Col>
              <Col span={8}>
                <Label style={{ fontWeight: 600 }}>ISO</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: 'copied content' }),
                  }}
                >
                  {curDate.toString()}
                </Paragraph>
              </Col>
            </Row>
          </Card>
          <Card style={{ marginTop: '10px' }}>
            <Row gutter={[20, 20]}>
              <Col span={8}>
                <Label style={{ fontWeight: 600 }}>Day of Year</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: 'copied content' }),
                  }}
                >
                  {theDay(curDate)}
                </Paragraph>
              </Col>
              <Col span={8}>
                <Label style={{ fontWeight: 600 }}>Week of Year</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: 'copied content' }),
                  }}
                >
                  {theWeek(curDate)}
                </Paragraph>
              </Col>
              <Col span={8}>
                <Label style={{ fontWeight: 600 }}>Leap Year:</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: 'copied content' }),
                  }}
                >
                  {isLeap(curDate) ? 'Yes' : 'No'}
                </Paragraph>
              </Col>
            </Row>
          </Card>

          <Card title="Other formats(local)" style={{ marginTop: '10px' }}>
            <Row gutter={[0, 20]}>
              <Col>
                {/* Y-m-d H:i:s */}
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: 'copied content' }),
                  }}
                >
                  {`${MONTH_STR[curDate.getMonth()]},${
                    WEEK_STR[curDate.getDay()]
                  }${dateFormat(curDate.getTime(), ' d, Y')}`}
                </Paragraph>
              </Col>
              <Col>
                {/* Y-m-d H:i:s */}
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: 'copied content' }),
                  }}
                >
                  {dateFormat(curDate.getTime(), 'd/m/Y')}
                </Paragraph>
              </Col>
              <Col>
                {/* Y-m-d H:i:s */}
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: 'copied content' }),
                  }}
                >
                  {dateFormat(curDate.getTime(), 'Y-m-d')}
                </Paragraph>
              </Col>
              <Col>
                {/* Y-m-d H:i:s */}
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: 'copied content' }),
                  }}
                >
                  {dateFormat(curDate.getTime(), 'd-m-Y H:i')}
                </Paragraph>
              </Col>
              <Col>
                {/* Y-m-d H:i:s */}
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: 'copied content' }),
                  }}
                >
                  {dateFormat(curDate.getTime(), 'Y-m-d H:i')}
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </Form>
      )}
    </isTauriAppContext.Consumer>
  )
}
