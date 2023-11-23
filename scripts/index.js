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
                    "name": document.querySelector('#fio_reg').value,
                    "surname": document.querySelector('#fio_reg').value,
                    "secondName": document.querySelector('#fio_reg').value,
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
        if (response.ok) {
            temp = await response.json();
            // Store the data in the global variable
            console.log(temp);
            localStorage.setItem("id", temp);
            window.location.href = "lk.html"  // Log the user data
        } else {
            console.error("Authentication failed");
            temp = null;  // Reset the global variable if authentication fails
        }
    })
}

function showBidModal() {
    const modal_hidden = document.querySelector('.modal-hidden');
    const modal = document.querySelector('.modal');
    const form = document.querySelector('.modal_form')
    console.log(modal_hidden.style.display);
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
        // const response = await fetch("http://localhost:5294/api/Order/History?id=2");
        // const data = await response.json();
        // await fetch("http://localhost:5294/api/Order/History?id=2", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(
        //         {
        //             "id": 2,
        //             "description": "123",
        //             "isActive": false,
        //             "start": "0001-01-01T00:00:00",
        //             "end": "0001-01-01T00:00:00",
        //             "result": null,
        //             "clientId": 1,
        //             "client": null,
        //             "carId": 1,
        //             "car": {
        //                 "id": 1,
        //                 "vin": 123,
        //                 "stateNumber": "123",
        //                 "mileAge": 123,
        //                 "manufactureYear": 123,
        //                 "orders": []
        //             }
        //             // "id": 2,
        //             //     "fio": document.querySelector('#fio').value,
        //             //     "phone": document.querySelector('#phone').value,
        //             //     "email": document.querySelector('#email').value,
        //             //     "gos-number": document.querySelector('#gos_number').value,
        //             //     "vin-code": document.querySelector('#vin_code').value,
        //             //     "works": document.querySelector('#works').value,
        //             //     "comments": document.querySelector('#comment').value,
        //         }
        //     )

        // })
        modal_hidden.style.display = '';
        modal_hidden.style.visibility = 'hidden';
        modal.style.opacity = 0;
    });

}
