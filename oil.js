const baseUrl =
  "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

const oilPrice = { Petrol: 0, Diesel: 0, Kerosene: 0 };

fetch(`${baseUrl}/oil.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    document.getElementById("oil-effective-date").innerText = data[0].date;
    document.getElementById("petrol").innerText =
      "Rs. " + data[0].petrol + "/L";
    oilPrice.Petrol = parseFloat(data[0].petrol);
    document.getElementById("diesel").innerText =
      "Rs. " + data[0].diesel + "/L";
    oilPrice.Diesel = parseFloat(data[0].diesel);
    document.getElementById("kerosene").innerText =
      "Rs. " + data[0].kerosene + "/L";
    oilPrice.Kerosene = parseFloat(data[0].kerosene);
    document.getElementById("lpg").innerText = "Rs. " + data[0].lpg + "/CYL";
  });
});

const oilTypeChange = (item) => {
  const totalAmount = document.getElementById("totalAmount");
  const totalLitres = document.getElementById("totalLitres");
  const oilRate = oilPrice[item.value];

  totalLitres.value = 1;
  totalAmount.value = oilRate;
};

const changeInAmount = () => {
  const oilType = document.getElementById("oilType");
  const totalAmount = document.getElementById("totalAmount");
  const totalLitres = document.getElementById("totalLitres");
  const oilRate = oilPrice[oilType.value];

  if (totalAmount.value > 0) {
    totalLitres.value = (totalAmount.value / oilRate).toFixed(2);
  }else{
    totalLitres.value = 0;
  }
};

const changeInLitre = () => {
  const oilType = document.getElementById("oilType");
  const totalAmount = document.getElementById("totalAmount");
  const totalLitres = document.getElementById("totalLitres");
  const oilRate = oilPrice[oilType.value];

  if (totalLitres.value > 0) {
    totalAmount.value = (totalLitres.value * oilRate).toFixed(2);
  }else{
    totalAmount.value = 0;
  }
};
