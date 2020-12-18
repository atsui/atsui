import {src, dest} from 'gulp';
import {join} from 'path';
import {buildConfig} from '../build-config';

// These imports lack of type definitions.
const gulpSass = require('gulp-sass');
const nodeSass = require('sass');

const sassIncludePaths = [
  join(buildConfig.projectDir, 'node_modules/')
];

// Set the compiler to our version of `sass`, rather than the one that `gulp-sass` depends on.
gulpSass.compiler = nodeSass;

/** Create a gulp task that builds SCSS files. */
export function buildSassPipeline(sourceDir: string, glob: string, outputDir: string, includePaths?: string[]) {

    return src(join(sourceDir, glob))
        .pipe(gulpSass.sync({
            includePaths: includePaths,
            outputStyle: 'compressed'
        }).on('error', gulpSass.logError))
        .pipe(dest(outputDir));
}
