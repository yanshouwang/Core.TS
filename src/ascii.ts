import { Encoding } from "./encoding";

class ASCII implements Encoding {
    toArray(str: string): number[] {
        const array: number[] = [];
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            // UTF-16 编码范围 : 0 - 0xFFFF
            // ASCII 编码范围 : 0 - 0x7F
            if (code < 0x80) {
                array.push(code);
            } else {
                throw new RangeError();
            }
        }
        return array;
    }

    toString(array: number[]): string {
        let str = "";
        for (let i = 0; i < array.length; i++) {
            const code = array[i];
            if (code < 0 || code > 0x7F) {
                throw new RangeError();
            } else {
                str += String.fromCharCode(code);
            }
        }
        return str;
    }
}

export { ASCII };