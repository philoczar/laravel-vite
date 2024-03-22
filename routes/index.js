import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../resources/views/pages/homeView.vue';
import BlogView from '../resources/views/pages/blogView.vue';
import LoginView from '../resources/views/pages/loginView.vue';
import RegisterView from '../resources/views/pages/registerView.vue';
import DashboardView from '../resources/views/pages/dashboardView.vue';

const routes=[
	{
		path:'/',
		component:HomeView,
		name:'Home'	
	},
	{
		path:'/blog',
		component:BlogView,
		name:'Blog'	
	},
	{
		path:'/login',
		component:LoginView,
		name:'Login'	
	},
	{
		path:'/register',
		component:RegisterView,
		name:'Register'	
	},
	{
		path:'/dashboard',
		component:DashboardView,
		name:'Dashboard'	
	}
];

const router=createRouter({
	history:createWebHistory(),
	routes
});

export default router;