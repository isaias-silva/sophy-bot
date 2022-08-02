import { Ibot } from "../interfaces/Ibot";
import path from "path"
import { data } from "../config/data";
import comandsList from "../config/comandsList";
export async function menu(bot: Ibot) {

    const { sendImage, sendmenu, webMessage } = bot

    const buttons = [
        { index: 1, urlButton: { displayText: 'criador', url: 'https://github.com/isaias-silva' } },
        { index: 3, quickReplyButton: { displayText: 'comandos', id: '!comandos' } },

    ]
    const menu = {
        image: { url: path.resolve('assets', 'img', 'perfil.webp') },
        caption: `_⚙️sophiaBot v${data.version}_\n*numero de comandos*:  ${comandsList.length}\n*botname*:  ${data.botname}\n*dono*:  +${data.owner}`,
        footer: 'desenvolvido por Zack black',
        templateButtons: buttons,

    }

    return sendmenu(menu)
}
