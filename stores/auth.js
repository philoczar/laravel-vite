import axios from "axios";
import { defineStore } from "pinia";
import {ref} from 'vue';

export const useAuthStore= defineStore('auth', ()=>{
    const isAuthenticated=ref(false);
    const user=ref(null);
    const permissions=ref(null);
    const roles=ref(null);


    //We check if the user is Authenticated
   async function checkAuthentication(){
        try {
            var response= await axios.get('/api/user');
            isAuthenticated.value=true;
            user.value=response.data.user;
            permissions.value=response.data.permissions;
            roles.value=response.data.roles;
            return true;
          } catch (err) {
            //console.log(err);
          }
    }
     return {isAuthenticated,user,permissions,roles,checkAuthentication};
});