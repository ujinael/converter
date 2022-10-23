
import { Expose, Transform, Type } from "class-transformer"

export interface CurrencyValue{
  ID:string,
  NumCode:string,
  CharCode:string,
  Nominal:number,
  Name:string,
  Value:number,
  Previous:number
}
export const RUB_VALUTE:CurrencyValue = {
ID:'1',
NumCode:'643',
CharCode:'RUB',
Nominal:1,
Name:'Российский рубль',
Value:1,
Previous:1
}

export class CurrencyValues
{
@Type(()=>Date)
@Expose({name:'Date'})
date:Date

@Type(()=>Date)
@Expose({name:'PreviousDate'})
previousDate:Date

@Expose({name:'PreviousURL'})
previousURL:string

@Type(()=>Date)
@Expose({name:'Timestamp'})
timestamp:Date

@Expose({name:'Valute'})
@Type(()=>Map<String,CurrencyValue>)
@Transform(({value})=>Array.from(value,([_,val])=>val as CurrencyValue),{toClassOnly:true})
valute:Array<CurrencyValue>


  constructor(
    date:Date = new Date(),
    previousDate:Date = new Date(),
previousURL:string = '',
timestamp:Date = new Date(),
valute:Array<CurrencyValue> = []
){
this.date = date
this.previousDate = previousDate
this.previousURL = previousURL
this.timestamp = timestamp
this.valute = valute
}

}
