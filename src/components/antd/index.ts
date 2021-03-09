import { App } from "vue";
import {
	Affix,
	Anchor,
	AutoComplete,
	Alert,
	Avatar,
	BackTop,
	Badge,
	Breadcrumb,
	Button,
	Calendar,
	Card,
	Collapse,
	Carousel,
	Cascader,
	Checkbox,
	Col,
	DatePicker,
	Divider,
	Dropdown,
	Form,
	Input,
	InputNumber,
	Layout,
	List,
	LocaleProvider,
	message,
	Menu,
	Mentions,
	Modal,
	notification,
	Pagination,
	Popconfirm,
	Popover,
	Progress,
	Radio,
	Rate,
	Row,
	Select,
	Slider,
	Spin,
	Statistic,
	Steps,
	Switch,
	Table,
	Tabs,
	Transfer,
	Tree,
	TreeSelect,
	Tag,
	TimePicker,
	Timeline,
	Tooltip,
	Upload,
	version,
	Drawer,
	Skeleton,
	Comment,
	ConfigProvider,
	Empty,
	Result,
	Descriptions,
	Space,
	PageHeader,
	Image,
} from "ant-design-vue";

const components = [
	Affix,
	Anchor,
	AutoComplete,
	Alert,
	Avatar,
	BackTop,
	Badge,
	Breadcrumb,
	Button,
	Calendar,
	Card,
	Collapse,
	Carousel,
	Cascader,
	Checkbox,
	Col,
	DatePicker,
	Divider,
	Dropdown,
	Form,
	Input,
	InputNumber,
	Layout,
	List,
	LocaleProvider,
	message,
	Menu,
	Mentions,
	Modal,
	notification,
	Pagination,
	Popconfirm,
	Popover,
	Progress,
	Radio,
	Rate,
	Row,
	Select,
	Slider,
	Spin,
	Statistic,
	Steps,
	Switch,
	Table,
	Tabs,
	Transfer,
	Tree,
	TreeSelect,
	Tag,
	TimePicker,
	Timeline,
	Tooltip,
	Upload,
	version,
	Drawer,
	Skeleton,
	Comment,
	ConfigProvider,
	Empty,
	Result,
	Descriptions,
	Space,
	PageHeader,
	Image,
];

export default function setupAntd(app: App<Element>): App<Element> {
	app.config.globalProperties.$message = message;
	components.forEach(component => app.use(component));
	return app;
}
