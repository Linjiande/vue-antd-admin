import { Column } from "@/models/table/table";

export const url = "/api/dict";

export const columns: Column[] = [
	new Column("字典名称", "dictName", {
		sorter: true,
		sortOrder: false,
		sortDirections: ["ascend", "descend"],
	}),
	new Column("字典编号", "key", {
		sorter: true,
		sortOrder: false,
		sortDirections: ["ascend", "descend"],
	}),
	new Column("描述", "describe"),
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
