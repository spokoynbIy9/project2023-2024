const buttons_bid = document.querySelectorAll('.btn');
const personal_area = document.querySelector('.personal-area');
const btn_author = document.querySelector('.btn_register');
const stock_card_times = document.querySelectorAll('.stock-card-time');



stock_card_times.forEach(element => {
    var timerId = setInterval(function () {
        var now = new Date();
        var d = 30 - now.getDate();
        var h = 24 - now.getHours();
        var m = 60 - now.getMinutes();
        element.textContent = d + 'д : ' + h + 'ч : ' + m + "м";

        if (d == 0 && h == 0 && m == 0) {
            document.location.reload();
        }

    }, 1000);

});


// buttons_bid = Array.from(buttons_bid);
buttons_bid.forEach(element => {
    element.addEventListener('click', () => {
        showBidModal();
    });
});

personal_area.addEventListener('click', () => {
    showAuthorizationModal();
});

btn_author.addEventListener('click', () => {
    showRegistrationModal();
});

function showRegistrationModal() {
    const modal_hidden_registration = document.querySelector('.modal-hidden_registration');
    const modal_registration = document.querySelector('.modal_registration');
    const form_registration = document.querySelector('.modal_form_registration');
    const eventy = new MouseEvent("click");
    if (modal_hidden_registration.style.display == '') {
        modal_hidden_registration.style.display = 'block';
        modal_hidden_registration.style.visibility = 'visible';
        modal_registration.style.opacity = 1;
    }
    modal_hidden_registration.addEventListener('click', (event) => {
        if (event.target == modal_hidden_registration) {
            modal_hidden_registration.style.display = '';
            modal_hidden_registration.style.visibility = 'hidden';
            modal_registration.style.opacity = 0;
            personal_area.dispatchEvent(eventy);
        }
    });
    form_registration.addEventListener('submit', async (event) => {
        event.preventDefault();
        await fetch("http://localhost:5294/api/ClientReg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "password": document.querySelector("#password_reg").value,
                    "name": document.querySelector('#fio_reg').value.split(' ')[0],
                    "surname": document.querySelector('#fio_reg').value.split(' ')[1],
                    "secondName": document.querySelector('#fio_reg').value.split(' ')[2],
                    "telegram": document.querySelector('#telegram_reg').value,
                    "phone": document.querySelector('#phone_reg').value
                }
            )
        })
        modal_hidden_registration.style.display = '';
        modal_hidden_registration.style.visibility = 'hidden';
        modal_registration.style.opacity = 0;
        personal_area.dispatchEvent(eventy);

    })

    document.querySelector("#password_reg").value = null;
    document.querySelector('#fio_reg').value = null;
    document.querySelector('#fio_reg').value = null;
    document.querySelector('#fio_reg').value = null;
    document.querySelector('#telegram_reg').value = null;
    document.querySelector('#phone_reg').value = null;

}
var temp = null;
/* @brief Функция showAuthorizationModal показывает модальное окно
*  @param
*  @return 
*/
function showAuthorizationModal() {
    const modal_hidden_authorization = document.querySelector('.modal-hidden_authorization');
    const modal_authorization = document.querySelector('.modal_authorization');
    const form_authorization = document.querySelector('.modal_form_authorization');
    if (modal_hidden_authorization.style.display == '') {
        modal_hidden_authorization.style.display = 'block';
        modal_hidden_authorization.style.visibility = 'visible';
        modal_authorization.style.opacity = 1;
    }
    modal_hidden_authorization.addEventListener('click', (event) => {
        if (event.target == modal_hidden_authorization) {
            modal_hidden_authorization.style.display = '';
            modal_hidden_authorization.style.visibility = 'hidden';
            modal_authorization.style.opacity = 0;
        }
    });
    form_authorization.addEventListener('submit', async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5294/api/Autentification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "password": document.querySelector("#password_authorization").value,
                "phone": document.querySelector('#phone_authorization').value
            })
        }); // Здесь нужно получить id user
        // window.location.href = "lk.html";
        if (response.status == 200) {
            temp = await response.json();
            // Store the data in the global variable
            // console.log(temp["client_id"]);
            localStorage.setItem("client_id", temp["client_id"]);
            localStorage.setItem("name", temp["name"]);
            localStorage.setItem("surName", temp["surName"]);
            localStorage.setItem("secondName", temp["secondName"]);
            localStorage.setItem("toNotify", temp["toNotify"]);
            window.location.href = "lk.html"
        } else if (response.status == 404) {
            if (document.querySelector('.error_message') == null) {
                makeErrorMessage(`Такой пользователь не найден`);
            }
        }
        else if (response.status == 401) {
            if (document.querySelector('.error_message') == null) {
                makeErrorMessage(`Неверный пароль`);
            }
        }
    })
}

function makeErrorMessage(text) {
    const error_message = document.createElement('span');
    error_message.classList.add('error_message');
    error_message.textContent = `${text}`;
    document.querySelector('.modal_form_authorization').insertBefore(error_message, document.querySelector('.entry_btn'));
    setTimeout(function () { error_message.remove() }, 5000);
}

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
        await fetch("http://localhost:5294/api/OrderWithoutReg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "name": document.querySelector('#fio').value,
                    "telegram": "1",
                    "phone": document.querySelector('#phone').value,
                    "description": document.querySelector('#comment').value,
                    "vin": document.querySelector('#vin_code').value,
                    "stateNumber": document.querySelector('#gos_number').value
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
    document.querySelector('#comment').value = null;
    document.querySelector('#vin_code').value = null;
    document.querySelector('#gos_number').value = null;
}
