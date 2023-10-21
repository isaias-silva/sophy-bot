import { add } from "../comands/add"
import { antiFake } from "../comands/antiFake"
import { antiLink } from "../comands/antiLink"
import { antiVendas } from "../comands/antiVendas"
import { ban } from "../comands/ban"
import { boasVindas } from "../comands/boasVindas"
import { comandos } from "../comands/comandos"
import { dj } from "../comands/dj"
import { interativo } from "../comands/interativo"
import { marcar } from "../comands/marcar"
import { menu } from "../comands/menu"

import { playmusic } from "../comands/playMusic"

import { playvideo } from "../comands/playVideo"
import { ranking } from "../comands/ranking"

import { regras } from "../comands/regras"

import { sticker } from "../comands/sticker"
import { termos } from "../comands/termos"

import { toimg } from "../comands/toimg"

import { ytdownload } from "../comands/ytdownload"

import { Ibot } from "../interfaces/Ibot"


const comandList:{comand:string,variants:string[],fn:(bot:Ibot,param?:string)=>Promise<any>,admin?:boolean}[]= [
    {comand:'menu',variants:['m','info'],fn:menu},
    {comand:'sticker', variants:['st','figurinha','fazer_figurinha','s'],fn:sticker},
    {comand:'comandos',variants:['c','comandos','lista_de_comandos'],fn:comandos},
    {comand:'toimg',variants:['i','images','imagem'], fn:toimg},
    {comand:'ban',admin:true,variants:['b','olho-da-rua'],fn:ban},
    {comand:'regras',admin:true,variants:['r','descricao','leis-do-grupo'],fn:regras},
    {comand:'add',admin:true,variants:['ad'],fn:add},
    {comand:'marcar',admin:true,variants:['m','chamar-moita','agitar-moita','moita'],fn:marcar},
    {comand:'antilink',admin:true,variants:['al','sem_link'],fn:antiLink},
    {comand:'antifake',admin:true,variants:['af','sobr'],fn:antiFake},
    {comand:'interativo',admin:true,variants:['it','conversador'],fn:interativo},
    {comand:'boasvindas',admin:true,variants:['bv','educacao'],fn:boasVindas},
    {comand:'antivendas',admin:true,variants:['av','pega_golpe','antigolpista','antigolpes'],fn:antiVendas},
    {comand:'ytdownload',variants:['ytd'],fn: ytdownload},
    {comand:'playmusic',variants:['pm','toca','poe-pra-tocar','play'],fn:playmusic},
    {comand:'playvideo',variants:['video'], fn:playvideo},
    {comand:'ranking',variants:['status'], fn:ranking},
    {comand:'dj',variants:['solta-o-som','batidão','mix','cd'],fn:dj},
    {comand:'termos-rede-neural',admin:true,variants:['morte'],fn:termos}]

    export default comandList