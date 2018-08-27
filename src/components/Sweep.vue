<template>
  <div>
    <x-header  :left-options="{showBack: false}" style="background: #017FDA;">微信检票系统</x-header>

    <group>
      <x-input type="text" title="票号" name="number" placeholder="请输入票号" v-model="number"></x-input>
    </group>
    <group style="margin-top: 10px">
      <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="ManualCheckIn" :show-loading="ManualCheckInLoading">手工检票</x-button>
    </group>
    <group style="margin-top: 10px">
      <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="sweepSubmit" :show-loading="isLoading">扫码检票
      </x-button>
    </group>
    <group>
      <cell title="已检票人数" :value="person"></cell>
    </group>
    <toast v-model="isWarn" type="warn">{{warnText}}</toast>
    <toast v-model="isSuccess" type="text">{{successText}}</toast>
    <!--<form-preview  header-label="标题"  header-value="大大大" :body-items="list"  name="demo" ></form-preview>-->

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {
    XHeader,
    Group,
    Cell,
    XInput,
    XButton,
    Toast
  } from 'vux'
  export default{
    name: '',
    components: {
      Cell,
      XHeader,
      XButton,
      Group,
      XInput,
      Toast
    },
    data(){
      return {
        isWarn:false,
        isSuccess:false,
        warnText:'票号不能为空!',
        successText:'',
        person:0,
        number: '',
        isLoading: false,
        ManualCheckInLoading:false,
        list: [{
          label: '出发站点',
          value: '东莞'
        }, {
          label: '到达站点',
          value: '日本'
        }, {
          label: '发车时间',
          value: '2017-09-02 20:00发车'
        },
          {
            label: '金额信息',
            value: `共3张票 服务费0.01 金额 &nbsp;<i style="color: red;font-size: 18px">¥ 0.02</i>`
          }],
        buttons2: [{
          style: 'primary',
          text: '点击事件',
          onButtonClick: (name) => {
            alert(`clicking ${name}`)
          }
        }]
      }
    },
    computed: mapGetters([
      'userid',
      'stationSource',
      'openID'
    ]),
    methods: {

      ManualCheckIn(){
        if(!this.number){
          this.isWarn = true;
          return
        }
        let options = {
          "userID": "qianke",
          "password": "qianke123",
          "ticketid": this.number,
          "openid": this.openID,
          "stationID": this.stationSource,
          "checkUserID":this.userid
        };
        this.ManualCheckInLoading = true;
        this.$store.dispatch('initTicketDelivery',options)
        .then(person=>{
          this.ManualCheckInLoading = false;
          this.person = person;
          this.isSuccess = true;
          this.successText = '检票成功!';
        },err=>{
          this.ManualCheckInLoading = false;
          this.isWarn = true;
          this.warnText = err;
        })
      },
      //扫码检票
      sweepSubmit(){
        this.isLoading = true;
        let code = sessionStorage.getItem('code');
        let openID = sessionStorage.getItem('openID');
        let tradeInfo = JSON.parse(sessionStorage.getItem('tradeInfo'));
        let options = {
          "userID": "qianke",
          "password": "qianke123",
          "code": code,
          "url": window.location.href,
          "appid": tradeInfo.Appid,
          "secret": tradeInfo.AppSecret
        };
        var _this = this;
        this.$store.dispatch('sweepSubmit', options)
        .then(data => {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: tradeInfo.Appid, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1
            jsApiList: ['scanQRCode']
          });
          wx.ready(function () {
            _this.isLoading = false;
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
              success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                if (result.indexOf(',') > 0) {
                  result = result.split(",")[1];
                }
                if (typeof (result) != "undefined") {
                  let deliveryOptions = {
                    "userID": "qianke",
                    "password": "qianke123",
                    "ticketid": result,
                    "openid": _this.openID,
                    "stationID": _this.stationSource,
                    "checkUserID":_this.userid
                  };
                  //请求后端提交票号
                  _this.$store.dispatch('initTicketDelivery',deliveryOptions)
                    .then(person=>{
                      _this.person = person;
                      _this.isSuccess = true;
                      _this.successText = '检票成功!';
                    },err=>{
                      _this.isWarn = true;
                      _this.warnText = err;
                    })
                }
//                alert(result)
              }
            });
          });
          wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            alert('配置有误' + res);
          });
        })
      }
    },
  }
</script>
<style scoped>
  .padd{
    padding-top: 100px;
  }
</style>
