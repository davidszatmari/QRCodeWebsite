const form = document.getElementById("decodeForm");
const message = document.getElementById("message");
const result = document.getElementById("result-text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  message.textContent = "Decoding...";

  try {
    const response = await fetch("http://localhost:3000/decodeqr", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = "QR code decoded successfully!";
      result.textContent = data.decodedText;
    } else {
      message.textContent =
        "Error: " + (data.error || "Failed to decode QR code.");
      result.textContent = "";
    }
  } catch (err) {
    message.textContent = "Error: Could not connect to the server.";
    result.textContent = "";
  }
});
