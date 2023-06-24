import Util from "./Util";

class Console {
    Error (message: string, description?: string) {
        console.log(`ERROR: ${message} ${description != null ? "\n    -> " + description : ""}`);
        process.exit(1);
    }

    TestResult (input: string, expected: string, output: string) {
        input = Util.PurifyString(input);
        expected = Util.PurifyString(expected);
        output = Util.PurifyString(output);
        const result = expected == output ? "SUCCESS" : "FAIL";
        
        console.log(`(TEST CASE - ${result}) INPUT: ${input} | EXPECTED OUTPUT: ${expected} | OUTPUT: ${output}`);
    }

    FinalResult (result: boolean) {
        if (result) console.log(`SUCCESSFUL: ALL TEST RESULTS HAD BEEN SUCCESSFUL!`);
        else console.log(`UNSUCCESSFUL: SOME TEST RESULTS HAD BEEN FAILED!`);
    }
}

const ConsoleMenager = new Console();

export default ConsoleMenager;