import { Encoding } from "./encoding";

class UTF8 implements Encoding {
    toBytes(str: string): Uint8Array {
        const items: number[] = [];
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            // UTF-16 编码范围 : 0 - 0xFFFF
            // 辅助平面通过代理对实现
            if (code < 0x80) {
                // 1 字节 (ASCII)
                items.push(code);
            } else if (code < 0x800) {
                // 2 字节
                const item1 = 0xC0 | code >>> 6;
                const item2 = 0x80 | 0x3F & code;
                items.push(item1, item2);
            } else if (code < 0xD800 || code > 0xDFFF) {
                // 3 字节
                const item1 = 0xE0 | code >>> 12;
                const item2 = 0x80 | 0x3F & code >>> 6;
                const item3 = 0x80 | 0x3F & code;
                items.push(item1, item2, item3);
            } else {
                // 4 字节 (UTF-16 代理对)
                // 高位代理 : 0xD800 - 0xDBFF
                // 低位代理 : 0xDC00 - 0xDFFF
                if (i == str.length - 1 || code > 0xDBFF) {
                    throw new RangeError();
                }
                const j = i + 1;
                const next = str.charCodeAt(j);
                if (next < 0xDC00 || next > 0xDFFF) {
                    throw new RangeError();
                }
                const higher = code - 0xD800;
                const lower = next - 0xDC00;
                code = 0x10000 + (higher << 10 | lower);
                const item1 = 0xF0 | code >>> 18;
                const item2 = 0x80 | 0x3F & code >>> 12;
                const item3 = 0x80 | 0x3F & code >>> 6;
                const item4 = 0x80 | 0x3F & code;
                items.push(item1, item2, item3, item4);
                i = j;
            }
        }
        return new Uint8Array(items);
    }

    toString(codes: Uint8Array): string {
        let str = "";
        for (let i = 0; i < codes.length; i++) {
            const item1 = codes[i];
            if (item1 >>> 7 === 0x00) {
                // 1 字节 (ASCII)
                str += String.fromCharCode(item1);
            } else if (item1 >>> 5 === 0x06) {
                // 2 字节
                if (i > codes.length - 2) {
                    throw new RangeError();
                }
                const j = i + 1;
                const item2 = codes[j];
                if (item2 >>> 6 !== 0x02) {
                    throw new RangeError();
                }
                const code = (item1 & 0x1F) << 6 | item2 & 0x3F;
                str += String.fromCharCode(code);
                i = j;
            } else if (item1 >>> 4 === 0x0E) {
                // 3 字节
                if (i > codes.length - 3) {
                    throw new RangeError();
                }
                let j = i + 1;
                const item2 = codes[j];
                if (item2 >>> 6 !== 0x02) {
                    throw new RangeError();
                }
                j++;
                const item3 = codes[j];
                if (item3 >>> 6 !== 0x02) {
                    throw new RangeError();
                }
                const code = (item1 & 0x0F) << 12 | (item2 & 0x3F) << 6 | item3 & 0x3F;
                str += String.fromCharCode(code);
                i = j;
            } else if (item1 >>> 3 === 0x1E) {
                // 4 字节 (UTF-16 代理对)
                if (i > codes.length - 4 || item1 > 0xF4) {
                    throw new RangeError();
                }
                let j = i + 1;
                const item2 = codes[j];
                if (item2 >>> 6 !== 0x02 || item1 === 0xF4 && item2 > 0x8F) {
                    throw new RangeError();
                }
                j++;
                const item3 = codes[j];
                if (item3 >>> 6 !== 0x02) {
                    throw new RangeError();
                }
                j++;
                const item4 = codes[j];
                if (item4 >>> 6 !== 0x02) {
                    throw new RangeError();
                }
                let code = (item1 & 0x07) << 18 | (item2 & 0x3F) << 12 | (item3 & 0x3F) << 6 | item4 & 0x3F;
                code = code - 0x10000;
                const higher = (code >>> 10) + 0xD800;
                const lower = (code & 0x003FF) + 0xDC00;
                str += String.fromCharCode(higher, lower);
                i = j;
            } else {
                throw new RangeError();
            }
        }
        return str;
    }
}

export { UTF8 };