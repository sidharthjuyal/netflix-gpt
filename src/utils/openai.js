// import { OPENAI_KEY } from './constants';
import Groq from "groq-sdk";

const openai = new Groq({
  apiKey: import.meta.env.OPENAI_KEY,
  dangerouslyAllowBrowser: true
});

export default openai;
