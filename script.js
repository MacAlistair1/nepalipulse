const baseUrl =
  "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

fetch(`${baseUrl}/oil.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    document.getElementById("oil-effective-date").innerText = data[0].date;
    document.getElementById("petrol").innerText =
      "Rs. " + data[0].petrol + "/L";
    document.getElementById("diesel").innerText =
      "Rs. " + data[0].diesel + "/L";
    document.getElementById("kerosene").innerText =
      "Rs. " + data[0].kerosene + "/L";
    document.getElementById("lpg").innerText = "Rs. " + data[0].lpg + "/CYL";
  });
});

fetch(`${baseUrl}/gold.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    document.getElementById("gold-effective-date").innerText =
      "Last Updated: " + data[0].time;
    document.getElementById("gold").innerText = "Rs. " + data[0].price;
  });
});

fetch(`${baseUrl}/silver.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    document.getElementById("silver-effective-date").innerText =
      "Last Updated: " + data.time;
    document.getElementById("silver").innerText = "Rs. " + data.perTolaPrice;
  });
});

fetch(`${baseUrl}/bank_rate.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "";
    data.forEach((item, index) => {
      if (index < 10) {
        htmlData += `<tr>
            <td>${item.bank}</td>
            <td>${item.saving}</td>
            <td>${item.fixed}</td>
            </tr>`;
      }
    });
    document.getElementById("bank-rate-list").innerHTML = htmlData;
  });
});
