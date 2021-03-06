/**
 * API 相关配置文件
 * API URL Dict api 字典
 */

interface UrlDictType {
	[key: string]: {
		[key: string]: string;
	};
}

const urlDict: UrlDictType = {
	// 用户
	User: {
		Get: "/user/getUserList",
		Edit: "/user/editUser",
		Add: "/user/addUser",
		AddRole: "/user/addRoleByUser",
		DeleteUser: "/user/deleteUser",
		Login: "/user/login",
	},
	// 景区接口
	ScenicSpot: {
		Get: "/scenicSpot/getPageList",
		Edit: "/scenicSpot/updateScenicSpot",
		Add: "/scenicSpot/addScenicSpot",
		Delete: "/scenicSpot/deleteScenicSpot",
	},
};

const getUrl = (biz: string, UrlName: string): string => {
	try {
		const bizKeys = Object.keys(urlDict);
		if (bizKeys.indexOf(biz) < 0) {
			throw new Error("biz not in Dict");
		}
		let hostname = urlDict[biz][UrlName];
		if (!hostname) {
			throw new Error("url not in Dict");
		}
		if (hostname.substr(0, 1) === "/") {
			hostname = hostname.substr(1);
		}
		return hostname;
	} catch (err) {
		console.error(err);
		return "";
	}
};

export default getUrl;
