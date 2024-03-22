<script setup>
import {onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import { useAuthStore } from '../../stores/auth';
import axios from 'axios';
import Nav from '../views/components/nav.vue';

const authStore= useAuthStore();
const {checkAuthentication} = authStore;
const {isAuthenticated} = storeToRefs(authStore);
onMounted(()=>{
   checkAuthentication();
});
</script>



<template>
<Nav/>
   <router-view/>
</template>