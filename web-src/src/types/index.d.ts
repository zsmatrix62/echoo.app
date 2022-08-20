export { };
declare global {
	interface Window {
		__TAURI__: any;
		rpc_port: number;
	}
}
