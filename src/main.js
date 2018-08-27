// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import App from './App'
import axios from 'axios'

// import WeChatAuth from './assets/js/weChat'
// import url from 'url'
// import qs from 'qs';
// axios.interceptors.request.use((config) => {
//   config.data = qs.stringify(config.data);
//   return config;
// }, function(error) {
//   return Promise.reject(error);
// });



function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)return unescape(r[2]);
  return null;
}
// sessionStorage.clear();

store.commit('initStationSource', GetQueryString('stationsource') ? GetQueryString('stationsource') : 'qianlidagzh');
store.commit('initUserID', GetQueryString('userid') ? GetQueryString('userid') : '');

const STATIONSOURCE = GetQueryString('stationsource') ? GetQueryString('stationsource') : 'qianlidagzh';



// Vue.use(WechatAuth , {
//   router, // 路由实例对象
//   appid: 'wx4dbc109622920e30', // 您的微信appid
//   responseType: 'code',  // 返回类型，请填写code
//   scope: 'snsapi_base', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
//   getCodeCallback (code, next) {
//     alert(code)
//     axios.post('http://wechat.1000da.com.cn/WeChatInfo/GetOpenidFromCode', {
//       "userID": "qianke",
//       "password": "qianke123",
//       "code": code,
//       "stationID": STATIONSOURCE,
//     }, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     })
//       .then(data => {
//         alert(data.data.list);
//         var data = data.data;
//         if (Number(data.resultcode) == 200) {
//           store.commit('initOpenid', data.list);
//           console.log(data.list);
//           next({path: '/'})
//         } else {
//           next()
//         }
//       })
//       .catch(() => {
//         next() // ajax出现错误
//       });
//   }
// });

const getQuery = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}




// 微信授权插件初始化
axios.post('http://wechat.1000da.com.cn/WeChatInfo/GetTradeAndStationInfo', {
  "userID": "qianke",
  "password": "qianke123",
  "stationID": STATIONSOURCE,
}, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
.then(data => {
  var data = data.data;
  console.log(data)
  if (Number(data.resultcode) == 200) {
    let relute = data.list;
    sessionStorage.setItem('tradeInfo',JSON.stringify(relute.tradeInfo))
    // router.push({path: '/sweep'})
    if(!getQuery('code')){
      let authParams = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${relute.tradeInfo.Appid}&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_base#wechat_redirect`;

      window.location.href = authParams
    }else{
      let code = getQuery('code');
      sessionStorage.setItem('code',code);

      axios.post('http://wechat.1000da.com.cn/WeChatInfo/GetOpenidFromCode', {
        "userID": "qianke",
        "password": "qianke123",
        "code": code,
        "stationID": STATIONSOURCE
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          sessionStorage.setItem('openID',data.list);
          store.commit('initOpenid', data.list);
          router.push({path: '/sweep'})
        }
        else {
          router.push({path: '/sweep'})
        }
      })
      .catch(() => {
        router.push({path: '/'}) // ajax出现错误
      })
    }

    FastClick.attach(document.body);

    Vue.config.productionTip = false;

    /* eslint-disable no-new */
    new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app-box');
  } else {
  }
});
// FastClick.attach(document.body);
//
// Vue.prototype.$http = axios;
// Vue.config.productionTip = false;
//
// /* eslint-disable no-new */
// new Vue({
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app-box');



