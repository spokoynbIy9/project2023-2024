async function getData(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        return;
    }
    const data = await response.json();
    console.log(data);
}

getData('http://localhost:5294/api/Order/History?id=2');
