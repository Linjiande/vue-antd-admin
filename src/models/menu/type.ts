import { baseInterface } from "../base/config";
import { MenuItem } from "./menu";

// 菜单可选配置
export interface MenuOptions extends baseInterface {
	// 选中的菜单
	selectedKeys?: string[];
	// 打开的菜单
	openKeys?: string[];
}

// 菜单子项可选配置
export interface MenuItemOptions extends baseInterface {
	// 图标
	icon?: string;
	// 顺序
	sort?: number;
	// 子菜单
	children?: MenuItem[];
}
