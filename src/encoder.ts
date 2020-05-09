interface Encoder {
    /**
     * 将指定字符串编码为字节数组
     * @param str 字符串
     * @returns 字节数组
     * @throws {RangeError} 字符串越界
     */
    toBytes(str: string): Uint8Array;
    /**
     * 将指定字节数组解码为字符串
     * @param codes 字节数组
     * @returns 字符串
     * @throws  {RangeError} 字节数组越界
     */
    toString(codes: Uint8Array): string;
}

export { Encoder };