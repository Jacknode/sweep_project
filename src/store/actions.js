/**
 * Created by leibo on 18/1/26.
 */
import axios from 'axios'
export default {
  sweepSubmit({commit},data){
    return new Promise(function (relove, reject) {
      axios.post('http://wechat.1000da.com.cn/Check/MakeScanString', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          console.log(data)
          if(Number(data.resultcode)==200){
            relove(data.list)
          }else{
            reject(data.resultcontent)
          }

        })
    })
  },
  initTicketDelivery({commit},data){
    return new Promise(function (relove, reject) {
      axios.post('http://wechat.1000da.com.cn/Check/CheckTicket', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.resultcode)==200){
            relove(data.list);
          }else{
            reject(data.resultcontent)
          }
        })
    })
  },
  //登录
  Login(store,data){
    return new Promise(function (relove, reject) {
      axios.post('http://wechat.1000da.com.cn/logon/Logon', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.list);
        }else{
          reject(data.resultcontent)
        }
      })
    })
  }
}
