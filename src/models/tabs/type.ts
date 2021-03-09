import { baseInterface } from "../base/config";

// 标签页可选配置
export interface TabsOptions extends baseInterface {
	// 是否使用动画切换 Tabs，在 tabPosition=top|bottom 时有效
	animated?: boolean | { inkBar: boolean; tabPane: boolean };
	// 是否隐藏加号图标，在 type="editable-card" 时有效
	hideAdd?: boolean;
	// 大小
	size?: "large" | "default" | "small";
	// 页签位置
	tabPosition?: "top" | "right" | "bottom" | "left";
	// 页签的基本样式
	type?: "line" | "card" | "editable-card";
	// tabs 之间的间隙
	tabBarGutter?: number;
}

// 标签页选项可选配置
export interface TabPaneOptions extends baseInterface {
	// 是否可关闭
	closable?: boolean;
}
