const baseUrl = "https://jeevenlamichhane.com.np/api";

document.addEventListener("DOMContentLoaded", () => {
  const keywordInput = document.getElementById("keyword");
  const searchButton = document.getElementById("searchButton");
  const hashtagsContainer = document.getElementById("hashtags");
  const quotesContainer = document.getElementById("quotes");
  const loading = document.getElementById("loading");

  searchButton.addEventListener("click", () => {
    const keyword = keywordInput.value.trim();
    if (keyword.length > 0) {
      loading.textContent = "fetching hashtags & quotes.";
      setInterval(() => {
        loading.textContent = loading.textContent + ".";
      }, 900);
      loading.style.display = "block";
      hashtagsContainer.innerHTML = "";
      quotesContainer.innerHTML = "";
      fetchHashtags(keyword);
      fetchQuotes(keyword);
    } else {
      hashtagsContainer.innerHTML = "";
      quotesContainer.innerHTML = "";
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

  const fetchQuotes = (keyword) => {
    fetch(`${baseUrl}/get-quotes?keyword=${keyword}`)
      .then((response) => response.json())
      .then((data) => displayQuotes(data))
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

  const displayQuotes = (quotes) => {
    
    loading.style.display = "none";
    quotesContainer.innerHTML = "";

    if (quotes.length > 0) {
      quotesContainer.innerHTML = `<hr><hr><br> <h3>Top Quotes</h3>`;
    }

    quotes.forEach((hashtagGroup) => {
      const hashtagBox = document.createElement("div");
      const hashtagElement = document.createElement("span");
      hashtagElement.className = "hashtag";
      hashtagElement.textContent = hashtagGroup;
      hashtagBox.appendChild(hashtagElement);

      const copyButton1 = document.createElement("button");
      copyButton1.className = "copy-button";
      copyButton1.textContent = "copy";
      copyButton1.addEventListener("click", () => {
        copyToClipboard(hashtagGroup, copyButton1);
      });
      hashtagBox.appendChild(copyButton1);

      quotesContainer.appendChild(hashtagBox);
      const brEl = document.createElement("br");
      quotesContainer.appendChild(brEl);
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
