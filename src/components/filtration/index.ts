import { Form } from "@/models/form/form";
import { FormOptions } from "@/models/form/type";
import { Table, Column } from "@/models/table/table";
import { Pagination } from "@/models/pagination/pagination";

// 过滤表单
export class TableHeadForm extends Form {
	constructor(options?: FormOptions) {
		options = {
			layout: "inline",
			...options,
		};
		super(options);
	}
	// 搜索
	submit(url: string, tableConfig: Table) {
		const sortColumn = tableConfig.columns.find(
			column => column.sorter && column.sortOrder
		);

		tableConfig.pagination.current = 1;

		let args: [
			Pagination,
			any,
			{
				column?: Column;
				columnKey?: string;
				order?: "ascend" | "descend" | false;
			},
			{ currentDataSource?: any }
		] = [
			tableConfig.pagination,
			{},
			{
				column: sortColumn,
				columnKey: sortColumn?.dataIndex,
				order: sortColumn?.sortOrder,
			},
			{},
		];

		tableConfig.change(url, args, this.model);
	}

	// 重置
	reset(url: string, tableConfig: Table) {
		Object.keys(this.model).forEach((key: string) => {
			this.model[key] = undefined;
		});
		this.submit(url, tableConfig);
	}
}

// 类型
export interface FormItem {
	key: string;
	type: "input" | "select";
	label: string;
	placeholder: string;
}
