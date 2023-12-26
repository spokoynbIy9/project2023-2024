const bid = document.querySelector('.bid');
const bid_types = ["active", "history"]
const urls = { "active": `http://localhost:5294/api/Order/Active?id=${localStorage.getItem("client_id")}`, "history": `http://localhost:5294/api/Order/History?id=${localStorage.getItem("client_id")}` }
const btn_exit = document.querySelector('.btn-exit');
const fio = document.querySelector('.user_fio').textContent = `${localStorage.getItem("name")} ${localStorage.getItem("surName")} ${localStorage.getItem("secondName")}`;
const modalForm = document.querySelector('.modalForm');
const prompt = document.querySelector('.prompt');
const burger_btn = document.querySelector('.burger-menu__btn');
const menu = document.querySelector('.menu');


burger_btn.addEventListener('click', e => {
    if (menu.style.display == "") {
        menu.style.display = "flex";
    }
    else {
        menu.style.display = "";
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

function clearInputs() {
    const list_inputs = Array.from(document.querySelectorAll('.form__input'));
    list_inputs.push(document.querySelector('#comment'));
    list_inputs.forEach(element => {
        element.value = null;
    });
    document.querySelector("#routine-work").value = "value0";
}
function handleClick(event) {
    const bid_li = document.querySelector('.' + event.currentTarget.className);
    bid_types.forEach(element => {
        switch (element) {
            case "active":
                if (bid_li.className == element) {
                    renderBid(bid_li.className, event, urls[element])
                }
                break;
            case "history":
                if (bid_li.className == element) {
                    renderBid(bid_li.className, event, urls[element])
                }
                break;
        }
    })

}

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
            const bid_view = document.querySelector('.container-bid-prompt');
            bid_list.classList.add('bid_list');
            bid_view.append(bid_list);
            data.forEach((element, index) => {
                let flag_work = 0;
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
                                    if (element[key] !== "Другое") {
                                        flag_work = 1;
                                    }
                                    bid_body.append(div);
                                    div.append(pName);
                                    div.append(pInfo);
                                    break;
                            }
                        });

                        bid_element.append(bid_body);
                        if (url.includes("History") && flag_work == 1) {
                            const repeat_btn = document.createElement('btn');
                            repeat_btn.classList.add("repeat-btn")
                            repeat_btn.innerHTML = `
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3V5C6.69419 5 4 7.69419 4 11C4 14.3058 6.69419 17 10 17C13.3058 17 16 14.3058 16 11C16 9.68663 15.5702 8.47277 14.8503 7.48307L13.8997 8.43359C14.3836 9.16925 14.6667 10.05 14.6667 11C14.6667 13.5852 12.5852 15.6667 10 15.6667C7.41477 15.6667 5.33333 13.5852 5.33333 11C5.33333 8.41477 7.41477 6.33333 10 6.33333V8.33333L13.3333 5.66667L10 3Z" fill="white"/>
                            </svg>
        
                            `
                            bid_body.append(repeat_btn);
                            repeat_btn.addEventListener("click", () => {
                                const isRepeat = confirm("Вы действительно хотите заменить поля вашей будущей заявки содержимым этой заявки?");
                                if (isRepeat) {
                                    showEditedBidModal(element);
                                }
                            });
                        }
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




bid.addEventListener('click', event => {
    const prompt_list = document.querySelector('.prompt_list');
    if (prompt_list !== null) {
        prompt_list.remove();
    }
    if (event.target == bid) {
        if (!document.querySelector('.bid_ul')) {
            const bid_ul = document.createElement('ul');
            bid_ul.classList.add('bid_ul');
            bid.parentNode.insertBefore(bid_ul, bid.nextSibling);
            bid_types.forEach(element => {
                const bid_li = document.createElement('li');
                bid_li.classList.add(element)
                switch (element) {
                    case "active":
                        bid_li.textContent = "Активные";
                        bid_li.addEventListener('click', handleClick.bind(event));
                        break;
                    case "history":
                        bid_li.textContent = "История";
                        bid_li.addEventListener('click', handleClick.bind(event))
                        break;
                }
                bid_ul.append(bid_li);
            })
        }
        else {
            const bid_ul = document.querySelector('.bid_ul');
            bid_ul.remove();
            const bid_list = document.querySelector('.bid_list');
            bid_list.remove();
        }
    }

})

function showEditedBidModal(element) {
    const modalBackground = document.querySelector('.modalBackground');
    if (modalBackground.style.display == '') {
        modalBackground.style.display = 'grid';
        document.querySelector('body').style.overflow = 'hidden';

    }
    Object.keys(element).forEach(key => {

        switch (key) {
            case "vin":
                document.getElementById('vin-code').value = element[key];
                break;
            case "stateNumber":
                document.getElementById('gos-number').value = element[key];
                break;

            case "work":
                document.querySelector("#routine-work").options[document.querySelector("#routine-work").selectedIndex].innerText = element[key];
                break;
            case "mileAge":
                document.getElementById('mileAge').value = element[key];
                break;
        }
    });
    modalBackground.addEventListener('click', (event) => {
        if (event.target == modalBackground) {
            modalBackground.style.display = '';
            document.querySelector('body').style.overflow = 'visible';
        }
    })
    modalForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await fetch(`http://localhost:5294/api/Order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "Client_id": localStorage.getItem("client_id"),
                    "Vin": document.querySelector('#vin-code').value,
                    "StateNumber": document.querySelector('#gos-number').value,
                    "MileAge": document.querySelector('#mileAge').value,
                    "Description": document.querySelector('#comment').value,
                    "Work": document.querySelector("#routine-work").options[document.querySelector("#routine-work").selectedIndex].innerText
                }
            )

        })
        modalBackground.style.display = '';
        document.querySelector('body').style.overflow = 'visible';
        if (document.querySelector("#routine-work").options[document.querySelector("#routine-work").selectedIndex].innerText != "Другое") {
            setTimeout(function () {
                location.reload()
            }, 5000)
        }
    });

}
const make_bid = document.querySelector('.registration');
function showBidModal() {
    const modalBackground = document.querySelector('.modalBackground');
    if (modalBackground.style.display == '') {
        modalBackground.style.display = 'grid';
        document.querySelector('body').style.overflow = 'hidden';
    }
    modalBackground.addEventListener('click', (event) => {
        if (event.target == modalBackground) {
            modalBackground.style.display = '';
            document.querySelector('body').style.overflow = 'visible';
        }
    })
    modalForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await fetch(`http://localhost:5294/api/Order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "Client_id": localStorage.getItem("client_id"),
                    "Vin": document.querySelector('#vin-code').value,
                    "StateNumber": document.querySelector('#gos-number').value,
                    "MileAge": document.querySelector('#mileAge').value,
                    "Description": document.querySelector('#comment').value,
                    "Work": document.querySelector("#routine-work").options[document.querySelector("#routine-work").selectedIndex].innerText
                }
            )

        })
        modalBackground.style.display = '';
        document.querySelector('body').style.overflow = 'visible';
        if (document.querySelector("#routine-work").options[document.querySelector("#routine-work").selectedIndex].innerText != "Другое") {
            setTimeout(function () {
                location.reload()
            }, 5000)
        }
    });
    clearInputs();

}
make_bid.addEventListener('click', () => {
    showBidModal();
})


prompt.addEventListener('click', event => {

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
        const prompt_view = document.querySelector('.container-bid-prompt');
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

btn_exit.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = "index.html";
});