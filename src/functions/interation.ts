import { data } from "../config/data";
import { Ibot } from "../interfaces/Ibot";


export async function interation(text: string, bot: Ibot) {
    const { sendImage, sendText, reply, webMessage, socket } = bot

    const botname = data.botname.split(' ')[0].toLowerCase();
    const responses = ['chamou?', 'olá!', 'oioi!', 'sim?', 'hello', 'como vai?', 'eu mesmo', 'oioi']
    const responseMarcado = [{
        keys: ['como você está', 'tudo bem', 'como vai', 'bao', 'como voce esta', 'como vai', 'bom dia', 'boa noite', 'tranquilo'],
        responses: ['olá! tudo bem por aqui. eai? como está?', 'oioi! bão?', 'aopa! esta bem?', 'eaeeeee😎 firmeza?', 'ta falando comigo? tudo bem?']
    },{
        keys:['obrigado','valeu','obg','vlw','👍','ob'],
        responses:['disponha👍','😎👍','de nada👍']
    },{
        keys:['oi','ei','ei','coe','oie','eae']
        , responses:['eaeee','coe','olá']
    }]

    const responsesPv = ['pv significa praticante de voltagem.',
        'sabiam que o grupo existe pra não terem que usar pv.',
        'pv, mais conhecido como partido dos virjões',
        'não invadam pv membros, esqueci minha espingarda e fica ruim de atirar.',
        'invadir pv é uma prática comum de um tipo de animal de chifres.',
        '**pv liberado**\n\n\n\n\n\n\n\n\n é oque um golpista diria.',
        'eu já vi 2 sujeitos agredindo um invasor de pv,\n vendo aquela injustiça não pude ficar parado,\n aquele invasor de pv não teve chance contra nós 3.',
        '_invadir pv ou não invadir pv eis a questão_ \n -filosofo bovino']
    
        if (text.toLowerCase().includes('pv')) {
        const text = responsesPv[Math.trunc(Math.random() * responsesPv.length - 1)]
        if (text) {
            sendText(text)
        }
    }
    if (text.toLowerCase().includes(botname)) {
        reply(responses[Math.trunc(Math.random() * responses.length - 1)])
    }
    if (webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        const marked = webMessage.message?.extendedTextMessage.contextInfo.participant
        const me = socket.user.id
        if (me.split('@')[0].replace(/:.*/, '') == marked?.split('@')[0].replace(/:.*/, '')) {
            let properRes
            responseMarcado.forEach((value) => {
                if (value.keys.find((key) => text.toLowerCase().includes(key))) {
                    properRes = value.responses[Math.trunc(Math.random() * value.responses.length - 1)]
                }
            })
            if(properRes){
                reply(properRes)
            }
        }
    }


}