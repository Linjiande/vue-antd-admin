import { baseClass } from "../base/config";
import { TabsOptions, TabPaneOptions } from "./type";

// 标签页
export class Tabs extends baseClass implements TabsOptions {
	// 当前激活 tab 面板的 key
	activeKey: string;

	constructor(activeKey: string, options?: TabsOptions) {
		super();
		this.activeKey = activeKey;
		options = {
			type: "line",
			hideAdd: false,
			tabBarGutter: 0,
			tabPosition: "top",
			animated: true,
			size: "small",
			...options,
		};
		super.initOptions(options);
	}
}

// 标签页选项
export class TabPane extends baseClass implements TabPaneOptions {
	// 对应Tabs activeKey
	key: string;
	// 选项卡头显示文字
	tab: string;

	constructor(key: string, tab: string, options?: TabPaneOptions) {
		super();
		this.key = key;
		this.tab = tab;
		options = { closable: true, ...options };
		super.initOptions(options);
	}
}
