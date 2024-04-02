<script setup>
const imageUrl='http://[::1]:5173/public/uploads/';

const props=defineProps({
    item: Object
});
//http://[::1]:5173/@vite/client
//../../../public/uploads/1711971792.IMG_20230601_134444_876.jpg
const item=props.item;
</script>
<template>
    <div class="card mb-4">
        <img :src="imageUrl+item.item.itemImage"/>
        <div class="card-body">
            <h5 class="card-title fw-bold">{{item.item.itemName}}</h5>
            <p class="card-text">{{item.description}}</p>
            <router-link :to="'/item/'+item.item.id" class="btn btn-outline-primary">Read more</router-link>
        </div>
    </div>
</template>