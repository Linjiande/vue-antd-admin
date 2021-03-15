import { baseClass } from "../base/config";
import { PaginationOptions } from "./type";

// 分页器
export class Pagination extends baseClass implements PaginationOptions {
	constructor(options?: PaginationOptions) {
		super();
		options = {
			current: 1,
			pageSize: 10,
			total: 0,
			hideOnSinglePage: false,
			pageSizeOptions: ["10", "20", "50", "100"],
			showQuickJumper: true,
			showSizeChanger: true,
			size: "small",
			position: "bottom",
			showTotal: (total: Number, range?: any[]) =>
				range
					? `当前 ${range[0]}-${range[1]} , 共 ${total} 条`
					: `共 ${total} 条`,
			...options,
		};
		super.initOptions(options);
	}

	onChange(current: Number, pageSize: Number) {
		this.current = current;
		this.pageSize = pageSize;
	}

	onShowSizeChange(current: Number, pageSize: Number) {
		this.current = current;
		this.pageSize = pageSize;
	}
}
