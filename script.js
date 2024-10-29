async function fetchResponse(userMessage) {
    const apiKey = "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"; // Replace with your actual API key
    const endpoint = "https://api.openai.com/v1/engines/davinci-codex/completions"; // Replace with actual endpoint

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({ prompt: userMessage, max_tokens: 50 })
        });

        if (!response.ok) {
            // If response is not okay, log error details
            const errorDetails = await response.json();
            console.error("API Error:", errorDetails);
            displayMessage("Hoetu", "There was an issue with the API request.");
            return;
        }

        const data = await response.json();
        const botMessage = data.choices[0].text.trim();
        displayMessage("Hoetu", botMessage);
    } catch (error) {
        console.error("Fetch Error:", error);
        displayMessage("Hoetu", "Sorry, there was an error with the request.");
    }
}
