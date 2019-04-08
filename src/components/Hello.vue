<template>
  <div class="hello">
    <h1>title:{{ title }}</h1>
    <h1>msg:{{ msg}}</h1>
    <h1>msgAnother:{{ msgAnother}}</h1>
    <button v-on:click="handleClick">click</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  // props: ['msg'],
  props: {
    msg: {
      type: String,
      // required: true,
      default: 'This is msg'
    },
    msg2: {
      type: String,
      required: true,
      default: 'This is msg2'
    }
  },
  data () {
    return {
      title: '欢迎使用平台vue模板'
    }
  },
  computed: {
    msgAnother() {
      return this.msg2.trim().toLowerCase();
    }
  },
  methods: {
    handleClick() {
      console.log('Hello handle click');
      this.$emit('EvnMyClick', {title: this.title})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  background-color: pink;

  h1 {
    font-weight: normal;
    font-size: 1.2em;
  }
  a {
    color: #42b983;
  }

}





</style>
