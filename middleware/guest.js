export default function guest({to, from, next,userStore}){
    if(userStore.isAuthenticated){
        return next({
            name:'Dashboard'
        });
    }
   next();
}