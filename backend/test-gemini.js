const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = "AIzaSyCHKW8v-bEgmoVVC8VUw96YVph8GyRMOC0";
const genAI = new GoogleGenerativeAI(apiKey);

async function testModels() {
  console.log('Testing Google Gemini API...\n');
  
  const modelNames = [
    'gemini-pro',
    'models/gemini-pro',
    'gemini-1.5-pro',
    'models/gemini-1.5-pro',
    'gemini-1.5-flash',
    'models/gemini-1.5-flash'
  ];
  
  for (const modelName of modelNames) {
    try {
      console.log(`Testing model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say hello");
      const response = await result.response;
      const text = response.text();
      console.log(`✅ SUCCESS with ${modelName}: ${text}\n`);
      break; // Stop on first success
    } catch (error) {
      console.log(`❌ FAILED with ${modelName}: ${error.message}\n`);
    }
  }
}

testModels();
