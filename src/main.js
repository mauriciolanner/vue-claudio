import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import Vuelidate from 'vuelidate'
import money from 'v-money'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap'
import './assets/scss/index.scss'

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(BootstrapVue);
Vue.use(Vuelidate)
Vue.use(money, {precision: 2})
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

import numeral from 'numeral'
numeral.register('locale', 'pt-br-custom', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function (number) {
    return 'º'
  },
  currency: {
    symbol: 'R$'
  }
})
numeral.locale('pt-br-custom')

Vue.filter('formatNumberMoney', function (value) {
  return numeral( parseFloat(value) ).format('$0,0.00')
})

import $ from 'jquery'
window.$ = window.jQuery = $

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
