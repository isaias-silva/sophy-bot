
import { downloadYtMusic, searchVideo } from "../functions/youtubeFunctions";
import { Ibot } from "../interfaces/Ibot";
import fs from 'fs'
import path from "path"
import downloadAxios from "../functions/downloadAxios";
export async function dj(bot: Ibot, nome: string) {
    
    const { sendImage, reply, sendAudio } = bot

    if (!nome) { return reply("envie o comando junto com o tema/artista da musica") }
    await sendImage(path.resolve("assets", "img", "dj.jpg"), "preparando seu mix de musicas", true)

    const result = await (await searchVideo(nome)).filter(x => x.duration.seconds < 700)
    let qtd = result.length>5?5:result.length
    for (let i = 0; i < qtd; i++) {
        const audio = result[i]
        const { url, thumbnail, title } = audio
        console.log(url)
        const music = await downloadYtMusic(url)
        if (!music) {
            return
        }
        try{
        await sendAudio(music?.path)
        fs.unlinkSync(music.path)
        }catch{
            console.log(`erro de envio`)
            return
        }
    }
    console.log(`complete`)
    const image = await downloadAxios(result[0].thumbnail, "png")
    await sendImage(image, `🎧 melhores musicas de _${nome}_ 🎧`, true)
    return fs.unlinkSync(image)
}