<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="defaultSelectKey">
        <a-menu-item key="/" @click="hrefTo('/')">
          <a-icon type="appstore" />
          <span>通用配置</span>
        </a-menu-item>
        <a-menu-item key="/specialConfig" @click="hrefTo('/specialConfig')">
          <a-icon type="control" />
          <span>特例配置</span>
        </a-menu-item>
        <!-- <a-menu-item key="/exchangeRateConfig" @click="hrefTo('/exchangeRateConfig')">
          <a-icon type="funnel-plot" />
          <span>汇率深度</span>
        </a-menu-item>
        <a-menu-item key="/bankRateConfig" @click="hrefTo('/bankRateConfig')">
          <a-icon type="bank" />
          <span>银行汇率</span>
        </a-menu-item> -->
        <a-menu-item key="/apiRateConfig" @click="hrefTo('/apiRateConfig')">
          <a-icon type="read" />
          <span>API汇率</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="header">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <div class="header-right">
            <User></User>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import User from '../userInfo/index'
export default {
  components: {
    User
  },
  data() {
    return {
      collapsed: false,
      defaultSelectKey: ['/']
    };
  },
  created () {
    let initUrl = window.localStorage.getItem('menuUrl')
    if (!initUrl) {
      this.hrefTo('/')
    } else {
      this.hrefTo(initUrl)
      this.defaultSelectKey = [initUrl]
    }
  },
  methods: {
    hrefTo (name) {
      window.localStorage.setItem('menuUrl', name)
      this.$router.push(name)
    }
  }
};
</script>
<style lang="less">
#components-layout-demo-custom-trigger{
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-right{
    padding: 0 24px;
  }
}
</style>