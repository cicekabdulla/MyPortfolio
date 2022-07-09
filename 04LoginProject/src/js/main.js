"use strict";
const username = "Chichak",
  password = 1234,
  callElement = (selector) => document.querySelector(selector),
  userInput = callElement(".user__input"),
  passwordInput = callElement(".password__input"),
  form = callElement("form");

form.addEventListener("submit", (e) => {
  // 1ci mərhələ:Səhifə yenilənmir

  e.preventDefault();

  //   2ci mərhələ:ekrandan bildiriş silinir
  const children = form.children;
  for (let i = 0; i < children.length; i++) {
    if (
      children[i].className == "success" ||
      children[i].className == "error"
    ) {
      children[i].remove();
    }
  }

  //   3cü mərhələ:ekrana bildiriş çıxır
  if (userInput.value == username && passwordInput.value == password) {
    statusMessage("success", "Uğurlu giriş");
    userInput.value = "";
    passwordInput.value = "";
  } else {
    statusMessage("error", "İstifadəçi adı və ya şifrə yanlışdır...");
  }
});

function statusMessage(className, message) {
  const div = document.createElement("div");
  div.classList.add(className);
  div.textContent = message;
  form.appendChild(div);
}
