import Abstract from "./abstract";

class Api extends Abstract {
	/**
	 * 获取
	 */
	get(url: string, params: object) {
		return this.getReq({ url, params });
	}

	/**
	 * 编辑
	 * @param data
	 */
	edit(url: string, data: object) {
		return this.putReq({ url, data });
	}

	/**
	 * 新增
	 * @param data
	 */
	put(url: string, data: object) {
		return this.putReq({ url, data });
	}

	/**
	 * 删除
	 * @param data
	 */
	delete(url: string, data: object) {
		return this.deleteReq({ url, data });
	}
}

// 单列模式返回对象
let instance;
export default (() => {
	if (instance) return instance;
	instance = new Api();
	return instance;
})();
