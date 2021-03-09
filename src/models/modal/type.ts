import { baseInterface } from "../base/config";

// 对话框可选配置
export interface ModalOptions extends baseInterface {
	// 标题
	title?: string;
	// 对话框是否可见
	visible?: boolean;
	// 确定按钮 loading
	confirmLoading?: boolean;
	// 确认按钮文字
	okText?: string;
	// 取消按钮文字
	cancelText?: string;
}
