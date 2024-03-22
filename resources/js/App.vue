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
<div class="container-fluid">

      <div class="row" v-if="!isAuthenticated">
         <main class="py-4">
            <router-view/>
         </main>
      </div>

      <div class="row" v-else>
         <!--Dashboard aside menu for logged in users starts-->
         <div class="d-none d-md-block col-md-3 col-lg-2 text-center ">
            <div class="accordion mt-3" id="accordionExample">
            <div class="accordion-item">
               <h2 class="accordion-header">
               <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Main
               </button>
               </h2>
               <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
               <div class="accordion-body">					
                  <ul class="nav nav-underline flex-column">
                  <li class="nav-item">
                     <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
                  </li>
                  <li class="nav-item">
                     <router-link class="nav-link" to="/blog">Blog</router-link>
                  </li>
                  
                  <li class="nav-item">
                     <a class="nav-link" href="/blog/posts">My Posts</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="/blog/create">+ New Post</a>
                  </li>
                 

                  <li class="nav-item">
                     <a class="nav-link" href="/adult">18+</a>
                  </li>
                  </ul>
                  
                  
               </div>
               </div>
            </div>
            <div class="accordion-item">
               <h2 class="accordion-header">
               <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Users
               </button>
               </h2>
               <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
               <div class="accordion-body">
                  
                  <ul class="nav nav-underline flex-column">
                  <li class="nav-item">
                     <a class="nav-link" href="/users">All</a>
                  </li>
                  </ul>
                  
               </div>
               </div>
            </div>
            <div class="accordion-item">
               <h2 class="accordion-header">
               <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Manage Roles &amp; Permissions
               </button>
               </h2>
               <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
               <div class="accordion-body">
                  <ul class="nav nav-underline flex-column">
                  <li class="nav-item">
                     <a class="nav-link" href="/laratrust">Laratrust Manager</a>
                  </li>
                  </ul>
               </div>
               </div>
            </div>
            </div>
            
         </div>
         <!--Dashboard aside menu for logged in users ends-->
         
         <!--Main content col for logged in users starts-->
         <div class="col-sm-12 col-md-9 col-lg-10">
            <main class="py-4">
            <router-view/>
            </main>
         </div>
         <!--Main content col for logged in users ends-->
      </div>

</div>
</template>