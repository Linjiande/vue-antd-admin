import { baseInterface } from "../base/config";

// 表单可选配置
export interface FormOptions extends baseInterface {
	// 表单数据对象
	model?: object;
	// 表单验证规则
	rules?: object;
	// 隐藏所有表单项的必选标记
	hideRequiredMark?: boolean;
	// label 标签的文本对齐方式
	labelAlign?: "left" | "right";
	// 表单布局
	layout?: "horizontal" | "vertical" | "inline";
	// label 标签布局，同 <Col> 组件
	labelCol?: { span: number; offset?: number };
	// 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
	wrapperCol?: { span: number; offset?: number };
	// 是否在 rules 属性改变后立即触发一次验证
	validateOnRuleChange?: boolean;
	// 提交失败自动滚动到第一个错误字段
	scrollToFirstError?: boolean;
	// 表单名称，会作为表单字段 id 前缀使用
	name?: string;
	// 统一设置字段校验规则
	validateTrigger?: string | string[];
}

// 子项可选配置
export interface FormItemOptions extends baseInterface {
	// 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
	name?: string;
	// 表单验证规则
	rules?: object | any[];
	// 是否自动关联表单域，对于大部分情况都可以使用自动关联，如果不满足自动关联的条件，可以手动关联，参见下方注意事项
	autoLink?: boolean;
	// 配合 label 属性使用，表示是否显示 label 后面的冒号
	colon?: boolean;
	// 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。
	extra?: string;
	// 提示信息，如不设置，则会根据校验规则自动生成
	help?: string;
	// label 标签布局，同 <Col> 组件
	labelCol?: { span: number; offset: number };
	// 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
	wrapperCol?: { span: number; offset?: number };
	// 标签文本对齐方式
	labelAlign?: "left" | "right";
}
