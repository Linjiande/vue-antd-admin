import axios, {
	AxiosRequestConfig,
	AxiosResponse,
	AxiosError,
	Method,
} from "axios";
import storage from "@/utils/storage";
import router from "@/router";
import { notification } from "ant-design-vue";

// 定义接口
interface PendingType {
	url: string | undefined;
	method: Method | undefined;
	params: object;
	data: object;
	cancel: Function;
}

// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;

// 状态码错误信息
const codeMessage: { [K: number]: string } = {
	200: "服务器成功返回请求的数据。",
	201: "新建或修改数据成功。",
	202: "一个请求已经进入后台排队（异步任务）。",
	204: "删除数据成功。",
	400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
	401: "用户没有权限（令牌、用户名、密码错误）。",
	403: "用户得到授权，但是访问是被禁止的。",
	404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
	406: "请求的格式不可得。",
	410: "请求的资源被永久删除，且不会再得到的。",
	422: "当创建一个对象时，发生一个验证错误。",
	500: "服务器发生错误，请检查服务器。",
	502: "网关错误。",
	503: "服务不可用，服务器暂时过载或维护。",
	504: "网关超时。",
};
// 通知提醒框
type NotificationType = "success" | "info" | "warning" | "error";
const openNotificationWithIcon = (
	response: any,
	type: NotificationType = "error"
) =>
	notification[type]({
		message: `${response.status} ${response.statusText}`,
		description: response.data?.msg || codeMessage[response.status],
	});

// axios 实例
const instance = axios.create({
	timeout: 100000,
	responseType: "json",
});

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
	for (const key in pending) {
		const item: number = +key;
		const list: PendingType = pending[key];
		// 当前请求在数组中存在时执行函数体
		if (
			list.url === config.url &&
			list.method === config.method &&
			JSON.stringify(list.params) === JSON.stringify(config.params) &&
			JSON.stringify(list.data) === JSON.stringify(config.data)
		) {
			// 执行取消操作
			list.cancel("操作太频繁，请稍后再试");
			// 从数组中移除记录
			pending.splice(item, 1);
		}
	}
};

// 添加请求拦截器
instance.interceptors.request.use(
	(request: AxiosRequestConfig) => {
		removePending(request);
		request.cancelToken = new CancelToken(c => {
			pending.push({
				url: request.url,
				method: request.method,
				params: request.params,
				data: request.data,
				cancel: c,
			});
		});
		return request;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// 添加响应拦截器
instance.interceptors.response.use(
	(response: AxiosResponse) => {
		removePending(response.config);

		return response;
	},
	async (error: AxiosError) => {
		const response = error.response;

		// 通知提醒
		openNotificationWithIcon(response);

		// 根据返回的code值来做不同的处理(和后端约定)
		switch (response?.status) {
			// token失效
			case 401:
				storage("localstorage").remove("token");
				router.push("/login");
				break;
			// 没有权限
			case 403:
				router.push("/login");
				break;
			case 431:
				router.push("/login");
				break;
			// 服务端错误
			case 500:
				router.push("/503");
				break;
			// 服务端错误
			case 503:
				router.push("/503");
				break;
			default:
				break;
		}

		// 超时重新请求
		const config: AxiosRequestConfig & { [key: string]: any }  = error.config;
		// 全局的请求次数,请求的间隙（毫秒）
		const [RETRY_COUNT, RETRY_DELAY] = [0, 1000];

		if (config && RETRY_COUNT) {
			// 设置用于跟踪重试计数的变量
			config.__retryCount = config.__retryCount || 0;
			// 检查是否已经把重试的总数用完
			if (config.__retryCount >= RETRY_COUNT) {
				return Promise.reject(response || { message: error.message });
			}
			// 增加重试计数
			config.__retryCount++;
			// 创造新的Promise来处理指数后退
			const backoff = new Promise(resolve => {
				setTimeout(() => {
					resolve(null);
				}, RETRY_DELAY || 1);
			});
			// instance重试请求的Promise
			await backoff;
			return await instance(config);
		}

		return Promise.reject(response || { message: error.message });
	}
);

export default instance;
