class Utilities {
    PurifyString (text: string) {
        return text.replace("\n", " \\n ");
    }

    ClearEscapeSequences (text: string) {
        let result = text;
        result = result.replaceAll("\n", "");
        result = result.replaceAll("\r", "");
        return result;
    }
}

const Util = new Utilities();

export default Util;