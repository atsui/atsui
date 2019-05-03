import { src, dest } from 'gulp';
import { join } from 'path';

// These imports lack of type definitions.
const gulpSass = require('gulp-sass');
const gulpIf = require('gulp-if');
const gulpCleanCss = require('gulp-clean-css');
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpGlatten = require('gulp-flatten');

/** Create a gulp task that builds SCSS files. */
export function buildScss(sourceDir: string, outputDir: string, glob: string | string[] = '**/*.scss', minifyOutput = false) {
    if (typeof glob === 'string') { glob = [glob]; }

    return src(glob.map((g) => join(sourceDir, g)), {})
        .pipe(gulpSass({
            includePaths: ['./node_modules'] // not working
        }).on('error', gulpSass.logError))
        .pipe(gulpIf(minifyOutput, gulpCleanCss()))
        .pipe(gulpAutoprefixer())
        .pipe(gulpGlatten())
        .pipe(dest(outputDir, { overwrite: true }));
}
