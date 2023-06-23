import AsyncSpawn from "./AsyncSpawn";
import ConsoleMenager from "./ConsoleMenager"
import FileMenager from './FileMenager';

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
            const version = shell['stdout'][0];

            // Check version
            const version1 = parseInt(version.split(".")[0].slice(1));
            const version2 = parseInt(version.split(".")[1]);
            const version3 = parseInt(version.split(".")[2]);

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
            try {
                const shell = await AsyncSpawn("node", [temp_script_path]);
                const result = shell['stdout'][0].replace("\n", "");
                const success = sample[1] == result;
                if (!success) allSuccess = false;

                ConsoleMenager.TestResult(sample[0], sample[1], result);
            } catch (e) {
                ConsoleMenager.Error("Could not execute script.", e);
            }
        }

        return allSuccess;
    }
}

const Langs = new Languages();

export default Langs;