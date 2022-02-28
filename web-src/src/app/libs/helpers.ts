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

export function formatNumber(n: number, fractionDigits: number = 0) {
    let ns = n.toFixed(fractionDigits) + '';
    let x = ns.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        // eslint-disable-next-line no-useless-concat
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
