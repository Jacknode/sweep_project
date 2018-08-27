<template>
  <div>
    <div id="wrap">
      <div class="wrapBox">
        <div class="logo"></div>
        <div class="inputBox">
          <div class="userName clearfix"><i></i>
            <div><input type="text" placeholder="用户名"></div>
          </div>
          <div class="userPassworld clearfix"><i></i>
            <div><input type="password" placeholder="密码"></div>
          </div>
        </div>
        <a href="javascript:;">登录</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    data() {
      return {}
    },
    computed: mapGetters([]),
    methods: {},
  }
</script>
<style scoped>

  .clearfix:after {
    content: "";
    display: block;
    visibility: hidden;
    height: 0;
    clear: both;
  }

  input {
    border: none;
    background-color: transparent;
    margin-left: 26px;
    outline: none;
  }

  #wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("../assets/bg.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .wrapBox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, .9);
    padding: 120px 30px 0;
  }

  .logo {
    width: 60px;
    height: 60px;
    background: url("../assets/qldLogo.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto 100px;
  }

  .userName i {
    float: left;
    width: 30px;
    height: 30px;
    background: url("../assets/people.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .userPassworld {
    margin-top: 20px;
  }

  .userPassworld i {
    float: left;
    width: 30px;
    height: 30px;
    background: url("../assets/lo.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top:3px;
  }

  .userPassworld > div,
  .userName > div {
    overflow: hidden;
  }

  .userPassworld > div > input,
  .userName > div > input {
    width: 100%;
    display: block;
    border-bottom: 1px solid #86a9dd;
    font: 16px/30px "微软雅黑";
  }

  a {
    font: 16px/3 "微软雅黑";
    width: 100%;
    -webkit-border-radius:  24px;
    -moz-border-radius:  24px;
    border-radius:  24px;
    background-color: #2269d4;
    color: #fff;
    text-align: center;
    display: block;
    margin-top:50px;
  }
</style>
