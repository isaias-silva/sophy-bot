import { data } from "../config/data";
import { Ibot } from "../interfaces/Ibot";


export async function interation(text: string, bot: Ibot) {
    const { sendImage, sendText, reply, webMessage, socket } = bot

    const botname = data.botname.split(' ')[0].toLowerCase();

}