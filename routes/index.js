import {createRouter, createWebHistory} from 'vue-router';
import middlewarePipeline from '../middleware/pipeline/middlewarePipeline';
import { createPinia } from 'pinia';
import { useUserStore } from '../stores/user';

//Middlewares
import auth from '../middleware/auth';
import guest from '../middleware/guest';

//Views
import HomeView from '../resources/views/pages/homeView.vue';
import BlogView from '../resources/views/pages/blogView.vue';
import LoginView from '../resources/views/pages/loginView.vue';
import RegisterView from '../resources/views/pages/registerView.vue';
import BlogPostView from '../resources/views/pages/blogPostView.vue';
import ItemCreateView from '../resources/views/pages/itemCreateView.vue';
import ItemView from '../resources/views/pages/itemView.vue';
import NewCategoryView from '../resources/views/pages/newCategoryView.vue';
import NewFlowerView from '../resources/views/pages/newFlowerView.vue';




const routes=[
	{
		path:'/',
		component:HomeView,
		name:'Home'	
	},
	{
		path:'/blog',
		component:BlogView,
		name:'Blog',
	},
	{
		path:'/login',
		component:LoginView,
		name:'Login',
		meta:{
			middleware:[guest]
		}
	},
	{
		path:'/register',
		component:RegisterView,
		name:'Register',
		meta:{
			middleware:[guest]
		}
	},
	{
		path:'/blog/:blogID',
		component:BlogPostView,
		name:'BlogPost',
		props:true
	},
	{
		path:'/item/new',
		component:ItemCreateView,
		name:'ItemCreate'
	},
	{
		path:'/item/:itemID',
		component:ItemView,
		name:'ItemView',
		props:true
	},
	{
		path:'/newcategory',
		component:NewCategoryView,
		name:'NewCategory'
	},
	{
		path:'/newflower',
		component:NewFlowerView,
		name:'NewFlower'
	}
];

const router=createRouter({
	history:createWebHistory(),
	routes
});

router.beforeEach((to, from, next)=>{

	//stores should be created each time we push router to get the updated values
	const pinia=createPinia();
	const userStore=useUserStore(pinia);

	if(!to.meta.middleware){
		return next();
	}

	const middleware=to.meta.middleware;
	const context={
		to,
		from,
		next,
		userStore
	}
	return middleware[0]({
		...context,
		next:middlewarePipeline(context, middleware, 1)
	});
	
	next();
});

export default router;