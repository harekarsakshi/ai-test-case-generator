async function testcaseGenerator(input) {
  if (typeof input !== "string" || input.trim() === "") {
    return "Invalid input. Please enter a valid feature description.";
  }

  const apiKey = ""; // Replace with your actual API key
  const payload = {
    contents: [
      {
        parts: [
          {
            text: "generate test cases for the following feature: " + input,
          },
        ],
      },
    ],
  };

  var result = "";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (response.ok) {
    const data = await response.json();
    result = data.candidates[0].content.parts[0].text;
  } else {
    result = `Error: ${response.status} ${response.statusText}`;
  }

  return result;
}

const inputField = document.getElementById("feature-input");
const generateButton = document.getElementById("generate-button");
const outputArea = document.getElementById("testcase-output");
const copyButton = document.getElementById("copy-button");

var inputText = "";
var outputText = "";

generateButton.addEventListener("click", async () => {
  inputText = inputField.value;
  outputText = await testcaseGenerator(inputText);
  outputArea.textContent = outputText;
});

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(outputText);
  alert("Copied to clipboard!");
});
