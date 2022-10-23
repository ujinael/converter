
import { defineStore } from 'pinia'
import { CurrencyValue, CurrencyValues, RUB_VALUTE } from '@stores/models/';
import {  Api } from '@stores/store.api';
type CurrencysState = {
  loading: boolean,
  currency: CurrencyValues | null,
  currencies:CurrencyValues[],
  filterColumn:"CharCode"|"Name"|null,
  baseValute:CurrencyValue,
  mode:"normal"|"inverse"
  searchTerm:string
}
export const useCurrenciesStore = defineStore('currencies', {
  state: ():CurrencysState => {
    return {
      loading: false,
      currency: null,
      currencies:[],
      baseValute:RUB_VALUTE,
      mode:"normal",
     filterColumn:null,
searchTerm:''
    }
  },
  getters:{
  getValutes:state=>{
    if(!state.currency)return []
const valutes = state.currency.valute
if(state.searchTerm  && state.filterColumn)  
return valutes
.filter(v=>v[state.filterColumn!].toLocaleLowerCase()
.includes(state.searchTerm!.toLocaleLowerCase()

  ))
  return valutes
  }  
  },
  actions: {
    switchMode(){
      this.mode = this.mode === "normal"?"inverse":"normal"
    },
    onFilter(searchTerm:string,column:"CharCode"|"Name"|null){
this.filterColumn = column
this.searchTerm = searchTerm

    },
  async fetchCurrencies(){
    try {
       const currency = await Api.shared().child('daily_json.js').get<CurrencyValues>([],CurrencyValues)
  this.currency = currency 
return currency
    } catch (error) {
      console.log('Ooops something wrong!!!');
      throw new Error(`${error}`)
    }
 
  
  }
  }
  })


