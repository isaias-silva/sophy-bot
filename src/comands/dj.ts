
import { downloadYtMusic, downloadYtVideo, searchVideo } from "../functions/youtubeFunctions";
import { Ibot } from "../interfaces/Ibot";
import fs from 'fs'

import path from "path"
export async function dj(bot: Ibot, nome: string) {

    const { sendImage, reply, sendAudio } = bot

    if (!nome) { return reply("envie o comando junto com o tema/artista da musica") }
    await sendImage(path.resolve("assets","img","dj.jpg"),"preparando seu mix de musicas",true)
    
    const result = await searchVideo(nome)
   
    for (let audio of result){
    
       const { url, thumbnail, title } = audio
       console.log(url)
       const music = await downloadYtMusic(url)
       if (!music) {
           return 
       }
      await sendAudio(music?.path, true)
      fs.unlinkSync(music.path)
      
    }
   

   
    return
}