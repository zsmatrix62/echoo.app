## Environments

- `DEVUTILS_API_WEB=1` serve to port `443` else `random`
- `RUST_DEBUG=1` serve to port `8080' else follow `DEVUTILS_API_WEB`

## Local API / Tauri Plugin

If API service is started form [Tauri Plugin](src/plugin.rs) - an attribute `local-api-port` will be set to `Window`
object, frontend shall read it for connect to LocalAPI `http://127.0.0.1:<local-api-port>` for local api calling inside tauri.

if `local-api-port` was not read, use web service API.