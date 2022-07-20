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

tbody.addEventListener('click', (e) => {
    const tr = e.target.parentElement.parentElement;

    if (e.target.classList.contains('btn_delete')) {
        tr.remove();
    } else if (e.target.classList.contains('btn_modify')) {
        mod = tr;

        enter.textContent = 'update';
        enter.style.backgroundColor = '#ffc107';

        nameInput.value = tr.children[0].textContent;
        surnameInput.value = tr.children[1].textContent;
        emailInput.value = tr.children[2].textContent;
    }

})


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPerson = {
        name: nameInput.value,
        surname: surnameInput.value,
        email: emailInput.value
    }

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


function toTable(value) {
    const tr = document.createElement('tr');

    tr.textContent = value;

    tr.innerHTML = `
        
    <td>${value.name}</td>
    <td>${value.surname}</td>
    <td>${value.email}</td>
    <td> <button class="btn_delete"><i
    class="fa-solid
    fa-trash-can"></i></button>
    <button class="btn_modify"><i
    class="fa-solid
    fa-pen-to-square"></i></button></td>
    `
    tbody.appendChild(tr);
}

const data = getLS();
data.forEach(item => {
    toTable(item);
})