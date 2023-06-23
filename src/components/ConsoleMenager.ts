import Util from "./Util";
import 'colorts/lib/string';

class Console {
    Error (message: string, description?: string) {
        let print = "ERROR: ".red;
        print += message.blue;
        if (description != undefined)
            print += "\n    " + description.gray;
        
        console.log(print);
        process.exit(1);
    }

    TestResult (input: string, expected: string, output: string) {
        input = Util.PurifyString(input);
        expected = Util.PurifyString(expected);
        output = Util.PurifyString(output);

        let print = "TEST CASE: ";
        if (expected == output)
            print = print.green;
        else
            print = print.red;
        print += `INPUT: ${input.blue} | EXPECTED OUTPUT: ${expected.blue} | RESULT: ${output.blue}`.gray;
        console.log(print);
    }

    FinalResult () {
        let print = "ALL SUCCESS: ".green;
        print += "ALL TEST RESULTS SUCCESSFUL!".cyan;
        console.log(print);
    }
}

const ConsoleMenager = new Console();

export default ConsoleMenager;