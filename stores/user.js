import axios from "axios";
import { defineStore } from "pinia";
import {ref} from 'vue';

export const useUserStore= defineStore('user', ()=>{
    const userData=JSON.parse(localStorage.getItem('userData'));
    const userPermission=JSON.parse(localStorage.getItem('userPermission'));
    const userRole=JSON.parse(localStorage.getItem('userRole'));
    const userAuthenticated=(userData) ? true : false;

    const isAuthenticated=ref(userAuthenticated);
    const user=ref(userData);
    const permissions=ref(userPermission);
    const roles=ref(userRole);

    
    //After user signin successfully
    function createUser(userObj,permissionObj,roleObj){
      localStorage.setItem('userData', JSON.stringify(userObj));
      localStorage.setItem('userPermission', JSON.stringify(permissionObj));
      localStorage.setItem('userRole', JSON.stringify(roleObj));
      user.value=userObj;
      permissions.value=permissionObj;
      roles.value=roleObj;
      isAuthenticated.value=true;
    }

    //After user signout successfully
    function destroyUser(){
      localStorage.removeItem('userData');
      localStorage.removeItem('userPermission');
      localStorage.removeItem('userRole');
      user.value=null;
      permissions.value=null;
      roles.value=null;
      isAuthenticated.value=false;
    }
    





     return {isAuthenticated,user,permissions,roles,createUser,destroyUser};
});