import {useObservableState} from "observable-hooks";
import {from} from "rxjs";

export const useWasmAPI = () => {
    return useObservableState(from(import('wasm-api')))
}