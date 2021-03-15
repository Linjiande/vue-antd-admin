import Mock from "mockjs";

Mock.mock(/\/mock\/api\/orders/, "get", (options: any) => {
	const totalCount = Mock.Random.natural(1, 20),
		params = options.url.split(/\?/)[1]?.split(/\&/);

	return {
		success: true,
		msg: "请求成功",
		data: Mock.mock({
			[`list|${totalCount / 10 > 1 ? 10 : totalCount % 10}`]: [
				{
					id: Mock.mock("@id()"),
					order_id: Mock.mock("@id()"),
					transaction_id: "@guid()U",
					email: "@email()",
					currency: "EUR",
					fulfillment_status: "FULFILLED",
					tracking_status: "sent",
					tracking_company: "USPS",
					tracking_number: Mock.mock("@id()"),
					created_at: "@datetime()",
					updated_at: "@datetime()",
					"requires_shipping|1": true,
				},
			],
			totalCount,
			totalPage: 1,
		}),
	};
});
