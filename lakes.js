const baseUrl =
  "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

fetch(`${baseUrl}/lakes.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "";
    data.forEach((item, index) => {
      htmlData += `
      <div class="lake">
        <h3>
          <a
            href="${item.link}"
            target="_blank"
            >${++index}. ${item.name}</a
          >
        </h3>
      </div>
      `;
    });
    document.getElementById("lake-list").innerHTML = htmlData;
  });
});
