/**
 * meta信息说明
 * free:是否可以免登录访问此页面
 * tab:是否为侧边栏选项
 * tabName:侧边栏选项名称
 * tabIcon:侧边栏选项左侧图标，可参考icon组件
 * parentTab:父选项路由名称
 * tabs:面包屑显示的名字
 */
export default [
	{
		path:"*",//404处理
		name:'not-found',
		component: () => import( /* webpackChunkName:"not-found" */ '../views/404'),
		meta:{
			free:true,//可免登录访问
		}
	},
	{
		path:"/reload",//空白页面，刷新用的
		name:'reload',
		component: () => import( /* webpackChunkName:"reload" */ '../views/reload'),
	},
	{
		path:"/login",
		name:'login',
		component: () => import( /* webpackChunkName:"login" */ '../views/login'),
		meta:{
			free:true,//可免登录访问
		}
	},
	{
		path:"/",
		name:'home',
		component: () => import( /* webpackChunkName:"home" */ '../views/home'),
		meta:{
			tab:true,//是否为侧边栏选项
			tabName:'主页',//选项名称
			tabIcon:{
				type:'home',
				size:'.32rem'
			},//选项左侧图标
		}
	},
	{
		path:'/components',
		name:'components',
		redirect:'/components/button',
		meta:{
			tab:true,//是否为侧边栏选项
			tabName:'组件',//选项名称
			tabIcon:{
				type:'cog',
				size:'0.32rem'
			},//选项左侧图标
			tabs:['组件']
		}
	},
	{
		path:'/components/button',
		name:'components-button',
		component: () => import( /* webpackChunkName:"components-button" */ '../views/components/button'),
		meta:{
			tab:true,//是否为侧边栏选项
			tabName:'按钮',//选项名称
			parentTab:'components',//父选项路由名称
			tabs:['组件','按钮']
		}
	},
	{
		path:'/components/table',
		name:'components-table',
		component: () => import( /* webpackChunkName:"components-table" */ '../views/components/mtable'),
		meta:{
			tab:true,//是否为侧边栏选项
			tabName:'数据表格',//选项名称
			parentTab:'components',//父选项路由名称
			tabs:['组件','数据表格']
		}
	},
	{
		path:'/components/editor',
		name:'components-editor',
		component: () => import( /* webpackChunkName:"components-editor" */ '../views/components/editor'),
		meta:{
			tab:true,//是否为侧边栏选项
			tabName:'富文本编辑器',//选项名称
			parentTab:'components',//父选项路由名称
			tabs:['组件','富文本编辑器']
		}
	},
	{
		path:'/components/form',
		name:'components-form',
		component: () => import( /* webpackChunkName:"components-form" */ '../views/components/mForm'),
		meta:{
			tab:true,//是否为侧边栏选项
			tabName:'表单提交',//选项名称
			parentTab:'components',//父选项路由名称
			tabs:['组件','表单提交']
		}
	}
]