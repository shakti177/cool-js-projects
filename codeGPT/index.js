import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function postData(event) {
  if (event && typeof event.preventDefault === "function")
    event.preventDefault();

  const input = document.querySelector("#message");
  const chatArea = document.querySelector("#chat-area");
  if (!input || !chatArea) {
    console.error("Required DOM elements (#message, #chat-area) not found.");
    return;
  }

  const prompt = input.value.trim();
  if (!prompt) {
    alert("Prompt is empty.");
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const responseText = await (result.response &&
    typeof result.response.text === "function"
      ? result.response.text()
      : Promise.resolve(String(result)));

    const pre = document.createElement("pre");
    pre.textContent = responseText;
    chatArea.appendChild(pre);

    input.value = "";
  } catch (error) {
    console.error("Generation error:", error);
    alert("Failed to generate content. See console for details.");
  }
}

document.querySelector("button")?.addEventListener("click", postData);
