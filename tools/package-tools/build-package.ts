import { join } from 'path';
import { buildConfig } from './build-config';
import { buildNgPipeline } from './gulp/build-ng';
import { buildSassPipeline } from './gulp/build-sass-pipeline';
import { buildScssBundlePipeline } from './gulp/build-scss-bundle-pipeline';


const { packagesDir, outputDir, projectDir } = buildConfig;

export enum PackageType {
    lib = 'lib',
    app = 'app'
}

export class BuildPackage {

    /** Path to the package sources. */
    sourceDir: string;

    /** Path to the package output. */
    outputDir: string;

    type: PackageType;

    constructor(readonly name: string, type: PackageType, readonly dependencies: BuildPackage[] = []) {
        this.sourceDir = join(packagesDir, name);
        this.outputDir = join(outputDir, name);
        this.type = type;
    }

    /** Compiles the TypeScript test source files for the package. */
    async ngBuild(done: any) {

        buildNgPipeline(
            'build',
            this.name,
            done);
    }

    /** Compiles the TypeScript test source files for the package. */
    async ngTest(done: any) {

        buildNgPipeline(
            'test',
            this.name,
            done,
            '--progress',
            '--watch=false');
    }

    async scssBundle(done: any) {

        buildScssBundlePipeline(
            this.sourceDir,
            '/src/lib/theming-bundle.scss',
            join(this.outputDir, '/src/lib/_theming.scss'),
            done,
            undefined,
            [ projectDir + '/node_modules' ],
            [ '~@angular/.*' ]);
    }

    async buildSass() {

        const includePaths = [ join(projectDir, 'node_modules/') ];

        return buildSassPipeline(
            this.sourceDir,
            '**/[!_]*theme.scss',
            this.outputDir,
            includePaths);
    }

}
