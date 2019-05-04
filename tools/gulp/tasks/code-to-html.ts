import { src, dest } from 'gulp';
import {join} from 'path';

// These imports lack of type definitions.
const gulpHighlightFiles = require('gulp-highlight-files');
const gulpIf = require('gulp-if');
const gulpHtmlMin = require('gulp-htmlmin');
const gulpFlatten = require('gulp-flatten');
const gulpRename = require('gulp-rename');

/** Create a gulp task that builds SCSS files. */
export function codeToHtml(sourceDir: string, outputDir: string,
                           glob: string | string[] = ['**/*.html', '**/*.ts', '**/*.css', '!**/*.spec.ts'],
                           minifyOutput = false) {

    return new Promise(async (resolve, reject) => {

        if (typeof glob === 'string') { glob = [glob]; }

        return src(glob.map((g) => join(sourceDir, g)), {})
            .pipe(gulpHighlightFiles().on('error', reject))
            .pipe(gulpIf(minifyOutput, gulpHtmlMin({ collapseWhitespace: true })))
            .pipe(gulpFlatten())
            .pipe(gulpRename((path: any) => {
                path.extname += '.html';
            }))
            .pipe(dest(outputDir, { overwrite: true }))
            .on('end', resolve);
    });
}
