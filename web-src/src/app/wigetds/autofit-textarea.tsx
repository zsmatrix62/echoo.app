import * as React from 'react'
import { ForwardedRef, Ref, useEffect } from 'react'
import { Spin, TextArea } from '@douyinfe/semi-ui'
import './autofit-textarea.scss'
import { useObservableState } from 'observable-hooks'

type Props = {
  placeholder?: string
  forwardedRef?: Ref<HTMLTextAreaElement>
  value?: string
  onChange?: (val: string) => void
  isOnError?: Array<any>
  isLoading?: boolean
  style?: React.CSSProperties
}
const AutoFitTextArea = (props: Props) => {
  const [cls, setCls] = useObservableState<string>((obs) => {
    return obs
  }, 'text-area mod-normal')

  const [loading, setLoading] = useObservableState<boolean | undefined>(
    (obs) => {
      return obs
    },
    props.isLoading
  )
  useEffect(() => {
    // eslint-disable-next-line no-self-compare
    if (props.isOnError?.length ?? 0 > 0) {
      console.debug('setting error selection color')
      setCls('text-area mod-error')
    } else {
      console.debug('reverting selection color')
      setCls('text-area mod-normal')
    }
  }, [props.isOnError, setCls])

  useEffect(() => {
    setLoading(props.isLoading)
  }, [props.isLoading, setLoading])
  return (
    <>
      <TextArea
        onChange={props.onChange}
        value={props.value}
        className={cls}
        placeholder={props.placeholder}
        ref={props.forwardedRef}
        style={props.style}
      ></TextArea>
      {loading && (
        <Spin
          style={{ position: 'fixed', bottom: 95, paddingLeft: 10, zIndex: 99 }}
        />
      )}
    </>
  )
}

export const AutoFitTextAreaWithRef = React.forwardRef(
  (props: Props, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return <AutoFitTextArea forwardedRef={ref} {...props} />
  }
)
