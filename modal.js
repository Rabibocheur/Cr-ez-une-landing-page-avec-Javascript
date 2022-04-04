// DOM Elements
const menuBars = document.querySelector(".menu-bars");
const modalbg = document.querySelector(".bground");
const launchModalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelectorAll(".close-modal");
const form = document.getElementById("reserve");

// edit nav menu bars
const editNav = () => {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};

// launch modal form
const launchModal = () => {
  modalbg.style.display = "block";
  formVerification();
};

// close modal form
const closeModal = () => {
  modalbg.style.display = "none";
};

// menu bars event
menuBars.addEventListener("click", editNav);

// launch modal event
launchModalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// form verification
const formVerification = () => {
  const formData = document.querySelectorAll(".formData");

  formData.forEach((data) => {
    data.addEventListener("keyup", () => checkInput(data));
    data.addEventListener("change", () => checkInput(data));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    for (let input of formData) {
      if (!checkInput(input)) {
        isValid = false;
      }
    }
    formValidation(isValid);
  });
};

// check input form
const checkInput = (data) => {
  const input = data.querySelector("input");
  let regexp = null;
  let isValid = null;

  if (input.name == "firstname" || input.name == "lastname") {
    regexp = /^[A-Za-z-]{2,}$/;
  } else if (input.name == "email") {
    regexp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  } else if (input.name == "birthdate") {
    regexp = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  } else if (input.name == "quantity") {
    regexp = /^([1-9]{1,2})$/;
  }

  isValid = validInput(input, regexp);

  if (isValid) {
    data.dataset.errorVisible = false;
  } else {
    data.dataset.errorVisible = true;
  }

  return isValid;
};

// valid input form
const validInput = (input, regexp) => {
  let isValid = false;

  if (regexp && regexp.test(input.value)) {
    isValid = true;
    if (input.name == "birthdate") {
      const date = new Date();
      let newDate = input.value.split("-");
      newDate = new Date(newDate[0], newDate[1] - 1, newDate[2]);
      isValid = newDate <= date ? true : false;
    }
  } else {
    if (input.name == "location") {
      input.parentNode.querySelectorAll("input").forEach((input) => {
        if (input.checked) isValid = true;
      });
    } else if (input.name == "checkbox1") {
      if (input.checked) isValid = true;
    }
  }

  return isValid;
};

// form validation
const formValidation = (isValid) => {
  if (!isValid) throw "validation invalid";
  const reserved = document.querySelector(".reserved");
  form.style.display = "none";
  reserved.style.display = "flex";
};
