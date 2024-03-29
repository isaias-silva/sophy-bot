
import { downloadYtMusic, searchVideo } from "../functions/youtubeFunctions";
import { Ibot } from "../interfaces/Ibot";
import fs from 'fs'
import path from "path"
import downloadAxios from "../functions/downloadAxios";
export async function dj(bot: Ibot, param?: string) {

    const { sendImage, reply, sendAudio } = bot

    if (!param) { return reply("envie o comando junto com o tema/artista da musica") }
    const buff = fs.readFileSync(path.resolve("assets", "img", "dj.jpg"))
    await sendImage(buff, "preparando seu mix de musicas", true)

    const result = await (await searchVideo(param)).filter(x => x.duration.seconds < 700)
    let qtd = result.length > 5 ? 5 : result.length
    for (let i = 0; i < qtd; i++) {
        const audio = result[i]
        const { url, thumbnail, title } = audio
        console.log(url)
        const music = await downloadYtMusic(url)
        if (!music) {
            return
        }
        try {
            await sendAudio(music?.path)
            fs.unlinkSync(music.path)
        } catch {
            console.log(`erro de envio`)
            return
        }
    }
    console.log(`complete`)
    const image = await downloadAxios( "png",result[0].thumbnail)
  if(image){
    await sendImage(image, `🎧 melhores musicas de _${param}_ 🎧`, true)
    return fs.unlinkSync(image)
  }
    
}