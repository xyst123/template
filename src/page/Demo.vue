<template>
  <div>
    <ul class="container-foo">
      <li class="icon icon-weibo">weibo</li>
      <li class="icon icon-qq">qq</li>
      <li class="icon icon-weixin">weixin</li>
    </ul>
    <div>
      <span>姓名：</span>
      <input v-model="userInfo.name">
    </div>
    <div>
      <span>年龄：</span>
      <input v-model="userInfo.age">
    </div>
    <div>
      <span>会员：</span>
      <select v-model="userInfo.statusName">
        <option v-for="option in options" :key="option.value">{{option.label}}</option>
      </select>
    </div>
    <button @click="handleSubmit">提交</button>
  </div>
</template>

<script>
import dataMap from '@/config/data-map'
import { getUserInfo, submitUserInfo } from '@/service/user'
export default {
  name: 'Demo',
  data() {
    return {
      userInfo: {},
      options: dataMap.userStatus
    }
  },
  methods: {
    async handleSubmit() {
      await submitUserInfo(this.userInfo)
    }
  },
  async created() {
    const userInfo = await getUserInfo()
    if (userInfo) {
      this.userInfo = userInfo
    }
  }
}
</script>
<style lang="scss">
@import url(../style/sprite/sprite.css);
.icon {
  width: 50px;
  height: 24px;
  padding-left: 25px;
  line-height: 24px;
  margin-bottom: 2px;
}
</style>
