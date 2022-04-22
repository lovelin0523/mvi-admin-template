<template>
    <div>
        <div class="app-form">
            <m-field :active-color="$store.getters.theme.themeColor" class="app-form-el" v-model="phone" placeholder="手机号"></m-field>
            <m-field :active-color="$store.getters.theme.themeColor" class="app-form-el" v-model="name" placeholder="姓名"></m-field>
            <m-select :active-color="$store.getters.theme.themeColor" v-model="sex" class="app-form-el" placeholder="性别" :options="[{label:'男',value:0},{label:'女',value:1}]"></m-select>
            <m-select :active-color="$store.getters.theme.themeColor" v-model="member" class="app-form-el" placeholder="是否会员" :options="[{label:'会员',value:0},{label:'非会员',value:1}]"></m-select>
            <m-button class="mvi-m-2" :color="$store.getters.theme.themeColor" :sub-color="$store.getters.theme.themeTextColor" @click="doSearch">
                <m-icon type="search" />
                <span class="mvi-ml-1">搜索</span>
            </m-button>
        </div>
        <m-table class="mvi-mb-4" :loading="loading" :no-data-msg="error?errorMsg:'暂无数据'" :columns="columns" :data="data" out-border row-border stripe>
            <template v-slot:custom="res">
                <div v-if="res.columnIndex==4">
                    <m-icon @click="editUser(res.row)" type="edit" class="mvi-cursor-pointer" :style="{color:$store.getters.theme.themeColor}" />
                    <m-icon @click="deleteUser(res.row)" class="mvi-ml-2 mvi-text-error mvi-cursor-pointer" type="trash-alt" />
                </div>
            </template>
        </m-table>
        <m-page class="app-page" v-model="pageCurrent" :total="total" prev-icon="angle-left" prev-text="" next-text="" next-icon="angle-right" first-icon="angle-double-left" last-icon="angle-double-right"></m-page>
    </div>
</template>

<script>
export default {
    name: 'component-mtable',
    data() {
        return {
            pageCurrent: 1,
            pageSize: 10,
            total: 100,
            phone: '',
            name: '',
            sex: '-1',
            member: '-1',
            loading: false,
            error: false,
            errorMsg: '',
            columns: [
                {
                    key: 'userId',
                    value: 'ID'
                },
                {
                    key: 'userName',
                    value: '姓名'
                },
                {
                    key: 'userSex',
                    value: '性别',
                    filter(value) {
                        return value == '0' ? '男' : '女'
                    }
                },
                {
                    key: 'userMember',
                    value: '会员',
                    filter(value) {
                        return value == '0' ? '会员' : '非会员'
                    }
                },
                {
                    key: 'custom',
                    value: '操作'
                }
            ],
            data: [
                {
                    userId: 1,
                    userName: '张三',
                    userSex: '0',
                    userMember: '0'
                },
                {
                    userId: 2,
                    userName: '李四',
                    userSex: '0',
                    userMember: '0'
                },
                {
                    userId: 2,
                    userName: '赵梅',
                    userSex: '1',
                    userMember: '0'
                },
                {
                    userId: 3,
                    userName: '王超',
                    userSex: '0',
                    userMember: '1'
                },
                {
                    userId: 4,
                    userName: '李白',
                    userSex: '0',
                    userMember: '1'
                },
                {
                    userId: 5,
                    userName: '王安石',
                    userSex: '0',
                    userMember: '0'
                },
                {
                    userId: 6,
                    userName: '李清照',
                    userSex: '1',
                    userMember: '1'
                },
                {
                    userId: 7,
                    userName: '朱雀',
                    userSex: '1',
                    userMember: '0'
                }
            ]
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        //编辑
        editUser(user) {
            this.$Alert({
                message: '编辑的用户：' + JSON.stringify(user),
                btns: {
                    ok: {
                        color: this.$store.getters.theme.themeColor,
                        subColor: this.$store.getters.theme.themeTextColor
                    }
                }
            })
        },
        //删除
        deleteUser(user) {
            this.$Alert({
                message: '删除的用户：' + JSON.stringify(user),
                btns: {
                    ok: {
                        color: this.$store.getters.theme.themeColor,
                        subColor: this.$store.getters.theme.themeTextColor
                    }
                }
            })
        },
        //搜索
        doSearch() {
            this.pageCurrent = 1
            this.getData()
        },
        //获取数据
        getData() {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1000)
        }
    }
}
</script>

<style lang="less" scoped>
.app-form {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 0.4rem;
}
.app-form-el {
    width: 4.8rem;
    margin: 0.2rem;
}
</style>
