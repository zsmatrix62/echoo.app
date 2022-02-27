import {forwardRef, ReactNode, Ref} from "react";


export const ToolBlockActionsPopoverWrapper = forwardRef((props: { child: ReactNode, tooltip?: string }, ref: Ref<HTMLSpanElement>) => (
    // <Tooltip  content={props.tooltip}>
    <span ref={ref}>{props.child}</span>
    // </Tooltip>
))
