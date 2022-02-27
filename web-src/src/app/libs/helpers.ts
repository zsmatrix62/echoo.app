import {RefObject} from "react";
import {findDOMNode} from "react-dom";

export function GetRefNodeSize(ref: RefObject<any>) {
    const htmlNode = findDOMNode(ref.current) as HTMLElement
    return [htmlNode.offsetWidth ?? 0, htmlNode.offsetHeight ?? 0]
}

export function base64encode(str: string) {
    let encode = encodeURIComponent(str)
    return window.btoa(encode)
}

export function base64decode(str: string) {
    let decode = window.atob(str);
    return decodeURIComponent(decode)
}
