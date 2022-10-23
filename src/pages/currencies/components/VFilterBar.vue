<template>
<form class="filter_form">
<fieldset class="filter_form__fieldset">
    <div class="filter_form__item">
         <label for="filter_label" class="filter_form__label">колонка</label>
    <select id="filter_select" 
    class="filter_form__select"
    v-model="searchColumn"
@change="onChange"
    >
    <option :value="null">не выбрано</option>
    <option v-for="option in options" :value="option" :key="option">
        {{option}}
    </option>
    </select>
    </div>
   <div class="filter_form__item">
    <label for="filter_input" class="filter_form__label">значение</label>
<input id="filter_input" type="text" 
class="filter_form__input" 
v-model="searchTerm"
@input="debounce"
>
   </div>

</fieldset>

</form>
</template>
<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/modules/currencies/use-currencies.store';
import { ref } from 'vue';
import { useDebounce } from '@/composition';

const store = useCurrenciesStore()
const onChange = ()=>{ 
       searchTerm.value = ''
// if(searchColumn.value === null){
    store.onFilter(searchTerm.value,searchColumn.value)
// }
}
const onSearch = ()=>{
    store.onFilter(searchTerm.value,searchColumn.value)
} 
const debounce = useDebounce(onSearch,300)

const searchTerm = ref('')
const searchColumn= ref<"CharCode"|"Name"|null> (null)

const options:Array<"CharCode"|"Name"> = ["CharCode","Name"]
</script>
<style scoped lang="scss">
@import '@/assets/control.mixines.scss';
.filter_form__fieldset{
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 1rem;
    border: transparent;
}
.filter_form__item{
    display: grid;
    gap: .2rem;
}
.filter_form__label{
    white-space: nowrap;
    font-size: small;
}
.filter_form__input,.filter_form__select{
@include control-mixin;
}


</style>