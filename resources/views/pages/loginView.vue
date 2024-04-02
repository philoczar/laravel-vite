<script setup>
import {ref} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import {useUserStore} from '../../../stores/user';
import { storeToRefs } from 'pinia';
const router = useRouter();
const userStore=useUserStore();
const {createUser}=userStore;
const {user,permissions,roles,isAuthenticated}=storeToRefs(userStore);

const email=ref('');
const password=ref('');
const loginEmailError=ref(null);
const loginPasswordError=ref(null);
const loginBt=ref(null);


async function loginUser(e){
  e.preventDefault();
  loginEmailError.value=null;
  loginPasswordError.value=null;
  loginBt.value.disabled=true;

  let data=new FormData();
  data.append('email',email.value);
  data.append('password',password.value);
  try {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post('/api/login',data);
      let response = await axios.get("/api/user");
      loginBt.value.disabled=false;
      createUser(response.data.user, response.data.permissions, response.data.roles);
      router.push({ name: 'Home' });
    } catch (err) {
      loginEmailError.value=(err.response.data.errors.email !==undefined) ? err.response.data.errors.email : loginEmailError.value;
      loginPasswordError.value=(err.response.data.errors.password !==undefined) ? err.response.data.errors.password : loginPasswordError.value;
      loginBt.value.disabled=false;
    }
}

</script>

<template>
<div class="container">
  <div class="row align-items-start">
    <div class="d-flex justify-content-center">
      <div class="col-md-4">
        <h1 class="text-center mt-5">Login</h1>
        <div class="card">
        <div class="card-body">
          <form>
          <div class="mb-3">
            <label for="email" class="form-label fw-bold">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            <div class="text-danger" v-if="loginEmailError">
              <p v-for="error in loginEmailError" key="error">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label fw-bold">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
            <div class="text-danger" v-if="loginPasswordError">
              <p v-for="error in loginPasswordError" key="error">{{error}}</p>
            </div>
          </div>
          <div class="text-center">
          <button type="submit" class="btn btn-primary" @click="loginUser" ref="loginBt">Login</button>
          </div>
          </form>
          
        </div>
        <div class="card-footer">
        Please <router-link to="/register">register now</router-link> if you dont have an account
        </div>
      </div>

      
      </div>


    </div>
  </div>
</div>
</template>../../../stores/user