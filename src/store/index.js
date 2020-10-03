import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  getters, //getters
  mutations: {
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    },
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid == payload.iid);

        if (oldProduct) {
          // oldProduct.count+=1;
          context.commit('addCounter', oldProduct);
          resolve('商品数量+1');
        }
        else {
          payload.count = 1;
          context.commit('addToCart', payload)
          resolve('已加入购物车');
        }
      })
    }
  }
})

export default store