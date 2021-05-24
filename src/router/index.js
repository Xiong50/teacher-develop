import {
  createRouter,
  createWebHistory
} from 'vue-router'
const routes = [{
  path: '/',
  // name: 'Home',
  // component: Home
  redirect: '/login'
},
{
  path: '/menu',
  name: 'menu',
  component: () => import(/* webpackChunkName: "index" */ '../views/Pbulic/Menu.vue'),
  children: [{
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/student_evalution/Home.vue')
  },
  {
    path: '/orchard',
    name: 'orchard',
    component: () => import('../views/student_evalution/student_orchard.vue')
  },
  {
    path: '/history_evalution',
    name: 'history_evalution',
    component: () => import('../views/History_evalution/index.vue')
  },
  {
    path: '/grade',
    name: 'Grade',
    component: () => import('../views/final_comments/Grade.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/Ranking_list/List.vue')
  }
  ]
},

{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
},
{
  path: '/student/info',
  name: 'student/info',
  component: () => import(/* webpackChunkName: "login" */ '../views/student_info/index.vue')
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
