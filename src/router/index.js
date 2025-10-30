import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AlbumInsert from '../views/AlbumInsert.vue'
import AlbumManage from '../views/AlbumManage.vue'
import PerformanceInsert from "@/views/PerformanceInsert.vue";
import PerformanceManage from "@/views/PerformanceManage.vue";
import AlbumEdit from "@/views/AlbumEdit.vue";
import PerformanceEdit from "@/views/PerformanceEdit.vue";
import BoardManage from "@/views/BoardManage.vue";
import BoardHist from "@/views/BoardHist.vue";
import CommentManage from "@/views/CommentManage.vue";
import CommentHist from "@/views/CommentHist.vue";
import CustList from "@/views/CustList.vue";
import CustHist from "@/views/CustHist.vue";
import NoticeInsert from "@/views/NoticeInsert.vue";
import NoticeManage from "@/views/NoticeManage.vue";
import NoticeEdit from "@/views/NoticeEdit.vue";
import AdminLogin from "@/views/AdminLogin.vue";

// 겟맵핑 페이지 이동

const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },

    {
        path: '/album',
        name: 'AlbumInsert',
        component: AlbumInsert
    },

    {
        path: '/album/manage',
        name: 'AlbumManage',
        component: AlbumManage
    },

    {
        path: '/album/:ano/edit',
        name: 'AlbumEdit',
        component: AlbumEdit,
        props: true
    },

    {
        path: '/performance',
        name: 'PerformanceInsert',
        component: PerformanceInsert
    },

    {
        path: '/performance/manage',
        name: 'PerformanceManage',
        component: PerformanceManage
    },

    {
        path: '/performance/:pno/edit',
        name: 'PerformanceEdit',
        component: PerformanceEdit,
        props: true
    },

    {
        path: '/board/manage',
        name: 'BoardManage',
        component: BoardManage
    },

    {
        path: '/board/hist',
        name: 'BoardHist',
        component: BoardHist
    },

    {
        path: '/comment/manage',
        name: 'CommentManage',
        component: CommentManage
    },

    {
        path: '/comment/hist',
        name: 'CommentHist',
        component: CommentHist
    },

    {
        path: '/cust/list',
        name: 'CustList',
        component: CustList
    },

    {
        path: '/cust/hist',
        name: 'CustHist',
        component: CustHist
    },

    {
        path: '/notice',
        name: 'NoticeInsert',
        component: NoticeInsert
    },

    {
        path: '/notice/manage',
        name: 'NoticeManage',
        component: NoticeManage
    },

    {
        path: '/notice/:nno/edit',
        name: 'NoticeEdit',
        component: NoticeEdit,
        props: true
    },

    {
        path: '/login',
        name: 'AdminLogin',
        component: AdminLogin
    }

]

const router = createRouter({
    history: createWebHistory('/admin'),
    routes
})

export default router
