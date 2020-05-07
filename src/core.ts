import { Encoding } from "./encoding";
import { UTF8 } from "./utf8";

abstract class Encodings {
    static readonly UTF8: Encoding = new UTF8();
}

export { Encodings };