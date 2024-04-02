<script setup>
const props = defineProps({
    blogData: Object
});
const blog=props.blogData;
</script>
<template>
    <div class="card mb-4">
        <div class="card-body">
            <h5 class="card-title fw-bold">{{blog.blog.blogTitle}}</h5>
            <p class="card-text">{{blog.description}}</p>
            <router-link :to="'/blog/'+blog.id" class="btn btn-outline-primary">Read more</router-link>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Author: <span class="text-capitalize">{{blog.author}}</span></li>
            <li class="list-group-item">Written On: {{blog.created_at}}</li>
        </ul>
    </div>
</template>