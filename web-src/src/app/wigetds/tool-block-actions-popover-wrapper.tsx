import { forwardRef, ReactNode, Ref } from "react";

export const ToolBlockActionsPopoverWrapper = forwardRef(
  (
    props: { child: ReactNode; tooltip?: string },
    ref: Ref<HTMLSpanElement>
  ) => <span ref={ref}>{props.child}</span>
);
