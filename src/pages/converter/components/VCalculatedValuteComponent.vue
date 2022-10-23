<template>
<div class="valute_component__wrapper">
    <select id="valute_component" 
    class="valute_component__select"
    v-model="calculatedValute"
    >
<option v-for="valute in store.getValutes" :value="valute">{{valute.Name}}</option>
    </select>
    <div class="valute_component">
        <div class="valute_component__value">
            <label for="valute_input" class="valute_component__label">{{calculatedValute.CharCode}}</label>
            <span class="valute_component__calculated_value">{{convertedValue}} </span>
        </div>
        <div class="valute_component__cource">
            <span>{{currentCource}}</span>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import { useConverterStore } from '@/stores/modules/converter/use-converter.store';
import {useConverter} from '@/composition'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useConverterStore()
const {calculatedValute,baseValute,baseValue} = storeToRefs(store)
const currentCource = computed(()=>{
 return `1 ${calculatedValute.value.CharCode} = ${convert(calculatedValute.value,baseValute.value,1).toFixed(2)} ${baseValute.value.CharCode}`   
})
const {convert} = useConverter()
const convertedValue = computed(()=>{
    return convert(baseValute.value,calculatedValute.value,baseValue.value).toFixed(2)
})
</script>
<style scoped lang="scss">
@import "../converter-page.styles.scss";
@import "@/assets/control.mixines.scss";

</style>