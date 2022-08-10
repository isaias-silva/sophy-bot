
import { downloadYtMusic, downloadYtVideo, searchVideo } from "../functions/youtubeFunctions";
import { Ibot } from "../interfaces/Ibot";
import fs from 'fs'

import downloadAxios from "../functions/downloadAxios";
export async function playmusic(bot: Ibot, nome: string) {

    const { sendImage, reply, sendAudio } = bot

    if (!nome) { return reply("envie o comando junto com o nome/trecho da musica") }
    await reply("carregando musica...")
    const result = await searchVideo(nome)
    const { url, thumbnail, title } = result[0]

    const music = await downloadYtMusic(url)
    if (!music) {
        return reply("audio muito longo, porfavor apenas musicas, passou de 10 minutos pra min é podcast! 😉")
    }
    const image = await downloadAxios(thumbnail, 'png')
    await sendImage(image, title, true)
    fs.unlinkSync(image)
    await sendAudio(music?.path, true)
    fs.unlinkSync(music.path)
    return
}