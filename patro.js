const url = "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

fetch(`${url}/patro.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    document.getElementById("day").innerHTML = data.date;
    document.getElementById("day-text").innerHTML = "<br/>" + data.day;
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

const clockEle = document.getElementById("time");
const dtEle = document.getElementById("dt");

const clockTick = () => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let am_PM = hours >= 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  hours = hours < 10 ? "0" + hours : hours;

  clockEle.textContent = `${hours}:${minutes}:${seconds} ${am_PM}`;

  dtEle.textContent = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })}, ${date.getFullYear()}`;
};

setInterval(() => {
  clockTick();
}, 1000);
