document.getElementById("search-btn").onclick = () => {
  const start = document.getElementById("start-date").value;
  const end = document.getElementById("end-date").value;
  const currency = document.getElementById("currency").value;

  url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${start}&end=${end}`;

  axios
    .get(url)
    .then(response => {
      const quotes = response.data.bpi;
      const dates = Object.keys(quotes);
      const prices = Object.values(quotes);
      console.log(dates, prices);

      const ctx = document.getElementById("chart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Bitcoin Price",
              data: prices,
              backgroundColor: "rgba(255, 99, 132, 0.2)"
            }
          ]
        }
      });
      const max = Math.max(...prices);
      const min = Math.min(...prices);
      document.getElementById("max").innerText = max;
      document.getElementById("min").innerText = min;
    })
    .catch(err => console.log(err));
};
