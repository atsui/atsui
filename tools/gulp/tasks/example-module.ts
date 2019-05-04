import {sync} from 'glob';
import { join } from 'path';
import {generateExampleModule} from '../../example-module/generate-example-module';

/** Create a gulp task that builds SCSS files. */
export function generateExampleModuleTask(sourceDir: string, outputModuleFilename: string, glob: string = '**/*.ts') {

    generateExampleModule(sync(join(sourceDir, glob)), outputModuleFilename);
}
