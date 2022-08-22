//modules
import ytdl from "ytdl-core";
import yts from "yt-search";
import fs from "fs";
import path from "path";

import { randomtitle } from "./random";
//baixar video
export const downloadYtVideo = async function (link: string) {
   let title = randomtitle()
  
   let videoinfo = await ytdl.getInfo(link)
   let videocaption = videoinfo.videoDetails.title
   const limit = 660
   const duration = parseInt(videoinfo.videoDetails.lengthSeconds)
   if (duration > limit) {
      return null
   }
   const stream = ytdl(link)
   let buffer = Buffer.from([])
   console.log('[gravando Buffer !]')
   for await (const chunk of stream) {

      buffer = Buffer.concat([buffer, chunk])
   }
   console.log('[gravado !]')
   fs.writeFileSync(path.resolve("assets", "temp", `${title}.mp4`), buffer)
   return { path: path.resolve("assets", "temp", `${title}.mp4`), videocaption }
}
//baixar musica
export const downloadYtMusic = async function (link: string) {
   let title = randomtitle()
   let videoinfo = await ytdl.getInfo(link)
   let videocaption = videoinfo.videoDetails.title
   const limit = 700
   const duration = parseInt(videoinfo.videoDetails.lengthSeconds)
   if (duration > limit) {
      return null
   }
  const stream = ytdl(link,{filter:"audioonly"})
  console.log('[gravando buffer !]')
  
  let buffer = Buffer.from([])
      for await (const chunk of stream) {
      
      buffer = Buffer.concat([buffer, chunk])
      
   }
   console.log('[gravado !]')
   fs.writeFileSync(path.resolve("assets", "temp", `${title}.mp3`), buffer)
   return { path: path.resolve("assets", "temp", `${title}.mp3`), videocaption }
}
//procurar video
export const searchVideo = async function (word: string) {
   const result = await yts(word)
   return result.videos
}