document
  .getElementById("generate")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const inputText = document.getElementById("textInput").value;
    const slider = document.getElementById("slider").value;
    const level = document.getElementById("correc_level").value;
    const capacityVersion = document.getElementById("versionInput").value;

    fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText,
        input_scale: slider,
        input_errorCorrection: level,
        input_version: capacityVersion,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error || "Unknown error");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        document.getElementById("result").src = data.qrCode;
        document.getElementById("message").textContent = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("message").textContent =
          "Error: " + error.message;
        document.getElementById("result").src = "";
      });
  });

const sliderValue = document.getElementById("sliderValue");
sliderValue.textContent = slider.value;
slider.addEventListener("input", function () {
  sliderValue.textContent = slider.value;
});

//console logs:
// const slider = document.getElementById("slider");
console.log(slider.value);
// slider.addEventListener("input", function () {
//   console.log("Slider value: " + slider.value);
// });

const level = document.getElementById("correc_level");
console.log(level.value);

const version = document.getElementById("versionInput");
console.log(version.value);
