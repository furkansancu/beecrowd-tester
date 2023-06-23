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
        let print = "TEST CASE: ".gray;
        print += `(${Util.PurifyString(input)}) => (${Util.PurifyString(expected)}) `.blue
        print += `| YOUR RESULT: ${Util.PurifyString(output)} `.yellow
        if (expected == output)
            print += `| SUCCESSFUL!`.green
        else
            print += `| UNSUCCESSFUL`.red

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