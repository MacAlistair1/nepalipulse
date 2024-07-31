const url =
  "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

fetch(`${url}/patro.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    document.getElementById("day").textContent = data.date;
    document.getElementById("day-text").textContent = data.day;
    document.getElementById(
      "nepali-date"
    ).innerHTML = `${data.yearMonth}<br />${data.sambat}<br />`;
    document.getElementById(
      "todaysEvents"
    ).innerHTML = `${data.tithi}<br />${data.event}`;
    document.getElementById("sunrise").innerText = data.sunrise;
    document.getElementById("sunset").innerText = data.sunset;
  });
});
