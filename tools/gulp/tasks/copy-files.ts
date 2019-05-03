import * as gulp from 'gulp';
import * as fs from 'fs';
import * as path from 'path';
import { globify } from './_common';

/** Copy files from a glob to a destination. */
export function copyTask(srcGlobOrDir: string | string[], outRoot: string) {
    if (typeof srcGlobOrDir === 'string') {
        return () => gulp.src(globify(srcGlobOrDir)).pipe(gulp.dest(outRoot));
    } else {
        return () => gulp.src(srcGlobOrDir.map(name => globify(name))).pipe(gulp.dest(outRoot));
    }
}
