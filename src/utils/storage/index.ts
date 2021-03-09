/**
 * 统一封装对外的接口
 */
import { SessionStorageAPI } from "./sessionstorage";
import { CookieAPI } from "./cookie";
import { LocalStorageAPI } from "./localstorage";

interface UseStoreType {
	set: Function;
	get: Function;
	remove: Function;
	setExpire?: Function;
	getExpire?: Function;
}

export default (store?: string): UseStoreType => {
	let UseStore;
	switch (store) {
		case "session":
			UseStore = SessionStorageAPI;
			break;
		case "cookie":
			UseStore = CookieAPI;
			break;
		case "localstorage":
			UseStore = LocalStorageAPI;
			break;
		default:
			UseStore = SessionStorageAPI;
			break;
	}
	return new UseStore();
};
