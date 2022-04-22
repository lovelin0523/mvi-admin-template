<template>
    <div :class="['app-sidebar',expand?'':'expand']" :style="{backgroundColor:$store.getters.theme.sidebarBackground}">
        <!-- 侧边栏头部 -->
        <div @click="goHome" class="app-sidebar-header">
            <m-image :class="['app-sidebar-logo',expand?'':'expand']" :src="$config.root+'logo.png'"></m-image>
            <span v-if="expand" class="app-sidebar-title" :style="{color:$store.getters.theme.sidebarTitleColor}">Template</span>
        </div>
        <m-collapse ref="collapse" v-if="expand" class="app-sidebar-collapse" v-model="tabIndex" accordion :in-border="false" :out-border="false" @model-change="goRootTab" arrow-class="app-sidebar-collapse_arrow" open-arrow="caret-down" close-arrow="caret-right" :style="{backgroundColor:$store.getters.theme.sidebarBackground,color:$store.getters.theme.sidebarCollapseColor}">
            <m-collapse-item v-for="(item,index) in rootTabs" :key="'root-tab-'+index" :title="item.meta.tabName" content-class="mvi-p-0" :icon="tabIcon(item)">
                <router-link :to="el.path" :class="['app-sidebar-el',$route.name == el.name?'active':'']" v-for="(el,i) in childrenTabs(item)" :key="'child-tab-'+i" :style="{color:($route.name==el.name?$store.getters.theme.themeTextColor:''),backgroundColor:($route.name==el.name?$store.getters.theme.themeColor:'')}" v-slot="{ navigate }">
                    <div v-text="el.meta.tabName" @click="navigate"></div>
                </router-link>
            </m-collapse-item>
        </m-collapse>
        <div v-else>
            <div @click="goTab(item)" :class="['app-sidebar-expand',tabIndex == index?'active':'']" v-for="(item,index) in rootTabs" :key="'root-tab-expand-'+index" :style="{color:$store.getters.theme.sidebarCollapseColor}">
                <div v-if="tabIndex == index" class="app-sidebar-expand-border" :style="{backgroundColor:$store.getters.theme.themeColor}"></div>
                <m-icon :type="tabIcon(item).type" :url="tabIcon(item).url" :spin="tabIcon(item).spin" :size="tabIcon(item).size" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sidebar',
    data() {
        return {
            tabIndex: 0
        }
    },
    props: {
        expand: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        sidebarCollapseColor() {
            return this.$store.getters.theme.sidebarCollapseColor
        },
        tabIcon() {
            return item => {
                let url = null
                let type = null
                let spin = false
                let size = null
                if (item.meta && item.meta.tabIcon) {
                    if (this.$dap.common.isObject(item.meta.tabIcon)) {
                        url = item.meta.tabIcon.url
                        type = item.meta.tabIcon.type
                        spin = item.meta.tabIcon.spin
                        size = item.meta.tabIcon.size
                    } else {
                        type = item.meta.tabIcon
                    }
                }
                return {
                    url,
                    type,
                    spin,
                    size
                }
            }
        },
        rootTabs() {
            let arr = []
            let routes = this.$router.options.routes
            let length = routes.length
            for (let i = 0; i < length; i++) {
                if (
                    routes[i].meta &&
                    routes[i].meta.tab &&
                    !routes[i].meta.parentTab
                ) {
                    arr.push(routes[i])
                }
            }
            return arr
        },
        childrenTabs() {
            return item => {
                let arr = []
                let routes = this.$router.options.routes
                let length = routes.length
                for (let i = 0; i < length; i++) {
                    if (
                        routes[i].meta &&
                        routes[i].meta.tab &&
                        routes[i].meta.parentTab == item.name
                    ) {
                        arr.push(routes[i])
                    }
                }
                if (arr.length == 0) {
                    arr.push(item)
                }
                return arr
            }
        }
    },
    mounted() {
        this.setTabIndex()
        if (this.expand) {
            this.$refs.collapse.$el
                .querySelectorAll('.mvi-cell-arrow')
                .forEach(el => {
                    el.style.color =
                        this.$store.getters.theme.sidebarCollapseColor
                })
        }
    },
    watch: {
        '$route.name': function (newValue) {
            this.setTabIndex()
        },
        sidebarCollapseColor: function (newValue) {
            if (this.expand) {
                this.$refs.collapse.$el
                    .querySelectorAll('.mvi-cell-arrow')
                    .forEach(el => {
                        el.style.color = newValue
                    })
            }
        },
        expand(newValue) {
            if (newValue) {
                this.$nextTick(() => {
                    this.$refs.collapse.$el
                        .querySelectorAll('.mvi-cell-arrow')
                        .forEach(el => {
                            el.style.color =
                                this.$store.getters.theme.sidebarCollapseColor
                        })
                })
            }
        }
    },
    methods: {
        //点击侧边栏一级目录
        goRootTab() {
            if (this.tabIndex != null && this.tabIndex >= 0) {
                let route = this.rootTabs[this.tabIndex]
                this.$router.push(route.path)
            }
        },
        //侧边栏收起状态下点击图标
        goTab(item, index) {
            this.$router.push(item.path)
            this.$emit('update:expand', true)
        },
        //设置tabIndex
        setTabIndex() {
            let rootTabslength = this.rootTabs.length
            let index = -1
            for (let i = 0; i < rootTabslength; i++) {
                let root = this.rootTabs[i]
                let children = this.childrenTabs(root)
                for (let j = 0; j < children.length; j++) {
                    if (children[j].name == this.$route.name) {
                        index = i
                        break
                    }
                }
                if (index > -1) {
                    break
                }
            }
            this.tabIndex = index
        },
        //返回主页
        goHome() {
            this.$router.push('/')
        }
    }
}
</script>
<style scoped lang="less">
.app-sidebar {
    display: block;
    width: 4.4rem;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 200ms;
    -webkit-transition: all 200ms;

    &.expand {
        width: 1rem;
    }

    .app-sidebar-header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0.24rem 0.2rem;
        opacity: 0.8;

        &:hover {
            cursor: pointer;
            opacity: 1;
        }
    }

    .app-sidebar-logo {
        display: block;
        width: 1rem;
        height: 1rem;
        margin-right: 0.2rem;

        &.expand {
            width: 0.6rem;
            height: 0.6rem;
            margin-right: 0;
        }
    }

    .app-sidebar-title {
        display: block;
        font-size: 0.48rem;
        max-width: 2.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.app-sidebar-collapse {
    .app-sidebar-el {
        padding-left: 0.8rem;
        opacity: 0.8;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 0.72rem;

        &:hover {
            cursor: pointer;
            opacity: 1;
        }

        &.active {
            opacity: 1;
        }
    }
}

.app-sidebar-expand {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    margin-top: 0.4rem;
    font-size: 0.4rem;
    opacity: 0.8;
    position: relative;
    height: 0.8rem;

    &:hover {
        cursor: pointer;
        opacity: 1;
    }

    &.active {
        opacity: 1;
    }

    .app-sidebar-expand-border {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 0.1rem;
    }
}
</style>
