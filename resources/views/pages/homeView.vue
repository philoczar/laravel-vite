<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import ItemCard from '../components/itemCard.vue';

const items=ref([]);

    async function fetchItems(){
        try{
           let response= await axios.get('/api/item/fetch');
           items.value=response.data.data;
           console.log(response.data.data);
        }
        catch(err){
            console.log(err);
        }
    }

    onMounted(()=>{
        fetchItems();
    });

    const customItems=computed(()=>{
        return items.value.map((item)=>{
            return {item:item, description:item.itemDescription.substring(0,150)}
        })
    });


</script>

<template>
    <div class="container">
        <h1>Explore our flowers catalog</h1>
    <div class="row row-cols-3 mt-3">
        <div class="col" v-for="item in customItems" :key="item.id">
            <ItemCard :item="item" />
        </div>
   

    </div>

</div>

</template>