const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = "AIzaSyCHKW8v-bEgmoVVC8VUw96YVph8GyRMOC0";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    console.log('Fetching available models...\n');
    
    // Try to list models using the API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey);
    const data = await response.json();
    
    if (data.models) {
      console.log('Available models:');
      data.models.forEach(model => {
        console.log(`- ${model.name}`);
      });
    } else {
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

listModels();
