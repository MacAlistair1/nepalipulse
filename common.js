const copyUrl = () => {
  const textarea = document.createElement("textarea");
  textarea.value = window.location.href;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  const copyTextEl = document.getElementById("copy-text");

  copyTextEl.innerHTML = "copied!!";

  setTimeout(function () {
    copyTextEl.innerHTML = "Share";
  }, 1500);
};
