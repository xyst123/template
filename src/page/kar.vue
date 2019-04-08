<template>
  <section>
    <div class="container-kar">
      <ul>
        <li class="item"><i class="icon present"></i>present</li>
        <li class="item"><i class="icon trash"></i>trash</li>
        <li class="item"><i class="icon user"></i>user</li>
        <li class="item"><i class="icon zan"></i>zan</li>
      </ul>
    </div>
  </section>
</template>

<script>

export default {
  name: 'kar',
  components: {

  },
  computed: {

  },
  methods: {

  },
  created () {

  },
  data () {
    return {

    }
  }
}
</script>
<style lang="scss">
.container-kar {
  .item{
    width:100px;
    height: 16px;
    line-height:16px;
    margin:2px 0;
    text-align: left;
  }
  .icon{
    display: inline-block;
    margin-right:5px;
    width:16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size:16px auto;
    vertical-align: middle;
  }
  .present {
      background-image: url("../assets/sprite/icon/present.png?_sprite");
  }
  .trash {
      background-image: url("../assets/sprite/icon/trash.png?_sprite");
  }

  .user {
      background-image: url("../assets/sprite/icon/user.png?_sprite");
  }

  .zan {
      background-image: url("../assets/sprite/icon/zan.png?_sprite");
  }


}
</style>
