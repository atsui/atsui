import { src, dest } from 'gulp';
import {highlightCodeBlock} from '../../highlight/highlight-code-block';
import {DocsMarkdownRenderer} from '../../markdown-to-html/docs-marked-renderer';
import {join} from 'path';

// These imports lack of type definitions.
const gulpMarkdown = require('gulp-markdown');
const gulpIf = require('gulp-if');
const gulpHtmlMin = require('gulp-htmlmin');
const gulpFlatten = require('gulp-flatten');
const gulpRename = require('gulp-rename');

/** Create a gulp task that builds SCSS files. */
export function markdownToHtml(sourceDir: string, outputDir: string, glob: string[] = ['**/*.md'], minifyOutput = false) {
    return new Promise(async (resolve, reject) => {

        // Custom markdown renderer for transforming markdown files for the docs.
        const markdownRenderer = new DocsMarkdownRenderer();

        return src(glob.map((g) => {
            console.error(join(sourceDir, g));
            return join(sourceDir, g);
        }), {})
        .pipe(gulpRename((path: any) => {
            console.error(JSON.stringify(path));
        }))
        .pipe(gulpMarkdown({
            renderer: markdownRenderer,
            highlight: highlightCodeBlock
        }).on('error', reject))
        .pipe(gulpIf(minifyOutput, gulpHtmlMin({ collapseWhitespace: true })))
        .pipe(gulpFlatten())
        .pipe(dest(outputDir, { overwrite: true }))
        .on('end', resolve);
    });
}
