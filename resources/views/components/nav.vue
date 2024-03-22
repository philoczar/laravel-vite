<script setup>
import {ref} from 'vue';
import {storeToRefs} from 'pinia';
import { useAuthStore } from '../../../stores/auth';
import {useRouter} from 'vue-router';

const authStore=useAuthStore();
const {isAuthenticated,user} = storeToRefs(authStore);
const router=useRouter();

async function logoutUser(){
   try{
      await axios.post('/api/logout');
      isAuthenticated.value=false;
      user.value=null;
      router.push({name:'Login'});
   }
   catch(err){
      console.log(err);
   }
}
</script>

<template>
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Laravel-vite</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item" v-if="!isAuthenticated">
                <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
                </li>
                <li class="nav-item" v-if="isAuthenticated">
                <router-link class="nav-link" aria-current="page" to="/dashboard">Dashboard</router-link>
                </li>
                <li class="nav-item">
                <router-link class="nav-link" to="/blog">Blog</router-link>
                </li>



                <li class="nav-item dropdown"v-if="isAuthenticated">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    More
                </a>
                <ul class="dropdown-menu" >
                    <li class="text-center">
                        <button class="btn btn-sm btn-danger" @click="logoutUser">Logout</button>
                    </li>
                </ul>
                </li>

                <li class="nav-item" v-if="!isAuthenticated">
                <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li class="nav-item" v-if="!isAuthenticated">
                <router-link class="nav-link" to="/register">Register</router-link>
                </li>
            </ul>
            <!--
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            -->
            </div>
        </div>
        </nav>
</template>