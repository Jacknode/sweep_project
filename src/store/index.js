/**
 * Created by leibo on 18/1/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mutations
  }, actions
})
