<script setup>
import {ref, onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import { useUserStore } from '../../stores/user';
import { useTheme } from 'vuetify';
import Nav from '../views/components/nav.vue';

const userStore= useUserStore();
const {isAuthenticated} = storeToRefs(userStore);

const drawer=ref(true);
const rail=ref(false);
const theme=useTheme();


function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}


const open=ref(['Flowers']);
const flowersCategory=ref([
        ['Flower1', 'mdi-account-multiple-outline','/blog'],
      ]);
const addOptions=ref([
   ['Flower', 'mdi-account-multiple-outline','/newflower'],
   ['Category', 'mdi-account-multiple-outline','/newcategory'],
]);
/*const cruds=ref([
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ]);*/
</script>



<template>
<v-layout>
   <v-app-bar color="deep-purple-accent-4" elevation="0">
      <v-app-bar-nav-icon class="d-md-none"></v-app-bar-nav-icon>

      <v-toolbar-title>Myles Decor</v-toolbar-title>

      <v-btn icon="mdi-brightness-6" @click="toggleTheme"></v-btn>

   </v-app-bar>

   <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        
        @click="rail = false"
        class="d-none d-sm-block"
      >
        
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
        nav
      >
        <template v-slot:append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>



    <v-list v-model:opened="open" density="compact" nav>

      <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/"></v-list-item>

      <v-list-group value="New">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-circle"
              title="New"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon, to], i) in addOptions"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
            :to="to"
          ></v-list-item>
      </v-list-group>

      <v-list-group value="Flowers">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-circle"
              title="Flowers"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon, to], i) in flowersCategory"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
            :to="to"
          ></v-list-item>
      </v-list-group>

      
    </v-list>


      </v-navigation-drawer>

      <v-app-bar v-if="isAuthenticated">

      </v-app-bar>

      <v-main>
         <router-view/>
      </v-main>


</v-layout>

<!--
<Nav />

<div class="container-fluid">
      <div class="row" v-if="!isAuthenticated">
         <main class="py-4">
            <router-view/>
         </main>
      </div>

      <div class="row" v-else>
        

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
                  
                 

                  <li class="nav-item">
                     <router-link class="nav-link" to="/item/new">New Item</router-link>
                  </li>
                  </ul>
                  
                  
               </div>
               </div>
            </div>

            </div>
            
         </div>
         
         
         
         <div class="col-sm-12 col-md-9 col-lg-10">
            <main class="py-4">
            <router-view/>
            </main>
         </div>
         
      </div>

</div>
-->
</template>