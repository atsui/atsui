import { execNodeTask } from './exec-node';

export function ngTask(command: string, ...args: any[]) {
    return execNodeTask('@angular/cli', 'ng', [ command, ...args ]);
}
