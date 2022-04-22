import Vue from 'vue'
import Vuex from 'vuex'
import $dap from 'dap-util'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null, //登录token
        admin: null, //管理员信息
        cachePages: ['not-found'], //缓存页面名称
        note: null, //便签缓存
        theme: null //主题颜色对象
    },
    getters: {
        token(state) {
            if (state.token) {
                return state.token
            }
            let token = localStorage.getItem('mvi-admin-token')
            return token || ''
        },
        admin(state) {
            if (state.admin) {
                return state.admin
            }
            let admin = localStorage.getItem('mvi-admin-admin')
            try {
                admin = JSON.parse(admin) || {}
            } catch (e) {
                admin = {}
            }
            return admin
        },
        cachePages(state) {
            return state.cachePages.toString()
        },
        note(state) {
            if (state.note) {
                return state.note
            } else {
                return localStorage.getItem('mvi-admin-note') || ''
            }
        },
        theme(state) {
            if (state.theme) {
                return state.theme
            }
            let defaultTheme = {
                themeColor: '#07C160',
                themeTextColor: '#fff',
                sidebarBackground: '#202020',
                sidebarTitleColor: '#fff',
                sidebarCollapseColor: '#fff',
                topbarNoteHeaderBackground: '#28333E ',
                topbarNoteHeaderColor: '#fff'
            }
            let theme = localStorage.getItem('mvi-admin-theme')
            try {
                theme = JSON.parse(theme)
                if (!theme || $dap.common.isEmptyObject(theme)) {
                    theme = defaultTheme
                }
            } catch (e) {
                theme = defaultTheme
            }
            return theme
        }
    },
    mutations: {
        token(state, value) {
            if (value) {
                state.token = value
                localStorage.setItem('mvi-admin-token', value)
            } else {
                state.token = null
                localStorage.removeItem('mvi-admin-token')
            }
        },
        admin(state, value) {
            if (value) {
                state.admin = value
                localStorage.setItem('mvi-admin-admin', JSON.stringify(value))
            } else {
                state.admin = null
                localStorage.removeItem('mvi-admin-admin')
            }
        },
        note(state, value) {
            if (value) {
                state.note = value
                localStorage.setItem('mvi-admin-note', value)
            } else {
                state.note = null
                localStorage.removeItem('mvi-admin-note')
            }
        },
        theme(state, value) {
            if (value) {
                state.theme = value
                localStorage.setItem('mvi-admin-theme', JSON.stringify(value))
            } else {
                state.theme = null
                localStorage.removeItem('mvi-admin-theme')
            }
        }
    }
})
