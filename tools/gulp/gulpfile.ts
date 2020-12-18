import {createPackageBuildTasks} from '../package-tools/';

import { AtsuiPackage } from './packages';
// import { atsuiDemoPackage } from './packages';

import './tasks/clean';
// import './tasks/unit-test';
// import './tasks/ci';

createPackageBuildTasks(AtsuiPackage);
// createPackageBuildTasks(atsuiDemoPackage);
