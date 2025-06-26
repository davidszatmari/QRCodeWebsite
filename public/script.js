document
  .getElementById("generate")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const inputText = document.getElementById("textInput").value;

    fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        document.getElementById("result").src = data.qrCode;
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("message").textContent =
          "Error: " + error.message;
      });
  });
