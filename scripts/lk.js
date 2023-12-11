const bid = document.querySelector('.bid');
const bid_types = ["active", "history"];
const prompt = document.querySelector('.prompt');
const urls = { "active": `http://localhost:5294/api/Order/Active?id=${localStorage.getItem("client_id")}`, "history": `http://localhost:5294/api/Order/History?id=${localStorage.getItem("client_id")}` };
const btn_exit = document.querySelector('.exit_btn');
const buttons_lk = document.querySelector('.buttons_lk');
const burger_menu = document.querySelector('.burger-menu');
const container_bid_view = document.querySelector('.container-bid-view');
const container_prompt_view = document.querySelector('.container-prompt-view');
if (getComputedStyle(burger_menu).display == 'block') {
    buttons_lk.style.justifyContent = 'space-between';
}
else {
    buttons_lk.style.justifyContent = 'flex-end';
}
function toggleMenu() {
    const containerBid = document.querySelector('.container-bid');
    containerBid.style.display = (containerBid.style.display === 'flex') ? 'none' : 'flex';
}
burger_menu.addEventListener('click', () => {
    toggleMenu();
})
const fio = document.querySelector('.fio_lk').textContent = `${localStorage.getItem("name")} ${localStorage.getItem("surName")} ${localStorage.getItem("secondName")}`;
async function renderBid(bid_class, event, url) {
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
            data.forEach((element, index) => {
                const bid_element = document.createElement('li');
                const bid_header = document.createElement('div');
                bid_header.classList.add("bid_header");
                bid_element.classList.add('bid_li');
                bid_element.id = index + 1;
                bid_header.textContent = `Заявка № ${index + 1}`;
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
                            const div = document.createElement('div');
                            const pName = document.createElement('p');
                            const pInfo = document.createElement('p');
                            switch (key) {
                                case "id":
                                    break;
                                case "description":
                                    div.classList.add(key);
                                    pName.classList.add(`${key}_name`);
                                    pInfo.classList.add(`${key}_info`);
                                    pName.textContent = "Комментарии";
                                    pInfo.textContent = element[key];
                                    bid_body.append(div);
                                    div.append(pName);
                                    div.append(pInfo);
                                    break;
                                case "vin":
                                    div.classList.add(key);
                                    pName.classList.add(`${key}_name`);
                                    pInfo.classList.add(`${key}_info`);
                                    pName.textContent = "vin-код";
                                    pInfo.textContent = element[key];
                                    bid_body.append(div);
                                    div.append(pName);
                                    div.append(pInfo);
                                    break;
                                case "stateNumber":
                                    div.classList.add(key);
                                    pName.classList.add(`${key}_name`);
                                    pInfo.classList.add(`${key}_info`);
                                    pName.textContent = "Гос-номер";
                                    pInfo.textContent = element[key];
                                    bid_body.append(div);
                                    div.append(pName);
                                    div.append(pInfo);
                                    break;
                                case "mileAge":
                                    div.classList.add(key);
                                    pName.classList.add(`${key}_name`);
                                    pInfo.classList.add(`${key}_info`);
                                    pName.textContent = "Пробег";
                                    pInfo.textContent = element[key];
                                    bid_body.append(div);
                                    div.append(pName);
                                    div.append(pInfo);
                                    break;
                                case "work":
                                    div.classList.add(key);
                                    pName.classList.add(`${key}_name`)
                                    pInfo.classList.add(`${key}_info`);
                                    pName.textContent = "Регламетные Работы";
                                    pInfo.textContent = element[key];
                                    bid_body.append(div);
                                    div.append(pName);
                                    div.append(pInfo);
                                    break;
                            }

                            // if (key != "id") {
                            //     const div = document.createElement('div');
                            //     const pName = document.createElement('p');
                            //     const pInfo = document.createElement('p');
                            //     div.classList.add(key)
                            //     pName.classList.add(`${key}_name`);
                            //     pInfo.classList.add(`${key}_info`);
                            //     pName.textContent = key;
                            //     pInfo.textContent = element[key];
                            //     bid_body.append(div);
                            //     div.append(pName);
                            //     div.append(pInfo);
                            // }

                        });
                        bid_element.append(bid_body);

                    }
                });

            });


        }
        else {
            const bid_list = document.querySelector('.bid_list');
            bid_list.remove();
            renderBid(bid_li.className, event, url);
        }
    }
}


function handleClick(event) {

    const bid_li = document.querySelector(`.` + event.currentTarget.className);
    bid_types.forEach(element => {
        switch (element) {
            case "active":
                if (bid_li.className == element) {

                    renderBid(bid_li.className, event, urls[element]);
                }
                break;
            case "history":
                if (bid_li.className == element) {
                    renderBid(bid_li.className, event, urls[element]);
                }
                break;
        }
    });

}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

btn_exit.addEventListener('click', () => {
    localStorage.clear();
    // deleteCookie("saveLength");
    window.location.href = "index.html";
});

bid.addEventListener('click', (event) => {
    container_bid_view.style.margin = `0 auto`;
    container_prompt_view.style.margin = 0;
    const prompt_list = document.querySelector('.prompt_list');
    if (prompt_list !== null) {
        prompt_list.remove();
    }
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



if (localStorage.getItem("toNotify")) {
    const circle_number = document.createElement('div');
    const text_with_circle = document.createElement('p');
    circle_number.classList.add('circle-number');
    text_with_circle.classList.add('text-with-circle');

    async function getLengthData() {
        const response = await fetch(`http://localhost:5294/api/Notify?id=${localStorage.getItem("client_id")}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            return;
        }

        const data = await response.json();

        if (document.cookie === "") {
            const dataLength = data.length;
            // document.cookie = `saveLength=${dataLength}`;
            text_with_circle.textContent = dataLength;
            prompt.appendChild(circle_number);
            circle_number.append(text_with_circle)
        }
        else {
            const dataLength = data.length;
            const saveCookieLength = +document.cookie.split("=")[1].split("\"")[0];
            const diff = dataLength - saveCookieLength;
            if (diff > 0) {
                text_with_circle.textContent = diff;
                prompt.appendChild(circle_number);
                circle_number.append(text_with_circle);
                // document.cookie = `"saveLength=${dataLength}"`;
            }
            // else {
            //     document.cookie = `"saveLength=${dataLength}"`;
            // }
        }
    }
    getLengthData();

}

prompt.addEventListener('click', event => {
    container_prompt_view.style.margin = `0 auto`;
    container_bid_view.style.margin = 0;

    let dataLength;
    fetch(`http://localhost:5294/api/Notify?id=${localStorage.getItem("client_id")}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            dataLength = data.length;
            document.cookie = `saveLength=${dataLength}`;
        });
    const circle_number = document.querySelector('.circle-number');
    // document.cookie = `saveLength=${dataLength}`;
    if (circle_number !== null) {
        circle_number.remove();
    }
    const bid_list = document.querySelector('.bid_list');
    const bid_ul = document.querySelector('.bid_ul');
    if (bid_list !== null) {
        bid_list.remove();
        bid_ul.remove();
        renderNotify(event, `http://localhost:5294/api/Notify?id=${localStorage.getItem("client_id")}`)
    }

    else {
        if (bid_ul !== null) {
            bid_ul.remove();
        }
        renderNotify(event, `http://localhost:5294/api/Notify?id=${localStorage.getItem("client_id")}`)
    }
}
);

async function renderNotify(event, url) {
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
    if (!document.querySelector(`.prompt_list`)) {
        const prompt_list = document.createElement('ul');
        const prompt_view = document.querySelector('.container-prompt-view');
        prompt_list.classList.add('prompt_list');
        prompt_view.append(prompt_list);
        data.forEach((element, index) => {
            const prompt_element = document.createElement('li');
            const prompt_header = document.createElement('div');
            prompt_header.classList.add('prompt_header');
            prompt_element.classList.add('prompt_li');
            prompt_element.id = index + 1;
            prompt_header.textContent = `Напоминание № ${index + 1}`;
            prompt_list.append(prompt_element);
            prompt_element.append(prompt_header);
            prompt_header.addEventListener('click', () => {
                if (document.querySelector('.prompt_body')) {
                    const prompt_body = document.querySelector('.prompt_body');
                    prompt_body.remove();
                }
                else {
                    const prompt_body = document.createElement('div');
                    prompt_body.classList.add('prompt_body');
                    Object.keys(element).forEach(key => {
                        const div = document.createElement('div');
                        const pName = document.createElement('p');
                        const pInfo = document.createElement('p');
                        switch (key) {
                            case "dateTime":
                                div.classList.add(key);
                                pName.classList.add(`${key}_name`);
                                pInfo.classList.add(`${key}_info`);
                                pName.textContent = "Дата";
                                pInfo.textContent = element[key].split("T")[0];
                                const pName_2 = document.createElement('p');
                                const pInfo_2 = document.createElement('p');
                                pName_2.classList.add(`time_name`);
                                pInfo_2.classList.add(`time_info`);
                                pName_2.textContent = "Время"
                                pInfo_2.textContent = element[key].split("T")[1].split(".")[0];
                                prompt_body.append(div);
                                div.append(pName);
                                div.append(pInfo);
                                div.append(pName_2);
                                div.append(pInfo_2);
                                break;
                            case "work":
                                div.classList.add(key);
                                pName.classList.add(`${key}_name`);
                                pInfo.classList.add(`${key}_info`);
                                pName.textContent = "Работа";
                                pInfo.textContent = element[key];
                                prompt_body.append(div);
                                div.append(pName);
                                div.append(pInfo);
                                break;
                        }
                    });
                    prompt_element.append(prompt_body);
                }
            })
        })
    }
    else {
        const prompt_list = document.querySelector('.prompt_list');
        prompt_list.remove();
    }
}








const button_bid = document.querySelector('.btn');
function showBidModal() {
    const modal_hidden = document.querySelector('.modal-hidden');
    const modal = document.querySelector('.modal');
    const form = document.querySelector('.modal_form')
    if (modal_hidden.style.display == '') {
        modal_hidden.style.display = 'block';
        modal_hidden.style.visibility = 'visible';
        modal.style.opacity = 1;
    }
    modal_hidden.addEventListener('click', (event) => {
        if (event.target == modal_hidden) {
            modal_hidden.style.display = '';
            modal_hidden.style.visibility = 'hidden';
            modal.style.opacity = 0;
        }
    });
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await fetch(`http://localhost:5294/api/Order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "Client_id": localStorage.getItem("client_id"),
                    "Vin": document.querySelector('#vin_code').value,
                    "StateNumber": document.querySelector('#gos_number').value,
                    "MileAge": document.querySelector('#mileAge').value,
                    "Description": document.querySelector('#comment').value,
                    "work": document.querySelector("#works").options[document.querySelector("#works").selectedIndex].innerText
                }
            )

        })
        modal_hidden.style.display = '';
        modal_hidden.style.visibility = 'hidden';
        modal.style.opacity = 0;
        setTimeout(function () {
            location.reload()
        }, 61000)
    });
    document.querySelector('#gos_number').value = null;
    document.querySelector('#vin_code').value = null;
    document.querySelector('#works').value = null;
    document.querySelector('#comment').value = null;
    // setTimeout(render, 10000);

}

button_bid.addEventListener('click', () => {
    showBidModal();
});
