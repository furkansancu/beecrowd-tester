import { spawn } from 'child_process';

async function AsyncSpawn (command: string, options: string[] = []) {
    let output: {stdout: string[], stderr: string[]} = {stdout: [], stderr: []}
    await new Promise((resolve, reject) => {
        const shell = spawn(command, options);

        shell.stdout.on('data', data => {
            output.stdout.push(data.toString("ascii"))
        })
        
        shell.stderr.on('data', data => {
            output.stderr.push(data.toString("ascii"))
        })

        shell.on('error', error => { 
            output = {stdout: [], stderr: [error.message]};
            resolve(true)
        });
    
        shell.on('close', code => { resolve(true) });
    })
    return output;
}

export default AsyncSpawn;