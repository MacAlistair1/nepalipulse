const baseUrl =
  "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

fetch(`${baseUrl}/peaks.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    
    let htmlData = "";
    data.forEach((item, index) => {

      let statusColor = item.status == "Opened" ? 'green' : 'red';

      htmlData += `
      <div class="mountain">
        <h2>
          <a
            href="#"
            >${item.peak}</a> <small>(${item.elevation}m)</small>
        </h2>
        <p>Mountain Range: <b>${item.range}</b></p>

        <p>Status: <b style="color:${statusColor};">${item.status}</b></p>
      </div>
      `;
    });
    document.getElementById("mountain-list").innerHTML = htmlData;
  });
});
