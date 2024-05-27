function require(modulePath) {
    const resolvedPath = path.resolve(__dirname, modulePath);

    if (customRequire.cache[resolvedPath]) {
        return customRequire.cache[resolvedPath].exports;
    }

    const module = {
        exports: {}
    };

    const moduleFunction = new Function('module', 'exports', 'require', 'global', fs.readFileSync(resolvedPath, 'utf8'));
    moduleFunction(module, module.exports, customRequire, global);

    customRequire.cache[resolvedPath] = module;
    return module.exports;
}

const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

async function sendToOpenAI() {
    const userInput = document.getElementById('userInput').value;
    
    try {

      //got the endpoint from https://platform.openai.com/docs/models/how-we-use-your-data
      //https://platform.openai.com/docs/api-reference/chat/create

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${process.env.TEST_1}' // Replace with your OpenAI API key
        },
        body: JSON.stringify({
          temperature: 0.7,
          max_tokens: 100,
          model: "gpt-4",
          messages: [{"role": "user", "content":  userInput}]
        })
      });
  
      if (!response.ok) {
        console.log(response.error)
        throw new Error('Failed to fetch response from OpenAI API');
      }
  
      const responseData = await response.json();
      const generatedText = responseData.choices[0].message.content;
  
      document.getElementById('output').innerText = generatedText;
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('output').innerText = 'Error generating text. Please try again later.';
    }
  }

  
