import Util from "./Util";
import chalk from 'chalk';

class Console {
    Error (message: string, description?: string) {
        console.log(`${chalk.red("ERROR:")} ${chalk.white(message)} ${description != null ? chalk.gray("\n    -> " + description) : ""}`);
        process.exit(0);
    }

    TestResult (input: string, expected: string, output: string) {
        input = Util.PurifyString(input);
        expected = Util.PurifyString(expected);
        output = Util.PurifyString(output);
        const result = expected == output ? chalk.green("SUCCESS") : chalk.red("FAIL");
        
        console.log(`${chalk.gray("(TEST CASE - ")}${result}${chalk.gray(") INPUT:")} ${chalk.blue(input)} ${chalk.gray("| EXPECTED OUTPUT:")} ${chalk.blue(expected)} ${chalk.gray("| OUTPUT:")} ${chalk.blue(output)}`);
    }

    FinalResult (result: boolean) {
        if (result) console.log(`${chalk.green("SUCCESSFUL:")} ${chalk.yellow("ALL TEST RESULTS HAD BEEN SUCCESSFUL!")}`);
        else console.log(`${chalk.red("UNSUCCESSFUL:")} ${chalk.yellow("SOME TEST RESULTS HAD BEEN FAILED!")}`);
    }
}

const ConsoleMenager = new Console();

export default ConsoleMenager;