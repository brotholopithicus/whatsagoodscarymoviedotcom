import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Trailer from '@/components/Trailer';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/trailer',
      name: 'trailer',
      component: Trailer,
      props: true
    }
  ]
})
