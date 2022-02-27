import {JsonFormatterServiceClient} from "../libs/proto/json-formatter_pb_service";
import {createContext} from "react";

export const API_URL = "https://api.echoo.app"

// export const API_URL = "http://127.0.0.1:8080"

export class APIService {
    public JsonFormatterAPI: JsonFormatterServiceClient

    constructor() {
        this.JsonFormatterAPI = new JsonFormatterServiceClient(this.GetAPIHost())
    }

    // noinspection JSMethodCanBeStatic
    private GetAPIHost() {
        // @ts-ignore
        let localAPIPort = window["local-api-port"]
        if (localAPIPort) {
            console.debug(`local api port is: ${localAPIPort}`)
            return `http://localhost:${localAPIPort}`
        } else {
            console.debug(`local port unavailable using web service: ${API_URL}`)
            return API_URL
        }
    }
}

export const APIServiceContext = createContext(new APIService());
