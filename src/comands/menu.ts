import { Ibot } from "../interfaces/Ibot";
import path from "path"
import { data } from "../config/data";
import comandsList from "../config/comandsList";

export async function menu(bot: Ibot) {

    const { sendImage, sendmenu, webMessage } = bot


    
    
    const buttons = [
        {buttonId: `${data.prefix}regras`, buttonText: {displayText: '👑regras👑'}, type: 1},
        {buttonId: `${data.prefix}comandos`, buttonText: {displayText: '🔧comandos🔧'}, type: 1},
        {buttonId: `${data.prefix}marcar`, buttonText: {displayText: '🚨chama membros🚨'}, type: 2},
        {buttonId: `${data.prefix}antilink on`, buttonText: {displayText: '🚫antilink🚫'}, type: 2},
        {buttonId: `${data.prefix}antifake on`, buttonText: {displayText: '🚫antifake🚫'}, type: 2},
        {buttonId: `${data.prefix}antivendas on`, buttonText: {displayText: '🚫antivendas🚫'}, type: 2},
      ]
      
      const menu = {
        image: { url: path.resolve('assets', 'img', 'perfil.webp') },
        caption: `_⚙️sophiaBot v${data.version}_\n*numero de comandos*:  ${comandsList.length}\n*botname*:  ${data.botname}\n*dono*:  +${data.owner}`,
        footer: 'desenvolvido por Zack black',
          buttons: buttons,
          headerType: 1
      }
      


    return sendmenu(menu)
}
