import { task, series } from 'gulp';
import { join } from 'path';
import { AngularProject, AngularProjectType } from '../build-package';
import { buildSassPipeline } from './build-sass-pipeline';
import { buildScssBundlePipeline } from './build-scss-bundle-pipeline';
import { buildConfig } from '../build-config';

const { projectDir } = buildConfig;

/**
 * Creates a set of gulp tasks that can build the specified package.
 * @param buildPackage Build package for which the gulp tasks will be generated
 * @param preBuildTasks List of gulp tasks that should run before building the package.
 */
export function createAngularProjectTasks(buildPackage: AngularProject, preBuildTasks: string[] = []) {

    // Name of the package build tasks for Gulp.
    const taskName = buildPackage.name;

    const scssBundle = async (done: any) => {

        buildScssBundlePipeline(
            buildPackage.sourceDir,
            '/src/lib/theming-bundle.scss',
            join(buildPackage.outputDir, '/src/lib/_theming.scss'),
            done,
            undefined,
            [ projectDir + '/node_modules' ],
            [ '~@angular/.*' ]);
    }

    const buildSass = async () => {

        const includePaths = [ join(projectDir, 'node_modules/') ];

        return buildSassPipeline(
            buildPackage.sourceDir,
            '**/[!_]*theme.scss',
            buildPackage.outputDir,
            includePaths);
    }

    /**
     * ng tasks
     */

    task(`${taskName}:ng:build`, (done: any) => {
        buildPackage.ngBuild(done);
    });

    task(`${taskName}:ng:test`, (done: any) => {
        buildPackage.ngTest(done);
    });

    if (buildPackage.type === AngularProjectType.library) {

        task(`${taskName}:scss:bundle:theming`, (done: any) => {
            scssBundle(done);
        });

        task(`${taskName}:sass:themes`, (done: any) => {
            buildSass();
            done();
        });
    }

    /**
     * build tasks
     */

    if (buildPackage.type === AngularProjectType.library) {

        task(`${taskName}:build`, series(
            `${taskName}:ng:build`,
            `${taskName}:scss:bundle:theming`,
            `${taskName}:sass:themes`
        ));

    } else if (buildPackage.type === AngularProjectType.application) {

        task(`${taskName}:build`, series(
            `${taskName}:ng:build`
        ));

    }

}
