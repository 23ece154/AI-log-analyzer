

const axios = require("axios");
require("dotenv").config();

async function analyzeError(errorLog) {

    try {

        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: `
You are a senior DevOps engineer analyzing production logs.

Rules:
- Maximum 25 words total
- Very concise
- No bullet points
- Output must be a single line
- Severity must be LOW, MEDIUM, HIGH, or CRITICAL
`
                    },
                    {
                        role: "user",
                        content: `
Analyze this log.

Format EXACTLY like this:

CAUSE: <short> | FIX: <short> | SEVERITY: <LOW|MEDIUM|HIGH|CRITICAL>

LOG:
${errorLog}
`
                    }
                ],
                temperature: 0,
                max_tokens: 60
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {

        console.log("AI ERROR:", error.response?.data || error.message);

        return "CAUSE: AI failed | FIX: Retry analysis | SEVERITY: LOW";

    }

}

module.exports = analyzeError;