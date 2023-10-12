import { config } from 'dotenv';
import OpenAI from 'openai';
config()
export default async function () {
    const apiKey = process.env.GPT_API_KEY;
 
const openai = new OpenAI({
    apiKey
  });

  return openai
}