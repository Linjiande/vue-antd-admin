export abstract class baseClass {
	[K: string]: any;

	initOptions(options: any) {
		Object.keys(options).forEach(op => (this[op] = options![op]));
	}
}

export interface baseInterface {
	[K: string]: any;
}
