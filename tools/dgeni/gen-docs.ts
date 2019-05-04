import {Dgeni} from 'dgeni';
import {ReadTypeScriptModules} from 'dgeni-packages/typescript/processors/readTypeScriptModules';
import {TsParser} from 'dgeni-packages/typescript/services/TsParser';
import {readFileSync} from 'fs';
import {join, relative} from 'path';
import {apiDocsPackage} from './docs-package';

/** Create a gulp task that builds SCSS files. */
export function generateApiFromCodeTask(labelPackagePath: string, outputDirPath: string, ...entryPointArgs: any) {

    const execRootPath = process.cwd();
    const packagePath = join(execRootPath, labelPackagePath);

    // Configure the Dgeni docs package to respect our passed options from the Bazel rule.
    apiDocsPackage.config((readTypeScriptModules: ReadTypeScriptModules,
                           tsParser: TsParser,
                           templateFinder: any,
                           writeFilesProcessor: any,
                           readFilesProcessor: any) => {

    // Set the base path for the "readFilesProcessor" to the execroot. This is necessary because
    // otherwise the "writeFilesProcessor" is not able to write to the specified output path.
    readFilesProcessor.basePath = execRootPath;

    // Set the base path for parsing the TypeScript source files to the directory that includes
    // all sources (also known as the path to the current Bazel target). This makes it easier for
    // custom processors (such as the `entry-point-grouper) to compute entry-point paths.
    readTypeScriptModules.basePath = packagePath;

    // Initialize the "tsParser" path mappings. These will be passed to the TypeScript program
    // and therefore use the same syntax as the "paths" option in a tsconfig.
    tsParser.options.paths = {};

    // For each package we want to setup all entry points in Dgeni so that their API
    // will be generated. Packages and their associated entry points are passed in pairs.
    // The first argument will be always the package name, and the second argument will be a
    // joined string containing names of all entry points for that specific package.
    // e.g. "cdk" "platform,bidi,a11y"
    for (let i = 0; i + 1 < entryPointArgs.length; i += 2) {
        const packageName = entryPointArgs[i];
        const entryPoints = entryPointArgs[i + 1].split(',');

        // Walk through each entry point of the current package and add it to the
        // "readTypeScriptModules" processor so that it will parse it. Additionally we want
        // to setup path mapping for that entry-point, so that we are able to merge
        // inherited class members across entry points or packages.
        entryPoints.forEach(entryPointName => {
        const entryPointPath = `${packageName}/${entryPointName}`;
        // For the entry point path we temporarily want to replace "material" with "lib", as
        // our package source folder does not align with the entry-point name.
        const entryPointIndexPath = `${entryPointPath.replace('material', 'lib')}/index.ts`;

        // tslint:disable-next-line:no-non-null-assertion
        tsParser.options.paths![`@angular/${entryPointPath}`] = [entryPointIndexPath];
        readTypeScriptModules.sourceFiles.push(entryPointIndexPath);
        });
    }

    // Base URL for the `tsParser`. The base URL refer to the directory that includes all
    // package sources that need to be processed by Dgeni.
    tsParser.options.baseUrl = packagePath;

    // This is ensures that the Dgeni TypeScript processor is able to parse node modules such
    // as the Angular packages which might be needed for doc items. e.g. if a class implements
    // the "AfterViewInit" interface from "@angular/core". This needs to be relative to the
    // "baseUrl" that has been specified for the "tsParser" compiler options.
    // tslint:disable-next-line:no-non-null-assertion
    tsParser.options.paths!['*'] = [relative(packagePath, 'external/npm/node_modules/*')];

    // Since our base directory is the Bazel execroot, we need to make sure that Dgeni can
    // find all templates needed to output the API docs.
    templateFinder.templateFolders = [join(execRootPath, 'tools/dgeni/templates/')];

    // The output path for files will be computed by joining the output folder with the base path
    // from the "readFilesProcessors". Since the base path is the execroot, we can just use
    // the output path passed from Bazel (e.g. $EXECROOT/bazel-out/bin/src/docs-content)
    writeFilesProcessor.outputFolder = outputDirPath;
    });

    // Run the docs generation. The process will be automatically kept alive until Dgeni
    // completed. In case the returned promise has been rejected, we need to manually exit the
    // process with the proper exit code because Dgeni doesn't use native promises which would
    // automatically cause the error to propagate. The error message will be automatically
    // printed internally by Dgeni (so we don't want to repeat here)
    new Dgeni([apiDocsPackage]).generate().catch(() => process.exit(1));


}

