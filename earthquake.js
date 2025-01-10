const baseUrl =
  "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

fetch(`${baseUrl}/earthquakes.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "";
    data.forEach((item, index) => {
      htmlData += `
        <p class="earthquake-info"><strong>📅 DateTime:</strong> ${item.date} ${item.time}</p>
        <p class="earthquake-info"><strong>🌡 Magnitude:</strong> <span class="magnitude"> ${item.magnitude}</span></p>
        <p class="earthquake-info"><strong>📍 Epicenter:</strong> ${item.epicenter}</p>
        <p class="earthquake-info"><strong>📌 Location:</strong> <a href="https://maps.google.com/?q=${item.lat},${item.long}" target="_blank"> ${item.lat}, ${item.long}</a></p> <hr style="margin:10px;">`;
    });
    document.getElementById("earthquake-list").innerHTML = htmlData;
  });
});
