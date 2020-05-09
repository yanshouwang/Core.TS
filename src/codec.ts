import { ASCII } from "./ascii";
import { UTF8 } from "./utf8";

/**
 * 编码译码器
 */
interface Codec {
    /**
     * 将指定字节数组解码为字符串
     * @param codes 字节数组
     * @returns 字符串
     * @throws  {RangeError} 字节数组越界
     */
    decode(codes: Uint8Array): string;
    /**
     * 将指定字符串编码为字节数组
     * @param str 字符串
     * @returns 字节数组
     * @throws {RangeError} 字符串越界
     */
    encode(str: string): Uint8Array;
}

/**
 * 创建编码译码器
 * @param mode 编码方式
 * @returns 编码译码器实例
 * @throws {RangeError} 不支持的编码方式
 */
function createCodec(mode: "ASCII" | "UTF-8"): Codec {
    switch (mode) {
        case "ASCII":
            return new ASCII();
        case "UTF-8":
            return new UTF8();
        default:
            throw new RangeError();
    }
}

export { Codec, createCodec };