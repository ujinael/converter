<template>
            <tr class="currency_table__row body" >
            <td class="currency_table__body_cell">{{valute.NumCode}}</td>
            <td class="currency_table__body_cell">{{pairValue.pair}}</td>
            <td class="currency_table__body_cell"> {{valute.Name}}</td>
            <td class="currency_table__body_cell" > <span :class="classes">{{pairValue.cource}}</span></td>
            <td class="currency_table__body_cell"> {{pairValue.previous}}</td>
            <td class="currency_table__body_cell"> <span :class="classes">{{pairValue.trend}}</span></td>

           </tr>
</template>
<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/modules/currencies/use-currencies.store';
import  { CurrencyValue } from '@stores/modules/currencies/entity/currency';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useCurrenciesStore()
const {mode,baseValute} = storeToRefs(store)
const props = defineProps<{
    valute:CurrencyValue
}>()

const classes = computed(()=>({
   increase: isIncrease()>0,
   decrease:isIncrease()<=0
}))
const pairValue = computed(()=>{
    let pair = ''
    let cource = ''
    let previous = ''
    let trend = ''
switch(mode.value){
    case "normal":
        pair = `${props.valute.CharCode}/${baseValute.value.CharCode}`;
        cource = props.valute.Value.toFixed(4);
        previous = props.valute.Previous.toFixed(4);
        trend = (props.valute.Value - props.valute.Previous).toFixed(4);
        break;
    case "inverse":
        pair = `${baseValute.value.CharCode}/${props.valute.CharCode}`;
        cource = (1/props.valute.Value).toFixed(4);
        previous = (1/props.valute.Previous).toFixed(4);
        trend = (1/props.valute.Value - 1/props.valute.Previous).toFixed(4);
        break;
    default:break
}
return {pair,cource,previous,trend}
})
const isIncrease = ()=>{
    return +pairValue.value.trend
}

</script>
<style scoped lang="scss">
@import '../styles/currency-page.styles.scss';
.increase{
color: lightgreen;
}
.increase::after{
    content: "\2191";
}
.decrease{
color: red;
}
.decrease::after{
    content: "\2193";

}
</style>