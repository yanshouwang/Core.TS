import { Encoder } from "./encoder";
import { ASCII } from "./ascii";
import { UTF8 } from "./utf8";

abstract class Encoding {
    static readonly ASCII: Encoder = new ASCII();
    static readonly UTF8: Encoder = new UTF8();
}

export { Encoding };