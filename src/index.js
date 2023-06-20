var argv = process.argv.slice(2);

import GetInAndOutput from "./components/getinputs";
import EditAndRunJS from "./components/editandrunjs";

async function TestScript (args) {
    const expects = await GetInAndOutput(args[1]);
    await EditAndRunJS(args[0], expects);
}

TestScript(argv);