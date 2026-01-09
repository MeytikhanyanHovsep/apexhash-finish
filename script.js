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
    const faqAnswer = document.getElementsByClassName('faq-answer')[index];
    faqAnswer.classList.toggle("hidden");
    const faqToggle = document.getElementsByClassName('faq-toggle')[index];
    faqToggle.innerText = faqToggle.innerText === "-" ? "+" : "-";
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
    document.getElementsByClassName("cookie-alerter")[0].style.display = "none"
}

function setReqPopUp() {
    document.getElementsByClassName("request-pop-up")[0].classList.toggle("hidden-pop-up")
}

function setPrivacyPopUp() {
    document.getElementsByClassName("privacy-pop-up")[0].classList.toggle("hidden-pop-up")
}

const form = document.getElementsByClassName("main-form")[0];
function handleForm(event) {
    console.log("x")
    event.preventDefault();
    setReqPopUp()

    document.getElementById("phone").value = ""
    document.getElementById("name").value = ""
}
form.addEventListener('submit', handleForm);

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