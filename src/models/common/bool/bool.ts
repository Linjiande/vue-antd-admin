// 布尔值
export class Bool {
	value: boolean;
	constructor(value: boolean = false) {
		this.value = value;
	}

	change() {
		this.value = !this.value;
	}
}
