import { spawn } from 'node:child_process';

async function AsyncSpawn (command: string, options: string[] = []) {
    return new Promise((resolve, reject) => {
        const shell = spawn(command, options);
        let output = {stdout: [], stderr: []}

        shell.stdout.on('data', data => {
            output.stdout.push(data.toString("ascii"));
        })
        
        shell.stderr.on('data', data => {
            output.stdout.push(data.toString("ascii"));
        })

        shell.on('error', reject);
    
        shell.on('close', code => {
            if (code === 0) resolve(output);
            else resolve(output);
        })
    })
}

export default AsyncSpawn;