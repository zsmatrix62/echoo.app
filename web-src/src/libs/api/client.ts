import { ToolsClient } from "./proto/tools_grpc_web_pb"

// Generates a api client for native client or server
export function NewProperAPIClient() {
	const isTauri = !!window.__TAURI__;
	if (isTauri) {
		const server_url = `http://localhost:${window.rpc_port}`
		const client = new ToolsClient(server_url, null, null)
		return client
	} else {
		// TODO return a server client
	}
}
