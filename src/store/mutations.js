/**
 * Created by leibo on 18/1/26.
 */
import getters from './getters'

const state = {
  isLoading:false,
  stationSource:'',
  openID:'',
  userid:''
};

const mutations = {
  hideLoading(){
    state.isLoading = false;
  },
  showLoading(){
    state.isLoading = true;
  },
  initStationSource(state,str){
    state.stationSource = str;
  },
  initOpenid(state,str){
    state.openID = str;
  },
  initUserID(state,str){
    state.userid = str;
  }
};

export default {
  state,
  getters,
  mutations
}
