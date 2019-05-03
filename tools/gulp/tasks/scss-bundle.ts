import { relative } from 'path';
import { Bundler } from 'scss-bundle';
import { writeFile } from 'fs-extra';
import * as path from 'path';
import * as fs from 'fs';
import { src, dest } from 'gulp';
import { join } from 'path';

export function bundleScss(srcRoot: string, srcGlobOrDir: string | string[], destRoot: string) {
    const srcGlob:  string[] = typeof srcGlobOrDir === 'string' ? [ srcGlobOrDir ] : srcGlobOrDir; 

    return new Promise(async (resolve, reject) => {

        const bundler = new Bundler();
        const result = await bundler.Bundle(srcRoot, srcGlob, [], ['~@angular/.*']);
       
        if (result.imports) {
            const cwd = process.cwd();

            const filesNotFound = result.imports
                .filter(x => !x.found && !x.ignored)
                .map(x => relative(cwd, x.filePath));

            if (filesNotFound.length) {
                console.error(`SCSS imports failed \n\n${filesNotFound.join('\n - ')}\n`);
                // throw new Error('One or more SCSS imports failed');
                reject('One or more SCSS imports failed');
            }
        }

        if (result.found) {

            fs.mkdirSync(path.dirname(destRoot));
            await writeFile(destRoot, result.bundledContent);
        }

        resolve();
    });
}
