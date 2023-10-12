import { Ibot } from "../interfaces/Ibot";
import openia from "./openia";

export async function interation(text: string, bot: Ibot) {
    const { sendImage, sendText, reply } = bot
    const gpt = await openia()
    const responses = await gpt.chat.completions.create({
        messages: [{ role: 'user', content: text }],
        model: 'gpt-3.5-turbo',
        temperature: 0,
        max_tokens: 1000,
    })
    console.log(responses)
    
}