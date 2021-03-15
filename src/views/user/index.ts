import { Column } from "@/models/table/table";

export const url = "/api/user";

export const columns: Column[] = [
	new Column("编号", "key", {
		sorter: true,
		sortOrder: false,
		sortDirections: ["ascend", "descend"],
	}),
	new Column("用户账号", "account", {
		sorter: true,
		sortOrder: false,
		sortDirections: ["ascend", "descend"],
	}),
	new Column("用户姓名", "userName", {
		sorter: true,
		sortOrder: false,
		sortDirections: ["ascend", "descend"],
	}),
	new Column("头像", "buddha"),
	new Column("用户账号", "sex"),
	new Column("生日", "birthday"),
	new Column("手机号码", "birthday"),
	new Column("部门", "section"),
	new Column("排序号", "orderID"),
	new Column("状态", "status"),
	new Column("操作", "handle", { width: 210 }),
];

// 编辑数据
export function handleEdit(record: object) {
	console.log(record);
}

// 删除数据
export function handleDelete(id: string[] | number[]) {
	console.log(id);
}

// 查看详情
export function handleDetails(record: object) {
	console.log(record);
}
