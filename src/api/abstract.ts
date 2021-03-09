/**
 * axios基础构建
 */

import getUrl from "./config";
import instance from "./intercept";
import { AxiosRequest, CustomResponse } from "./types";
import storage from "@/utils/storage";

class Abstract {
	protected baseURL: string = process.env.VUE_APP_PROXY;

	protected headers: object = {
		ContentType: "application/json;charset=UTF-8",
	};

	private apiAxios({
		baseURL = this.baseURL,
		headers = this.headers,
		method,
		url,
		data,
		params,
		responseType,
	}: AxiosRequest): Promise<CustomResponse> {
		Object.assign(headers, {
			token: storage("localstorage").get("token"),
			// "x-language": storage("localstorage").get("i18n")
		});

		// url解析
		const _url = (url as string).split(".");
		if (_url.length > 1) {
			url = getUrl(_url[0], _url[1]);
		}

		return new Promise((resolve, reject) => {
			instance({
				baseURL,
				headers,
				method,
				url,
				params,
				data,
				responseType,
			})
				.then(res => {
					// 200:服务端业务处理正常结束
					if (res.status === 200) {
						if (res.data.success) {
							resolve({
								status: true,
								message: "success",
								data: res.data?.data,
								origin: res.data,
							});
						} else {
							resolve({
								status: false,
								message: res.data?.msg || url + "请求失败",
								data: res.data?.data,
								origin: res.data,
							});
						}
					} else {
						resolve({
							status: false,
							message: res.data?.msg || url + "请求失败",
							data: null,
						});
					}
				})
				.catch(err => {
					const message =
						err?.data?.errorMessage || err?.message || url + "请求失败";
					reject({ status: false, message, data: null });
				});
		});
	}

	/**
	 * GET类型的网络请求
	 */
	protected getReq({
		baseURL,
		headers,
		url,
		data,
		params,
		responseType,
	}: AxiosRequest) {
		return this.apiAxios({
			baseURL,
			headers,
			method: "GET",
			url,
			data,
			params,
			responseType,
		});
	}

	/**
	 * POST类型的网络请求
	 */
	protected postReq({
		baseURL,
		headers,
		url,
		data,
		params,
		responseType,
	}: AxiosRequest) {
		return this.apiAxios({
			baseURL,
			headers,
			method: "POST",
			url,
			data,
			params,
			responseType,
		});
	}

	/**
	 * PUT类型的网络请求
	 */
	protected putReq({
		baseURL,
		headers,
		url,
		data,
		params,
		responseType,
	}: AxiosRequest) {
		return this.apiAxios({
			baseURL,
			headers,
			method: "PUT",
			url,
			data,
			params,
			responseType,
		});
	}

	/**
	 * DELETE类型的网络请求
	 */
	protected deleteReq({
		baseURL,
		headers,
		url,
		data,
		params,
		responseType,
	}: AxiosRequest) {
		return this.apiAxios({
			baseURL,
			headers,
			method: "DELETE",
			url,
			data,
			params,
			responseType,
		});
	}
}

export default Abstract;
