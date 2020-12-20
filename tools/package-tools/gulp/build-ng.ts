var gulp = require('gulp');
var exec = require('child_process').exec;

export function buildNgPipeline(action: string, packageName: string, done: any, ...args: string[]) {

    exec('cd ./../ && ng '+ action +' '+ packageName +' '+ args.join(' '),(error: any, stdout: any, stderr: any ) => {
        if (error) {

            console.log('[ERROR]: "' + error.name + '" - ' + error.message );
            console.log('[STACK]: ' + error.stack );

            throw new Error(error.name + '" - ' + error.message);
        }

        console.log( stdout );
        console.log( stderr );

        done();
    });
}


