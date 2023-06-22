import fs from 'fs';
import { exec } from 'child_process';

import Util from './Util';
import ConsoleHandler from './ConsoleHandler';

async function ExecuteLanguage (filepath, expects, lang) {
    switch (lang) {
        default:
            ConsoleHandler.ThrowError("Undefined language, please select a supported language.", "Language(" + lang + ") not supported.");
            break;
        case "node":
        case "nodejs":
        case "node":
            await CheckJS();
            return await ExecuteJS(filepath, expects);
    }
}

async function CheckJS () {
    const error = () => ConsoleHandler.ThrowError(
        "NodeJS could not be reached.",
        "Before testing your script, Please install NodeJS from this link: https://nodejs.org/en"
        + "\n    This error might be also appear if Nodejs is not in the PATH.");
    await new Promise(resolve => {
        exec("node --version", (err, stdout, stderr) => {
            if (err || stderr) error();

            try {
                // Check version
                const version1 = parseInt(stdout.split(".")[0].slice(1));
                const version2 = parseInt(stdout.split(".")[1]);
                if (version1 < 8) error();
                else if (version1 == 8 && version2 < 4) error();
                else resolve(true);
            } catch {
                error();
            }
        });
    });
}

async function ExecuteJS (filepath, expects) {
    let original_file

    try { original_file = await fs.promises.readFile(filepath, 'utf8'); }
    catch { ConsoleHandler.ThrowError("Could not locate script file.", "filepath: " + filepath); }

    const cleared_file = original_file.replace("var input = require('fs').readFileSync('/dev/stdin', 'utf8');", "");

    let allSuccess = true;

    for (const expect of expects) {
        const input = `var input = "${expect[0].replace(/\n/, "\\n")}"\n`;
        let script = input + cleared_file;
        script = Util.TidyJS(script);

        try {
            await new Promise(resolve => {
                const child = exec("node", (err, stdout, stderr) => {
                    if (err) ConsoleHandler.ThrowError("", Util.ClearFilesFromError(err.message));
                    const result = stdout.slice(0, stdout.length - 1);
                    const success = expect[1] == result;

                    ConsoleHandler.PromptTest(expect[0], expect[1], result);
    
                    if (!success) allSuccess = false;

                    resolve(success);
                });
                child.stdin.write(script);
                child.stdin.end();
            });
        } catch (err) {
            ConsoleHandler.ThrowError("Could not execute script.", err);
        }
    }

    return allSuccess;
}

export default ExecuteLanguage;