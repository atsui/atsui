import { join } from 'path';
import { buildConfig } from './build-config';
import { buildNgPipeline } from './gulp/build-ng';

const { packagesDir, outputDir } = buildConfig;

export enum AngularProjectType {
    library = 'library',
    application = 'application'
}
export class AngularProject {

    /** Path to the package sources. */
    sourceDir: string;

    /** Path to the package output. */
    outputDir: string;

    type: AngularProjectType;

    constructor(readonly name: string, type: AngularProjectType, readonly dependencies: AngularProject[] = []) {
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
}

export class AngularLibraryProject extends AngularProject {
    constructor(readonly name: string, readonly dependencies: AngularProject[] = []) {
        super(name, AngularProjectType.library, dependencies);
    }
}

export class AngularApplicationProject extends AngularProject {
    constructor(readonly name: string, readonly dependencies: AngularProject[] = []) {
        super(name, AngularProjectType.application, dependencies);
    }
}
