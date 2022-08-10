import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import yt from 'yt-search'
import { randomtitle } from "./random";
import yts from "yt-search";

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
   for await (const chunk of stream) {

      buffer = Buffer.concat([buffer, chunk])
   }
   fs.writeFileSync(path.resolve("assets", "temp", `${title}.mp4`), buffer)
   return { path: path.resolve("assets", "temp", `${title}.mp4`), videocaption }
}
export const downloadYtMusic = async function (link: string) {
   let title = randomtitle()
   let videoinfo = await ytdl.getInfo(link)
   let videocaption = videoinfo.videoDetails.title
   const limit = 500
   const duration = parseInt(videoinfo.videoDetails.lengthSeconds)
   if (duration > limit) {
      return null
   }
   const stream = ytdl(link,{filter:"audio"})
   let buffer = Buffer.from([])
   for await (const chunk of stream) {

      buffer = Buffer.concat([buffer, chunk])
   }
   fs.writeFileSync(path.resolve("assets", "temp", `${title}.mp3`), buffer)
   return { path: path.resolve("assets", "temp", `${title}.mp3`), videocaption }
}
export const searchVideo = async function (word: string) {
   const result = await yts(word)
   return result.all[0]
}