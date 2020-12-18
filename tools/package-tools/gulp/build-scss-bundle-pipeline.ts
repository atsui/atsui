import {join} from 'path';
import { Bundler } from 'scss-bundle';
import * as fs from 'fs';

/** Create a gulp task that builds SCSS files. */
export function buildScssBundlePipeline(projectPath: string, entryFile: string, outputFile: string, done: any, dedupeGlobs?: string[], includePaths?: string[], ignoreImports?: string[]) {

    (async (done: any) => {
        const bundler = new Bundler(undefined, projectPath);

        const { found, bundledContent } = await bundler.bundle(
            join(projectPath, entryFile),
            dedupeGlobs,
            includePaths,
            ignoreImports);

        if (!found) {
            console.log('[ERROR]: "' + entryFile + '" - not found');
            throw new Error(entryFile + '" - not found');
        }

        if (!bundledContent) {
            console.log('[ERROR]: "' + bundledContent + '" - undefined');
            throw new Error(bundledContent + '" - undefined');
        }

        fs.writeFileSync(outputFile, bundledContent);

        done();
    })(done);
}
