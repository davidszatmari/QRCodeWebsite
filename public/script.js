document
  .getElementById("generate")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const inputText = document.getElementById("textInput").value;
    const slider = document.getElementById("slider").value;

    fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText, input_scale: slider }),
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

// const slider = document.getElementById("slider");
console.log(slider.value);
// slider.addEventListener("input", function () {
//   console.log("Slider value: " + slider.value);
// });
