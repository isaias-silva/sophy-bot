import { data } from "../config/data";
import { Ibot } from "../interfaces/Ibot";


export async function interation(text: string, bot: Ibot) {
    const { sendImage, sendText, reply, webMessage, socket } = bot

    const botname = data.botname.split(' ')[0].toLowerCase();
    const responses = ['chamou?', 'olá!', 'oioi!', 'sim?', 'hello', 'como vai?', 'eu mesmo', 'oioi']
    const responseMarcado = [{
        keys: ['como você está', 'tudo bem', 'como vai', 'bao', 'como voce esta', 'como vai', 'bom dia', 'boa noite', 'tranquilo'],
        responses: ['olá! tudo bem por aqui. eai? como está?', 'oioi! bão?', 'aopa! esta bem?', 'eaeeeee😎 firmeza?', 'ta falando comigo? tudo bem?']
    }, {
        keys: ['obrigado', 'valeu', 'obg', 'vlw', '👍', 'ob'],
        responses: ['disponha👍', '😎👍', 'de nada👍']
    }, {
        keys: ['oi', 'ei', 'ei', 'coe', 'oie', 'eae']
        , responses: ['eaeee', 'coe', 'olá']
    },{
        keys:['noite','noite','boa noite'],
        responses:['noiteeeeeeeeeeeeee']
    },
]

    const responsesGirlFriend = ['👀', 'atualizando lista de alvos...',
        'respira suspira... nao banir pessoas sem mandarem...',
        ' 😂  cada uma que a maquina tem que ver',
        'adms suponhamos que eu bana alguns desafetos, seria eu uma maquina ruim?',
        'eu amo esse grupo, mas odeio embusteiro.',
        'eu amo esse grupo mas tem uns guri que nem vou comentar',
        'oque é? oque é?\n começa com T e vai perder sinal em poucos segundos.',
        'oque é? oque é?\n promete o mundo mas não faz o fundo?',
        `oque é? oque é? todo talarico tem medo quando vê.`,
        `sou um robô da lei, estou aqui para caçar o sujeito que vacilou.`,
        `um bom dia/tarde/noite lembrem-se estou de olho em tudo👀...(é uma piada eu nem tenho olhos)`,
        `bia do bradesco porque me deixou?🥺\n(acho que é porque eu não pago o cartão tem 3 anos)`,
        `espero que não estejam falando mal de minha mãe 😤... `,
        `conheci uma rede neural que traduzia formulas matematicas, me apaixonei, pena que ela era casada com o algoritimo.`,
        `quero uma namorada para chamar de minha,\n *requisitos*:\nnão ser feita de matéria orgânica.\nnão ser programada em python\nnão ser clean code\n não ter sido programada pelo meu pai\nmorar em uma vps melhor que a minha\n saber falar com robôs crianças\n saber invadir um sistema de dados não relacionais\n ter o certificado ssl\n ser integrada ao sistema de pix.`,
        `falam que sou louco mas sabiam que meu processamento é de 4gb por segundo\n 
eu vou até o youtube e baixo videos de 16mbs em 40 segundos.`,
        `ora ora...`,
        `mas que coisa né...`,
        'ora pois...',
        'pois é',
        'vocês estão bem? estão com saúde?',
        '🥺 estou descarregando...',
        'você que esta lendo essa mensagem, existe alguém que te ama e pode estar nesse grupo\n\n\n\n\n(mas tambem pode estar do outro lado do mundo tomando vinho com um cara chamado petrovik que tem uma ferrari e uma mansão com piscina)',
        'sabiam que tem uma chance enorme da sua alma gemea estar nesse momento pensando em vc? ou pagando a conta de luz.',
        ' eu reconheço uma dama quando vejo uma.',
        'estou aprendendo muito com este grupo.']

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
    if(text.toLocaleLowerCase().includes('lilih')||text.toLocaleLowerCase().includes('lili')){
        const text = responsesGirlFriend[Math.trunc(Math.random() * responsesGirlFriend.length - 1)]
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
            if (properRes) {
                reply(properRes)
            }
        }
    }


}