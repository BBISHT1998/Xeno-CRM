require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const convertToRules = async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(
      `Convert the following prompt into JSON rules:
      Prompt: "${prompt}"
      Format: [{"field": "spend", "operator": ">", "value": 10000}]
      Output only the JSON array.`
    );

    const text = result.response.text();

    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']') + 1;
    const ruleString = text.substring(jsonStart, jsonEnd);
    const rules = JSON.parse(ruleString);

    res.json({ rules });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { convertToRules };
