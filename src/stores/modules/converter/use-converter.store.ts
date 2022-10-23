import { defineStore } from "pinia";
import { CurrencyValue, CurrencyValues,RUB_VALUTE } from "../currencies/entity/currency";
import { useCurrenciesStore } from "../currencies/use-currencies.store";
type ConverterState = {
    currency:CurrencyValues|null
    baseValute:CurrencyValue
calculatedValute:CurrencyValue
baseValue:number
}
export const useConverterStore = defineStore('converter',{
    state:():ConverterState=>{
return {
currency:null,
baseValute:RUB_VALUTE,
calculatedValute:RUB_VALUTE,
baseValue:1
}
    }
    ,getters:{
getValutes:state=>[RUB_VALUTE,...(state.currency?.valute ?? [])]
    }
    ,actions:{
async fetchCurrency(){
    const currencyStore = useCurrenciesStore()
    this.currency = await currencyStore.fetchCurrencies()
},
setBaseValute(valute:CurrencyValue){
this.baseValute = valute
},
replaceValutes(){
const tempBaseValute = this.baseValute
this.baseValute = this.calculatedValute
this.calculatedValute = tempBaseValute

}
    }
})