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

// Function to fetch chatbot response from LLaMA API via GroqCloud
async function fetchResponse(userMessage) {
    const apiKey = "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"; // Replace with your actual GroqCloud API key
    const groqcloudUrl = "https://api.groqcloud.com/llama/v1/generate"; // Example URL; replace with the actual GroqCloud endpoint if different

    try {
        const response = await fetch(groqcloudUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 50,
                // Include any other parameters required by GroqCloud for LLaMA
            })
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("API Error:", errorDetails);
            displayMessage("Hoetu", "There was an issue with the API request.");
            return;
        }

        const data = await response.json();
        const botMessage = data.choices[0].text.trim(); // Adjust based on GroqCloud's LLaMA response structure
        displayMessage("Hoetu", botMessage);
    } catch (error) {
        console.error("Fetch Error:", error);
        displayMessage("Hoetu", "Sorry, there was an error with the request.");
    }
}
