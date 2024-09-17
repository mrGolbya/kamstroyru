//mask phone

let eventCalllback = function (e) {
  let el = e.target,
    clearVal = el.dataset.phoneClear,
    pattern = el.dataset.phonePattern,
    matrix_def = "+7(___) ___-__-__",
    matrix = pattern ? pattern : matrix_def,
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = e.target.value.replace(/\D/g, "");
  if (clearVal !== "false" && e.type === "blur") {
    if (val.length < matrix.match(/([\_\d])/g).length) {
      e.target.value = "";
      return;
    }
  }
  if (def.length >= val.length) val = def;
  e.target.value = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length
      ? val.charAt(i++)
      : i >= val.length
      ? ""
      : a;
  });
};
function getMaskForm() {
  let phone_inputs = document.querySelectorAll("[data-phone-pattern]");
  for (let elem of phone_inputs) {
    for (let ev of ["input", "blur", "focus"]) {
      elem.addEventListener(ev, eventCalllback);
    }
  }
}
getMaskForm();

document.querySelectorAll("form button").forEach((e) => {
  e.addEventListener("click", (i) => i.preventDefault());
});

//enter letters only
function replaceOnlyLetters(e) {
  e.target.value = e.target.value.replace(/[^a-zA-ZА-Яа-яЁё]/g, "");
}
function getOnlyLetters() {
  document.querySelectorAll("[data-user-name]").forEach((e) => {
    for (let ev of ["keydown", "input", "blur", "focus", "paste"]) {
      ev === "paste"
        ? e.addEventListener(ev, (e) => e.preventDefault())
        : e.addEventListener(ev, replaceOnlyLetters);
    }
  });
}
getOnlyLetters();


const checkUsername = (e) => {
  const MIN = 3,
    MAX = 25;
  let valid = false,
    formField = e.target.closest("[data-user-form]");

  if (formField.querySelector("[data-user-name]")) {
    let userNameEl = formField.querySelector("[data-user-name]");
    let userName = userNameEl.value.trim();
    // e.target.value = e.target.value.replace(/[^a-zA-ZА-Яа-яЁё]/g, "");
    if (!isRequired(userName)) {
      showError(userNameEl, "Имя не может быть пустым.");
    } else if (!isBetween(userName.length, MIN, MAX)) {
      showError(
        userNameEl,
        `Имя пользователя должно содержать от ${MIN} до ${MAX} символов.`
      );
    } else {
      showSuccess(userNameEl);
      valid = true;
    }
    return valid;
  }
};

const checkEmail = (e) => {
  let valid = false,
    formField = e.target.closest("[data-user-form]");
  if (formField.querySelector("[data-user-email]")) {
    let emailEl = formField.querySelector("[data-user-email]"),
      email = emailEl.value.trim();

    if (!isRequired(email)) {
      showError(emailEl, "Email не может быть пустым.");
    } else if (!isEmailValid(email)) {
      showError(emailEl, "Email не является допустимым.");
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  }
};

const checkBox = (e) => {
  let valid = false,
    formField = e.target.closest("[data-user-form]");
  if (formField.querySelector("[data-user-checkbox]")) {
    let checkBoxEl = formField.querySelector("[data-user-checkbox]");
    const CHECKBOX = checkBoxEl.checked;
    if (!CHECKBOX) {
      showError(checkBoxEl, "Чтобы продолжить, дайте согласие.");
    } else {
      showSuccess(checkBoxEl);
      valid = true;
    }
    return valid;
  }
};
//
const checkTel = (e) => {
  let valid = false,
    formField = e.target.closest("[data-user-form]"),
    telEl = formField.querySelector("[data-phone-pattern]"),
    tel = telEl.value.trim().replace(/\D/g, "");

  if (!isRequired(tel)) {
    showError(telEl, "Телефон не может быть пустым.");
  } else if (tel.length < 11) {
    showError(
      telEl,
      `Введите ещё ${11 - tel.length} ${
        7 > tel.length > 0 ? "цифр" : tel.length < 10 ? "цифры" : "цифру"
      }`
    );
  } else {
    showSuccess(telEl);
    valid = true;
  }
  return valid;
};

const isEmailValid = (email) => {
  const RE =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RE.test(email);
};
const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

let isUsernameValid, isTelValid, arrInput, userForm, FORM_DATA;

function formCorrectValidation(e) {
  FORM_DATA = new FormData(e.target.closest("[data-user-form]"));
  userForm = e.target.closest("[data-user-form]");

  arrInput = []; //find the number of inputs in the form for the correct validation
  for (let [name, value] of FORM_DATA) {
    arrInput.push(`${name} = ${value}`);
  }
}

let formSendSucces = `<div class="success"><div class="message"><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"></circle><path class="checkmark__check" fill="" d="M14.1 27.2l7.1 7.2 16.7-16.8"></svg><p><span class="gold">Поздравляем!</span> Ваше сообщение успешно отправлено, скоро мы с Вами свяжемся.</p></div></div>`;

window.addEventListener("submit", function (e) {
  // isUsernameValid = checkUsername(e), 
  isTelValid = checkTel(e), 
  isCheckBoxValid = checkBox(e);

  formCorrectValidation(e);
  if (
    !(isTelValid && arrInput.length == 2) ||
    !(isTelValid /*&& isUsernameValid*/ && isCheckBoxValid && arrInput.length >= 3)
  )
  
  e.preventDefault();
 
  console.log(arrInput.length)
  // submit to the server if the form is valid
  if (
    (isTelValid && arrInput.length == 2) ||
    (isTelValid /*&& isUsernameValid*/ && isCheckBoxValid && arrInput.length >= 3) ||
    (isTelValid && arrInput.length == 5)
  ) {
    
    userForm.classList.add("_sending");
    if (!userForm.querySelector(".spinner")) {
      userForm
        .querySelector(".form-box")
        .insertAdjacentHTML(
          "beforebegin",
          '<div class="spinner"><div class="spinner-icon"></div></div>'
        );
    }

    formSendServer(e);
  }
});

function formSendServer(e) {
  let ajaxSend = async (FORM_DATA) => {
    let response = await fetch("sndmsg.php", {
      method: "POST",
      body: FORM_DATA,
    });
    if (!response.ok) {
      throw new Error(
        `Ошибка по адресу ${window.location.href}, статус ошибки ${
          response.status
        },${response.json()},${response}`
      );
    }
    console.log(window.location.href);

    return await response.text();
  };
  FORM_DATA = new FormData(e.target.closest("[data-user-form]"));
  ajaxSend(FORM_DATA)
    .then((response) => {
      console.log(response);
      e.target.closest("[data-user-form]").reset(); // очищаем поля формы
      e.target.closest("[data-user-form]").classList.remove("_sending");
      document.querySelector(".spinner").remove();
      e.target.closest("[data-user-form]").classList.remove("hover-on");
      e.target.closest("[data-user-form]").innerHTML = "";
      e.target
        .closest("[data-user-form]")
        .insertAdjacentHTML("afterbegin", formSendSucces);
    })
    .catch((err) => console.error(err));
}

const debounce = (fn, delay = 0) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

//display input validate
// for (let ev of ["input", "click"]) {
window.addEventListener(
  "input",
  debounce(function (e) {
    if (e.target.name == "name") {
      checkUsername(e);
    }
    if (e.target.name == "email") {
      checkEmail(e);
    }
    if (e.target.name == "tel") {
      checkTel(e);
    }
    if (e.target.name == "number") {
      checkNumber(e);
    }
    if (e.target.name == "checkbox") {
      checkBox(e);
    }
  })
);
// }




document.querySelectorAll('main .equip .item a:nth-child(2)').forEach(e=>{
  e.insertAdjacentHTML('beforeend','<input type="submit" name="submit" id="submit" class="button" data-src="#callback" data-fancybox value="Получить предложение">')
})

document.querySelector('footer').insertAdjacentHTML('afterbegin',`<form class="form" data-user-form>
          <input type="hidden" name="callback-title" id="callback-title" value="Заявка на обратный звонок">
          <div class="txt">
            <p class="h2">Остались вопросы? Напишите нам</p>
            <div class="form-wrapper">
            <div class="wrapper">
            
              
            
           
         
          <div class="form-box">
            <input type="text" name="name" data-user-name="" placeholder="Введите имя">
            <small></small>
        </div>
  
          <div class="form-box">
            <input type="tel" name="tel" class="tel" data-phone-pattern autocomplete="off" placeholder="+7 (___) ___-__-__">
            <small></small>
        </div>

      <div class="form-box">
        <input type="email" name="email" id="email" data-user-email autocomplete="off" placeholder="Введите Ваш email">
        <small></small>
    </div>
      </div>
      <div class="wrapper"> 
        <div class="form-box">
          <textarea name="text" rows="4" placeholder="Дополнительная информация"></textarea>
          <small></small>
        </div>
        <p>Отправляя заявку Вы соглашаетесь с политикой конфидициальности</p>
        
        <!-- <input type="submit" name="submit" id="submit" class="button" value="Отправить заявку"> -->
        <input type="submit" name="submit" id="submit" class="button" value="Отправить заявку">
      </div>
    </div>
          </div>
        </form>`)
document.body.insertAdjacentHTML('beforeend',`<div id="callback" class="callback" style="display: none;">
    <div class="container">
      <form class="form" data-user-form>
        <div class="txt">
          <p class="h2">Заказать обратный звонок</p>
          <p class="text">Оставьте свой номер телефона и мы перезвоним Вам в ближайшее время</p>
          <div class="form-box">
            
          <input type="hidden" name="callback-title" id="callback-title" value="Заявка на обратный звонок">
          <small></small>
        </div>
        <div class="form-box">
          <input type="text" name="name" data-user-name="" placeholder="Введите имя">
          <small></small>
      </div>

        <div class="form-box">
          <input type="tel" name="tel" class="tel" data-phone-pattern autocomplete="off" placeholder="+7 (___) ___-__-__">
          <small></small>
      </div>
     
          
          <div class="form-box">
            <input type="checkbox" name="checkbox" id="callback-consent" data-user-checkbox>
            <label for="callback-consent">Согласие на обработку персональных данных</label>
            <small></small>
        </div>
        <div class="form-box">
          <input type="checkbox" name="checkbox-1" id="callback-consent-1" data-user-checkbox>
          <label for="callback-consent-1">Согласен на получение акций/предложений от Камстройсервис</label>
          <small></small>
      </div>
          <input type="submit" name="callback-submit" id="callback-submit" class="button" value="Отправить заявку">
        </div>
      </form>
    </div>
  </div>`)


  document.querySelector('nav#top').remove()
  document.querySelector('#leaf').insertAdjacentHTML('beforebegin',`<header class="header">

  <div class="container">
    <button class="button" data-fancybox data-src="#callback">Заказать звонок</button>
  <nav id="top">
    <div><a href="o_kompanii">О компании</a></div>
    <div><a href="akciya">Акции</a></div>
    <div><a href="otzyvy">Отзывы</a></div>
    <div><a href="vopros-otvet">Вопрос-ответ</a></div>
    <div><a href="fotootchety">Фото/видео отчеты</a></div>
    <div><a href="dogovor">Договор</a></div>
    <div><a href="kontakty">Контакты</a></div>
  </nav>
  <div class="socials">
    <a href="https://api.whatsapp.com/send/?phone=79268059482" class="wa" target="_blank"></a>
    <a href="https://t.me/+79268059482" class="tg" target="_blank"></a>
  </div>
  
</div>
    
</header>`)

//disable click a link
document.querySelectorAll('.item .button').forEach(e=>{
  e.addEventListener('mousemove', e=>{
    console.log(!document.location.href.includes(e.target.pathname))
    
    if(!document.location.href.includes(e.target.pathname)) {
      e.preventDefault();
      }
  })
  e.addEventListener('click', e=>{
    console.log(!document.location.href.includes(e.target.pathname))
    
    if(!document.location.href.includes(e.target.pathname)) {
      e.preventDefault();
      }
    if(e.target){
      document.querySelector('.callback .h2').textContent='Получить предложение'
    }
  })
})
document.querySelector('.header .container .button').addEventListener('click',e=>{
  if(e.target){
    document.querySelector('.callback .h2').textContent='Заказать обратный звонок'
  }
})