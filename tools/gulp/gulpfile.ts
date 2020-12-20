import {createAngularProjectTasks} from '../package-tools/';

import { atsuiLibrary } from './packages';
import { demoApplication } from './packages';

import './tasks/clean';
// import './tasks/unit-test';
// import './tasks/ci';

createAngularProjectTasks(atsuiLibrary);
createAngularProjectTasks(demoApplication);
