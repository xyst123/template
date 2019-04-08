<template>
  <section id="home">
    <p>test1:{{example}}</p>
    <p>test2:{{getExample}}</p>
    <button v-on:click="changeExample">test1</button>
    <button v-on:click="handleClick">test2</button>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Foo',
  components: {

  },
  computed: {
    ...mapState({
      example: state => state.s2.example
    }),
    ...mapGetters({
      getExample: 's2.getExample'
    })
  },
  methods: {
    ...mapActions({
      changeExample: 's2.changeExample'
    }),
    handleClick() {
      this.$store.dispatch('s2.changeExample')
    }
  },
  created () {

  },
  data () {
    return {
      msg: 'say goodbye to you'
    }
  }
}
</script>
