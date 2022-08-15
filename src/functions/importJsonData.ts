import { IatributeGroup } from "../interfaces/IatributeGroup"
import  path  from "path"
import  fs  from "fs"
export const antiLinkgroups=function(){
    
    const caminho=path.resolve(`cache`,`antilink.json`)
    try{
        fs.readFileSync(caminho)}
        catch{
        fs.writeFileSync(caminho,JSON.stringify([]))
        }
    const lista=fs.readFileSync(caminho).toString()
    const array:IatributeGroup[]=JSON.parse(lista)
  return array
}