import { MenuItem } from "@/models/menu/menu";

export function breadcrumb(
	url: string,
	menus: MenuItem[],
	crumbs: MenuItem[]
): boolean | undefined {
	for (const m of menus) {
		if (m.children) {
			const result = breadcrumb(url, m.children, crumbs);
			if (result) {
				crumbs.unshift(m);
				return true;
			}
		} else if (m.path && url === m.path) {
			crumbs.push(m);
			return true;
		}
	}
}
