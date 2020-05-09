# Core.TS

![Node.js Package](https://github.com/yanshouwang/Core.TS/workflows/Node.js%20Package/badge.svg)

Core Lib for TypeScript

## 介绍

EMMM...先介绍一下背景吧，一个被 C# 惯坏的程序员，最近被安排搞小程序，果断选择了 TypeScript，然鹅在蓝牙通讯的时候头大了，ArrayBuffer 是什么鬼东西 - -! 找了很久发现居然没有找到把数组通过 UTF-8 解码和编码的功能 (手动掀桌)

把 [NPM](https://www.npmjs.org) 整个翻了一遍终于找到了 [decode-utf8](https://www.npmjs.com/package/decode-utf8) 和 [encode-utf8](https://www.npmjs.com/package/encode-utf8) 这两个包，解决了这个棘手的问题

后来本强迫症想了下，不如把这些痛点的功能整合起来方便以后复用, 对自己也是个不小的提高。 于是就有了这个项目，哈哈哈，想的很多，不过目前只提供编码和解码的功能啦，以后再有需求再说吧~

## 安装

```
npm install --save @yanshouwang/core
```

## 使用

### 编码解码

目前支持 ASCII 和 UTF-8

编码

``` TS
import { Codec } from "@yanshouwang/core";

// 准备数据
const str = "Hello, World!";
// ASCII
const codec = Codec.create("ASCII");
// UTF-8
// const codec = Codec.create("UTF-8");
const codes = codec.encode(str);
```

解码

``` TS
import { Codec } from "@yanshouwang/core";

// 准备数据
const items = [0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x2C, 0x20, 0x57, 0x6F, 0x72, 0x6C, 0x64, 0x21];
const codes = new Uint8Array(items);
// ASCII
const codec = Codec.create("ASCII");
// UTF-8
// const codec = Codec.create("UTF-8");
const str = codec.decode(codes);
```

## 关于
- 本萌新的本命语言是 C#，对于 TypeScript 的理解有限，有问题欢迎指正