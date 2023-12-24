let personal_cab = document.querySelector('.header__personal-cab');
const modalActive = document.querySelector('.modalActive');
const list_btns = Array.from(document.querySelectorAll('.btn'));
let link_reg = document.querySelector('.link-reg');
var temp = null;
const header = document.querySelector('.header');

list_btns.forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        showModal(event.target);
        submitForm();
    })
})



if (document.body.clientWidth <= 576) {
    header.innerHTML = `
                    <a class="header__info-loc header__info-link" href="">
                        <svg class="header__info-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="geo-icon 1" clip-path="url(#clip0_1_3)">
                            <path id="Vector" d="M12.166 8.94C11.642 10.002 10.932 11.06 10.206 12.01C9.5173 12.9056 8.7809 13.7635 8 14.58C7.21908 13.7635 6.48268 12.9056 5.794 12.01C5.068 11.06 4.358 10.002 3.834 8.94C3.304 7.867 3 6.862 3 6C3 4.67392 3.52678 3.40215 4.46447 2.46447C5.40215 1.52678 6.67392 1 8 1C9.32608 1 10.5979 1.52678 11.5355 2.46447C12.4732 3.40215 13 4.67392 13 6C13 6.862 12.695 7.867 12.166 8.94ZM8 16C8 16 14 10.314 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.632141 9.5913 0 8 0C6.4087 0 4.88258 0.632141 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6C2 10.314 8 16 8 16Z" fill="#D9D9D9"/>
                            <path id="Vector_2" d="M8 8C7.46957 8 6.96086 7.78929 6.58579 7.41421C6.21071 7.03914 6 6.53043 6 6C6 5.46957 6.21071 4.96086 6.58579 4.58579C6.96086 4.21071 7.46957 4 8 4C8.53043 4 9.03914 4.21071 9.41421 4.58579C9.78929 4.96086 10 5.46957 10 6C10 6.53043 9.78929 7.03914 9.41421 7.41421C9.03914 7.78929 8.53043 8 8 8ZM8 9C8.79565 9 9.55871 8.68393 10.1213 8.12132C10.6839 7.55871 11 6.79565 11 6C11 5.20435 10.6839 4.44129 10.1213 3.87868C9.55871 3.31607 8.79565 3 8 3C7.20435 3 6.44129 3.31607 5.87868 3.87868C5.31607 4.44129 5 5.20435 5 6C5 6.79565 5.31607 7.55871 5.87868 8.12132C6.44129 8.68393 7.20435 9 8 9Z" fill="#D9D9D9"/>
                            </g>
                            <defs>
                            <clippath id="clip0_1_3">
                            <rect width="16" height="16" fill="white"/>
                            </clippath>
                            </defs>
                        </svg>  
                        Екатеринбург
                    </a>
                    <a class="header__info-num header__info-link" href="tel:79999999999">
                        <svg class="header__info-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M1.23004 3.83697C1.21182 3.4976 0.921901 3.23726 0.582482 3.25547C0.243062 3.27369 -0.017317 3.56357 0.000900535 3.90293L1.23004 3.83697ZM2.02262 0.691567C1.78854 0.937982 1.79856 1.32747 2.04501 1.56153C2.29146 1.79558 2.68101 1.78556 2.91511 1.53915L2.02262 0.691567ZM6.90229 14.4101C7.19007 14.591 7.57001 14.5043 7.75088 14.2166C7.93174 13.9289 7.845 13.549 7.55721 13.3681L6.90229 14.4101ZM10.5531 14.6121C10.2204 14.5424 9.89422 14.7556 9.82455 15.0883C9.75488 15.4209 9.96808 15.747 10.3008 15.8167L10.5531 14.6121ZM10.9893 10.9078L11.363 10.5144L10.4705 9.66686L10.0968 10.0603L10.9893 10.9078ZM12.5929 10.3488L14.1606 11.251L14.7747 10.1844L13.2069 9.28214L12.5929 10.3488ZM14.4632 13.1217L13.2975 14.3488L14.19 15.1963L15.3557 13.9693L14.4632 13.1217ZM5.01087 11.2483C1.83008 7.90004 1.29654 5.07575 1.23004 3.83697L0.000900535 3.90293C0.0823459 5.42019 0.72667 8.52566 4.11838 12.0959L5.01087 11.2483ZM6.13948 5.80272L6.37488 5.55497L5.48236 4.70739L5.247 4.95514L6.13948 5.80272ZM6.55976 2.47036L5.52497 1.00704L4.5199 1.71755L5.55468 3.18086L6.55976 2.47036ZM5.69324 5.37892C5.247 4.95514 5.24643 4.95574 5.24586 4.95634C5.24567 4.95655 5.24509 4.95716 5.2447 4.95757C5.24392 4.9584 5.24312 4.95925 5.24232 4.96012C5.2407 4.96186 5.23903 4.96367 5.23731 4.96557C5.23387 4.96935 5.23022 4.97344 5.22638 4.97786C5.2187 4.98669 5.21027 4.99678 5.20125 5.00817C5.18321 5.03097 5.1628 5.05897 5.14139 5.09242C5.09847 5.1595 5.05191 5.24784 5.01248 5.35863C4.9323 5.58391 4.88861 5.88223 4.94321 6.25479C5.05047 6.98676 5.53016 7.97109 6.78354 9.29043L7.67604 8.44287C6.50446 7.20961 6.21589 6.45009 6.16111 6.07637C6.1347 5.89607 6.16154 5.80106 6.17216 5.77123C6.17812 5.75446 6.18203 5.7498 6.17821 5.75577C6.17636 5.75866 6.17267 5.76409 6.16646 5.77193C6.16335 5.77586 6.15962 5.78039 6.15516 5.78552C6.15292 5.78808 6.15051 5.7908 6.1479 5.79367C6.1466 5.79511 6.14524 5.79657 6.14384 5.79808C6.14314 5.79884 6.14243 5.7996 6.1417 5.80037C6.14134 5.80076 6.14078 5.80135 6.1406 5.80154C6.14004 5.80213 6.13948 5.80272 5.69324 5.37892ZM6.78354 9.29043C8.03316 10.6059 8.97703 11.1231 9.69711 11.24C10.0665 11.2999 10.3657 11.252 10.5921 11.1628C10.7028 11.1191 10.7905 11.0678 10.8562 11.0212C10.889 10.9979 10.9163 10.9759 10.9384 10.9566C10.9494 10.9469 10.9591 10.9379 10.9676 10.9297C10.9718 10.9256 10.9757 10.9217 10.9793 10.9181C10.9811 10.9163 10.9829 10.9145 10.9846 10.9128C10.9854 10.9119 10.9862 10.9111 10.9869 10.9103C10.9874 10.9099 10.9879 10.9092 10.9882 10.9091C10.9887 10.9084 10.9893 10.9078 10.5431 10.4841C10.0968 10.0603 10.0974 10.0597 10.0979 10.0591C10.0981 10.0589 10.0986 10.0583 10.099 10.0579C10.0998 10.0572 10.1005 10.0564 10.1012 10.0557C10.1027 10.0542 10.1041 10.0527 10.1054 10.0513C10.1082 10.0486 10.1108 10.046 10.1132 10.0436C10.1182 10.0389 10.1227 10.0348 10.1266 10.0313C10.1345 10.0244 10.1403 10.02 10.1441 10.0174C10.1517 10.0119 10.151 10.0138 10.1405 10.0179C10.1246 10.0241 10.0501 10.0504 9.89439 10.0252C9.56409 9.97151 8.85123 9.67999 7.67604 8.44287L6.78354 9.29043ZM5.52497 1.00704C4.69321 -0.169182 3.02884 -0.367624 2.02262 0.691567L2.91511 1.53915C3.34415 1.08752 4.09946 1.12299 4.5199 1.71755L5.52497 1.00704ZM13.2975 14.3488C13.0685 14.5898 12.829 14.719 12.5961 14.7419L12.717 15.9668C13.33 15.9062 13.8262 15.5793 14.19 15.1963L13.2975 14.3488ZM6.37488 5.55497C7.16882 4.71916 7.22503 3.41117 6.55976 2.47036L5.55468 3.18086C5.90109 3.67075 5.84797 4.32252 5.48236 4.70739L6.37488 5.55497ZM14.1606 11.251C14.8343 11.6387 14.9661 12.5924 14.4632 13.1217L15.3557 13.9693C16.4266 12.842 16.1147 10.9556 14.7747 10.1844L14.1606 11.251ZM11.363 10.5144C11.6793 10.1815 12.1721 10.1066 12.5929 10.3488L13.2069 9.28214C12.3055 8.76335 11.1876 8.9121 10.4705 9.66686L11.363 10.5144ZM7.55721 13.3681C6.74998 12.8609 5.8908 12.1746 5.01087 11.2483L4.11838 12.0959C5.06539 13.0928 6.00361 13.8455 6.90229 14.4101L7.55721 13.3681ZM12.5961 14.7419C12.1476 14.7863 11.4379 14.7973 10.5531 14.6121L10.3008 15.8167C11.3254 16.0312 12.1625 16.0215 12.717 15.9668L12.5961 14.7419Z" fill="#D9D9D9"/>
                        </svg>                        
                        +7 999 999-99-99
                    </a>
                <a class="header__personal-cab header__info-link" href="">
                    <svg class="header__info-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="user-icon (2) 1">
                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M8.00008 8C9.84101 8 11.3334 6.35837 11.3334 4.33333C11.3334 2.30829 9.84101 0.666667 8.00008 0.666667C6.15913 0.666667 4.66675 2.30829 4.66675 4.33333C4.66675 6.35837 6.15913 8 8.00008 8ZM8.00008 6.53333C6.89548 6.53333 6.00008 5.54836 6.00008 4.33333C6.00008 3.11831 6.89548 2.13333 8.00008 2.13333C9.10468 2.13333 10.0001 3.11831 10.0001 4.33333C10.0001 5.54836 9.10468 6.53333 8.00008 6.53333Z" fill="#D9D9D9"/>
                        <path id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M12.7353 9.4058C12.1736 8.84227 11.3047 8.72073 10.6107 9.13247C10.4838 9.2078 10.3721 9.27673 10.2691 9.34033C9.9958 9.509 9.78367 9.63987 9.51027 9.7522C9.16667 9.8934 8.72233 10 8 10C7.28453 10 6.83287 9.8994 6.48406 9.76313C6.1757 9.64267 5.93215 9.49133 5.61123 9.29187C5.54864 9.253 5.48299 9.2122 5.41346 9.16953C4.71725 8.74213 3.82309 8.84147 3.24277 9.42793C2.98962 9.68373 2.69357 10.0146 2.4566 10.3751C2.23069 10.7187 2 11.1759 2 11.6667V13.3335C2 14.4383 2.89556 15.3333 4 15.3333H12C13.1045 15.3333 14 14.4383 14 13.3335V11.6667C14 11.1694 13.7631 10.7061 13.5331 10.3594C13.2913 9.99513 12.9901 9.66153 12.7353 9.4058ZM11.2911 10.2791C11.4506 10.1845 11.652 10.2077 11.7909 10.347C12.0143 10.5712 12.2483 10.8347 12.4221 11.0967C12.6075 11.3761 12.6667 11.568 12.6667 11.6667V13.3335C12.6667 13.7016 12.3683 14 12 14H4C3.63168 14 3.33333 13.7016 3.33333 13.3335V11.6667C3.33333 11.5699 3.39033 11.3819 3.57075 11.1075C3.74011 10.8499 3.96905 10.5896 4.19053 10.3658C4.32941 10.2254 4.54071 10.1983 4.71593 10.3059C4.77107 10.3397 4.82725 10.3747 4.88463 10.4106C5.20625 10.6114 5.56612 10.836 5.99891 11.0051C6.52869 11.2121 7.14947 11.3333 8 11.3333C8.8668 11.3333 9.48753 11.2031 10.0169 10.9855C10.4004 10.828 10.7386 10.6188 11.0372 10.4341C11.1253 10.3797 11.2099 10.3273 11.2911 10.2791Z" fill="#D9D9D9"/>
                        </g>
                    </svg>                    
                    Личный кабинет
                </a>   
            </div>
    `
    personal_cab = document.querySelector('.header__personal-cab');
}

personal_cab.addEventListener('click', (event) => {
    event.preventDefault();
    showModal(event.target);
    submitForm();
    link_reg = document.querySelector('.link-reg');
    link_reg.addEventListener('click', (event) => {
        event.preventDefault();
        showModal(event.target);
        submitForm();
    })
})


function showModal(name_eventTarget) {
    const modalBackground = document.querySelector('.modalBackground');
    switch (name_eventTarget) {
        case personal_cab:
            makeLogModal();
            break;
        case link_reg:
            makeRegModal();
            break;
        case list_btns[0]:
            makeApplicationModal();
            break;
        case list_btns[1]:
            makeApplicationModal();
            break;

    }
    if (modalBackground.style.display == "") {
        modalBackground.style.display = 'grid';
        document.querySelector('body').style.overflow = 'hidden';
    }

    modalBackground.addEventListener('click', (event) => {
        if (event.target == modalBackground) {
            modalBackground.style.display = '';
            document.querySelector('body').style.overflow = 'visible';
        }
    })
}


function submitForm() {
    const modalForm = document.querySelector('.modalForm');
    const form_btn = document.querySelector('.form__btn');
    switch (form_btn.textContent) {
        case "Зарегистрироваться":
            modalForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                await fetch("http://localhost:5294/api/ClientReg", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            "password": document.querySelector("#password").value,
                            "name": document.querySelector('#fio').value.split(' ')[0],
                            "surname": document.querySelector('#fio').value.split(' ')[1],
                            "secondName": document.querySelector('#fio').value.split(' ')[2],
                            "telegram": document.querySelector('#username-telegram').value,
                            "phone": document.querySelector('#phone').value
                        }
                    )
                })
                location.reload();
            })
            break;
        case "Войти":
            modalForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const response = await fetch("http://localhost:5294/api/Autentification", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "password": document.querySelector("#password").value,
                        "phone": document.querySelector('#phone').value
                    })
                });
                switch (response.status) {
                    case 200:
                        temp = await response.json();
                        localStorage.setItem("client_id", temp["client_id"]);
                        localStorage.setItem("name", temp["name"]);
                        localStorage.setItem("surName", temp["surName"]);
                        localStorage.setItem("secondName", temp["secondName"]);
                        localStorage.setItem("toNotify", temp["toNotify"]);
                        window.location.href = "lk.html"
                        break;
                    case 404:
                        if (document.querySelector('.error_message') == null) {
                            makeErrorMessage(`Такой пользователь не найден`);
                        }
                        break;
                    case 401:
                        if (document.querySelector('.error_message') == null) {
                            makeErrorMessage(`Неверный пароль`);
                        }
                }

            })
            break;
        case "Отправить": /*нужно исправить заявки без регистрации*/
            modalForm.addEventListener('submit', async (event) => {
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
                            "vin": document.querySelector('#vin-code').value,
                            "stateNumber": document.querySelector('#gos-number').value
                        }
                    )
                })
                location.reload();
            });
            break;
    }
};

// function clearInputs() {
//     const list_inputs = Array.from(document.querySelectorAll('.form__input'));
//     list_inputs.forEach(element => {
//         element.value = null;
//     });
// }
function makeErrorMessage(text_content) {
    const error_message = document.createElement('p');
    const container_error = document.createElement('div');
    const form_btn = document.querySelector('.form__btn');
    const modalForm = document.querySelector('.modalForm');
    container_error.classList.add('container_error');
    error_message.classList.add('error_message');
    error_message.textContent = `${text_content}`;
    container_error.append(error_message);
    modalActive.append(container_error);
    setTimeout(function () { container_error.remove() }, 5000);
}
function makeRegModal() {
    modalActive.innerHTML = `
    <form action="" class="modalForm">
        <ul class="form__list">
            <li class="form__list-items">
                <label for="fio" class="form__label">ФИО</label>
                <input type="text" id="fio" class="form__input">
            </li>
            <li class="form__list-items">
                <label for="phone" class="form__label">Телефон</label>
                <input type="text" id="phone" class="form__input">
            </li>
            <li class="form__list-items">
                <label for="username-telegram" class="form__label">Telegram Username</label>
                <input type="text" id="username-telegram" class="form__input">
            </li>
            <li class="form__list-items">
                <label for="password" class="form__label">Пароль</label>
                <input type="text" name="" id="password" class="form__input">
            </li>
        </ul>
        <button class="form__btn">Зарегистрироваться</button>
    </form>
    `
}

function makeLogModal() {
    modalActive.innerHTML = `
    <form action="" class="modalForm">
        <h2 class="form__name">Авторизация</h2>
        <ul class="form__list">
            <li class="form__list-items">
                <label for="phone" class="form__label">Телефон</label>
                <input type="text" id="phone" class="form__input">
            </li>
            <li class="form__list-items">
                <label for="password" class="form__label">Пароль</label>
                <input type="text" name="" id="password" class="form__input">
            </li>
        </ul>
        <button class="form__btn">Войти</button>
    </form>
    <a href="#" class="link-telegram">
        <svg class="link-telegram-svg" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="35" height="35" rx="17.5" fill="#2AA1DA"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8067 19.3478C10.8497 19.3624 10.8931 19.3726 10.9365 19.3789C10.9839 19.4902 11.045 19.634 11.1163 19.8022C11.2904 20.2128 11.525 20.7682 11.7671 21.3474C12.2609 22.5289 12.759 23.7467 12.869 24.0953C13.0051 24.5262 13.1491 24.8192 13.3062 25.0192C13.3875 25.1227 13.4814 25.2129 13.5914 25.2813C13.6467 25.3158 13.7052 25.344 13.7662 25.365C13.7689 25.366 13.7716 25.3669 13.7743 25.3678C14.0889 25.4865 14.3758 25.4371 14.5554 25.3766C14.6514 25.3442 14.7292 25.3051 14.7843 25.2735C14.8124 25.2573 14.8361 25.2422 14.8551 25.2294L14.8595 25.2265L17.638 23.4937L20.8476 25.9543C20.8949 25.9906 20.9466 26.0211 21.0012 26.0449C21.3868 26.2132 21.7602 26.2719 22.1114 26.2239C22.4621 26.176 22.7404 26.0287 22.9476 25.8629C23.1506 25.7006 23.2882 25.5187 23.3738 25.3836C23.4176 25.3146 23.4504 25.2535 23.4736 25.2068C23.4852 25.1833 23.4946 25.1631 23.5018 25.1469L23.5111 25.1254L23.5146 25.117L23.5161 25.1134L23.5167 25.1118L23.5174 25.1102C23.5342 25.068 23.5472 25.0244 23.556 24.9798L26.4859 10.2078C26.4953 10.1605 26.5 10.1125 26.5 10.0643C26.5 9.63174 26.337 9.2204 25.9538 8.97079C25.6262 8.75745 25.2613 8.74827 25.0307 8.76577C24.7819 8.78465 24.5521 8.84607 24.398 8.89514C24.3177 8.92068 24.2504 8.94532 24.2019 8.96411C24.1775 8.97356 24.1576 8.98167 24.1426 8.98786L24.1315 8.99256L7.69969 15.4385L7.69756 15.4393C7.68709 15.4431 7.67364 15.4481 7.65767 15.4543C7.62585 15.4667 7.58322 15.4841 7.53342 15.5067C7.43631 15.5508 7.30006 15.6195 7.16025 15.7153C6.93689 15.8682 6.42322 16.2872 6.50971 16.9786C6.57872 17.5302 6.95662 17.869 7.18686 18.0319C7.31328 18.1214 7.43339 18.1853 7.52086 18.227C7.56143 18.2462 7.64568 18.2805 7.68224 18.2954L7.69147 18.2991L10.8067 19.3478ZM24.7066 10.3505L24.7043 10.3515C24.696 10.355 24.6879 10.3584 24.6795 10.3617L8.22778 16.8155C8.21918 16.8188 8.21053 16.8221 8.20182 16.8251L8.19267 16.8286C8.18214 16.8327 8.16442 16.8399 8.14219 16.8499C8.12957 16.8556 8.11641 16.8619 8.10299 16.8686C8.12142 16.879 8.13907 16.8879 8.15475 16.8954C8.1698 16.9026 8.18129 16.9075 8.18757 16.9101L11.2772 17.9502C11.3337 17.9693 11.3865 17.9945 11.4348 18.0249L21.6366 12.0529L21.6462 12.0472C21.6535 12.0428 21.6634 12.0372 21.6751 12.0306C21.6983 12.0175 21.7301 12 21.7681 11.9807C21.8389 11.9446 21.9522 11.8911 22.0798 11.8517C22.1686 11.8242 22.4306 11.7469 22.7139 11.8377C22.8887 11.8938 23.0697 12.0143 23.1874 12.2185C23.2458 12.32 23.277 12.4219 23.2921 12.5152C23.3322 12.6621 23.3259 12.8073 23.2945 12.9325C23.2269 13.2024 23.0373 13.4129 22.8648 13.5739C22.7169 13.712 20.8043 15.5562 18.9176 17.3768C17.9766 18.2846 17.0454 19.1836 16.3492 19.8554L15.8921 20.2969L21.665 24.7227C21.7974 24.7701 21.8756 24.7678 21.9118 24.7627C21.955 24.7568 21.9903 24.7402 22.0264 24.7114C22.0667 24.6792 22.102 24.6355 22.1283 24.5939L22.1294 24.5923L24.9711 10.2651C24.929 10.2752 24.8863 10.2873 24.8452 10.3004C24.7987 10.3152 24.7602 10.3293 24.7349 10.3392C24.7222 10.344 24.7132 10.3478 24.7082 10.3498L24.7066 10.3505ZM16.388 22.5354L15.2362 21.6523L14.9572 23.4275L16.388 22.5354ZM14.1797 19.9002L15.325 18.7944C16.0212 18.1225 16.9526 17.2235 17.8937 16.3155L18.8497 15.3931L12.4396 19.1455L12.474 19.2266C12.6487 19.6387 12.8844 20.1964 13.1278 20.7788C13.3098 21.2142 13.5001 21.6728 13.6734 22.0973L13.9517 20.3272C13.9785 20.1566 14.0619 20.0089 14.1797 19.9002Z" fill="white"/>
        </svg>
    </a>
    <a href="#" class="link-reg">Зарегистрироваться</a>
    `
}

function makeApplicationModal() {
    modalActive.innerHTML = `
    <form action="" class="modalForm">
        <h2 class="form__name form__name-review">Заявка</h2>
        <ul class="form__list">
            <li class="form__list-items">
                <label for="fio" class="form__label">ФИО</label>
                <input type="text" id="fio" class="form__input">
            </li>
            <li class="form__list-items">
                <label for="phone" class="form__label">Телефон</label>
                <input type="text" id="phone" class="form__input">
            </li>
            <li class="form__list-items">
                <label for="mail" class="form__label">Адрес электронной почты</label>
                <input type="text" name="" id="mail" class="form__input">
            </li>
            <li class="form__list-items">
                <label for="" class="form__label">Данные об автомобиле</label>
                <ul class="label__list">
                    <li class="form__list-items">
                        <label for="gos-number" class="form__label label__car-info">Гос-номер</label>
                        <input type="text" name="" id="gos-number" class="form__input input__car-info">
                    </li>
                    <li class="form__list-items">
                        <label for="vin-code" class="form__label label__car-info">vin-код</label>
                        <input type="text" name="" id="vin-code" class="form__input input__car-info">
                    </li>
                </ul>
            </li>
            <li class="form__list-items">
                <label for="routine-work" class="form__label">Регламентные работы</label>
                <select name="" id="routine-work" class="form__select">
                    <option value="value0" hidden></option>
                    <option value="value1">Замена моторного масло</option>
                    <option value="value2">Замена воздушного фильтра</option>
                    <option value="value3">Замена Свечи зажигания</option>
                    <option value="value4">Замена ремня ГРМ</option>
                    <option value="value5">Регулировка клапанов</option>
                    <option value="value6">Замена рабочая жидкость в трансмиссии</option>
                    <option value="value7">Замена салонного фильтра</option>
                    <option value="value8">Осмотр ходовой части</option>
                    <option value="value9">Другое</option>
                </select>
            </li>
            <li class="form__list-items">
                <label for="comment" class="form__label">Комментарий</label>
                <textarea name="" id="comment" cols="30" rows="10" class="form__input-com"></textarea>
            </li>
        </ul>
        <button class="form__btn">Отправить</button>
    </form>
    `
}

