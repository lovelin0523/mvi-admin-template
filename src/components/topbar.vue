<template>
    <div class="app-topbar">
        <div class="app-topbar-top">
            <div>
                <m-tooltip title="侧边伸缩" trigger="hover">
                    <m-icon class="mvi-cursor-pointer mvi-font-h6" @click="changeSidebarExpand" :type="expand ? 'indent-left' : 'indent-right'" />
                </m-tooltip>
                <m-tooltip class="mvi-ml-8" title="刷新" trigger="hover">
                    <m-icon @click="refresh" type="refresh-a" class="mvi-cursor-pointer mvi-font-h6" />
                </m-tooltip>
                <div class="app-topbar-search mvi-ml-8">
                    <m-field :active-color="$store.getters.theme.themeColor" round size="small" v-model.trim="search" placeholder="全局搜索..." clearable :prefix="{ type: 'search', size: '.3rem' }"></m-field>
                </div>
            </div>
            <div>
                <m-tooltip title="消息中心" trigger="hover">
                    <m-icon type="bell-alt" class="mvi-cursor-pointer mvi-font-h6" />
                </m-tooltip>
                <div id="noteRoot" class="mvi-ml-8" style="position: relative;">
                    <m-tooltip id="noteTarget" title="便签" trigger="hover">
                        <m-icon @click="openNote" type="sale-alt" class="mvi-cursor-pointer mvi-font-h6" />
                    </m-tooltip>
                    <m-layer target="#noteTarget" root="#noteRoot" v-model="noteShow" placement="bottom-end" offset="0.2rem" :z-index="400" ref="noteLayer" width="6rem" closable>
                        <div class="app-topbar-note-header" :style="{ color: $store.getters.theme.topbarNoteHeaderColor, backgroundColor: $store.getters.theme.topbarNoteHeaderBackground }">
                            <span>便签</span>
                            <m-icon @click="closeNote" class="mvi-cursor-pointer" type="times" />
                        </div>
                        <m-input type="textarea" v-model="noteContent" placeholder="便签内容保存在本地" :autosize="{ minRows: 4, maxRows: 10 }"></m-input>
                    </m-layer>
                </div>
                <m-tooltip class="mvi-ml-8" :title="fullScreen ? '退出全屏' : '全屏'" trigger="hover">
                    <m-icon @click="changeFullScreen" :type="fullScreen ? 'exit-full-screen' : 'full-screen'" class="mvi-cursor-pointer mvi-font-h6" />
                </m-tooltip>
                <div class="mvi-ml-8" id="adminRoot" style="position: relative;" @mouseenter="openInfo" @mouseleave="closeInfo">
                    <div id="adminTarget" class="mvi-flex-start">
                        <span class="mvi-mr-1" v-text="$store.getters.admin.account"></span>
                        <m-icon :type="infoShow ? 'caret-up' : 'caret-down'" />
                    </div>
                    <m-layer target="#adminTarget" root="#adminRoot" v-model="infoShow" placement="bottom" offset="0.1rem" :z-index="400" border ref="adminLayer">
                        <div class="app-topbar-info">
                            <router-link class="app-topbar-info-el" tag="div" to="/info">基本信息</router-link>
                            <router-link class="app-topbar-info-el" tag="div" to="/password">修改密码</router-link>
                            <div class="app-topbar-info-btn">
                                <m-button @click="doLogout" :color="$store.getters.theme.themeColor" :sub-color="$store.getters.theme.themeTextColor" plain form-control size="mini" class="mvi-m-0">
                                    <m-icon type="switch" size=".3rem" />
                                    <span class="mvi-ml-1">退出</span>
                                </m-button>
                            </div>
                        </div>
                    </m-layer>
                </div>
                <m-tooltip title="换肤" class="mvi-ml-4" trigger="hover">
                    <div @click="skinPopup = true" class="app-topbar-skin" :style="{ color: $store.getters.theme.themeTextColor, backgroundColor: $store.getters.theme.themeColor }">
                        <m-icon type="color-picker" />
                    </div>
                </m-tooltip>
            </div>
        </div>
        <div v-if="tabs.length > 0" class="app-topbar-bottom">
            <div class="mvi-mr-2" v-for="(item, index) in tabs" :key="'tab-' + index">
                <span :class="index < tabs.length - 1 ? 'mvi-text-sub' : ''" v-text="item"></span>
                <span class="mvi-ml-2" v-if="index < tabs.length - 1">/</span>
            </div>
        </div>
        <!-- 换肤弹窗 -->
        <m-popup v-model="skinPopup" width="6rem" placement="right" closable show-times popup-color="#fff">
            <div class="mvi-pb-10">
                <div class="mvi-mb-4">
                    <m-input id="color-1" label="主题色" label-width="1.6rem" v-model.trim="theme.themeColor" border>
                        <template v-slot:right>
                            <div @click="themeColorShow = !themeColorShow" class="app-skin-demo" :style="{ backgroundColor: theme.themeColor }"></div>
                        </template>
                    </m-input>
                    <m-layer v-model="themeColorShow" target="#color-1" fixed width="7rem" closable @show="themeColorPickerShow=true" @hidden="themeColorPickerShow=false">
                        <m-color-picker v-if="themeColorPickerShow" hex :show-alpha="false" v-model="theme.themeColor"></m-color-picker>
                    </m-layer>
                </div>
                <div class="mvi-mb-4">
                    <m-input id="color-2" label="主题文本色" label-width="1.6rem" v-model.trim="theme.themeTextColor" border>
                        <template v-slot:right>
                            <div @click="themeTextColorShow = !themeTextColorShow" class="app-skin-demo" :style="{ backgroundColor: theme.themeTextColor }"></div>
                        </template>
                    </m-input>
                    <div class="mvi-text-muted mvi-font-small mvi-pl-2 mvi-mt-1">* 当主色调颜色为背景色时，该颜色用于设置主色调背景上的字体颜色</div>
                    <m-layer v-model="themeTextColorShow" target="#color-2" fixed width="7rem" closable @show="themeTextColorPickerShow=true" @hidden="themeTextColorPickerShow=false">
                        <m-color-picker v-if="themeTextColorPickerShow" hex :show-alpha="false" v-model="theme.themeTextColor"></m-color-picker>
                    </m-layer>
                </div>
                <div class="mvi-mb-4">
                    <m-input id="color-3" label="侧边栏背景" label-width="1.6rem" v-model.trim="theme.sidebarBackground" border>
                        <template v-slot:right>
                            <div class="app-skin-demo" @click="sidebarBackgroundShow = !sidebarBackgroundShow" :style="{ backgroundColor: theme.sidebarBackground }"></div>
                        </template>
                    </m-input>
                    <m-layer v-model="sidebarBackgroundShow" target="#color-3" fixed width="7rem" closable @show="sidebarBackgroundPickerShow=true" @hidden="sidebarBackgroundPickerShow=false">
                        <m-color-picker v-if="sidebarBackgroundPickerShow" hex :show-alpha="false" v-model="theme.sidebarBackground"></m-color-picker>
                    </m-layer>
                </div>
                <div class="mvi-mb-4">
                    <m-input id="color-4" label="侧边栏标题" label-width="1.6rem" v-model.trim="theme.sidebarTitleColor" border>
                        <template v-slot:right>
                            <div class="app-skin-demo" @click="sidebarTitleColorShow = !sidebarTitleColorShow" :style="{ backgroundColor: theme.sidebarTitleColor }"></div>
                        </template>
                    </m-input>
                    <m-layer v-model="sidebarTitleColorShow" target="#color-4" fixed width="7rem" closable @show="sidebarTitleColorPickerShow=true" @hidden="sidebarTitleColorPickerShow=false">
                        <m-color-picker v-if="sidebarTitleColorPickerShow" hex :show-alpha="false" v-model="theme.sidebarTitleColor"></m-color-picker>
                    </m-layer>
                </div>
                <div class="mvi-mb-4">
                    <m-input id="color-5" label="侧边栏列表项" label-width="1.6rem" v-model.trim="theme.sidebarCollapseColor" border>
                        <template v-slot:right>
                            <div class="app-skin-demo" @click="sidebarCollapseColorShow = !sidebarCollapseColorShow" :style="{ backgroundColor: theme.sidebarCollapseColor }"></div>
                        </template>
                    </m-input>
                    <m-layer v-model="sidebarCollapseColorShow" target="#color-5" fixed width="7rem" closable @show="sidebarCollapseColorPickerShow=true" @hidden="sidebarCollapseColorPickerShow=false">
                        <m-color-picker v-if="sidebarCollapseColorPickerShow" hex :show-alpha="false" v-model="theme.sidebarCollapseColor"></m-color-picker>
                    </m-layer>
                </div>
                <div class="mvi-mb-4">
                    <m-input id="color-6" label="便签头部背景" label-width="1.6rem" v-model.trim="theme.topbarNoteHeaderBackground" border>
                        <template v-slot:right>
                            <div class="app-skin-demo" @click="topbarNoteHeaderBackgroundShow = !topbarNoteHeaderBackgroundShow" :style="{ backgroundColor: theme.topbarNoteHeaderBackground }"></div>
                        </template>
                    </m-input>
                    <m-layer v-model="topbarNoteHeaderBackgroundShow" target="#color-6" fixed width="7rem" closable @show="topbarNoteHeaderBackgroundPickerShow=true" @hidden="topbarNoteHeaderBackgroundPickerShow=false">
                        <m-color-picker v-if="topbarNoteHeaderBackgroundPickerShow" hex :show-alpha="false" v-model="theme.topbarNoteHeaderBackground"></m-color-picker>
                    </m-layer>
                </div>
                <div class="mvi-mb-4">
                    <m-input id="color-7" label="便签头部字体" label-width="1.6rem" v-model.trim="theme.topbarNoteHeaderColor" border>
                        <template v-slot:right>
                            <div class="app-skin-demo" @click="topbarNoteHeaderColorShow = !topbarNoteHeaderColorShow" :style="{ backgroundColor: theme.topbarNoteHeaderColor }"></div>
                        </template>
                    </m-input>
                    <m-layer v-model="topbarNoteHeaderColorShow" target="#color-7" fixed width="7rem" closable @show="topbarNoteHeaderColorPickerShow=true" @hidden="topbarNoteHeaderColorPickerShow=false">
                        <m-color-picker v-if="topbarNoteHeaderColorPickerShow" hex :show-alpha="false" v-model="theme.topbarNoteHeaderColor"></m-color-picker>
                    </m-layer>
                </div>
                <div class="app-skin-btn">
                    <m-button @click="doSaveTheme" form-control class="mvi-m-0" :color="$store.getters.theme.themeColor" :sub-color="$store.getters.theme.themeTextColor">
                        保存设置
                    </m-button>
                </div>
            </div>
        </m-popup>
    </div>
</template>

<script>
export default {
    name: 'topbar',
    data() {
        return {
            search: '', //全局搜索内容
            noteShow: false, //便签开关
            fullScreen: false, //是否全屏
            infoShow: false, //管理员浮层是否显示
            skinPopup: false, //换肤弹窗显示
            theme: {},
            themeColorShow: false,
            themeTextColorShow: false,
            sidebarBackgroundShow: false,
            sidebarTitleColorShow: false,
            sidebarCollapseColorShow: false,
            topbarNoteHeaderBackgroundShow: false,
            topbarNoteHeaderColorShow: false,
            themeColorPickerShow: false,
            themeTextColorPickerShow: false,
            sidebarBackgroundPickerShow: false,
            sidebarTitleColorPickerShow: false,
            sidebarCollapseColorPickerShow: false,
            topbarNoteHeaderBackgroundPickerShow: false,
            topbarNoteHeaderColorPickerShow: false
        }
    },
    props: {
        expand: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        tabs() {
            return this.$route.meta.tabs || []
        },
        noteContent: {
            get() {
                return this.$store.getters.note
            },
            set(value) {
                this.$store.commit('note', value)
            }
        }
    },
    created() {
        this.theme = Object.assign({}, this.$store.getters.theme)
    },
    methods: {
        //刷新
        refresh() {
            this.$emit('refresh')
        },
        //保存主题
        doSaveTheme() {
            this.$store.commit('theme', Object.assign({}, this.theme))
        },
        //退出系统
        doLogout() {
            this.$Confirm({
                message: '确定退出系统？',
                btns: {
                    ok: {
                        color: this.$store.getters.theme.themeColor,
                        subColor: this.$store.getters.theme.themeTextColor
                    }
                },
                callback: r => {
                    if (r) {
                        this.$store.commit('token', '')
                        this.$router.replace({
                            path: '/login',
                            query: {
                                redirect: this.$route.fullPath
                            }
                        })
                    }
                }
            })
        },
        //全屏
        changeFullScreen() {
            //退出全屏
            if (this.fullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
                this.fullScreen = false
            } else {
                //全屏
                let el = document.documentElement
                let rfs =
                    el.requestFullScreen ||
                    el.webkitRequestFullScreen ||
                    el.mozRequestFullScreen ||
                    el.msRequestFullscreen
                if (typeof rfs != 'undefined' && rfs) {
                    this.fullScreen = true
                    rfs.call(el)
                }
            }
        },
        //关闭管理员信息悬浮层
        closeInfo() {
            this.infoShow = false
        },
        //关闭便签弹窗
        closeNote() {
            this.noteShow = false
        },
        //打开便签弹窗
        openNote(e) {
            this.noteShow = !this.noteShow
        },
        //打开管理员信息悬浮层
        openInfo(e) {
            this.infoShow = !this.infoShow
        },
        //改变侧边栏展开状态
        changeSidebarExpand() {
            this.$emit('update:expand', !this.expand)
        }
    }
}
</script>

<style scoped lang="less">
.app-topbar {
    width: 100%;
    background-color: #fff;

    .app-topbar-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #ddd;
        padding-left: 0.8rem;

        & > div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }

    .app-topbar-bottom {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #ddd;
        padding: 0 0.4rem;
        font-size: 0.28rem;
    }
}

.app-topbar-search {
    width: 6rem;
}

.app-topbar-note-header {
    border-radius: inherit inherit 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    padding: 0 0.4rem;
    font-size: 0.32rem;
}

.app-topbar-info {
    padding: 0.1rem 0;

    .app-topbar-info-el {
        padding: 0.2rem 0.4rem;
        white-space: nowrap;

        &:hover {
            background-color: #f6f7fb;
            cursor: pointer;
        }
    }

    .app-topbar-info-btn {
        padding: 0.2rem 0.2rem 0.1rem 0.2rem;
        border-top: 1px solid #ddd;
    }
}

.app-topbar-skin {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    font-size: 0.28rem;

    &:hover {
        cursor: pointer;
    }
}

.app-skin-demo {
    display: block;
    height: 0.5rem;
    width: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.02rem;

    &:hover {
        cursor: pointer;
    }
}

.app-skin-btn {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    padding: 0.2rem;
}
</style>
