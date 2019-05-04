import { src, dest } from 'gulp';
import {join} from 'path';

// These imports lack of type definitions.
const gulpHighlightFiles = require('gulp-highlight-files');
const gulpIf = require('gulp-if');
const gulpHtmlMin = require('gulp-htmlmin');
const gulpRename = require('gulp-rename');

/** Create a gulp task that builds SCSS files. */
export function codeToHtml(sourceDir: string, outputDir: string,
                           glob: string[] = ['**/*.html', '**/*.ts', '**/*.css', '!**/*.spec.ts'],
                           minifyOutput = false) {
    console.error(JSON.stringify(glob));
    return new Promise(async (resolve, reject) => {

        return src(glob.map((g) => {
                console.error(join(sourceDir, g));
                return join(sourceDir, g);
            }), {})
            .pipe(gulpRename((path: any) => {
                path.dirname = './';
                path.extname += path.extname;
            }))
            .pipe(gulpHighlightFiles().on('error', reject))
            .pipe(gulpIf(minifyOutput, gulpHtmlMin({ collapseWhitespace: true })))
            .pipe(dest(outputDir, { overwrite: true }))
            .on('end', resolve);
    });
}
