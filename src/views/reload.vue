<template>
    <div></div>
</template>

<script>
export default {
    name: 'reload',
    created() {
        this.$router.replace(this.$route.query.redirect || '/')
    }
}
</script>

<style>
</style>
