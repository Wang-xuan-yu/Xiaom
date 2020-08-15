import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path:"/mi/home",
      name: "mi_home",
      component: ()=> import("@/views/mi/home")
    },{
      path:"/mi/cart",
      name: "mi_cart",
      component: ()=> import("@/views/mi/cart")
    }
  ]
})
