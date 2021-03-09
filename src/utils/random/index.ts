// 生产随机数
export default function random(params: [number, number]) {
	let mix: number = 0,
		max: number = 0;
	if (params[0] >= 0 && params[1] >= 0) {
		if (params[0] > params[1]) {
			max = params[0];
			mix = params[1];
		} else {
			max = params[1];
			mix = params[0];
		}
	}
	return Math.floor(Math.random() * (max - mix)) + mix;
}
