const baseUrl = "https://jeevenlamichhane.com.np/api";

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date");
  const convertButton = document.getElementById("convertButton");
  const container = document.getElementById("data");
  const loading = document.getElementById("loading");

  convertButton.addEventListener("click", () => {
    const date = dateInput.value.trim();
    if (date.length > 0) {
      loading.textContent = "converting date.";
      setInterval(() => {
        loading.textContent += ".";
      }, 900);
      loading.style.display = "block";
      container.innerHTML = "";
      fetchHashtags(date);
    } else {
      container.innerHTML = "";
    }
  });

  const fetchHashtags = (date) => {
    fetch(`${baseUrl}/convert-date?date=${date}`)
      .then((response) => response.json())
      .then((data) => displayResult(data))
      .catch((error) => {
        loading.textContent = error;
        setTimeout(() => {
          loading.style.display = "none";
        }, 1000);
        console.error("Error fetching data:", error);
      });
  };

  const displayResult = (data) => {
    loading.style.display = "none";
    container.innerHTML = "";

    const resultBox = document.createElement("div");
    resultBox.className = "hashtag-box";

    const spanEle = document.createElement("span");
    spanEle.className = "hashtag";
    spanEle.textContent = data.result.first;
    resultBox.appendChild(spanEle);

    const spanEle1 = document.createElement("span");
    spanEle1.className = "hashtag";
    spanEle1.textContent = data.result.second;
    resultBox.appendChild(spanEle1);

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", () => {
      copyToClipboard(data.result.second, copyButton);
    });
    resultBox.appendChild(copyButton);
    container.appendChild(resultBox);
  };

  const copyToClipboard = (text, button) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    // Change button text and color
    button.innerHTML = "copied";
    button.classList.add("copied");

    setTimeout(function () {
      button.innerHTML = "copy";
      button.classList.remove("copied");
    }, 1500);
  };
});
