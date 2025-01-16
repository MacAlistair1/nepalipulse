const baseUrl =
  "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

fetch(`${baseUrl}/bank_rate.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "";
    data.forEach((item, index) => {
      htmlData += `<tr>
      <td>${item.bank}</td>
      <td>${item.saving}</td>
      <td>${item.fixed}</td>
      </tr>`;
    });
    document.getElementById('bank-rate-list').innerHTML = htmlData;
  });
});