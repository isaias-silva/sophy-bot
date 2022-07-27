import { data } from "../config/data"

export function isComand(message:string){
    const prefix= message.split("")[0]
   if(prefix==data.prefix){
    return true
   }else return false
}
export function searchComand(message:string){
    console.log(message)


}