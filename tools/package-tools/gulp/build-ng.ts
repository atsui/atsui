// const run = require('gulp-run');

// // var childProcess = require('child_process');

// export function buildNgPipeline(action: string, packageName: string, ...args: any[]) {

//     // return childProcess.exec('cd ./../ &&  ng build', function (err: any) {
//     //     console.log(err);
//     // });

//     return run('cd ./../ && ng '+ action +' '+ packageName +' '+ args.join(' '), {}).exec();
// }



var gulp = require('gulp');
var exec = require('child_process').exec;

export function buildNgPipeline(action: string, packageName: string, done: any, ...args: string[]) {

    exec('cd ./../ && ng '+ action +' '+ packageName +' '+ args.join(' '),(error: any, stdout: any, stderr: any ) => {
        if (error) {

            // This won't show up until the process completes:
            console.log('[ERROR]: "' + error.name + '" - ' + error.message );
            console.log('[STACK]: ' + error.stack );

            throw new Error(error.name + '" - ' + error.message);
        }

        // Neither will this:
        console.log( stdout );
        console.log( stderr );

        done();
    });

    // childProcess.stdout.on
    // (
    //     'data',
    //     ( data ) =>
    //     {
    //         // This will render 'live':
    //         console.log( '[STDOUT]: ' + data );
    //     }
    // );
}


