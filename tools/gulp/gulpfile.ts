import { ngTask } from './tasks/exec-angular-cli';
import { AngularApp, AngularLib, AngularProject } from './projects/angular-project';
// import { createProjectTasks } from 'projects/angular-project-tasks';
import { bundleScss } from './tasks/scss-bundle';

import './tasks/copy-files';
import './tasks/exec-angular-cli';
import './tasks/exec-node';
import './tasks/exec';
import './tasks/scss-bundle';
import './tasks/scss-build';
import { buildScss } from './tasks/scss-build';
import { markdownToHtml } from './tasks/markdown-to-html';
import { codeToHtml } from './tasks/code-to-html';
import { generateExampleModuleTask } from './tasks/example-module';
// import { codeToHtml } from './tasks/code-to-html';

const atsuiLibProject = new AngularLib('atsui-lib', [], [],
    async () => {
        await ngTask('build', 'atsui');
        await bundleScss('./projects/atsui/src/themes.scss', './projects/atsui/src/**/*.theme.scss', './dist/atsui/themes/theme.scss');
        await buildScss('./projects/atsui/src/themes/prebuilt/', './dist/atsui/themes/prebuild/');
    });
atsuiLibProject.createGulpTasks();

const atsuiExamplesProject = new AngularApp('atsui-examples', [], [],
    async (prod: boolean) => {
        await generateExampleModuleTask('./projects/atsui-examples/', './projects/atsui-examples/src/example-module.ts');
        await ngTask('build', 'atsui-examples', `--prod=${prod}`);
        await markdownToHtml('./projects/atsui/src/', './dist/atsui-examples/docs/overviews');
        await codeToHtml('./projects/atsui-examples/src', './dist/atsui-examples/docs/examples',
            ['**/*example.html', '**/*example.ts', '**/*example.css', '!**/*.spec.ts']);
        // npm run typedoc -- --options typedoc.json --exclude '**/*.spec.ts' ./projects/atsui/src/src >> ./dist/atsui-examples/docs/api
        // guides
        // npm run typedoc -- --options typedoc.json --exclude '**/*.spec.ts' ./projects/atsui/src/src
    }
);
atsuiExamplesProject.createGulpTasks();

const atsuiAllcProjects = new AngularProject('atsui', [atsuiExamplesProject]);
atsuiAllcProjects.createGulpTasks();
