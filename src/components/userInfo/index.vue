<template>
  <div>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <span class="name">{{userInfo.name}}</span>
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
import { USER_INFO, ACCESS_TOKEN } from "@/store/mutation-types"
import Vue from 'vue'
export default {
  data () {
    return {
      userInfo: null
    }
  },
  created () {
    this.userInfo = Vue.ls.get(USER_INFO)
  },
  methods: {
    logout () {
      Vue.ls.remove(ACCESS_TOKEN)
      Vue.ls.remove(USER_INFO)
      window.localStorage.removeItem('menuUrl')
      this.$cookies.remove('WEBSSO')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
</style>