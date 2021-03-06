'use strict'

const callElem = selector => document.querySelector(selector),
    nameInput = callElem('.nameInput'),
    surnameInput = callElem('.surnameInput'),
    emailInput = callElem('.emailInput'),
    form = callElem('form'),
    tr = callElem('tr'),
    tbody = callElem('tbody'),
    contactMessage = callElem('.contact__message'),
    enter = callElem('.enter');


let mod;

function Person(name, surname, email) {
    this.name = name;
    this.surname = surname;
    this.email = email;
}

tbody.addEventListener('click', e => {
    e.preventDefault();

    const tr = e.target.parentElement.parentElement;

    if (e.target.classList.contains('btn_delete')) {
        tr.remove();

        const email = e.target.parentElement.previousElementSibling.textContent;
        deleteLS(email)

    } else if (e.target.classList.contains('btn_modify')) {
        mod = tr;

        enter.textContent = 'update';
        enter.style.backgroundColor = '#ffc107';

        nameInput.value = tr.children[0].textContent;
        surnameInput.value = tr.children[1].textContent;
        emailInput.value = tr.children[2].textContent;
    }

})


form.addEventListener('submit', e => {
    e.preventDefault();

    const newPerson = new Person(nameInput.value, surnameInput.value, emailInput.value);

    let status = controlInputs(newPerson);

    const children = contactMessage.children;

    for (let i = 0; i < children.length; i++) {
        if (children[i].className === 'success' || children[i].className === 'error') {
            children[i].remove();
        }
    }

    if (!status) {
        statusMessage('error', 'Required failed');
        return;
    }

    if (!mod) {

        toTable(newPerson);

        statusMessage('success', 'Successfully!');

        setLS(newPerson);

        resetInputs();

    } else if (mod) {

        const oldPersonEmail = mod.children[2].textContent;
        updateLS(oldPersonEmail, newPerson)

        mod.children[0].textContent = newPerson.name;
        mod.children[1].textContent = newPerson.surname;
        mod.children[2].textContent = newPerson.email;
        resetInputs();

        mod = null;
        enter.textContent = 'Enter';
        enter.style.backgroundColor = '';

        statusMessage('success', 'Update');
    }
});

function resetInputs() {
    nameInput.value = '';
    surnameInput.value = '';
    emailInput.value = '';
}

function controlInputs(newPerson) {

    let status = true;

    for (let key in newPerson) {
        if (newPerson[key] === '') {
            status = false;
        }
    }
    return status;
}

function statusMessage(className, message) {
    const div = document.createElement('div');
    div.classList.add(className);
    div.textContent = message;
    contactMessage.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000)
}

function setLS(value) {
    let data = getLS();
    data.push(value);

    localStorage.setItem('object', JSON.stringify(data));
}

function getLS() {
    let arr;
    if (localStorage.getItem('object') == null) {
        arr = [];
    } else {
        arr = JSON.parse(localStorage.getItem('object'));
    }

    return arr;
}


function toTable(newPerson) {
    const tr = document.createElement('tr');

    tr.textContent = newPerson;

    tr.innerHTML = `
        
    <td>${newPerson.name}</td>
    <td>${newPerson.surname}</td>
    <td>${newPerson.email}</td>
    <td> <button class="btn_delete"><i
    class="fa-solid
    fa-trash-can"></i></button>
    <button class="btn_modify"><i
    class="fa-solid
    fa-pen-to-square"></i></button></td>
    `
    tbody.appendChild(tr);
}

function updateLS(oldPersonEmail, newPerson) {
    let arr = getLS();
    arr.forEach(item => {
        if (item.email == oldPersonEmail) {
            item.name = newPerson.name;
            item.surname = newPerson.surname;
            item.email = newPerson.email;
        }
    })

    localStorage.setItem('object', JSON.stringify(arr));
}

function deleteLS(email) {
    let arr = getLS();
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].email == email) {
            arr.splice(i, 1);
        }
    }
    localStorage.setItem('object', JSON.stringify(arr));
}


const data = getLS();
data.forEach(item => {
    toTable(item);
})