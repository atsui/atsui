import {src, dest} from 'gulp';
import {join} from 'path';
import {buildConfig} from '../build-config';

const gulpSass = require('gulp-sass');
const nodeSass = require('sass');

const sassIncludePaths = [
  join(buildConfig.projectDir, 'node_modules/')
];

gulpSass.compiler = nodeSass;

export function buildSassPipeline(sourceDir: string, glob: string, outputDir: string, includePaths?: string[]) {

    return src(join(sourceDir, glob))
        .pipe(gulpSass.sync({
            includePaths: includePaths,
            outputStyle: 'compressed'
        }).on('error', gulpSass.logError))
        .pipe(dest(outputDir));
}
