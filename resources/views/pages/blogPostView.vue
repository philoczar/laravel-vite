<script setup>
import { ref, onMounted, computed} from 'vue';
import axios from 'axios';

const props=defineProps({
    blogID: String
});
const blogID=props.blogID;
const blog=ref([]);
const fetchingComplete=ref(false);
const fetchingError=ref(false);

async function fetchPost(blogID){
    try{
        let response= await axios.get('/api/blog/'+blogID+'');
        blog.value=response.data;
        fetchingComplete.value=true;
    }
    catch(err){
        console.log(err.message);
        fetchingError.value=true;
        fetchingComplete.value=true;
    }
}

onMounted(()=>{
    fetchPost(blogID);
});
</script>

<template>
    <div class="row mt-3">
    <div class="col-md-8">
    
    <div class="card" v-if="blog.length">
    <!--<img src="..." class="card-img-top" alt="...">-->
    <div class="card-body">
        <h1 class="card-title">{{blog[0].blogTitle}}</h1>
        <p class="card-text">{{blog[0].blogBody}}</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Author: <span class="text-capitalize">{{blog[0].user.name}}</span></li>
        <li class="list-group-item">Written On: {{blog[0].created_at}}</li>
    </ul>
    </div>

    <div v-if="!fetchingComplete && !fetchingError">
    Loading...
    </div>


    </div>
    </div>
    

</template>