import { Encoder } from "./encoder";

class ASCII implements Encoder {
    toBytes(str: string): Uint8Array {
        const items: number[] = [];
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            // UTF-16 编码范围 : 0 - 0xFFFF
            // ASCII 编码范围 : 0 - 0x7F
            if (code < 0x80) {
                items.push(code);
            } else {
                throw new RangeError();
            }
        }
        return new Uint8Array(items);
    }

    toString(codes: Uint8Array): string {
        let str = "";
        for (let i = 0; i < codes.length; i++) {
            const code = codes[i];
            if (code < 0x80) {
                str += String.fromCharCode(code);
            } else {
                throw new RangeError();
            }
        }
        return str;
    }
}

export { ASCII };