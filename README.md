# Minima Enterprise Gateway

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Http <--> Minima <--> Http.

## Table of Contents

- [Built Using](#built-using)
- [Install](#install)
- [Build](#build)
- [Documentation](#Documentation)
- [Demo URLs](#demo-urls)
- [Maintainer](#maintainer)

## Built Using

- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [minima](https://github.com/minima-global/minima.js)

## Install

This project uses [node](http://nodejs.org/) and [npm](https://npmjs.com/) - please install those first, then clone this repository, switch to its root directory, and type `npm install`.

## Build

Create the admin' minidapp by running `npm run prod`.

## Documentation

Generate source code documentation via `./node_modules/typedoc/bin/typedoc --out docs/src src` - that will parse the comments in the codebase in the [src](/src) directory and create source code documentation in [docs/src](/docs/src). The [docs](/docs) directory also contains other documentation, such as the original [specification](/docs/specification.md), a system [overview](/docs/overview.md) and a [knowedge base](/docs/knowledgeBase.md) doc' that goes a bit further than the overview.

## Demo URLS

+ [http://127.0.0.1:9004/api/EMH/?command=send&amount=1&address=MxQ37CGQPS6R7XI4JHCLNNVGWSZ66NVJ5E&tokenid=0x00]
+ [127.0.0.1:9004/api/EMH/?command=gimme50&address=MxQ37CGQPS6R7XI4JHCLNNVGWSZ66NVJ5E]
+ [http://127.0.0.1:9004/api/EMH/?command=balance]
+ [http://127.0.0.1:9004/api/EMH/?command=newaddress]

## Maintainer

[Steve Huckle](https://glowkeeper.github.io/).

## License

GNU General Public License v3.0

See [COPYING](/COPYING.txt) to see the full text.
