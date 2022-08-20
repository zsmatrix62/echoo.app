import {
  Button,
  Col,
  Radio,
  RadioGroup,
  Row,
  Space,
  Notification,
  Toast,
} from '@douyinfe/semi-ui'
import Textarea from '@douyinfe/semi-ui/lib/es/input/textarea'
import { RadioChangeEvent } from '@douyinfe/semi-ui/lib/es/radio'
import { ArrowDown, ArrowUp, Copy, CornerLeftUp } from '@icon-park/react'
import { type } from 'os'
import { useEffect, useState } from 'react'
import useClipboard from 'use-clipboard-hook'
import { isTauriAppContext } from '../../App'
import { AutoFitTextAreaWithRef } from '../wigetds/autofit-textarea'
import './url-encode.scss'

const exampleString = "abc 0123 !@#$%^&*()|+?<>',.;:`"
const inputPlaceholder = `input`
const outputPlaceholder = `output`

export const UrlEncodePage = () => {
  const typeRadios = ['Encode', 'Decode', 'EncodeComponent', 'Decodecomponent']
  const [curType, setCurType] = useState('Encode')
  const [outputValue, setOutputValue] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const { copy } = useClipboard({
    onSuccess: (_) => {
      Toast.success('copied content!')
    },
  })
  const inputChange = (type: string, value: string) => {
    try {
      if (type === 'Encode') {
        setOutputValue(encodeURI(value))
      } else if (type === 'Decode') {
        setOutputValue(decodeURI(value))
      } else if (type === 'EncodeComponent') {
        setOutputValue(encodeURIComponent(value))
      } else if (type === 'Decodecomponent') {
        setOutputValue(decodeURIComponent(value))
      }
    } catch (err: any) {
      Toast.error({ content: err.toString(), duration: 3 })
      setOutputValue('')
    }
  }
  useEffect(() => {
    inputChange(curType, inputValue)
  }, [inputValue, curType])
  return (
    <isTauriAppContext.Consumer>
      {(isTauri) => (
        <div className="url-encode-container">
          <div className="action-bar">
            <div>
              <Space>
                <span>input:</span>
                <Button
                  onClick={() => {
                    setInputValue(exampleString)
                  }}
                >
                  Sample
                </Button>
                <Button
                  onClick={() => {
                    setInputValue('')
                  }}
                >
                  clear
                </Button>
              </Space>
            </div>
            <div>
              <RadioGroup
                onChange={(e) => {
                  setCurType(e.target.value)
                }}
                value={curType}
              >
                {typeRadios.map((item, index) => {
                  return <Radio value={item}>{item}</Radio>
                })}
              </RadioGroup>
            </div>
          </div>
          <div className="input-wrap">
            <AutoFitTextAreaWithRef
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(value) => {
                setInputValue(value)
              }}
            ></AutoFitTextAreaWithRef>
          </div>
          <div className="action-bar">
            <Space>
              <span>Output:</span>
              <Button
                icon={<CornerLeftUp theme="outline" />}
                onClick={() => {
                  setInputValue(outputValue)
                }}
              >
                Us as input
              </Button>
            </Space>
            <Button
              icon={<Copy theme="outline" />}
              onClick={() => {
                copy(outputValue)
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
  )
}
