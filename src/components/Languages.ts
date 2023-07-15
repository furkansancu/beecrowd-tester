import AsyncSpawn from "./AsyncSpawn";
import ConsoleMenager from "./ConsoleMenager";
import FileMenager from './FileMenager';
import Util from "./Util";

class Languages {
    Get (lang_code: String) {
        switch (lang_code) {
            default:
                ConsoleMenager.Error(
                    `Langauge(${lang_code}) is not supported, please select a supported language.`,
                    'Visit https://github.com/furkansancu/beecrowd-tester to check out supported langugaes.'
                );
                break;
            case "js":
            case "node":
            case "nodejs":
                return JavaScript;
            case "py":
            case "python":
            case "python3":
                return Python;
        }
    }
}

class JavaScript {
    async Verify () {
        const version_error = (version: string) => {
            ConsoleMenager.Error (
                `Nodejs version(${version}) is not supported.`,
                "Before testing your script, Please install supported version of NodeJS from this link: https://nodejs.org/en"
            );
        }

        const nodejs_error = () => {
            ConsoleMenager.Error (
                `Could not reach Nodejs.`,
                "Before testing your script, Please install NodeJS from this link: https://nodejs.org/en"
                + "\n    This error might be also appear if Nodejs is not in the PATH."
            );
        }

        try {
            const shell = await AsyncSpawn("node", ["--version"]);
            const version = shell.stdout[0];

            // Check version
            const version1 = parseInt(version.split(".")[0].slice(1));
            const version2 = parseInt(version.split(".")[1]);
            // const version3 = parseInt(version.split(".")[2]);

            if (version1 < 8) version_error(version);
            else if (version1 == 8 && version2 < 4) version_error(version);
            else return true;
        } catch (e) {
            nodejs_error();
        }
    }

    async Run (file_path: string, samples: any) {
        let original_file: string

        try { original_file = await FileMenager.ReadFile(file_path) }
        catch { ConsoleMenager.Error("Could not locate script file.", "filepath: " + file_path); }

        const cleared_file = original_file.replace("var input = require('fs').readFileSync('/dev/stdin', 'utf8');", "");

        let allSuccess = true;
        
        for (const sample of samples) {
            const input = `var input = "${sample[0].replace(/\n/, "\\n")}"\n`;
            let script = input + cleared_file;
            const temp_script_path = FileMenager.GetTempFileLocation("temp.js")
            await FileMenager.AddFile(temp_script_path, script);
            
            const shell = await AsyncSpawn("node", [temp_script_path]);

            if (shell.stderr.length > 0)
                ConsoleMenager.Error("Could not execute script.", shell.stderr[shell.stderr.length - 1]);

            const result = Util.ClearControlCharacters(shell.stdout[0]);
            const success = sample[1] == result;
            if (!success) allSuccess = false;

            ConsoleMenager.TestResult(sample[0], sample[1], result);
        }

        return allSuccess;
    }
}

class Python {
    async Verify () {
        const version_error = (version: string) => {
            ConsoleMenager.Error (
                `Python version(${version}) is not supported.`,
                "Before testing your script, Please install supported version of NodeJS from this link: https://python.org/downloads"
            );
        }

        const python_error = () => {
            ConsoleMenager.Error (
                `Could not reach Python.`,
                "Before testing your script, Please install Python from this link: https://python.org/downloads"
                + "\n    This error might be also appear if Python is not in the PATH."
            );
        }

        let version: string;

        try {
            const shell_A = await AsyncSpawn("python", ["--version"]);
            version = shell_A.stdout[0];
        } catch (e) {
            try {
                const shell_B = await AsyncSpawn("python3", ["--version"]);
                version = shell_B.stdout[0];
            } catch (e) {
                python_error();
            }
        }

        // Check version
        const version1 = parseInt(version.split(".")[0].slice(7));
        const version2 = parseInt(version.split(".")[1]);
        const version3 = parseInt(version.split(".")[2]);

        if (version1 < 3) version_error(version.slice(0, version.length - 2));
        else if (version1 == 3 && version2 < 4) version_error(version.slice(0, version.length - 2));
        else if (version1 == 3 && version2 == 4 && version3 < 3) version_error(version.slice(0, version.length - 2));
        else return true;
    }

    async Run (file_path: string, samples: string[][]) {
        let original_file: string

        try { original_file = await FileMenager.ReadFile(file_path) }
        catch { ConsoleMenager.Error("Could not locate script file.", "filepath: " + file_path); }

        let allSuccess = true;
        
        for (const sample of samples) {
            let queued_inputs = sample[0].split("\n");
            let foundInputs = 0;
            const regex = /input\((.*?)\)/mg;
            const script = original_file.replaceAll(regex, ( ) => {
                const queue = queued_inputs[foundInputs]
                foundInputs++;
                return `"${queue}"`;
            });

            if (queued_inputs.length != foundInputs)
                ConsoleMenager.Error("Error while parsing python script", "Could not locate enough input() for testing samples.");
                
            const temp_script_path = FileMenager.GetTempFileLocation("temp.js")
            await FileMenager.AddFile(temp_script_path, script);
            
            const shell = await AsyncSpawn("python", [temp_script_path]);

            if (shell.stderr.length > 0) {
                ConsoleMenager.Error("Could not execute script.", shell.stderr[1]);
            }

            const result = Util.ClearControlCharacters(shell.stdout[0]);
            const success = sample[1] == result;
            if (!success) allSuccess = false;

            ConsoleMenager.TestResult(sample[0], sample[1], result);
        }

        return allSuccess;
    }
}

const Langs = new Languages();

export default Langs;