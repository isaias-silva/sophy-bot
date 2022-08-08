import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import { randomtitle } from "./random";
export const downloadYtVideo = async function(link:string) {
   let title= randomtitle()
   let videoinfo= await ytdl.getInfo(link)
   const limit=420
   const duration= parseInt(videoinfo.videoDetails.lengthSeconds)
   if(duration>limit){
      return null
   }
   const stream = ytdl(link)
   let buffer = Buffer.from([])
    for await (const chunk of stream) {
      
        buffer = Buffer.concat([buffer, chunk])
    }
     fs.writeFileSync(path.resolve("assets","temp",`${title}.mp4`),buffer)
     return `${title}.mp4`
}