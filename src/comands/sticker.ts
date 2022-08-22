
import { data } from "../config/data";
import { downloadImage, downloadVideo } from "../functions/downloadContent";
import { Ibot } from "../interfaces/Ibot";
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"

ffmpeg().setFfmpegPath(ffmpegInstaller.path)

export async function sticker(bot: Ibot) {
    const { isImage, webMessage, sendSticker, reply, isVideo } = bot

    const gifMessage = isVideo ? webMessage.message?.videoMessage : webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage

    const imageMessage = isImage ? webMessage.message?.imageMessage : webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage

    if (!imageMessage && !gifMessage) {
        return reply(`marque uma imagem ou um gif com o comando *${data.prefix}sticker*
ou envie uma imagem ou gif com o comando *${data.prefix}sticker* 😉`)
    }

    await reply(`um segundinho...`)
    if (imageMessage) {
        const file = await downloadImage(imageMessage)
        if (file) {
            let converter = await sharp(file).resize(200, 200).webp().toBuffer()
            await sendSticker(converter, true)
            try{ fs.unlinkSync(file) }catch(err){
                console.log(`erro ao deletar[!]`)
            }
            return
        }
    }
    if (gifMessage) {

        let file = await downloadVideo(gifMessage)
        if (file) {
            let newfile = file.replace(`.mp4`, `.webp`)
            return ffmpeg(file)
                .format(`webp`)
                .output(newfile)
                .on(`end`, async () => {
                    await sendSticker(newfile, true)
                    fs.unlinkSync(newfile)
                    if (file) {
                        fs.unlinkSync(file)
                    }
                }).run()



        }

    }

    return await reply(`putz nao consegui converter...🙁
para criar figurinhas marque uma imagem ou um gif com o comando *${data.prefix}sticker*
ou envie uma imagem ou gif com o comando sticker!`)

}