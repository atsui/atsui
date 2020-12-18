import { dest, src, task, series } from 'gulp';
import { join } from 'path';
import { BuildPackage } from '../build-package';
import { inlineResourcesForDirectory } from '../inline-resources';
import { buildSassPipeline } from './build-sass-pipeline';

/**
 * Creates a set of gulp tasks that can build the specified package.
 * @param buildPackage Build package for which the gulp tasks will be generated
 * @param preBuildTasks List of gulp tasks that should run before building the package.
 */
export function createPackageBuildTasks(buildPackage: BuildPackage, preBuildTasks: string[] = []) {

    // Name of the package build tasks for Gulp.
    const taskName = buildPackage.name;

    /**
     * ng tasks
     */

    task(`${taskName}:ng:build`, (done: any) => {
        buildPackage.ngBuild(done);
    });

    task(`${taskName}:ng:test`, (done: any) => {
        buildPackage.ngTest(done);
    });

    task(`${taskName}:scss:bundle:theming`, (done: any) => {
        buildPackage.scssBundle(done);
    });

    task(`${taskName}:sass:themes`, (done: any) => {
        buildPackage.buildSass();
        done();
    });

    /**
     * build tasks
     */

    task(`${taskName}:build`, series(
        'clean',
        `${taskName}:ng:build`,
        `${taskName}:scss:bundle:theming`,
        `${taskName}:sass:themes`
    ));
}
