<script setup>
import {onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import { useUserStore } from '../../stores/user';
import Nav from '../views/components/nav.vue';

console.log(Image);
const userStore= useUserStore();
const {isAuthenticated} = storeToRefs(userStore);
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
                     <router-link class="nav-link" to="/">Home</router-link>
                  </li>
                  <!--
                  <li class="nav-item">
                     <router-link class="nav-link" to="/blog">Blog</router-link>
                  </li>
                  
                  <li class="nav-item">
                     <a class="nav-link" href="/blog/posts">My Posts</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="/blog/create">+ New Post</a>
                  </li>
                  -->
                 

                  <li class="nav-item">
                     <router-link class="nav-link" to="/item/new">New Item</router-link>
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
</template>../../stores/user