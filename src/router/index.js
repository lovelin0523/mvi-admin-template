import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes"
import store from "../store"
//重写router的push方法
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
//重写replace方法
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
	return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes: routes,
	mode: 'hash',
	scrollBehavior(to, from, savedPostion) {
		return {
			x: 0,
			y: 0
		};
	},
	fallback: true
})

//路由跳转前拦截
router.beforeEach((to, from, next) => {
	if (to.meta) {
		if (!to.meta.free) { //需要验证权限状态
			if (store.getters.token) {
				next()
			} else {
				next({
					path: '/login',
					replace: true,
					query:{
						redirect:encodeURIComponent(to.fullPath)
					}
				})
			}
		} else {
			next()
		}
	} else {
		next()
	}

})

//错误
router.onError(error => {
	console.log(error)
	const pattern = /Loading chunk (\d)+ failed/g;
	const isChunkLoadFailed = error.message.match(pattern);
	const targetPath = router.history.pending.fullPath;
	if (isChunkLoadFailed) {
		router.replace(targetPath);
	}
})

export default router