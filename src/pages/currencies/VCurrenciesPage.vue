<template>
<div class="page">
<VFilterBar/>
<VTable v-if="store.getValutes" :valutes="store.getValutes"/>  
</div>
</template>
<script setup lang="ts">
import {  onMounted } from 'vue';
import {useCurrenciesStore} from '@/stores/modules/currencies/use-currencies.store'

import VTable from './components/VTable.vue'
import VFilterBar from './components/VFilterBar.vue';
const store = useCurrenciesStore()

onMounted(()=>{
store.fetchCurrencies()
})
</script>

<style scoped lang="scss">
.page{
    padding: 1rem;
    height: 100%;
    // overflow: hidden;
    display: grid;
    grid-template-rows:min-content 1fr;
    align-content: flex-start;
    gap:1rem;
// background-color: bisque;
}

</style>