import { createRouter, createWebHistory } from 'vue-router';
import WelcomeComponent from '../components/WelcomeComponent.vue';
import InputPage from '../components/InputPage.vue';

const routes = [
    {
        path: '/',
        name: 'StartButton',
        component: WelcomeComponent
    },
    {
        path: '/input',
        name: 'InputPage',
        component: InputPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
