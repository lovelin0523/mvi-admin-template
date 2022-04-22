<template>
    <div>
        <fieldset class="mvi-mb-4">
            <legend>不同主题的按钮</legend>
            <div>
                <m-button class="mvi-m-2" v-for="(item,index) in types" :key="'btn1-'+index" :type="item">Button</m-button>
            </div>
        </fieldset>
        <fieldset class="mvi-mb-4">
            <legend>不同大小的按钮</legend>
            <div>
                <m-button class="mvi-m-2" v-for="(item,index) in sizes" :key="'btn2-'+index" :size="item">Button</m-button>
            </div>
        </fieldset>
        <fieldset class="mvi-mb-4">
            <legend>朴素按钮</legend>
            <div>
                <template v-for="(item,index) in types">
                    <m-button v-if="item!='default'" plain class="mvi-m-2" :key="'btn3-'+index" :type="item">Button</m-button>
                </template>
            </div>
        </fieldset>
        <fieldset class="mvi-mb-4">
            <legend>loading状态</legend>
            <div>
                <m-button loading class="mvi-m-2" v-for="(item,index) in types" :key="'btn4-'+index" :type="item">Button</m-button>
                <template v-for="(item,index) in types">
                    <m-button loading v-if="item!='default'" plain class="mvi-m-2" :key="'btn5-'+index" :type="item">Button</m-button>
                </template>
            </div>
        </fieldset>
        <fieldset class="mvi-mb-4">
            <legend>自定义loading文本和图标</legend>
            <div>
                <m-button loading load-icon="load-c" load-text="加载中..." class="mvi-m-2" v-for="(item,index) in types" :key="'btn6-'+index" :type="item">Button</m-button>
                <template v-for="(item,index) in types">
                    <m-button loading load-icon="load-c" load-text="加载中..." v-if="item!='default'" plain class="mvi-m-2" :key="'btn7-'+index" :type="item">Button</m-button>
                </template>
            </div>
        </fieldset>
        <fieldset class="mvi-mb-4">
            <legend>禁用状态</legend>
            <div>
                <m-button disabled class="mvi-m-2" v-for="(item,index) in types" :key="'btn8-'+index" :type="item">Button</m-button>
                <template v-for="(item,index) in types">
                    <m-button disabled v-if="item!='default'" plain class="mvi-m-2" :key="'btn9-'+index" :type="item">Button</m-button>
                </template>
            </div>
        </fieldset>
        <fieldset class="mvi-mb-4">
            <legend>独占一行的按钮</legend>
            <div>
                <m-button form-control class="mvi-m-2" v-for="(item,index) in types" :key="'btn10-'+index" :type="item">Button</m-button>
                <template v-for="(item,index) in types">
                    <m-button form-control v-if="item!='default'" plain class="mvi-m-2" :key="'btn11-'+index" :type="item">Button</m-button>
                </template>
            </div>
        </fieldset>
        <fieldset class="mvi-mb-4">
            <legend>圆角按钮</legend>
            <div>
                <m-button round class="mvi-m-2" v-for="(item,index) in types" :key="'btn12-'+index" :type="item">ROUND Button</m-button>
            </div>
        </fieldset>
        <fieldset class="mvi-mb-4">
            <legend>方形按钮</legend>
            <div>
                <m-button square class="mvi-m-2" v-for="(item,index) in types" :key="'btn13-'+index" :type="item">SQUARE Button</m-button>
            </div>
        </fieldset>
        <fieldset class="mvi-mb-4">
            <legend>自定义颜色的按钮</legend>
            <div>
                <m-button class="mvi-m-2" v-for="(item,index) in colors" :key="'btn14-'+index" sub-color="#fff" :color="item">Button</m-button>
            </div>
        </fieldset>
    </div>
</template>

<script>
export default {
    name: 'component-button',
    data() {
        return {
            types: ['default', 'primary', 'info', 'warn', 'error', 'success'],
            sizes: ['mini', 'small', 'medium', 'large'],
            colors: [
                '#239dad',
                '#9c27b0',
                '#ff5722',
                '#b6c51e',
                '#607d8b',
                '#795548',
                '#481f90',
                '#2abdaf'
            ]
        }
    }
}
</script>

<style scoped lang="less">
</style>
