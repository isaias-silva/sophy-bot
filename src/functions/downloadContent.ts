import { downloadContentFromMessage, proto } from "@adiwajshing/baileys";
import fs from 'fs'
import path from 'path'
import { randomtitle } from "./random";
export async function downloadImage(contentMsg: proto.IImageMessage) {

    const filename = randomtitle()
    const filetype = contentMsg.mimetype?.split('/')[1]
   
    let stream = await downloadContentFromMessage(contentMsg, "image");
     

    let buffer = Buffer.from([])
    for await (const chunk of stream) {
      
        buffer = Buffer.concat([buffer, chunk])
    }

    try {
        await fs.writeFileSync(path.resolve('assets', 'temp', `${filename}.${filetype}`), buffer)
       
        return path.resolve('assets', 'temp', `${filename}.${filetype}`)
    
    } catch (err) {
        console.log('errozin')
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
        console.log('errozin')
        return null
    }
}