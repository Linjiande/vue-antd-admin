import { baseInterface } from "../base/config";
import { Column, RowSelection } from "./table";
import { Pagination } from "../pagination/pagination";

// 表格可选配置
export interface TableOptions extends baseInterface {
	// 表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局
	tableLayout?: "auto" | "fixed";
	// 是否展示外边框和列边框
	bordered?: boolean;
	// 页面是否加载中
	loading?: boolean;
	// 数据数组
	dataSource?: any[];
	// 分页器
	pagination?: Pagination | false;
	// 表格行 key 的取值，可以是字符串或一个函数
	rowKey?: string | ((record: any) => string);
	// 列表项是否可选择
	rowSelection?: RowSelection | null;
	// 大小
	size?: "default" | "middle" | "small";
}

// 列描述数据对象可选配置
export interface ColumnOptions extends baseInterface {
	// 对齐方式
	align?: "left" | "right" | "center";
	// 插槽
	slots?: object;
	//key值
	key?: string;
	// 超过宽度将自动省略，暂不支持和排序筛选一起使用。设置为 true 时，表格布局将变成 tableLayout="fixed"。
	ellipsis?: boolean;
	// 列宽度
	width?: string | number;
	// 子列
	children?: Column[];
	// 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true
	sorter?: true | ((a: any, b: any) => any);
	// 排序的受控属性，外界可用此控制列的排序
	sortOrder?: "ascend" | "descend" | false;
	// 支持的排序方式
	sortDirections?: ("ascend" | "descend")[];
}

// 选择功能可选配置
export interface RowSelectionOptions extends baseInterface {
	// 自定义列表选择框宽度
	columnWidth?: string | number;
	// 自定义列表选择框标题
	columnTitle?: string;
	// 把选择框列固定在左边
	fixed?: boolean;
	// 去掉『全选』『反选』两个默认选项
	hideDefaultSelections?: boolean;
	// 指定选中项的 key 数组，需要和 onChange 进行配合
	selectedRowKeys?: any[];
	// 自定义选择配置项
	selections?: object[] | boolean;
	// 多选/单选
	type?: "checkbox" | "radio";
	// 选中项发生变化时的回调
	onChange?: (selectedRowKeys: any[], selectedRows: any) => void;
	// 用户手动选择/取消选择某列的回调
	onSelect?: (
		record: any,
		selected: boolean,
		selectedRows: any,
		nativeEvent: any
	) => void;
	// 用户手动选择/取消选择所有列的回调
	onSelectAll?: (selected: boolean, selectedRows: any, changeRows: any) => void;
	// 用户手动选择反选的回调
	onSelectInvert?: (selectedRows: any) => void;
}
