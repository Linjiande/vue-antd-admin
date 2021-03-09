import { Column } from "@/models/table/table";

export const url = "/api/orders";

export const columns: Column[] = [
	new Column("名称", "name"),
	new Column("数据值", "value"),
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
