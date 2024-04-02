<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router= useRouter();

const itemTitle=ref('');
const itemDescription=ref('');
const titleError=ref(null);
const descriptionError=ref(null);
const createBt=ref('');
const uploadFile=ref('');
const files=[];
let image=null;

function imageSelected(e){
    image=e.target.files[0];
}

async function addItem(e){
    e.preventDefault();
    createBt.value.disabled=true;
    titleError.value=null;
    descriptionError.value=null;
    let data=new FormData();
    
    let fileInput=uploadFile.value;
    let fileList=fileInput.files;
    if(fileList.length){
       for(var i=0; i < fileList.length; i++){
        let eachFile=fileList[i];
        files.push(eachFile);
       }

        //data.append('files',files[0]);
        data.append('image',image);
        data.append('title',itemTitle.value);
        data.append('description',itemDescription.value);

        
        try{
        let response= await axios.post('/api/item/create',data,{
            headers: {
                        'content-type': 'multipart/form-data',
                    }
        });
        createBt.value.disabled=false;
        router.push({name:'Home'});
        }
        catch(err){
            console.log(err);
            titleError.value=(err.response.data.errors.title !==undefined) ? err.response.data.errors.title : titleError.value;
            descriptionError.value=(err.response.data.errors.description !==undefined) ? err.response.data.errors.description : descriptionError.value;
            createBt.value.disabled=false;
        }

    }
}

</script>

<template>
    <h1>Add a new item</h1>
    <div class="row justify-content-center">
    <div class="col-md-12">

    <div class="row">

    <div class="col-md-8">
    <form method="post">
    <div class="input-group">
    <span class="input-group-text" id="basic-addon1">Title</span>
    <input type="text" class="form-control" name="title" placeholder="Item title..." aria-label="Item title..." aria-describedby="basic-addon1" v-model="itemTitle">
    </div>
    <div class="text-danger" v-if="titleError">
        <p v-for="error in titleError" key="error">{{error}}</p>
    </div>

    <div class="text-danger mb-3"></div>
    <div class="input-group">
    <span class="input-group-text">Description</span>
    <textarea class="form-control" aria-label="With textarea"style="min-height:160px;"name="body" v-model="itemDescription"></textarea>
    </div>
    <div class="text-danger" v-if="descriptionError">
        <p v-for="error in descriptionError" key="error">{{error}}</p>
    </div>

    <div class="text-danger mb-3"></div>
    <div class="input-group mb-3">
    <input type="file" class="form-control" id="uploadFile" ref="uploadFile" @change="imageSelected">
    <label class="input-group-text" for="uploadFile">Upload</label>
    </div>

    <div class="text-danger mb-3"></div>
    <div class="">
    <button class="btn btn-md btn-primary float-md-end"type="submit" @click="addItem" ref="createBt">Post</button>
    </div>
    </form>
    </div>

    </div>
    </div>
    </div>
</template>