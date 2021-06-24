<template>
	<div class="app-login">
		<m-row>
			<m-col :xl="{span:6,offset:9}" :md="{span:8,offset:8}" :sm="{span:12,offset:6}" :xs="{span:18,offset:3}">
				<div class="app-login-wrapper">
					<div class="mvi-text-center mvi-font-h1 mvi-text-bold mvi-mb-4">MVI Admin Template</div>
					<div class="mvi-text-sub mvi-text-center mvi-mb-10">MVI作者搭建的单页面后台管理系统模板</div>
					<form>
						<m-field size="large" clearable class="mvi-mb-4" v-model.trim="account" :active-color="$store.getters.theme.themeColor" 
						placeholder="管理员账号" @keyup.enter="doLogin">
							<template v-slot:prefix>
								<m-icon class="mvi-text-sub" size="0.36rem" type="user-alt" />
							</template>
						</m-field>
						<m-field size="large" clearable class="mvi-mb-4" v-model.trim="password" type="password" :active-color="$store.getters.theme.themeColor" 
						placeholder="管理员密码" @keyup.enter="doLogin">
							<template v-slot:prefix>
								<m-icon class="mvi-text-sub" size="0.36rem" type='lock-alt' />
							</template>
						</m-field>
						<m-field size="large" clearable class="mvi-mb-4" v-model.trim="code" :active-color="$store.getters.theme.themeColor" 
						placeholder="图形验证码"  @keyup.enter="doLogin">
							<template v-slot:prefix>
								<m-icon class="mvi-text-sub" size="0.36rem" type='safe-alt' />
							</template>
							<template v-slot:suffix>
								<m-verify @change="verifyChange" ref="verify" style="width:3rem;height: .8rem;"></m-verify>
							</template>
						</m-field>
						<div class="mvi-mb-4">
							<m-checkbox v-model="remember" :fill-color="$store.getters.theme.themeColor" label="记住密码"></m-checkbox>
						</div>
						<div>
							<m-button @keyup.enter="doLogin" :disabled="!account || !password" @click="doLogin" form-control :color="$store.getters.theme.themeColor" size="large" sub-color="#fff">登入</m-button>
						</div>
					</form>
				</div>
			</m-col>
		</m-row>
		<div class="app-login-footer">
			<div class="mvi-text-sub mvi-mb-2">@2021  mvi-web.cn</div>
			<a href="https://www.mvi-web.cn/mvi" target="_blank">前往查看MVI框架</a>
		</div>
	</div>
</template>

<script>
	export default {
		name:'login',
		data(){
			return {
				account:'',
				password:'',
				code:'',
				remember:false,
				currentCode:''
			}
		},
		mounted() {
			this.$showNotify({
				background:this.$store.getters.theme.themeColor,
				color:this.$store.getters.theme.themeTextColor,
				message:'模板仅供参考，输入任意账号密码可进入',
				icon:'info-o-alt'
			})
			if(this.$store.getters.admin.account){
				this.account = this.$store.getters.admin.account;
			}
			if(this.$store.getters.admin.password){
				this.password = this.$store.getters.admin.password;
			}
			if(this.$store.getters.admin.remember){
				this.remember = this.$store.getters.admin.remember;
			}
		},
		methods:{
			verifyChange(code){
				this.currentCode = code;
			},
			doLogin(){
				if(!this.account){
					this.$msgbox({
						animation:'scale',
						message:'请输入账号'
					})
					return;
				}
				if(!this.password){
					this.$msgbox({
						animation:'scale',
						message:'请输入密码'
					})
					return;
				}
				if(!this.code){
					this.$msgbox({
						animation:'scale',
						message:'请输入验证码'
					})
					return;
				}
				if(this.code.toLocaleUpperCase() != this.currentCode.toLocaleUpperCase()){
					this.$msgbox({
						animation:'scale',
						message:'图形验证码错误'
					})
					this.code = '';
					this.$refs.verify.draw();
					return;
				}
				let admin = {
					account : this.account,
					remember: this.remember
				}
				if(this.remember){
					admin.password = this.password;
				}
				//定义一个虚拟信息
				this.$store.commit('token','abcde');
				this.$store.commit('admin',admin);
				this.$router.replace(this.$route.query.redirect?decodeURIComponent(this.$route.query.redirect):'/');
			}
		}
	}
</script>

<style scoped lang="less">
	.app-login{
		background-color: #f6f7fb;
		position: relative;
		padding: 1px;
		min-height: 100% !important;
		height: auto !important;
		
		.app-login-wrapper{
			display: block;
			border-radius: 0.12rem;
			padding: 1.5rem 0;
		}
	}
	
	.app-login-footer{
		position: absolute;
		bottom: 0;
		width: 100%;
		text-align: center;
		padding: .2rem 0;
	}
</style>
