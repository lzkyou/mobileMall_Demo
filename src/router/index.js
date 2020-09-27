import Vue from 'vue'
import Vuerouter from 'vue-router'

const Home=()=>import('../views/home/Home');
const Category=()=>import('../views/category/Category');
const Cart=()=>import('../views/cart/Cart');
const Profile=()=>import('../views/profile/Profile');

Vue.use(Vuerouter);

const routes=[
  {
    path: '',
    redirect: '/home'
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/category',
    component: Category
  },
  {
    path:'/cart',
    component: Cart
  },
  {
    path:'/profile',
    component: Profile
  }
]

const router=new Vuerouter({
  routes,
  mode: 'history'
})

export default router