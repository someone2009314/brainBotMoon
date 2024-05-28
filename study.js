/*
async function question() {
  document.getElementById("question").innerText = "loading..";
  document.getElementById("check").innerHTML = "";
  if (document.querySelector("#answerArea")) {
    document.getElementById("answerArea").remove();
    document.getElementById("enterButton").remove();
  }
  const newTextArea = document.createElement("textarea");
  newTextArea.id = "answerArea";
  newTextArea.rows = "7";
  newTextArea.cols = "50";
  const newButton = document.createElement("button");
  newButton.id = "enterButton";
  newButton.className = "btn btn-secondary";
  newButton.textContent = "Check Answer";
  newButton.onclick = checkAnswer;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TEST_1}`, // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        temperature: 0.7,
        max_tokens: 100,
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `give me a question for a ${grade} grader on the subject of ${subject} on the topic of ${topic} in a ${type} type`,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.log(response.error);
      throw new Error("Failed to fetch response from OpenAI API");
    }

    const responseData = await response.json();
    const generatedText = responseData.choices[0].message.content;

    document.getElementById("question").innerText = generatedText;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("question").innerText =
      "Error generating text. Please try again later.";
  }

  document.getElementById("questionDiv").appendChild(newTextArea);
  document
    .getElementById("questionDiv")
    .appendChild(document.createElement("br"));
  document.getElementById("questionDiv").appendChild(newButton);
}

async function checkAnswer() {
  const answerVar = document.getElementById("answerArea").value;
  const questionVar = document.getElementById("question").innerHTML;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TEST_1}`, // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        temperature: 0.7,
        max_tokens: 100,
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `how accurate is the answer, '${answerVar}' to the question, '${questionVar}' in a short concise paragraph?`,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.log(response.error);
      throw new Error("Failed to fetch response from OpenAI API");
    }

    const responseData = await response.json();
    const generatedText = responseData.choices[0].message.content;

    document.getElementById("check").innerText = generatedText;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("check").innerText =
      "Error generating text. Please try again later.";
  }
}
*/


async function question() {
  document.getElementById("question").innerText = "loading..";
  document.getElementById("check").innerHTML = "";
  
  if (document.querySelector("#answerArea")) {
    document.getElementById("answerArea").remove();
    document.getElementById("enterButton").remove();
  }

  const newTextArea = document.createElement("textarea");
  newTextArea.id = "answerArea";
  newTextArea.rows = "7";
  newTextArea.cols = "50";
  const newButton = document.createElement("button");
  newButton.id = "enterButton";
  newButton.className = "btn btn-secondary";
  newButton.textContent = "Check Answer";
  newButton.onclick = checkAnswer;

  const grade = localStorage.getItem('grade');
  const type = localStorage.getItem('type');
  const topic = localStorage.getItem('topic');
  const subject = localStorage.getItem('subject');

  console.log("API Key:", window.TEST_1); // Debugging line
  console.log(`Generating question for a ${grade} grader on ${subject} (${topic}) in a ${type} type`);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.TEST_1}`,
      },
      body: JSON.stringify({
        temperature: 0.7,
        max_tokens: 100,
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `give me a question for a ${grade} grader on the subject of ${subject} on the topic of ${topic} in a ${type} type`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Response Error:", errorText); // Debugging line
      throw new Error("Failed to fetch response from OpenAI API");
    }

    const responseData = await response.json();
    const generatedText = responseData.choices[0].message.content;

    document.getElementById("question").innerText = generatedText;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("question").innerText =
      "Error generating text. Please try again later.";
  }

  document.getElementById("questionDiv").appendChild(newTextArea);
  document
    .getElementById("questionDiv")
    .appendChild(document.createElement("br"));
  document.getElementById("questionDiv").appendChild(newButton);
}

async function checkAnswer() {
  const answerVar = document.getElementById("answerArea").value;
  const questionVar = document.getElementById("question").innerHTML;

  console.log("Checking answer for:", questionVar); // Debugging line

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.TEST_1}`,
      },
      body: JSON.stringify({
        temperature: 0.7,
        max_tokens: 100,
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `how accurate is the answer, '${answerVar}' to the question, '${questionVar}' in a short concise paragraph?`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Response Error:", errorText); // Debugging line
      throw new Error("Failed to fetch response from OpenAI API");
    }

    const responseData = await response.json();
    const generatedText = responseData.choices[0].message.content;

    document.getElementById("check").innerText = generatedText;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("check").innerText =
      "Error generating text. Please try again later.";
  }
}

window.question = question;
window.checkAnswer = checkAnswer;
