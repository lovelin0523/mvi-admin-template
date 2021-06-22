import Ruax from "ruax"
import store from "../store"
import router from "../router"

let ruax = new Ruax();

//设置请求基本路径
ruax.defaults.baseUrl = '#'
//设置请求方式
ruax.defaults.type = 'POST'
//设置超时时间30s
ruax.defaults.timeout = 60000
//请求发送给前统一处理数据
ruax.defaults.beforeRequest = config => {
	//请求头中设置token
	config.headers['X-Auth-Token'] = store.getters.token;
}

//请求响应拦截，统一处理需要登录的请求自动跳转登陆页面
//后端返回示例:{state:103,message:'无权限'}
ruax.defaults.beforeResponse = (xhr, result) => {
	if (result) {
		if (result.code == 103) {
			router.replace({
				path: '/login',
				query: {
					redirect:encodeURIComponent(router.currentRoute.fullPath)
				}
			})
		}
	}
}

export default ruax
