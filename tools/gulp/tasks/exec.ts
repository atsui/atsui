import * as child_process from 'child_process';

/** Options that can be passed to execTask or execNodeTask. */
export interface ExecTaskOptions {
    // Whether STDOUT and STDERR messages should be printed.
    silent?: boolean;
    // Whether STDOUT messages should be printed.
    silentStdout?: boolean;
    // If an error happens, this will replace the standard error.
    errMessage?: string;
    // Environment variables being passed to the child process.
    env?: any;
    // Whether the task should fail if the process writes to STDERR.
    failOnStderr?: boolean;
}

/** Create a task that executes a binary as if from the command line. */
export function execTask(binPath: string, args: string[], options: ExecTaskOptions = {}): Promise<any> {

    return new Promise((resolve, reject) => {

        const env = Object.assign({}, process.env, options.env);
        const childProcess = child_process.spawn(binPath, args, { env });
        const stderrData: string[] = [];

        if (!options.silentStdout && !options.silent) {
            childProcess.stdout.on('data', (data: string) => process.stdout.write(data));
        }

        if (!options.silent || options.failOnStderr) {
            childProcess.stderr.on('data', (data: string) => {
                options.failOnStderr ? stderrData.push(data) : process.stderr.write(data);
            });
        }

        childProcess.on('close', (code: number) => {
            if (options.failOnStderr && stderrData.length) {
                reject(stderrData.join('\n'));
            } else {
                code != 0 ? reject(options.errMessage || `Process failed with code ${code}`) : resolve();
            }
        });
    });
}