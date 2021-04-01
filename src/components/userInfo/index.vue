<template>
  <div>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <span class="name">张三</span>
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <span @click="logout">退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
</style>