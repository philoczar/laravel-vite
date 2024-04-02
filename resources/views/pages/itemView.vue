<script setup>
import {ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';

const router=useRouter();
const props=defineProps({
    itemID: String
});
const itemID=props.itemID;
const item=ref([]);

function  fetchItem(){
    axios.get('/api/item/'+itemID+'').then((response)=>{
        item.value.push(response.data);
    }).then(error=>{
        console.log(error);
    });
}

function goBack(){
    router.go(-1);
}
onMounted(()=>{
    fetchItem();
})

</script>

<template>
    <div class="row mt-3">
    <div class="col-md-8">
    <div class="mb-4">
        <button class="btn btn-md btn-outline-primary" @click="goBack">Back</button>
    </div>
    <div class="card" v-if="item.length">
    <!--<img src="..." class="card-img-top" alt="...">-->
    <div class="card-body">
        <h1 class="card-title">{{item[0].itemName}}</h1>
        <p class="card-text">{{item[0].itemDescription}}</p>
    </div>
    <!--
    <ul class="list-group list-group-flush">
        <li class="list-group-item"></li>
        <li class="list-group-item"></li>
    </ul>
    -->
    </div>



    </div>
    </div>
</template>