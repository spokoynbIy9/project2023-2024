const bid = document.querySelector('.bid');
const bid_types = ["active", "history"];
const urls = { "active": "http://localhost:3000/todos", "history": `http://localhost:5294/api/Order/History?id=${localStorage.getItem("id")}` };
const btn_exit = document.querySelector('.exit_btn');
async function render(bid_class, event, url) {

    const bid_li = document.querySelector(`.${bid_class}`);
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

    if (event.target === bid_li) {
        if (!document.querySelector(`.bid_list`)) {

            const bid_list = document.createElement('ul');
            const bid_view = document.querySelector('.container-bid-view');
            bid_list.classList.add('bid_list');
            bid_view.append(bid_list);
            data.forEach((element) => {
                const bid_element = document.createElement('li');
                const bid_header = document.createElement('div');
                bid_header.classList.add("bid_header");
                bid_element.classList.add('bid_li');
                bid_element.id = element.id;
                bid_header.textContent = `Заявка № ${element.id}`;
                bid_list.append(bid_element);
                bid_element.append(bid_header); // Добавляем header заявке
                bid_header.addEventListener("click", () => {
                    if (document.querySelector(".bid_body")) {
                        const bid_body = document.querySelector(".bid_body");
                        bid_body.remove();
                    }
                    else {
                        const bid_body = document.createElement('div');
                        bid_body.classList.add("bid_body"); // Добавляем body заявке
                        Object.keys(element).forEach(key => { //Здесь можно добавить название p, обернув p в div и добавив ещё одну p
                            if (key != "id") {
                                const p = document.createElement('p');
                                p.classList.add(key);
                                p.textContent = element[key];
                                bid_body.append(p);
                            }

                        });
                        bid_element.append(bid_body);
                    }
                });

            });


        }
        else {
            const bid_list = document.querySelector('.bid_list');
            bid_list.remove();
            render(bid_li.className, event, url);
        }
    }




}

function handleClick(event) {

    const bid_li = document.querySelector(`.` + event.currentTarget.className);
    bid_types.forEach(element => {
        switch (element) {
            case "active":
                if (bid_li.className == element) {
                    render(bid_li.className, event, urls[element]);
                }
                break;
            case "history":
                if (bid_li.className == element) {
                    render(bid_li.className, event, urls[element]);
                }
                break;
        }
    });

}

btn_exit.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = "index.html";
});

bid.addEventListener('click', (event) => {
    if (event.target == bid) {
        if (!document.querySelector(`.bid_ul`)) {
            const bid_ul = document.createElement('ul');
            bid_ul.classList.add(`bid_ul`);
            bid.parentNode.insertBefore(bid_ul, bid.nextSibling);
            bid_types.forEach(element => {
                const bid_li = document.createElement('li');
                bid_li.classList.add(element);
                switch (element) {
                    case "active":
                        bid_li.textContent = "Активные";
                        bid_li.addEventListener('click', handleClick.bind(event));
                        break;
                    case "history":
                        bid_li.textContent = "История";
                        bid_li.addEventListener('click', handleClick.bind(event));
                        break;
                }
                bid_ul.append(bid_li);
            });
        }
        else {
            const bid_ul = document.querySelector('.bid_ul');
            bid_ul.remove();
            const bid_list = document.querySelector('.bid_list');
            bid_list.remove();
        }
    }

})