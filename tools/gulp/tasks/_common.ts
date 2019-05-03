import * as fs from 'fs';
import * as path from 'path';

/** If the string passed in is a glob, returns it, otherwise append '**\/*' to it. */
export function globify(maybeGlob: string, suffix = '**/*') {
    if (maybeGlob.indexOf('*') != -1) {
        return maybeGlob;
    }
    try {
        const stat = fs.statSync(maybeGlob);
        if (stat.isFile()) {
            return maybeGlob;
        }
    } catch (e) { }
    return path.join(maybeGlob, suffix);
}