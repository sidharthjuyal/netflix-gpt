import Groq from "groq-sdk";

const openai = new Groq({
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  dangerouslyAllowBrowser: true
});

export default openai;
