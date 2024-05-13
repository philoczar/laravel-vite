<script setup>
import {ref,watchEffect, watch} from 'vue';
import axios from 'axios';
const rules=ref({
        required: value => !!value || 'Field is required',
        length: value => (value && value.length >= 3) || 'Min Length is 3'
      });

const loading=ref(false);
const categoryName=ref(null);

async function addCategoy(){
    try{
        let response= await axios.post("/api/addCategoryi");
        console.log(response);
    }
    catch(err){
        console.log(err.message);
    }
}

</script>

<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col
        cols="12"
        sm="12"
        md="6"
      >
      <v-card
        class="mx-auto px-6 py-4"
        prepend-icon="mdi-account"
        title="New Category"
      >
        
      <v-text-field
      :rules="[rules.required, rules.length]"
      label="Category Name..."
      clearable
      class="mb-5"
      v-model="categoryName"
    ></v-text-field>

    <v-btn
          :loading="loading"
          color="primary"
          size="large"
          type="submit"
          block
          @click="addCategoy"
        >
          Add
        </v-btn>

      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>