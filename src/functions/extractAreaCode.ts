export default function(text:string){
    console.log(text)
    if(text.length>=12){    
    return text[0]+text[1]
    }else{
        return text[0]
    }
}