<script setup>
import {ref, onMounted} from 'vue';
import {useAuthStore} from '../../../stores/auth';
import {storeToRefs} from 'pinia';

const authStore=useAuthStore();
const {checkAuthentication}=authStore;
const {isAuthenticated}=storeToRefs(authStore);
</script>

<template>
    <h1>Welcome to the dashboard</h1>
</template>