class Utilities {
    PurifyString (text: string) {
        return text.replace("\n", " \\n ");
    }
}

const Util = new Utilities();

export default Util;