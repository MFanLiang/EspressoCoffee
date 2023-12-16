import type { RouteRecordRaw } from 'vue-router';

const vueStudy: Array<RouteRecordRaw> = [
  {
    path: '/vue-study',
    name: 'VueStudy',
    component: () => import('@/Layout/index.vue'),
    meta: {
      title: 'vue3学习',
      hidden: false,
      icon: 'Notebook'
    },
    redirect: '/vue-study/ref',
    children: [
      {
        path: '/vue-study/ref',
        name: 'Ref',
        component: () => import('@/views/VueStudy/Ref/index.vue'),
        meta: {
          title: 'Ref全家桶',
          hidden: false,
          icon: 'Microphone'
        },
      },
      {
        path: '/vue-study/reactive',
        name: 'Reactive',
        component: () => import('@/views/VueStudy/Reactive/index.vue'),
        meta: {
          title: 'Reactive全家桶',
          hidden: false,
          icon: 'Mute'
        },
      },
      {
        path: '/vue-study/toseries',
        name: 'ToSeries',
        component: () => import('@/views/VueStudy/ToSeries/index.vue'),
        meta: {
          title: 'To系列全家桶',
          hidden: false,
          icon: 'Mic'
        },
      },
      {
        path: '/vue-study/computed',
        name: 'Computed',
        component: () => import('@/views/VueStudy/Computed/index.vue'),
        meta: {
          title: 'Computed计算属性',
          hidden: false,
          icon: 'VideoPause'
        },
      },
      {
        path: '/vue-study/watch',
        name: 'Watch',
        component: () => import('@/views/VueStudy/Watch/index.vue'),
        meta: {
          title: 'Watch侦听器',
          hidden: false,
          icon: 'Open'
        },
      },
      {
        path: '/vue-study/component-life-cycle',
        name: 'ComponentLifeCycle',
        component: () => import('@/views/VueStudy/ComponentsLifeCycle/index.vue'),
        meta: {
          title: '组件&生命周期',
          hidden: false,
          icon: 'Histogram'
        },
      }
    ]
  },
];

export default vueStudy;
