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
import { markdownToHtml } from 'tasks/markdown-to-html';
import { codeToHtml } from 'tasks/code-to-html';

const atsuiLibProject = new AngularLib('atsui-lib', [], [], 
    async () => {
        await ngTask('build', 'atsui');
        await bundleScss('./projects/atsui/src/themes.scss', './projects/atsui/src/**/*.theme.scss', './dist/atsui/themes/theme.scss');
        await buildScss('./projects/atsui/src/lib/themes/prebuilt', './dist/atsui/themes/prebuild/');
    });
atsuiLibProject.createGulpTasks();

const atsuiExamplesProject = new AngularApp('atsui-examples', [atsuiLibProject], [], 
    async (prod: boolean) => {
        await ngTask('build', 'atsui-examples', `--prod=${prod}`);
        // npm run typedoc -- --options typedoc.json --exclude '**/*.spec.ts' ./projects/atsui/src
    }
);
atsuiExamplesProject.createGulpTasks();

const atsuiDocsProject = new AngularApp('atsui-docs', [], [], 
    async (prod: boolean) => {
        await ngTask('build', 'atsui-docs', `--prod=${prod}`);
        await markdownToHtml('./projects/atsui/src/lib', './dist/atsui-docs/overviews', '**/*.md');
        await codeToHtml('./projects/atsui-examples/src/lib', './dist/atsui-docs/examples', '**/*.md');
        // npm run typedoc -- --options typedoc.json --exclude '**/*.spec.ts' ./projects/atsui/src >> ./dist/atsui-docs/api
        // guides
    }
);
atsuiDocsProject.createGulpTasks();

const atsuiAllcProjects = new AngularProject('atsui', [atsuiExamplesProject, atsuiDocsProject]);
atsuiAllcProjects.createGulpTasks();