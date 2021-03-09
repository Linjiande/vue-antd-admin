import { Form } from "./form";
import { FormOptions } from "./type";
import { Table, Column } from "@/models/table/table";
import { Pagination } from "@/models/pagination/pagination";

// 过滤表单
export class TableHeadForm extends Form {
	constructor(options?: FormOptions) {
		options = { layout: "inline", ...options };
		super(options);
	}
	// 搜索
	submit(url: string, tableConfig: Table) {
		tableConfig.pagination.current = 1;
		let params = {
			pageNo: tableConfig.pagination.current,
			pageSize: tableConfig.pagination.pageSize,
			...this.model,
		};
		if (tableConfig.sorter) {
			params = {
				...params,
				sortBy: tableConfig.sorter.dataIndex,
				order: tableConfig.sorter.sortOrder,
			};
		}

		tableConfig.getData(url, params);
	}

	// 重置
	reset(url: string, tableConfig: Table) {
		Object.keys(this.model).forEach((key: string) => {
			this.model[key] = undefined;
		});
		this.submit(url, tableConfig);
	}
}
