if (localStorage.getItem('cookie_accepted')) {
    document.getElementsByClassName("cookie-container")[0].style.display = "none"
}

let menuToggle = false;

function toggleMenu() {
    menuToggle = !menuToggle

    if (menuToggle) {
        mobileMenu.style.top = "0"
        headerInner.style.opacity = 0
        setTimeout(() => {
            menuBtn.style.display = "none"
            closeBtn.style.display = "block"
            headerInner.style.opacity = 1
            headerInner.style.position = 'fixed'

            main.style.marginTop = headerInner.offsetHeight + "px"
        }, 700);
    } else {
        mobileMenu.style.top = "-150%"
        menuBtn.style.display = "block"
        closeBtn.style.display = "none"
        headerInner.style.position = 'static'
        main.style.marginTop = 0
    }
}

function toggleFaqItem(index) {
    const answer = document.getElementsByClassName('faq-answer')[index];
    const toggle = document.getElementsByClassName('faq-toggle')[index];

    answer.classList.toggle('open');

    toggle.classList.toggle('active-toggle');
}

const phoneInput = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInput, {
    initialCountry: "ru",
    separateDialCode: true,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.5.0/build/js/utils.js"
});

phoneInput.addEventListener("blur", () => {
    phoneInput.classList.toggle("invalid", phoneInput.value.trim() && !iti.isValidNumber());
});

function closeCookieBox() {
    document.getElementsByClassName("cookie-container")[0].style.display = "none"
    localStorage.setItem('cookie_accepted', 'true');
}

function setReqPopUp() {

    if (event) {
        if (event.target !== event.currentTarget) {
            return;
        }
    }

    document.getElementsByClassName("request-pop-up")[0].classList.toggle("hidden-pop-up")
}

function setPrivacyPopUp() {
    if (event) {
        if (event.target !== event.currentTarget) {
            return;
        }
    }
    let item = document.getElementsByClassName("privacy-pop-up")[0]

    item.classList.toggle("hidden-pop-up")
}

const form = document.getElementsByClassName("main-form")[0];

const input = document.getElementById('phone');

input.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Удаляем всё, кроме цифр
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue += value.substring(0, 3);
    }
    if (value.length > 3) {
        formattedValue += ' ' + value.substring(3, 6);
    }
    if (value.length > 6) {
        formattedValue += '-' + value.substring(6, 8);
    }
    if (value.length > 8) {
        formattedValue += '-' + value.substring(8, 10);
    }

    e.target.value = formattedValue;
});

const submitBtn = document.querySelector('.submit-btn');
const nameInput = document.getElementById('name');

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('name');

    form.onsubmit = async function (e) {
        e.preventDefault();
        let isValid = true;

        const checkInput = (input, condition) => {
            const wrapper = input.closest('.input-wrapper');

            if (condition) {
                wrapper.classList.add('error');
                return false;
            } else {
                wrapper.classList.remove('error');
                return true;
            }
        };

        if (!checkInput(nameInput, nameInput.value.trim().length < 2)) isValid = false;

        const phoneDigits = phoneInput.value.replace(/\D/g, '');
        if (!checkInput(phoneInput, phoneDigits.length < 10)) isValid = false;

        if (isValid) {

            try {
                const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: text,
                        parse_mode: 'HTML'
                    })
                });

                if (response.ok) {
                    setReqPopUp();
                    nameInput.value = "";
                    phoneInput.value = "";
                } else {
                    console.log("Ошибка при отправке. Попробуйте снова.");
                }
            } catch (error) {
                console.error("Ошибка сети:", error);
                console.log("Нет связи с сервером.");
            }
            setReqPopUp()
            nameInput.value = ""
            phoneInput.value = ""
        }
    };

    [phoneInput, nameInput].forEach(input => {
        input.oninput = () => {
            const wrapper = input.closest('.input-wrapper');
            if (wrapper) wrapper.classList.remove('error');
        };
    });
});