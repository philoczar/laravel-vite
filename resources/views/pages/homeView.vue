<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import ItemCard from '../components/itemCard.vue';

const items=ref([]);

    async function fetchItems(){
        try{
           let response= await axios.get('/api/item/fetch');
           items.value=response.data.data;
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
            return {item:item, title:item.itemName, src:item.itemImage, flex:4, description:item.itemDescription.substring(0,150)}
        })
    });


</script>

<template>
    <v-container fluid>
        <v-row dense>
            <v-col 
            cols="11"
            sm="12"
            >
                <v-card
                            
                >
                    <v-container>
                        <v-row dense>
                        <v-col
                        v-for="card in customItems"
                        :key="card.title"
                        :cols="card.flex"
                        >
                        <v-card>
                            <v-img
                            :src="'http://[::1]:5173/public/uploads/'+card.src"
                            class="align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            cover
                            >
                            <v-card-title class="text-white" v-text="card.title"></v-card-title>
                            </v-img>

                            <v-card-text>
                                <div>Whitehaven Beach</div>

                                <div>Whitsunday Island, Whitsunday Islands</div>
                            </v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn color="surface-variant" icon="mdi-heart" size="small" variant="text"></v-btn>

                            <v-btn color="surface-variant" icon="mdi-bookmark" size="small" variant="text"></v-btn>

                            <v-btn color="surface-variant" icon="mdi-share-variant" size="small" variant="text"></v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-col>
                        </v-row>
                    </v-container>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>