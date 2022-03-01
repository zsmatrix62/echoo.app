# { Echoo.app }

![](https://img.shields.io/github/release/echoo-app/echoo-app.svg?style=flat-square)

![](src-tauri/icons/128x128.png)

[Echoo.app](https://echoo.app) is another collection of tools for developers providing offline client and web service.

## 🌏 Online Web

[Echoo.app](https://echoo.app) provides online version of the same tools **[echoo.app](https://echoo.app)**

## 💻 Offline Client

Client version of [Echoo.app](https://echoo.app) provides full `offline` features, download them from
the [release page](https://github.com/echoo-app/echoo-app/releases).

----

![](docs/img/json-2.png)
![](docs/img/json-1.png)

-----

## 🎉 Features / Todos

Click link to check screenshots

### Formatters

- [x] [JSON Formatter Validator](docs/json-formatter.md)
- [x] [Base64 (Image) encoder and decoder](docs/base64-ende.md)
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

# 🧑‍💻 Development

## Architecture / Workspace

### /api

gRPC API for both client and [https://echoo.app](https://echoo.app)

### /src-tauri

`tauri` source directory for offline clients

### /web-src

`React` + `Typescript` source for frontend UI

## Build bundle

- MacOS / Linux

```shell
git clone git@github.com:echoo-app/echoo-app.git && \
cd echoo-app && \
make build-bundle
```

- Windows

```bash
git clone https://github.com/echoo-app/echoo-app.git  && \
cd echoo-app  && \
yarn install && cd web-src && yarn build && cd .. && yarn tauri build
```

Check bundle file in `target/release` directory
