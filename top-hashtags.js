const baseUrl = "https://jeevenlamichhane.com.np/api";

document.addEventListener("DOMContentLoaded", () => {
  const keywordInput = document.getElementById("keyword");
  const searchButton = document.getElementById("searchButton");
  const hashtagsContainer = document.getElementById("hashtags");
  const loading = document.getElementById("loading");

  searchButton.addEventListener("click", () => {
    const keyword = keywordInput.value.trim();
    if (keyword.length > 0) {
      loading.textContent = "fetching hashtags.";
      setInterval(() => {
        loading.textContent = loading.textContent + ".";
      }, 900);
      loading.style.display = "block";
      hashtagsContainer.innerHTML = "";
      fetchHashtags(keyword);
    } else {
      hashtagsContainer.innerHTML = "";
    }
  });

  const fetchHashtags = (keyword) => {
    fetch(`${baseUrl}/get-hashtags?keyword=${keyword}`)
      .then((response) => response.json())
      .then((data) => displayHashtags(data))
      .catch((error) => {
        loading.textContent = error;
        setTimeout(() => {
          loading.style.display = "none";
        }, 1000);
        console.error("Error fetching hashtags:", error);
      });
  };

  const displayHashtags = (hashtags) => {
    loading.style.display = "none";
    hashtagsContainer.innerHTML = "";
    hashtags.forEach((hashtagGroup) => {
      const hashtagBox = document.createElement("div");
      hashtagBox.className = "hashtag-box";

      const hashtagsArray = hashtagGroup.split(",");
      const hashtagsText = hashtagsArray
        .map((hashtag) => hashtag.trim())
        .join(" ");

      hashtagsArray.forEach((hashtag) => {
        const hashtagElement = document.createElement("span");
        hashtagElement.className = "hashtag";
        hashtagElement.textContent = hashtag.trim();
        hashtagBox.appendChild(hashtagElement);
      });

      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";
      copyButton.textContent = "Copy";
      copyButton.addEventListener("click", () => {
        copyToClipboard(hashtagsText, copyButton);
      });

      hashtagBox.appendChild(copyButton);
      hashtagsContainer.appendChild(hashtagBox);
    });
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
      // Reset button text and color after a delay (1.5 seconds in this example)
      button.innerHTML = "copy";
      button.classList.remove("copied");
    }, 1500);
  };
});
