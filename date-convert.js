const baseUrl = "https://jeevenlamichhane.com.np/api";

const calendarType = document.getElementById("calendarType");
const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");
const dateInput = document.getElementById("date");
const convertButton = document.getElementById("convertButton");
const container = document.getElementById("data");
const loading = document.getElementById("loading");

const startDateInput = document.getElementById("fromDate");
const endDateInput = document.getElementById("toDate");
const countedData = document.getElementById("counted-data");
const daysCount = document.getElementById("days");
const daysCountLabel = document.getElementById("daysLabel");

let yearOptions = "";
let monthOptions = "";
let dateOptions = "";

const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1;
let currentDay = currentDate.getDate();

const calTypeChange = (el) => {
  yearOptions = "";
  monthOptions = "";
  dateOptions = "";
  if (el.value == "BS") {
    engYear.forEach((item) => {
      if (item == currentYear) {
        yearOptions += `<option value="${item}" selected>${item}</option>`;
      } else {
        yearOptions += `<option value="${item}">${item}</option>`;
      }
    });

    engMonth.forEach((item) => {
      if (item == currentMonth) {
        monthOptions += `<option value="${item}" selected>${item}</option>`;
      } else {
        monthOptions += `<option value="${item}">${item}</option>`;
      }
    });

    engDay.forEach((item) => {
      if (item == currentDay) {
        dateOptions += `<option value="${item}" selected>${item}</option>`;
      } else {
        dateOptions += `<option value="${item}">${item}</option>`;
      }
    });
  } else {
    nepYear.forEach((item) => {
      yearOptions += `<option value="${Object.values(item)[0]}">${
        Object.keys(item)[0]
      }</option>`;
    });

    nepMonth.forEach((item) => {
      monthOptions += `<option value="${Object.values(item)[0]}">${
        Object.keys(item)[0]
      }</option>`;
    });

    nepDay.forEach((item) => {
      dateOptions += `<option value="${Object.values(item)[0]}">${
        Object.keys(item)[0]
      }</option>`;
    });
  }

  yearInput.innerHTML = yearOptions;
  monthInput.innerHTML = monthOptions;
  dateInput.innerHTML = dateOptions;
};

document.addEventListener("DOMContentLoaded", () => {
  if (calendarType.value == "BS") {
    engYear.forEach((item) => {
      if (item == currentYear) {
        yearOptions += `<option value="${item}" selected>${item}</option>`;
      } else {
        yearOptions += `<option value="${item}">${item}</option>`;
      }
    });

    engMonth.forEach((item) => {
      if (item == currentMonth) {
        monthOptions += `<option value="${item}" selected>${item}</option>`;
      } else {
        monthOptions += `<option value="${item}">${item}</option>`;
      }
    });

    engDay.forEach((item) => {
      if (item == currentDay) {
        dateOptions += `<option value="${item}" selected>${item}</option>`;
      } else {
        dateOptions += `<option value="${item}">${item}</option>`;
      }
    });

    yearInput.innerHTML = yearOptions;
    monthInput.innerHTML = monthOptions;
    dateInput.innerHTML = dateOptions;
  }

  setTimeout(() => {
    convertButton.click();
  }, 2000);

  convertButton.addEventListener("click", () => {
    const date = dateInput.value.trim();
    if (date.length > 0) {
      loading.textContent = "converting date.";
      setInterval(() => {
        loading.textContent += ".";
      }, 900);
      loading.style.display = "block";
      container.innerHTML = "";
      convertDate(
        yearInput.value,
        monthInput.value,
        dateInput.value,
        calendarType.value
      );
    } else {
      container.innerHTML = "";
    }
  });

  const convertDate = (year, month, date, calType) => {
    const fullDate = `${year}-${month}-${date}`;
    const dateType = calType == "AD" ? "AD" : "";

    fetch(`${baseUrl}/convert-date?date=${fullDate}&dateType=${dateType}`)
      .then((response) => response.json())
      .then((data) => displayResult(data))
      .catch((error) => {
        loading.textContent = error;
        setTimeout(() => {
          loading.style.display = "none";
        }, 1000);
        console.error("Error fetching data:", error);
      });
  };

  const displayResult = (data) => {
    loading.style.display = "none";
    container.innerHTML = "";

    const resultBox = document.createElement("div");
    resultBox.className = "hashtag-box";

    const spanEle = document.createElement("span");
    spanEle.className = "hashtag";
    spanEle.textContent = data.result.first;
    resultBox.appendChild(spanEle);

    const spanEle1 = document.createElement("span");
    spanEle1.className = "hashtag";
    spanEle1.textContent = data.result.second;
    resultBox.appendChild(spanEle1);

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", () => {
      copyToClipboard(data.result.second, copyButton);
    });
    resultBox.appendChild(copyButton);
    container.appendChild(resultBox);
  };

  const copyToClipboard = (text, button) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    // Change button text and color
    button.innerHTML = "copied";
    button.classList.add("copied");

    setTimeout(function () {
      button.innerHTML = "copy";
      button.classList.remove("copied");
    }, 1500);
  };

  const startOfYear = new Date(
    currentYear,
    currentDate.getMonth(),
    currentDay + 1
  );
  const endOfYear = new Date(
    currentYear + 1,
    currentDate.getMonth(),
    currentDay + 1
  );

  startDateInput.value = startOfYear.toISOString().split("T")[0];
  endDateInput.value = endOfYear.toISOString().split("T")[0];
});

const counterTypeChange = (el) => {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const countingParameter = el.value;

  if (startDate && endDate && countingParameter) {
    let count = 0;
    let currentDate = new Date(startDate);

    // Determine the direction of the loop based on the date order
    const step = new Date(startDate) <= new Date(endDate) ? 1 : -1;

    while (
      (step > 0 && currentDate <= new Date(endDate)) ||
      (step < 0 && currentDate >= new Date(endDate))
    ) {
      if (
        countingParameter === "*" ||
        currentDate.toLocaleString("en-US", { weekday: "long" }) ===
          countingParameter
      ) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + step);
    }

    countedData.style.display = "block";
    daysCount.innerHTML = count;
    daysCountLabel.innerHTML =
      countingParameter === "*"
        ? "Days in Total"
        : `${countingParameter}s in Total`;
  }
};
