const baseUrl =
  "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

fetch(`${baseUrl}/mountains.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "";
    data.forEach((item, index) => {
      htmlData += `
      <div class="mountain">
        <h2>
          <a
            href="${item.link}"
            target="_blank"
            >${item.name}</a
          >
        </h2>
        <p>Height: <b>${item.height}</b></p>
        <p>${item.note}</p>
      </div>
      `;
    });
    document.getElementById("mountain-list").innerHTML = htmlData;
  });
});
