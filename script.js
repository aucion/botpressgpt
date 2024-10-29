// script.js

// Function to handle sending a message
function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return; // Skip empty input

    // Display the user's message
    displayMessage("User", userInput);
    document.getElementById("userInput").value = ""; // Clear input

    // Fetch response from the API
    fetchResponse(userInput);
}

// Function to display messages in the chatbox
function displayMessage(sender, message) {
    const messagesDiv = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the latest message
}

// Function to fetch chatbot response from the API
async function fetchResponse(userMessage) {
    const apiKey = "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";  // Replace with your API key

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({ prompt: userMessage, max_tokens: 50 })
        });

        const data = await response.json();
        const botMessage = data.choices[0].text.trim();
        displayMessage("Hoetu", botMessage);
    } catch (error) {
        console.error("Error:", error);
        displayMessage("Hoetu", "Sorry, there was an error with the request.");
    }
}
