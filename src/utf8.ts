import { Encoding } from "./encoding";

class UTF8 implements Encoding {
    toArray(str: string): number[] {
        const array: number[] = [];
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            // UTF-16 编码范围 : 0 - 0xFFFF
            // 辅助平面通过代理对实现
            if (code < 0x80) {
                // 1 字节 (ASCII)
                array.push(code);
            } else if (code < 0x800) {
                // 2 字节
                const item1 = 0xC0 | code >>> 6;
                const item2 = 0x80 | 0x3F & code;
                array.push(item1, item2);
            } else if (code < 0xD800 || code > 0xDFFF) {
                // 3 字节
                const item1 = 0xE0 | code >>> 12;
                const item2 = 0x80 | 0x3F & code >>> 6;
                const item3 = 0x80 | 0x3F & code;
                array.push(item1, item2, item3);
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
                array.push(item1, item2, item3, item4);
                i = j;
            }
        }
        return array;
    }

    toString(array: number[]): string {
        let str = "";
        for (let i = 0; i < array.length; i++) {
            const code1 = array[i];
            if (code1 >>> 7 === 0x00) {
                // 1 字节 (ASCII)
                str += String.fromCharCode(code1);
            } else if (code1 >>> 5 === 0x06) {
                // 2 字节
                if (i > array.length - 2) {
                    throw new RangeError();
                }
                const j = i + 1;
                const code2 = array[j];
                if (code2 >>> 6 !== 0x02) {
                    throw new RangeError();
                }
                const code = (code1 & 0x1F) << 6 | code2 & 0x3F;
                str += String.fromCharCode(code);
                i = j;
            } else if (code1 >>> 4 === 0x0E) {
                // 3 字节
                if (i > array.length - 3) {
                    throw new RangeError();
                }
                let j = i + 1;
                const code2 = array[j];
                if (code2 >>> 6 !== 0x02) {
                    throw new RangeError();
                }
                j++;
                const code3 = array[j];
                if (code3 >>> 6 !== 0x02) {
                    throw new RangeError();
                }
                const code = (code1 & 0x0F) << 12 | (code2 & 0x3F) << 6 | code3 & 0x3F;
                str += String.fromCharCode(code);
                i = j;
            } else if (code1 >>> 3 === 0x1E) {
                // 4 字节 (UTF-16 代理对)
                if (i > array.length - 4 || code1 > 0xF4) {
                    throw new RangeError();
                }
                let j = i + 1;
                const code2 = array[j];
                if (code2 >>> 6 !== 0x02 || code1 === 0xF4 && code2 > 0x8F) {
                    throw new RangeError();
                }
                j++;
                const code3 = array[j];
                if (code3 >>> 6 !== 0x02) {
                    throw new RangeError();
                }
                j++;
                const code4 = array[j];
                if (code4 >>> 6 !== 0x02) {
                    throw new RangeError();
                }
                let code = (code1 & 0x07) << 18 | (code2 & 0x3F) << 12 | (code3 & 0x3F) << 6 | code4 & 0x3F;
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