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
            return await ExecuteJS(filepath, expects);
    }
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
                    if (err) ConsoleHandler.ThrowError("", clearFilesFromError(err.message));
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