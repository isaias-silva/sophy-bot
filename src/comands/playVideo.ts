
import { downloadYtMusic, downloadYtVideo, searchVideo } from "../functions/youtubeFunctions";
import { Ibot } from "../interfaces/Ibot";
import fs from 'fs'
export async function playvideo(bot: Ibot, nome: string) {

    const { reply, sendVideo } = bot

    if (!nome) { return reply("envie o comando junto com o nome/tema do video") }
    await reply("carregando video...isso pode demorar um pouco...")
    const result = await searchVideo(nome)
    const { url, title } = result[0]

    const video = await downloadYtVideo(url)
    if (!video) {
        return reply("video muito longo, passou de 10 minutos pra min é filme da marvel! 😉")
    }
    
    await sendVideo(video?.path,title,true)
    fs.unlinkSync(video.path)
    return
}