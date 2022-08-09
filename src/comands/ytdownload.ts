import { data } from "../config/data";
import { downloadYtVideo } from "../functions/youtubeFunctions";
import { Ibot } from "../interfaces/Ibot";
import fs from 'fs'
export async function ytdownload(bot: Ibot, link: string) {
   const { reply, sendVideo } = bot
   if (!link) {
      return reply(`envie o comando com o link\n ex: *${data.prefix}ytdownload http://youtube/exemplo*`)
   }
   const file = await downloadYtVideo(link)
   if (!file) {
      return reply('erro ao baixar o video, envie um link válido e que nao ultrapasse *10 minutos*!')
   }
   const { path, videocaption } = file
   await reply('um minutinho...isso pode demorar')
   await sendVideo(path, videocaption, true)
   return fs.unlinkSync(path)

}