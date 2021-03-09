import { baseClass } from "../base/config";
import { ModalOptions } from "./type";

// 对话框
export class Modal extends baseClass implements ModalOptions {
	constructor(options?: ModalOptions) {
		super();
		options = {
			title: "Title",
			okText: "确定",
			cancelText: "取消",
			visible: false,
			confirmLoading: false,
			...options,
		};
		super.initOptions(options);
	}

	// 打开对话框
	open(value: string, title?: string) {
		switch (value) {
			case "visible":
				this.visible = true;
				this.title = title ?? this.title;
				break;
			case "confirmLoading":
				this.confirmLoading = true;
				break;
			default:
				console.error(`${value}无效属性!`);
				break;
		}
	}

	// 关闭对话框
	close(value: string) {
		switch (value) {
			case "visible":
				this.visible = false;
				break;
			case "confirmLoading":
				this.confirmLoading = false;
				break;
			default:
				console.error(`${value}无效属性!`);
				break;
		}
	}

	// 点击确定回调
	ok() {
		this.open("confirmLoading");
		setTimeout(() => {
			this.close("confirmLoading");
			this.close("visible");
		}, 3000);
	}

	// 点击遮罩层或右上角叉或取消按钮的回调
	cancel() {
		this.close("visible");
	}
}
