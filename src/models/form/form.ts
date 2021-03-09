import { baseClass } from "../base/config";
import { FormOptions, FormItemOptions } from "./type";

// 表单
export class Form extends baseClass implements FormOptions {
	constructor(options?: FormOptions) {
		super();
		options = {
			model: {},
			rules: {},
			labelAlign: "right",
			layout: "horizontal",
			hideRequiredMark: false,
			validateOnRuleChange: true,
			scrollToFirstError: true,
			validateTrigger: ["change", "blur"],
			...options,
		};
		super.initOptions(options);
	}

	// 提交
	submit(...args: any) {}

	// 重置
	reset(...args: any) {
		Object.keys(this.model).forEach((key: string) => {
			this.model[key] = undefined;
		});
	}
}

// 子项
export class FormItem extends baseClass implements FormItemOptions {
	// label 标签的文本
	label: string;
	constructor(label: string, options?: FormItemOptions) {
		super();
		this.label = label;
		options = {
			autoLink: true,
			colon: true,
			labelAlign: "right",
			...options,
		};
		super.initOptions(options);
	}
}
