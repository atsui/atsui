import { ExecTaskOptions, execTask } from './exec';

const resolveBin = require('resolve-bin');

/**
 * Create a task that executes an NPM Bin, by resolving the binary path then executing it. These are
 * binaries that are normally in the `./node_modules/.bin` directory, but their name might differ
 * from the package. Examples are typescript, ngc and gulp itself.
 */
export function execNodeTask(packageName: string, executable: string | string[], args?: string[], options: ExecTaskOptions = {}): Promise<any> {
    if (!args) {
        args = <string[]>executable;
        executable = '';
    }

    return new Promise((resolve, reject) => {
        
        resolveBin(packageName, { executable: executable }, (err: any, binPath: string) => {
            if (err) {
                reject(err);
            } else {
                // Execute the node binary within a new child process using spawn.
                // The binary needs to be `node` because on Windows the shell cannot determine the correct
                // interpreter from the shebang.
                execTask('node', [binPath].concat(args!), options)
                    .then(() => resolve());
            }
        });
    });
}



// import {resolve as resolvePath} from 'path';
// import {spawn} from 'child_process';
// import {red} from 'chalk';

// /**
//  * Spawns a child process that compiles using ngc.
//  * @param flags Command-line flags to be passed to ngc.
//  * @returns Promise that resolves/rejects when the child process exits.
//  */
// export function ngcCompile(flags: string[]) {
//   return new Promise((resolve, reject) => {
//     const ngcPath = resolvePath('./node_modules/.bin/ngc');
//     const childProcess = spawn(ngcPath, flags, {shell: true});

//     // Pipe stdout and stderr from the child process.
//     childProcess.stdout.on('data', (data: string|Buffer) => console.log(`${data}`));
//     childProcess.stderr.on('data', (data: string|Buffer) => console.error(red(`${data}`)));
//     childProcess.on('exit', (exitCode: number) => exitCode === 0 ? resolve() : reject());
//   });
// }
