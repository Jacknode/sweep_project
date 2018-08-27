<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
  import { Loading } from 'vux'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Loading
    },
    computed: mapGetters([
      'isLoading'
    ]),
    name: 'app'
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }
</style>
