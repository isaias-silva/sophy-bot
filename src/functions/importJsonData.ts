import { IatributeGroup } from "../interfaces/IatributeGroup"
import  fs  from "fs"
export const toJsonArrays=function(caminho:string){
    
   
    try{
        fs.readFileSync(caminho)}
        catch{
        fs.writeFileSync(caminho,JSON.stringify([]))
        }
    const lista=fs.readFileSync(caminho).toString()
    const array:IatributeGroup[]=JSON.parse(lista)
  return array
}