<template>
  <div>
    <section>
      <h3>雪碧图示例</h3>
      <ul class="icon-container">
        <li>
          <i class="icon icon-weibo"></i>weibo
        </li>
        <li>
          <i class="icon icon-qq"></i>qq
        </li>
        <li>
          <i class="icon weixin"></i>weixin
        </li>
      </ul>
    </section>
    <section>
      <h3>mock、servce、校验数据示例</h3>
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
      <button class="button" @click="handleSubmit">提交</button>
    </section>
    <section>
      <h3>内置样式示例</h3>
      <div class="single-px-before">上方1px边框</div>
      <div class="single-px">四周1px边框</div>
      <a href>去除a标签默认样式</a>
      <div class="pull_up_loading">
        <div class="pull_up_rotater">
          <span></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import dataMap from "@/config/data-map";
import { getUserInfo, submitUserInfo } from "@/service/user";
export default {
  name: "Demo",
  data() {
    return {
      userInfo: {},
      options: dataMap.userStatus
    };
  },
  methods: {
    async handleSubmit() {
      await submitUserInfo(this.userInfo);
    }
  },
  async created() {
    const userInfo = await getUserInfo();
    if (userInfo) {
      this.userInfo = userInfo;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../style/base.scss"; // 内置样式
@import "../style/sprite.scss"; // 雪碧图样式
@import "../style/loading.scss"; // loading样式
section {
  padding: 10px 0;
  border-bottom: 1px dashed #aaaaaa;
  h3 {
    font-weight: bold;
    margin-bottom: 10px;
  }
}
.icon-container {
  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
  }
  .weixin {
    background-image: url("../image/icon/demo/weixin.png?_sprite");
    background-size: 100%;
    background-repeat: no-repeat;
  }
}
.button {
  width: 50px;
  height: 25px;
}
.single-px-before {
  position: relative;
  width: 100px;
  height: 50px;
  &::after {
    @include singlePxBefore($color-black-light);
  }
}
.single-px {
  position: relative;
  width: 100px;
  height: 50px;
  &::after {
    @include singlePx($color-black-light);
  }
}
</style>
