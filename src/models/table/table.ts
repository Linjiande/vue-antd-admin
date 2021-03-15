import { baseClass } from "../base/config";
import { TableOptions, ColumnOptions, RowSelectionOptions } from "./type";
import { Pagination } from "@/models/pagination/pagination";
import Api from "@/api";
import { message } from "ant-design-vue";

// 表格
export class Table extends baseClass implements TableOptions {
	// 表格列的配置描述
	columns: Column[];

	constructor(columns: Column[] = [], options?: TableOptions) {
		super();
		this.columns = columns;

		// 否则VUE会报类型错误警告Invalid prop: custom validator check failed for prop "pagination".
		const pagination = new Pagination();
		pagination.__proto__ = Object.prototype;

		if (options?.rowSelection) {
			options.rowSelection.__proto__ = Object.prototype;
		}

		options = {
			dataSource: [],
			rowSelection: null,
			tableLayout: "fixed",
			loading: false,
			bordered: true,
			pagination: pagination,
			rowKey: "id",
			size: "middle",
			...options,
		};
		super.initOptions(options);
	}

	// 排序、分页等请求
	async change(
		url: string,
		payload: [
			Pagination,
			any,
			{
				column?: Column;
				columnKey?: string;
				order?: "ascend" | "descend" | false;
			},
			{ currentDataSource?: any }
		],
		params: any
	) {
		const [pagination, filters, sorter, { currentDataSource }] = payload;
		// 添加分页参数
		params = {
			pageNo: pagination.current ?? this.pagination.current,
			pageSize: pagination.pageSize ?? this.pagination.pageSize,
			...params,
		};
		// 排序
		this.columns.forEach(column => {
			if (column.dataIndex === sorter.columnKey) {
				column.sortOrder = sorter.order ?? false;
				this.sorter = column.sortOrder ? column : undefined;
				// 添加排序参数
				if (sorter.column) {
					params = {
						sortBy: column.dataIndex,
						order: sorter.order ?? false,
						...params,
					};
				}
			} else if (column.sortOrder) {
				column.sortOrder = false;
			}
		});
		// 请求数据
		const result = await this.getData(url, params);
		if (result) {
			pagination.total = this.pagination.total;
			this.pagination = pagination as Pagination;
		}
	}

	async getData(url: string, params?: any): Promise<boolean> {
		if (this.pagination) {
			params = {
				pageNo: this.pagination.current,
				pageSize: this.pagination.pageSize,
				...params,
			};
		}
		try {
			// 进入加载数据状态
			this.loading = true;
			// 请求数据
			const res = await Api.get(url, params);

			if (res.status) {
				console.log(res.data);

				if (res.data.list && res.data.totalCount) {
					// 数据赋值
					this.dataSource = res.data.list;
					// 分页
					this.pagination.total = res.data.totalCount;
				} else {
					message.error("返回体格式错误，data应含有字段——totalCount&list");
				}
				return true;
			} else {
				return false;
			}
		} catch {
			return false;
		} finally {
			// 退出加载数据状态
			this.loading = false;
		}
	}
}

// 列描述数据对象
export class Column extends baseClass implements ColumnOptions {
	// 列头名
	title: string;
	// 与表格数据名称对应
	dataIndex: string;

	constructor(title: string, dataIndex: string, options?: ColumnOptions) {
		super();
		this.title = title;
		this.dataIndex = dataIndex;
		options = {
			align: "center",
			slots: { customRender: dataIndex },
			ellipsis: false,
			...options,
		};
		super.initOptions(options);
	}
}

// 选择功能
export class RowSelection extends baseClass implements RowSelectionOptions {
	constructor(options?: RowSelectionOptions) {
		super();
		options = {
			hideDefaultSelections: false,
			selectedRowKeys: [],
			selections: true,
			type: "checkbox",
			fixed: true,
			onChange: function(selectedRowKeys: any[], selectedRows: any) {
				this.selectedRowKeys = selectedRowKeys;
			},
			...options,
		};
		super.initOptions(options);
	}
}
