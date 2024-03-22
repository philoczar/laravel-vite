<script setup>
import {ref, onMounted, computed} from 'vue';
import axios from 'axios';
import BlogCard from '../components/blogCard.vue';


const blogs=ref([]);
const fetchError=ref(false);
const fetchComplete=ref(false);

async function fetchBlogs(){
    try{
        let response= await axios.get('/api/blog');
        blogs.value=response.data;
        fetchComplete.value=true;
    }
    catch(err){
        fetchError.value=err.message;
    }
}
onMounted(()=>{
    fetchBlogs();
});

const customBlogs=computed(()=>{
    return blogs.value.map(blog=>{
        return {blog, id:blog.id, author:blog.user.name, created_at:blog.user.created_at, description:blog.blogBody.substring(0,100)}
    });
});
</script>

<template>
<div class="container">
    <h1>Blog page</h1>
    <div class="row row-cols-3 mt-3">
    <div v-if="blogs.length">
        <div class="col" v-for="blog in customBlogs" :key="blog.id">
            <BlogCard :blogData="blog"/>
        </div>
    </div>
    <div v-if="!fetchError && fetchComplete && !blogs.length">
        <p>There are no blogs</p>
    </div>
    <div v-if="!fetchError && !fetchComplete">
        <p>Loading...</p>
    </div>
    </div>

</div>
</template>../components/blogCard.vue