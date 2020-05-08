class EncodingCase {
    readonly title: string;
    readonly str: string;
    readonly array: number[];

    constructor(title: string, oriStr: string, array: number[]) {
        this.title = title;
        this.str = oriStr;
        this.array = array;
    }
}

export { EncodingCase };