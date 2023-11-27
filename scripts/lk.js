const bid = document.querySelector('.bid');
const bid_types = ["active", "history"];
const urls = { "active": `http://localhost:5294/api/Order/Active?id=${localStorage.getItem("client_id")}`, "history": `http://localhost:5294/api/Order/History?id=${localStorage.getItem("client_id")}` };
const btn_exit = document.querySelector('.exit_btn');
const fio = document.querySelector('.fio_lk').textContent = `${localStorage.getItem("name")} ${localStorage.getItem("surName")} ${localStorage.getItem("secondName")}`;
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
                    "Description": document.querySelector('#comment').value
                }
            )

        })

        modal_hidden.style.display = '';
        modal_hidden.style.visibility = 'hidden';
        modal.style.opacity = 0;
        location.reload();
    });
    document.querySelector("#fio").value = null;
    document.querySelector('#phone').value = null;
    document.querySelector('#email').value = null;
    document.querySelector('#gos_number').value = null;
    document.querySelector('#vin_code').value = null;
    document.querySelector('#works').value = null;
    document.querySelector('#comment').value = null;
}

button_bid.addEventListener('click', () => {
    showBidModal();
});
