import Util from "./Util";

class Console {
    Error (message: string, description?: string) {
        console.log(`ERROR: ${message} \n ${description}`);
        process.exit(1);
    }

    TestResult (input: string, expected: string, output: string) {
        input = Util.PurifyString(input);
        expected = Util.PurifyString(expected);
        output = Util.PurifyString(output);
        const result = expected == output ? "SUCCESS" : "FAIL";
        
        console.log(`(TEST CASE - ${result}) INPUT: ${input} | EXPECTED OUTPUT: ${expected} | OUTPUT: ${output}`);
    }

    FinalResult () {
        console.log(`ALL SUCCESS: ALL TEST RESULTS SUCCESSFUL!`);
    }
}

const ConsoleMenager = new Console();

export default ConsoleMenager;