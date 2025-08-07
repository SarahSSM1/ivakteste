document.getElementById("send-button").addEventListener("click", async () => {
  const apiKey = document.getElementById("api-key").value.trim();
  const userInput = document.getElementById("user-input").value.trim();
  const output = document.getElementById("ai-response-output");
  const responseContainer = document.getElementById("ai-response-container");

  if (!apiKey || !userInput) {
    alert("Preencha todos os campos.");
    return;
  }

  output.textContent = "Carregando resposta...";
  responseContainer.classList.remove("hidden");

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }]
      })
    });
    const data = await res.json();
    if (data.choices && data.choices.length > 0) {
      output.textContent = data.choices[0].message.content;
    } else {
      output.textContent = "Nenhuma resposta recebida.";
    }
  } catch (err) {
    output.textContent = "Erro ao consultar API.";
    console.error(err);
  }
});