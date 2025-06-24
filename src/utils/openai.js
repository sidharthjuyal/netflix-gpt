import Groq from "groq-sdk";

const openai = new Groq({
  // apiKey: process.env.OPENAI_KEY,
  apiKey: process.env.OPENAI_KEY,
  dangerouslyAllowBrowser: true
});

export default openai;
