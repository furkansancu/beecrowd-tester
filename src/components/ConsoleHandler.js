import Util from "./Util";

const chalk = require("chalk");

const ConsoleHandler = {
    ThrowError (message, description) {
        let print = chalk.red("ERROR: ");
        print += chalk.blue(message);
        if (description != undefined)
            print += "\n    " + chalk.gray(description);
        
        console.log(print);
        process.exit(1);
    },

    PromptTest (input, expected, output) {
        let print = chalk.gray("TEST CASE: ");
        print += chalk.blue(`(${Util.PurifyString(input)}) => (${Util.PurifyString(expected)}) `)
        print += chalk.yellow(`| YOUR RESULT: ${Util.PurifyString(output)} `)
        if (expected == output)
            print += chalk.green(`| SUCCESSFUL!`)
        else
            print += chalk.red(`| UNSUCCESSFUL`)

        console.log(print);
    },

    PromptSuccess () {
        let print = chalk.green("ALL SUCCESS: ");
        print += chalk.cyan("ALL TEST RESULTS SUCCESSFUL!");
        console.log(print);
    }
};

export default ConsoleHandler;