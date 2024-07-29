const baseUrl =
  "https://raw.githubusercontent.com/MacAlistair1/scrap-data/main";

fetch(`${baseUrl}/top_music_video.json`).then((response) => {
  const rawData = response.json();
  rawData.then((data) => {
    let htmlData = "";
    data.forEach((item, index) => {
      htmlData += `
      <div class="music-item">
        <img src="https://i3.ytimg.com/vi/${item.videoId}/hqdefault.jpg" alt="${
        item.title
      }" />
        <div class="music-info">
          <h3 title="${item.title}">${item.title}</h3>
          <p>${formatNumber(item.views)} views</p>
          <button onclick="window.location.href='http://www.youtube.com/watch?v=${
            item.videoId
          }'">Watch Video</button>
        </div>
      </div>
      `;

      if (index == 0) {
        document.getElementById("last-updated").innerHTML = timestampToDate(
          item.lastUpdate
        );
      }
    });
    document.getElementById("music-list").innerHTML = htmlData;
  });
});

const formatNumber = (value) => {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + "B +";
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + "M +";
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + "K +";
  } else {
    return value + " +";
  }
};

const timestampToDate = (timestamp) => {
  let date = new Date(timestamp);
  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );
};
