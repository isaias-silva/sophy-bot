//modules
import fs from 'fs'
import path from 'path'
//funções
import { downloadContentFromMessage, proto } from "@adiwajshing/baileys";
import { randomtitle } from "./random";
//baixar imagem de mensagem
export async function downloadImage(contentMsg: proto.Message.IImageMessage) {
    
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
           console.log(`erro ao escrever arquivo:\n ${err}`)
           return null
       }
   }
   catch(err){
    console.log('erro no stream \n'+err)
    return null}
}
//baixar video de mensagem
export async function downloadVideo(contentMsg: proto.Message.IVideoMessage) {

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
//baixar audio de mensagem
export async function downloadAudio(contentMsg: proto.Message.IAudioMessage) {

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