import { src, dest } from 'gulp';
import {highlightCodeBlock} from '../../highlight/highlight-code-block';
import {DocsMarkdownRenderer} from '../../markdown-to-html/docs-marked-renderer';
import {join} from 'path';

// These imports lack of type definitions.
const gulpmarkdown = require('gulp-markdown');
const gulpIf = require('gulp-if');
const gulpuglify = require('gulp-uglify');
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpFlatten = require('gulp-flatten');

/** Create a gulp task that builds SCSS files. */
export function markdownToHtml(sourceDir: string, outputDir: string, glob: string | string[] = '**/*.md', minifyOutput = false) {
    if (typeof glob === 'string') { glob = [glob]; }

    // Custom markdown renderer for transforming markdown files for the docs.
    const markdownRenderer = new DocsMarkdownRenderer();

    return src(glob.map((g) => join(sourceDir, g)), {})
        .pipe(gulpmarkdown({
            renderer: markdownRenderer,
            highlight: highlightCodeBlock
        })
        .on('error', gulpmarkdown.logError))
        .pipe(gulpIf(minifyOutput, gulpuglify()))
        .pipe(gulpAutoprefixer())
        .pipe(gulpFlatten())
        .pipe(dest(outputDir, { overwrite: true }));
}
