export function isLink(text:string)
{   let response=false
    try{
let link=new URL(text)
    }catch{
    response=true
    }
    return response
}