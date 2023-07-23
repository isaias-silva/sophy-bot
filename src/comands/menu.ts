import { Ibot } from "../interfaces/Ibot";
import path from "path"
import { data } from "../config/data";
import comandsList from "../config/comandsList";

export async function menu(bot: Ibot) {

  const { sendImage, webMessage } = bot




 

  const menu = {
    image: { url: path.resolve('assets', 'img', 'perfil.webp') },
    caption: `_⚙️sophiaBot v${data.version}_\n*numero de comandos*:  ${comandsList.length}\n*botname*:  ${data.botname}\n*dono*:  +${data.owner}`,
    footer: 'desenvolvido por Zack black',
    headerType: 1
  }

  sendImage(menu.image.url, menu.caption, true)


}
