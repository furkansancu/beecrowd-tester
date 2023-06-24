import FileMenager from "./FileMenager";
import ConsoleMenager from "./ConsoleMenager";

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

    async CheckInputs (arguements: string[]) {
        const correct_use = "Correct sytnax: [script_file_path] [challange_id] [code_language]";
        const file_error = () => {ConsoleMenager.Error("Please define a valid script file path.", correct_use)}
        const challange_error = () => {ConsoleMenager.Error("Please define a valid challange id.", correct_use)}
        const language_error = () => {ConsoleMenager.Error("Please define a valid script language.", correct_use)}

        if (typeof arguements[0] != "string") file_error();
        if (arguements[0].length < 1) file_error();
        if (await FileMenager.CheckFile(arguements[0]) != true) file_error();

        if (typeof arguements[1] != "string") challange_error();
        if (arguements[1].length < 1) challange_error();

        if (typeof arguements[2] != "string") language_error();
        if (arguements[2].length < 1) language_error();
    }
}

const Util = new Utilities();

export default Util;