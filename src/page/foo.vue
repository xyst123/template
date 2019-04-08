<template>
  <section id="home">
   <ul class="container-foo">
      <li class="icon ico-weibo">weibo</li>
      <li class="icon ico-qq">qq</li>
      <li class="icon ico-weixin" >weixin</li>
    </ul>
    <Hello :msg="msg" v-bind:msg2="msg2" v-on:EvnMyClick="handleMyClick" />
    <p>test1:{{ example}}</p>
    <p>test2:{{ getExample}}</p>
    <button v-on:click="changeExample">test1</button>
    <button v-on:click="handleClick">test2</button>
    <button v-on:click="jump">jump</button>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Hello from '@/components/Hello'
import { API_1, Global } from '@/conf/api'
export default {
  name: 'index',
  components: {
    Hello
  },
  computed: {
    ...mapState({
      example: state => state.s1.example
    }),
    ...mapGetters({
      getExample: 's1.getExample'
    })
  },
  methods: {
    ...mapActions({
      changeExample: 's1.changeExample'
    }),
    handleClick() {
      this.$store.dispatch('s1.changeExample')
    },
    jump() {
      this.$router.push('Bar')
    },
    handleMyClick(data) {
      console.log('parent receive EvnMyClick,data:', data);
    }
  },
  created () {
    console.log(API_1, Global)
    console.log(WK_G_STATIC_DOMAIN, typeof (WK_G_STATIC_DOMAIN))
    if (WK_G_STATIC_DOMAIN === 'no') {
      alert('STATIC_DOMAIN is no');
    }
  },
  data () {
    return {
      msg: 'say hello to you',
      msg2: 'Say Hello again to you'
    }
  }
}
</script>
<style lang="scss">
@import url(../style/sprite/sprite.css);
.container-foo{
 .icon {
    width:50px;
    height: 24px;
    padding-left:25px;
    line-height:24px;
    margin-bottom:2px;
  }


}



</style>
