import { Encoding } from "./encoding";
import { ASCII } from "./ascii";
import { UTF8 } from "./utf8";

abstract class Encodings {
    static readonly ASCII: Encoding = new ASCII();
    static readonly UTF8: Encoding = new UTF8();
}

export { Encodings };