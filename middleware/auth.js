export default function auth({to, from, next,userStore}){
    if(!userStore.isAuthenticated){
        return next({
            name:'Login'
        });
    }
    next();
}