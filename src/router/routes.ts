import type { RouteRecordRaw } from 'vue-router';
import vueStudy from './modules/vueStudy';
import useLocalStorage from '@/hooks/useLocalStorage.ts';

const { getLocalStorage } = useLocalStorage();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录',
      key: 'login',
      requiresAuth: true,
      hidden: true, // 定义该路由标题在菜单中是否隐藏
      icon: 'Promotion', // 定义菜单文字左侧的图标，支持element-plus所有图标
    },
    // 路由独享的守卫，只在进入到 /login 路由时触发
    beforeEnter(_to, from, next) {
      // 获取 token
      const jwt = getLocalStorage('espresso_token');
      // 如果已存在token，则默认跳转到 /home 路由
      // jwt ? next({ name: 'Home' }) : next();
      // 如果已存在token，则不跳转路由，保持当前访问的路由
      jwt ? next({ path: from.path }) : next();
    }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/Layout/index.vue'),
    meta: {
      title: '',
      hidden: false,
      icon: 'Avatar'
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
          key: 'Home',
          requiresAuth: false,
          hidden: false,
          icon: 'HomeFilled'
        },
      },
    ],
    redirect: 'home',
  },
  {
    path: '/notfound',
    name: 'Notfound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: {
      title: '404',
      key: 'notfound',
      requiresAuth: true,
      hidden: true, // 定义该路由标题在菜单中是否隐藏
      icon: 'StarFilled'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: 'notfound',
    name: 'Any',
    meta: {
      title: 'Any',
      hidden: true, // 定义该路由标题在菜单中是否隐藏
      icon: 'Comment'
    }
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/Screen/index.vue'),
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Comment'
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/Layout/index.vue'),
    meta: {
      title: '商品管理',
      icon: 'Goods',
      hidden: false
    },
    redirect: '/product/kitchen-ware',
    children: [
      {
        path: '/product/kitchen-ware',
        name: 'KitchenWare',
        component: () => import('@/views/Product/KitchenWare/index.vue'),
        meta: {
          title: '咖啡厨具',
          key: 'KitchenWare',
          requiresAuth: true,
          hidden: false,
          icon: 'CoffeeCup'
        }
      },
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/Product/Trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
          hidden: false
        },
      },
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/Product/Attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'DishDot',
          hidden: false
        },
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/Product/Spu/index.vue'),
        meta: {
          title: 'SPU管理',
          icon: 'Grape',
          hidden: false
        },
      },
      {
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/Product/Sku/index.vue'),
        meta: {
          title: 'Sku管理',
          icon: 'Orange',
          hidden: false
        },
      }
    ]
  },
  {
    path: '/acl',
    name: 'Acl',
    component: () => import('@/Layout/index.vue'),
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock'
    },
    redirect: '/acl/user-manage',
    children: [
      {
        path: '/acl/user-manage',
        name: 'UserManage',
        component: () => import('@/views/Acl/UserManage/index.vue'),
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        },
      },
      {
        path: '/acl/role-manage',
        name: 'RolerManage',
        component: () => import('@/views/Acl/RoleManage/index.vue'),
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled'
        },
      },
      {
        path: '/acl/menu-manage',
        name: 'MenuManage',
        component: () => import('@/views/Acl/MenuManage/index.vue'),
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Histogram'
        },
      }
    ]
  },
  ...vueStudy,
];

export default routes;
