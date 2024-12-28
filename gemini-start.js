const dotenv = require("dotenv");
const fs = require("fs/promises");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
    try {
        // Read the prompt from a file 
        const prompt = await fs.readFile("subtitles.txt", "utf-8");

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

run();
