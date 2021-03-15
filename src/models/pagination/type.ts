import { baseInterface } from "../base/config";

// 分页器可选配置
export interface PaginationOptions extends baseInterface {
	// 当前页数
	current?: Number;
	// 每页条数
	pageSize?: Number;
	// 数据总数
	total?: Number;
	// 只有一页时是否隐藏分页器
	hideOnSinglePage?: Boolean;
	// 每页条数选择
	pageSizeOptions?: String[];
	// 是否可以快速跳转至某页
	showQuickJumper?: Boolean;
	// 是否可以改变 pageSize
	showSizeChanger?: Boolean;
	// 用于显示数据总量和当前数据顺序
	showTotal?: ShowTotal;
	// 大小
	size?: "small" | "default";
	// 位置
	position?: "top" | "bottom" | "both";
}

export type ShowTotal = (total: Number, range?: any[]) => String;
