# Echoo
![](https://img.shields.io/github/release/echoo-app/echoo-app-be.svg?style=flat-square)
![](https://img.shields.io/github/downloads/echoo-app/echoo-app-be/total.svg?style=flat-square)

`Echoo` is another collection of tools for developers.

## Web

`Echoo` provides online version of the same tools: [https://echoo.app](https://echoo.app)

## Client

Client version of `Echoo` provides full `offline` features, download them from the release page.

----

![](docs/json-1.png)

-----

## Features

Click link to check screenshots

### Formatters

- [x] [JSON Formatter Validator](docs/json-formatter.md)
- [ ] Base64/Base64 Image encoder and decoder
- [ ] URL encoder and decoder
- [ ] URL Parser
- [ ] JWT Debugger
- [ ] RegExp Tester
- [ ] SQL Formatter
- [ ] Cron Job Parser

### Generators

- [ ] UUID/ULID Generator/Decoder
- [ ] Hash Generator

### Converters

- [ ] Number Base Converter
- [ ] Unix Time Converter
- [ ] JSON <- -> YAML

# Development

## Architecture / Workspace

### /api

gRPC API for both client and [https://echoo.app](https://echoo.app)

### /src-tauri

`tauri` source directory for offline clients

### /web-src

`React` + `Typescript` source for frontend UI

## Build bundle

```shell
make build-bundle
```

Check bundle file in `target/release` directory