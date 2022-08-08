import ytdl from "ytdl-core";

export const downloadYtVideo = async function(link:string) {
   let videoinfo= await ytdl.getInfo(link)
   console.log(videoinfo)
   return videoinfo
}