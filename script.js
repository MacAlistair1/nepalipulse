const baseUrl =
  "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

let currencyList = [];

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
    document.getElementById("silver").innerText = "Rs. " + data.perTolaPrice;
  });
});

fetch(`${baseUrl}/bank_rate.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "";
    data.forEach((item, index) => {
      if (index < 7) {
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

fetch(`${baseUrl}/currency.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    currencyList = data;

    let htmlData = "";

    data.forEach((item, index) => {
      if (index == 0) {
        htmlData += `
      <option value='${item.code}' selected>${item.name} (${item.code})</option>`;
        document.getElementById("buying-rate").innerText = item.buy;
        document.getElementById("selling-rate").innerText = item.sell;
      } else {
        htmlData += `
        <option value='${item.code}'>${item.name} (${item.code})</option>`;
      }
    });
    document.getElementById("currency").innerHTML = htmlData;
  });
});

const changeCurrencySelector = (item) => {
  const currency = currencyList.find((cur) => {
    return cur.code == item.value;
  });

  document.getElementById("buying-rate").innerText = currency.buy;
  document.getElementById("selling-rate").innerText = currency.sell;
};

fetch(`${baseUrl}/mountains.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "";
    data.forEach((item, index) => {
      if (index < 3) {
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
      }
    });
    document.getElementById("mountain-list").innerHTML = htmlData;
  });
});

const speak = (ele) => {
  const utterance = new SpeechSynthesisUtterance(ele.innerText);
  utterance.lang = "hi-IN";
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[0];
  speechSynthesis.speak(utterance);
};
