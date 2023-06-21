import GetInputs from "./components/GetInputs.js";
import ExecuteLanguage from "./components/ExecuteLangs.js";
import ConsoleHandler from "./components/ConsoleHandler.js";

const argvs = process.argv.slice(2);

const file = argvs[0];
const challange_id = argvs[1];
const lang = argvs[2];

async function TestScript () {
    const expects = await GetInputs(challange_id);
    const result = await ExecuteLanguage(file, expects, lang);
    if (result) ConsoleHandler.PromptSuccess();
}

TestScript();