class EncodingCase {
    readonly title: string;
    readonly str: string;
    readonly codes: number[];

    constructor(title: string, str: string, codes: number[]) {
        this.title = title;
        this.str = str;
        this.codes = codes;
    }
}

export { EncodingCase };