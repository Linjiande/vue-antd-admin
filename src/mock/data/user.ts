import Mock from "mockjs";

Mock.mock(/\/mock\/api\/user/, "get", (options: any) => {
	const totalCount = Mock.Random.natural(1, 20),
		params = options.url.split(/\?/)[1]?.split(/\&/);

	return {
		success: true,
		msg: "请求成功",
		data: Mock.mock({
			[`list|${totalCount / 10 > 1 ? 10 : totalCount % 10}`]: [
				{
					id: "@id()",
					key: "@word()",
					dictName: "@cword(3, 5)",
					describe: "@csentence()",
				},
			],
			totalCount,
			totalPage: 1,
		}),
	};
});
