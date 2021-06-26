<template>
	<div id="app">
		<sidebar :expand.sync="expand" ref="sidebar" v-if="isShow"></sidebar>
		<div class="app-main" :style="mainStyle">
			<topbar ref="topbar" :expand.sync="expand" v-if="isShow" @refresh="refresh"></topbar>
			<keep-alive :include="$store.getters.cachePages"><router-view class="app-main_body" :style="{height:bodyHeight}"></router-view></keep-alive>
		</div>
	</div>
</template>
<script>
import sidebar from './components/sidebar.vue';
import topbar from './components/topbar.vue';
export default {
	name: 'app',
	data() {
		return {
			expand: true, //侧边栏是否展开
			viewKey: 0 ,//路由视图key值
			bodyHeight:'',//主体区域高度
		};
	},
	computed: {
		isShow(){
			if(!this.$route.name){
				return false;
			}
			if(!this.$route.meta.free){
				return true;
			}
			return false;
		},
		//主区域宽度设置
		mainStyle() {
			let style = {};
			if (!this.$route.meta.free) {
				if (this.expand) {
					style.width = 'calc(100% - 4.4rem)';
				} else {
					style.width = 'calc(100% - 1rem)';
				}
			}
			return style;
		}
	},
	components: {
		sidebar,
		topbar
	},
	watch:{
		'$route.name':function(newValue){
			if (this.isShow) {
				this.$nextTick(()=>{
					if (this.$refs.topbar) {
						if (this.$refs.topbar.tabs.length > 0) {
							this.bodyHeight = 'calc(100% - 2rem)';
						} else {
							this.bodyHeight = 'calc(100% - 1rem)';
						}
					} else {
						this.bodyHeight = 'calc(100% - 1rem)';
					}
				})
			}else {
				this.bodyHeight = '';
			}
		}
	},
	methods: {
		//刷新事件
		refresh() {
			this.$router.replace({
				path: '/reload',
				query: {
					redirect: this.$route.fullPath
				}
			});
		}
	}
};
</script>
<style lang="less">
html {
	font-size: 50px;
}

@media only screen and (min-width: 640px) {
	html {
		font-size: 40px;
	}
}

@media only screen and (min-width: 1440px) {
	html {
		font-size: 50px;
	}
}

#app {
	display: flex;
	justify-content: flex-start;
	overflow: hidden;
	width: 100%;
	height: 100%;
	background-color: #fff;
}

.app-main {
	display: block;
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	position: relative;
	transition: all 200ms;
	-webkit-transition: all 200ms;

	.app-main_body {
		display: block;
		width: 100%;
		height: 100%;
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;
		background-color: #fbfbfb;
		padding: 0.2rem;
	}
}

.app-page{
	width: 8rem !important;
}

::-webkit-scrollbar {
	width: 0.16rem;
	height: 0.16rem;
}

::-webkit-scrollbar-track {
	background: #f1f1f1;
	border-radius: 0.12rem;
}

::-webkit-scrollbar-thumb {
	background: #ddd;
	border-radius: 0.12rem;
}
</style>
