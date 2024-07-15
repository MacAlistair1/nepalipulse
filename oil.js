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
