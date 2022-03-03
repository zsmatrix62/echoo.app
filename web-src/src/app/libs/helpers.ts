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

export function findNodesByClassName<T extends HTMLElement>(parent: HTMLElement, className: string): Array<T> {
    let nodes = parent.getElementsByClassName(className)
    let returnVals: Array<T> = []
    for (let nodesKey in nodes) {
        let node = nodes[nodesKey];
        if (node instanceof HTMLElement) {
            returnVals.push(node as T)
        }
    }
    return returnVals
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

export function base64ToArrayBuffer(base64: string) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}

export function arrayBufferToBase64(dView: Uint8Array) {

    const arr = Array.prototype.slice.call(dView); //Create a normal array

    const arr1 = arr.map(function (item) {
        return String.fromCharCode(item);    //Convert
    });

    return window.btoa(arr1.join(''));   //Form a string

}


export function saveBase64AsFile(base64: string, fileName: string) {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.setAttribute("type", "hidden");
    link.href = "data:text/plain;base64," + base64;
    link.download = fileName;
    link.click();
    document.body.removeChild(link);
}
