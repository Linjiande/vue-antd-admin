import { UnwrapRef } from "vue";
import { Menu } from "@/models/menu/menu";
import { Bool } from "@/models/common/bool/bool";

// 临时存储菜单
let tempMenuConfig: Menu;

// 菜单收缩展开
export function contract(bool: UnwrapRef<Bool>, menuConfig: UnwrapRef<Menu>) {
	if (bool.value) {
		Object.keys(menuConfig).forEach((e: string) => {
			menuConfig[e] = tempMenuConfig[e];
		});
	} else {
		tempMenuConfig = { ...menuConfig };
		menuConfig.openKeys = [];
	}
	bool.change();
}
