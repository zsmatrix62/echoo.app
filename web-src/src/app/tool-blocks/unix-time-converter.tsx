import { BaseFormApi } from '@douyinfe/semi-foundation/lib/es/form/interface'
import { IconCopy } from '@douyinfe/semi-icons'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Space,
  TimePicker,
  Toast,
  Typography,
} from '@douyinfe/semi-ui'
import Label from '@douyinfe/semi-ui/lib/es/form/label'
import React, { useRef, useState } from 'react'
import useClipboard from 'use-clipboard-hook'
import { isTauriAppContext } from '../../App'
import { calendar, theDay, theWeek, isLeap } from '../../utils/calendar'

export const UnixTimeConverterPage = () => {
  const [curDate, setCurDate] = useState<Date>(new Date())
  const formApi = useRef<BaseFormApi<any>>()
  const { copy } = useClipboard({
    onSuccess: (_) => {
      Toast.success('已复制')
    },
  })

  const itemStyle = { width: '90%' }

  const renderLabelText = (text: String, field: string) => {
    return (
      <Row>
        <span>{text}</span>
        <Button
          style={{ marginLeft: '10px' }}
          icon={<IconCopy />}
          size="small"
          aria-label="复制"
          onClick={() => {
            copy(formApi.current?.getValue(field).toString())
          }}
        />
      </Row>
    )
  }
  //是否为Date对象
  const isValidDate = (date: any) => {
    return date instanceof Date && !isNaN(date.getTime())
  }

  const setOtherField = (timestamp: string, curField: string) => {
    const date = new Date(Number(timestamp))
    if (isValidDate(date)) {
      const setField = curField == 'timestamp' ? 'date' : 'timestamp'
      const setValue = setField == 'timestamp' ? date.getTime() : date
      formApi.current?.setValue(setField, setValue)
      formApi.current?.setError(curField, '')
      setCurDate(date)
    } else {
      formApi.current?.setError(curField, 'Invalid Date')
    }
  }

  const { Paragraph } = Typography

  const {
    gregorianYear,
    gregorianMonth,
    gregorianDay,
    lunarYearCn,
    lunarMonthCn,
    lunarDayCn,
    weekday,
    zodiacYear,
    hours,
    minutes,
    seconds,
  } = calendar(curDate)
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
              <Form.Input
                field="timestamp"
                label={renderLabelText('时间戳', 'timestamp')}
                style={itemStyle}
                initValue={curDate.getTime()}
                onChange={(value) => {
                  setOtherField(value, 'timestamp')
                }}
              />
            </Col>
            <Col span={12}>
              <Form.DatePicker
                field="date"
                label={renderLabelText('选择日期时间', 'date')}
                style={itemStyle}
                initValue={curDate}
                type="dateTime"
                placeholder="请选择日期时间"
                onChange={(value: any) => {
                  if (value && isValidDate(value)) {
                    setOtherField(String(new Date(value).getTime()), 'date')
                  }
                }}
              />
            </Col>
          </Row>
          <Card>
            <Row gutter={[20, 20]}>
              <Col span={8}>
                <Label>中国农历：</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: '已复制' }),
                  }}
                >
                  {`${gregorianYear}年${gregorianMonth}月${gregorianDay}日 ${lunarYearCn}${lunarMonthCn}${lunarDayCn},${hours}时${minutes}分${seconds}秒`}
                </Paragraph>
              </Col>
              <Col span={8}>
                <Label>UTC标准日期：</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: '已复制' }),
                  }}
                >
                  {curDate.toUTCString()}
                </Paragraph>
              </Col>
              <Col span={8}>
                <Label>UTC标准日期：</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: '已复制' }),
                  }}
                >
                  {curDate.toUTCString()}
                </Paragraph>
              </Col>
            </Row>
            <Space></Space>
            <Row gutter={[20, 20]}>
              <Col span={8}>
                <Label>一年中的第几天：</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: '已复制' }),
                  }}
                >
                  {theDay(curDate)}
                </Paragraph>
              </Col>
              <Col span={8}>
                <Label>一年中的第几周：</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: '已复制' }),
                  }}
                >
                  {theWeek(curDate)}
                </Paragraph>
              </Col>
              <Col span={8}>
                <Label>是否闰年：</Label>
                <Paragraph
                  copyable={{
                    onCopy: () => Toast.success({ content: '已复制' }),
                  }}
                >
                  {isLeap(curDate) ? '是' : '否'}
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </Form>
      )}
    </isTauriAppContext.Consumer>
  )
}
