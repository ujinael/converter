import { CurrencyValue } from "@/stores/models"

export const useConverter = ()=>{
    const convert = (fromValute:CurrencyValue, toValute:CurrencyValue,value:number)=>{
        const toValutePerOneRub = 1/toValute.Value
        return fromValute.Value * toValutePerOneRub * value
    }
    return {convert}
}