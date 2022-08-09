<div align="center">
<img height=150 src="https://raw.githubusercontent.com/zsmatrix62/echoo-app/main/src-tauri/icons/128x128.png" />
</div>

<p align="center"><span>A cross-platform desktop application of tools for developers
</span></p>

<div align="center">

[![Download Counts](https://img.shields.io/github/downloads/zsmatrix62/echoo-app/total?style=flat)](https://github.com/zsmatrix62/echoo-app/releases)
[![Stars Count](https://img.shields.io/github/stars/zsmatrix62/echoo-app?style=flat)](https://github.com/zsmatrix62/echoo-app/stargazers)
[![Issues Count](https://img.shields.io/github/issues/zsmatrix62/echoo-app.svg?style=flat)](https://github.com/zsmatrix62/echoo-app/issues)

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Version](https://img.shields.io/github/release/echoo-app/echoo-app.svg?style=flat-square)](https://github.com/zsmatrix62/echoo-app/releases)

[![Windows Support](https://img.shields.io/badge/Windows-0078D6?style=flat&logo=windows&logoColor=white)](https://github.com/zsmatrix62/echoo-app/releases)
[![macOS Support](https://img.shields.io/badge/MACOS-adb8c5?style=flat&logo=macos&logoColor=white)](https://github.com/zsmatrix62/echoo-app/releases)
[![Linux Support](https://img.shields.io/badge/linux-1793D1?style=flat&logo=linux&logoColor=white)](https://github.com/zsmatrix62/echoo-app/releases)

</div>

## 🌏 Online Web

[This website](https://zsmatrix62.github.io/echoo-app/) provides online version of the same
tools **[echoo](https://zsmatrix62.github.io/echoo-app/)**

## 💻 Offline Client

Client provides full `offline` features without any remote API calls, download them from
the [release page](https://github.com/echoo-app/echoo-app/releases).

---

## 🎉 Features / Todos

Click link to check screenshots

### Formatters

- [x] [JSON Formatter Validator](docs/json-formatter.md)
- [x] [Base64 (Image) Encoder and Decoder](docs/base64-ende.md)
- [x] [URL Parser, Encoder and Decoder](docs/url-parser.md)
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

### /wasm-api

WASM for both client and [web site](https://zsmatrix62.github.io/echoo-app/)

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

  Follow this [command](https://github.com/zsmatrix62/echoo-app/blob/2bac67f838d7504974652fbfb93942a8d66a3e7b/.github/workflows/main.yml#L31)

Check bundle file in `target/release` directory

## LICENSE

[AGPL-3.0](https://github.com/zsmatrix62/echoo-app/blob/main/LICENSE)

---

## Examples
  <table>
  <tr>
    <td> 
     <img src="docs/img/json-1.png" width=680px>
    </td>
    <td> 
      <img src="docs/img/json-2.png" width=680px>
    </td>
  </tr> 
  <tr> <td> <img src="docs/img/base64-img.png" width=680px></td>
    <td> <img src="docs/img/base64-str.png" width=680px></td>
  </tr>
  <tr>
    <td> 
      <img src="docs/img/url-parser.png" width=680px>
      </td> 
  </tr>
</table>
