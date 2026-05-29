import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes = [
    {
        path: '/login',
        component: () => import('../pages/login/index.vue'),
        meta: {
            title: 'login',
            isLogin: false,
        },
    },
    {
        path: '/',
        component: () => import('../layouts/default.vue'),
        children: [
            {
                path: 'home',
                meta: {
                    title: 'home',
                    isLogin: true,
                },
                component: () => import('../pages/home/index.vue'),
            }
        ]
    }
] as RouteRecordRaw[];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    next()
})

export default router;