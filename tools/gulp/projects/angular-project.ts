import { task, series } from 'gulp';

export class AngularProject {

	constructor(readonly name: string,
				readonly dependencies: AngularProject[] = [],
				readonly preBuildTasks: string[] = [],
				readonly buildTask?: (prod: boolean) => Promise<any>,
				readonly testTask?: () => Promise<any>,
				readonly lintTask?: () => Promise<any>,
				readonly serveTask?: () => Promise<any>,
				readonly e2eTask?: () => Promise<any>,
				readonly deployTask?: () => Promise<any>) {
	}

	/** Compiles the package sources with all secondary entry points. */
	public async build(prod: boolean = false) {
		if (this.buildTask !== undefined) {
			return await this.buildTask(prod);
		}
		Promise.resolve();
	}

	/** Compiles the package sources with all secondary entry points. */
	public async test() {
		if (this.testTask !== undefined) {
			return await this.testTask();
		}
		Promise.resolve();
	}

	/** Compiles the package sources with all secondary entry points. */
	public async lint() {
		if (this.lintTask !== undefined) {
			return await this.lintTask();
		}
		Promise.resolve();
	}

	/** Compiles the package sources with all secondary entry points. */
	public async serve() {
		if (this.serveTask !== undefined) {
			return await this.serveTask();
		}
		Promise.resolve();
	}

	/** Compiles the package sources with all secondary entry points. */
	public async e2e() {
		if (this.e2eTask !== undefined) {
			return await this.e2eTask();
		}
		Promise.resolve();
	}

	/** Compiles the package sources with all secondary entry points. */
	public async deploy() {
		if (this.deployTask !== undefined) {
			return await this.deployTask();
		}
		Promise.resolve();
	}
	
	/**
	 * Creates a set of gulp tasks that can build the specified package.
	 * @param this Build package for which the gulp tasks will be generated
	 * @param preBuildTasks List of gulp tasks that should run before building the package.
	 */
	public createGulpTasks() {

		// Name of all dependencies of the current package.
		const dependencyNames = this.dependencies.map(p => p.name);
		
		task(`${this.name}:build`, series(
			// Run the pre build gulp tasks.
			...this.preBuildTasks,
			// Build all required packages before building.
			...dependencyNames.map(pkgName => `${pkgName}:build`),
			// Build using ng build
			() => this.build()
		));

		task(`${this.name}:build-release`, series(
			// Run the pre build gulp tasks.
			...this.preBuildTasks,
			// Build all required packages before building.
			...dependencyNames.map(pkgName => `${pkgName}:build-release`),
			// Build using ng build
			() => this.build(true)
		));

		task(`${this.name}:test`, series(
			// Run the pre build gulp tasks.
			...this.preBuildTasks,
			// Build all required packages before building.
			...dependencyNames.map(pkgName => `${pkgName}:test`),
			// Build using ng build
			() => this.test()
		));

		task(`${this.name}:lint`, series(
			// Run the pre build gulp tasks.
			...this.preBuildTasks,
			// Build all required packages before building.
			...dependencyNames.map(pkgName => `${pkgName}:lint`),
			// Build using ng build
			() => this.lint()
		));

		task(`${this.name}:serve`, series(
			// Run the pre build gulp tasks.
			...this.preBuildTasks,
			// Build all required packages before building.
			...dependencyNames.map(pkgName => `${pkgName}:serve`),
			// Build using ng build
			() => this.serve()
		));

		task(`${this.name}:e2e`, series(
			// Run the pre build gulp tasks.
			...this.preBuildTasks,
			// Build all required packages before building.
			...dependencyNames.map(pkgName => `${pkgName}:e2e`),
			// Build using ng build
			() => this.e2e()
		));

		task(`${this.name}:deploy`, series(
			// Run the pre build gulp tasks.
			...this.preBuildTasks,
			// Build all required packages before building.
			...dependencyNames.map(pkgName => `${pkgName}:build-release`),
			// Build all required packages before building.
			...dependencyNames.map(pkgName => `${pkgName}:deploy`),
			// Build using ng build
			() => this.deploy()
		));
	}
}

export class AngularLib extends AngularProject {
	constructor(readonly name: string,
		readonly dependencies: AngularProject[] = [],
		readonly preBuildTasks: string[] = [],
		buildTask: (prod: boolean) => Promise<any>,
		testTask?: () => Promise<any>,
		lintTask?: () => Promise<any>,
		deployTask?: () => Promise<any>) {
		super(name, dependencies, preBuildTasks, buildTask, testTask, lintTask, undefined, undefined, deployTask);
	}
}

export class AngularApp extends AngularProject {
	constructor(name: string,
		dependencies: AngularProject[] = [],
		preBuildTasks: string[] = [],
		buildTask: (prod: boolean) => Promise<any>,
		testTask?: () => Promise<any>,
		lintTask?: () => Promise<any>,
		serveTask?: () => Promise<any>,
		e2eTask?: () => Promise<any>,
		deployTask?: () => Promise<any>) {
		super(name, dependencies, preBuildTasks, buildTask, testTask, lintTask, serveTask, e2eTask, deployTask);
	}
}