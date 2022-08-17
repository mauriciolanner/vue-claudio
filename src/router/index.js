import Vue from 'vue'
import VueRouter from 'vue-router'
import Contrato from '../views/Contract/Contract.vue'
import ItensContract from '../views/Contract/ItensContract.vue'
import MedicoesContract from '../views/Contract/MedicoesContract.vue'
import PurchaseOrder from '../views/PurchaseOrder/PurchaseOrder.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const path = "p" === window.location.pathname.split("/")[2] ? "/portal/p/1/portalcontratos" : "/portal/1/portalcontratos"

const routes = [
  {
    path: `${path}/`,
    name: 'login',
    component: Login,
    meta: {
      layout: 'login',
      requiresAuth: false
    }
  },
  {
    path: `${path}/contrato`,
    name: 'contrato',
    component: Contrato,
    meta: {
      //requiresAuth: true
    }
  },
  {
    path: `${path}/contrato/:contrato/itens`,
    name: 'itens-contrato',
    component: ItensContract,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${path}/contrato/:contrato/:filial/medicoes`,
    name: 'medicoes-contrato',
    component: MedicoesContract,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: `${path}/pedidos`,
    name: 'pedido-compra',
    component: PurchaseOrder,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `${path}/login`,
    name: 'login-fluig',
    component: Login,
    meta: {
      layout: 'login',
      requiresAuth: false
    }
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('dadosUsuario') === 'null') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
