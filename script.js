const baseUrl =
  "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

let currencyList = [];
let rashifalList = [];

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
        document.getElementById("currency-date").innerText = item.date;
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

fetch(`${baseUrl}/topPeaks.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "";
    data.forEach((item, index) => {
      if (index < 3) {
        htmlData += `
        <div class="mountain shake">
          <img src="${item.img}" alt="Top Mountains" class="peak-img">
          <h2>
          <a>${item.peak}</a> <small>(${item.elevation.toLowerCase()})</small>
          </h2>
        </div>
        `;
      }
    });
    document.getElementById("mountain-list").innerHTML = htmlData;
  });
});

fetch(`${baseUrl}/lakes.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "";
    data.forEach((item, index) => {
      if (index <= 4) {
        htmlData += `
      <div class="lake">
        <h3>
        <a> ${++index}. ${item.name}</a>
        </h3>
      </div>
      `;
      }
    });
    document.getElementById("lake-list").innerHTML = htmlData;
  });
});

fetch(`${baseUrl}/events.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "<h2>Upcoming Events</h2>";
    data.forEach((item, index) => {
      htmlData += `
      <div class="event-card">
            <img src="${item.img}" alt="${item.name}" class="event-image" />
            <div class="event-info">
              <h3>${item.name}</h3>
              <p>${item.date}</p>
            </div>
            <div class="event-meta">${item.status}</div>
          </div>
      `;
    });
    document.getElementById("upcoming-events").innerHTML = htmlData;
  });
});

fetch(`${baseUrl}/earthquakes.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "";
    data.forEach((item, index) => {
      if (index == 0) {
        htmlData = `
        <p class="earthquake-info"><strong>📅 DateTime:</strong> ${item.date} ${item.time}</p>
              <p class="earthquake-info"><strong>🌡 Magnitude:</strong> <span class="magnitude"> ${item.magnitude}</span></p>
              <p class="earthquake-info"><strong>📍 Epicenter:</strong> ${item.epicenter}</p>
              <p class="earthquake-info"><strong>📌 Location:</strong> ${item.lat}, ${item.long}</p>`;
      }
    });
    document.getElementById("earthquake-list").innerHTML = htmlData;
  });
});


fetch(`${baseUrl}/rashifal.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    rashifalList = data;

    let htmlData = "";

    data.forEach((item, index) => {
      if (index == 0) {
        htmlData += `
      <option value='${item.name}' selected>${item.name}</option>`;
        document.getElementById("rashifal-desc").innerText = item.rashifal;
        document.getElementById("rashifal-date").innerText = item.last_updated;
      } else {
        htmlData += `
        <option value='${item.name}'>${item.name}</option>`;
      }
    });
    document.getElementById("rashifal").innerHTML = htmlData;
  });
});

const changeRashifalSelector = (item) => {
  const rashifal = rashifalList.find((rashi) => {
    return rashi.name == item.value;
  });
  document.getElementById("rashifal-desc").innerText = rashifal.rashifal;
};


const speak = (ele) => {
  const utterance = new SpeechSynthesisUtterance(ele.innerText);
  utterance.lang = "hi-IN";
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[0];
  speechSynthesis.speak(utterance);
};