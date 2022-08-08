import { downloadContentFromMessage, getErrorCodeFromStreamError, proto } from "@adiwajshing/baileys";
import fs from 'fs'
import path from 'path'
import { randomtitle } from "./random";
export async function downloadImage(contentMsg: proto.IImageMessage) {
    
    const filename = randomtitle()
    const filetype = contentMsg.mimetype?.split('/')[1]
   try{

       let stream = await downloadContentFromMessage(contentMsg, "image");
      
    
       let buffer = Buffer.from([])
       for await (const chunk of stream) {
         
           buffer = Buffer.concat([buffer, chunk])
       }
    
       try {
           await fs.writeFileSync(path.resolve('assets', 'temp', `${filename}.${filetype}`), buffer)
          
           return path.resolve('assets', 'temp', `${filename}.${filetype}`)
       
       } catch (err) {
           console.log(err)
           return null
       }
   }
   catch(err){
    console.log('erro sério\n'+err)
    return null
   }
}
export async function downloadVideo(contentMsg: proto.IVideoMessage) {

    const filename = randomtitle()
    const filetype = contentMsg.mimetype?.split('/')[1]
   
    let stream = await downloadContentFromMessage(contentMsg, "video");
     

    let buffer = Buffer.from([])
    for await (const chunk of stream) {
      
        buffer = Buffer.concat([buffer, chunk])
    }

    try {
        await fs.writeFileSync(path.resolve('assets', 'temp', `${filename}.${filetype}`), buffer)
       
        return path.resolve('assets', 'temp', `${filename}.${filetype}`)
    
    } catch (err) {
        console.log(err)
        return null
    }
}
export async function downloadAudio(contentMsg: proto.IVideoMessage) {

    const filename = randomtitle()
    const filetype = contentMsg.mimetype?.split('/')[1]
   
    let stream = await downloadContentFromMessage(contentMsg, "audio");
     

    let buffer = Buffer.from([])
    for await (const chunk of stream) {
      
        buffer = Buffer.concat([buffer, chunk])
    }

    try {
        await fs.writeFileSync(path.resolve('assets', 'temp', `${filename}.${filetype}`), buffer)
       
        return path.resolve('assets', 'temp', `${filename}.${filetype}`)
    
    } catch (err) {
        console.log(err)
        return null
    }
}