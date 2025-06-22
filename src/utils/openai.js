// import { OPENAI_KEY } from './constants';
import Groq from "groq-sdk";

const openai = new Groq({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true
});

export default openai;
