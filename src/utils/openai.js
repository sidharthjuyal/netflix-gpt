import { OPENAI_KEY } from './constants';
import Groq from "groq-sdk";

const openai = new Groq({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true
});

export default openai;
