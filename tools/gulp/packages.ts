import { AngularLibraryProject, AngularApplicationProject } from '../package-tools';

export const atsuiLibrary = new AngularLibraryProject('atsui');
export const demoApplication = new AngularApplicationProject('demo', [ atsuiLibrary ]);
