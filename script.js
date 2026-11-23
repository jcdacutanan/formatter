const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const formatButton = document.getElementById("formatButton");
const copyButton = document.getElementById("copyButton");
const clearButton = document.getElementById("clearButton");
const message = document.getElementById("message");

function formatList(text) {
  // Find numbered list markers.
  // Supports: 1person, 1. person, 1) person, 1.) person
  const pattern = /(^|\s)(\d+)(?:\s*(?:\.\)|[.)]))?\s*/g;

  const matches = [...text.matchAll(pattern)];

  // A list needs at least two numbered items.
  if (matches.length < 2) {
    return null;
  }

  const items = [];

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];

    const start = current.index + current[0].length;

    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;

    const item = text.slice(start, end).trim();

    if (item) {
      items.push(item);
    }
  }

  // Give every item consistent numbering.
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

// Format button
formatButton.addEventListener("click", () => {
  const text = inputText.value.trim();

  if (!text) {
    message.textContent = "Please enter some text first.";
    outputText.value = "";
    return;
  }

  const result = formatList(text);

  if (result === null) {
    message.textContent =
      "No numbered list detected. Please enter at least two items.";
    outputText.value = "";
    return;
  }

  outputText.value = result;
  message.textContent = "Your list has been formatted!";
});

// Copy button
copyButton.addEventListener("click", async () => {
  if (!outputText.value) {
    message.textContent = "There is nothing to copy.";
    return;
  }

  try {
    await navigator.clipboard.writeText(outputText.value);
    message.textContent = "Copied to clipboard!";
  } catch {
    message.textContent = "Copy failed. Please copy the result manually.";
  }
});

// Clear button
clearButton.addEventListener("click", () => {
  inputText.value = "";
  outputText.value = "";
  message.textContent = "";
});
