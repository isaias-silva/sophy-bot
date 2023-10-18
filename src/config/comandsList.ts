const comandList:{comand:string,variants:string[],admin?:boolean}[]= [
    {comand:'menu',variants:['m']},
    {comand:'sticker', variants:['s','figurinha','fazer_figurinha']},
    {comand:'comandos',variants:['c']},
    {comand:'toimg',variants:['i','images','imagem']},
    {comand:'ban',admin:true,variants:['b']},
    {comand:'regras',admin:true,variants:['r']},
    {comand:'add',admin:true,variants:['ad']},
    {comand:'marcar',admin:true,variants:['m']},
    {comand:'antilink',admin:true,variants:['al']},
    {comand:'antifake',admin:true,variants:['af']},
    {comand:'interativo',admin:true,variants:['it']},
    {comand:'boasvindas',admin:true,variants:['bv']},
    {comand:'antivendas',admin:true,variants:['av']},
    {comand:'ytdownload',variants:['ytd']},
    {comand:'playmusic',variants:['pm']},
    {comand:'playvideo',variants:['video']},
    {comand:'dj',variants:['solta_o_som','batidão']}]

    export default comandList