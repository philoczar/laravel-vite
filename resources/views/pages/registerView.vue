<script setup>
import {ref} from 'vue';
import axios from 'axios';

const name=ref('');
const email=ref('');
const password=ref('');
const password_confirm=ref('');
const nameError=ref(null);
const emailError=ref(null);
const passwordError=ref(null);
const registerBt=ref(null);

async function registerUser(e){
  e.preventDefault();
  registerBt.value.disabled=true;
  nameError.value=null;
  emailError.value=null;
  passwordError.value=null;

  let data=new FormData();
  data.append('name',name.value);
  data.append('email',email.value);
  data.append('password',password.value);
  data.append('password_confirmation',password_confirm.value);
  try {
      const response= await axios.post('/api/register',data);
      registerBt.value.disabled=false;
      console.log(response.data);
    } catch (err) {
      nameError.value=(err.response.data.errors.name) ? err.response.data.errors.name : nameError.value;
      emailError.value=(err.response.data.errors.email) ? err.response.data.errors.email : emailError.value;
      passwordError.value=(err.response.data.errors.password) ? err.response.data.errors.password : passwordError.value;
      registerBt.value.disabled=false;
    }
}

</script>

<template>
<div class="container">
  <div class="row align-items-start">
    <div class="d-flex justify-content-center">
      <div class="col-md-4">
        <h1 class="text-center mt-5">Register</h1>
        <div class="card">
        <div class="card-body">
          <form>
            <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="email" class="form-control" id="name" aria-describedby="userName" v-model="name">
            <div id="userName" class="form-text"></div>
            <div class="text-danger" v-if="nameError">
              <p v-for="error in nameError" key="error">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            <div class="text-danger" v-if="emailError">
              <p v-for="error in emailError" key="error">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
            <div class="text-danger" v-if="passwordError">
              <p v-for="error in passwordError" key="error">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="password_confirm" v-model="password_confirm">
          </div>
          <div class="text-center">
          <button type="submit" class="btn btn-primary" @click="registerUser" ref="registerBt">Register</button>
          </div>
      </form>
          
        </div>
        <div class="card-footer">
        Already have an account? <router-link to="/login">Login</router-link>
        </div>
      </div>

      
      </div>


    </div>
  </div>
</div>
</template>