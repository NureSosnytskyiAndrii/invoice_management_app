import { createRouter, createWebHistory } from 'vue-router';
import WelcomeComponent from '../components/WelcomeComponent.vue';
import InputPage from '../components/InputPage.vue';

const routes = [
    {
        path: '/invoice_management_app',
        name: 'StartButton',
        component: WelcomeComponent
    },
    {
        path: '/invoice_management_app/input',
        name: 'InputPage',
        component: InputPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
