<template>
<div class="page">
    <VBaseValuteComponent/>
    <button @click="store.replaceValutes" class="replace_button">&RightArrowLeftArrow;</button>
    <VCalculatedValuteComponent/>
</div>
</template>
<script setup lang="ts">
import { useConverterStore } from '@/stores/modules/converter/use-converter.store';
import { onMounted } from 'vue';
import VBaseValuteComponent from './components/VBaseValuteComponent.vue'
import VCalculatedValuteComponent from './components/VCalculatedValuteComponent.vue'

const store = useConverterStore()
onMounted(()=>{
    store.fetchCurrency()
})
</script>
<style scoped lang="scss">
.page{
    display: grid;
    padding: 1rem;
grid-template-rows: 1fr min-content 1fr;
align-items: center;
justify-items: center;
gap: 1rem;
}
.replace_button{
display: inline-block;
max-width: 2rem;
font-size: large;
border-radius: var(--common_border_radius);
border: 1px solid gray;
padding: 0 .2rem;
background-color: white;
}
@media screen and (min-width:599px) {
    .page{
grid-template-rows: 1fr;
grid-template-columns: 1fr min-content 1fr;
justify-items:auto;

justify-content: space-between;

}  
}
</style>