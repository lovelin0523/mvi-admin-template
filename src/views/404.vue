<template>
    <div class="mvi-flex-center">
        <div>
            <div class="app-title">404</div>
            <div class="app-desc">你要访问的页面找不到！</div>
            <div class="mvi-text-center">
                <m-button @click="goHome" size="large" :sub-color="$store.getters.theme.themeTextColor" :color="$store.getters.theme.themeColor">
                    <span class="mvi-px-4 mvi-flex-start">
                        <m-icon type="home-alt" class="mvi-mr-1" />返回主页
                    </span>
                </m-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'not-found',
    methods: {
        goHome() {
            this.$router.push('/')
        }
    }
}
</script>

<style lang="less" scoped>
.app-title {
    font-size: 4rem;
    text-align: center;
    letter-spacing: 1rem;
    font-weight: bold;
    color: #666;
    margin-bottom: 0.6rem;
    line-height: 1;
}

.app-desc {
    text-align: center;
    font-size: 0.64rem;
    color: #808080;
    margin-bottom: 2rem;
    line-height: 1;
}
</style>
