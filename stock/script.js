async function fetchStock() {
    const symbol = document.getElementById('symbolInput').value.toUpperCase();
    const apiKey = 'YOUR_API_KEY';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const timeSeries = data['Time Series (Daily)'];
    
    if (!timeSeries) {
        document.getElementById('stockInfo').innerHTML = '<p>Invalid symbol or API limit reached.</p>';
        return;
    }

    const dates = Object.keys(timeSeries);
    const latest = timeSeries[dates[0]];
    const previous = timeSeries[dates[1]];

    const currentPrice = parseFloat(latest['4. close']);
    const prevClose = parseFloat(previous['4. close']);
    const change = currentPrice - prevClose;
    const percentChange = ((change / prevClose) * 100).toFixed(2);

    document.getElementById('stockInfo').innerHTML = `
        <h3>${symbol}</h3>
        <p>Current Price: $${currentPrice.toFixed(2)}</p>
        <p>Previous Close: $${prevClose.toFixed(2)}</p>
        <p>Change: $${change.toFixed(2)} (${percentChange}%)</p>
    `;
}
