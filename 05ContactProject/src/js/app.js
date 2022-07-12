'use strict'

const callElem = selector => document.querySelector(selector),
    nameInput = callElem('.nameInput'),
    surnameInput = callElem('.surnameInput'),
    emailInput = callElem('.emailInput'),
    form = callElem('form'),
    tr = callElem('tr'),
    tbody = callElem('tbody'),
    contactMessage = callElem('.contact__message');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    // console.log(nameInput);

    const newPerson = {
        name: nameInput.value,
        surname: surnameInput.value,
        email: emailInput.value
    }

    let status = controlInputs(newPerson);

    // variant 1
    // if (newPerson.name === '' || newPerson.surname === '' || newPerson.email === '') {
    //     alert('Boşluqları doldurun')
    // }

    // variant 2
    //     if (status) {
    //         const contactItem = document.createElement('div');
    //         contactItem.classList.add('contact__item');
    //         contactItem.innerHTML = `
    //     <div class="contact__left">
    //         <h5>${newPerson.name}</h5>
    //         <h5>${newPerson.surname}</h5>
    //         <h5>${newPerson.email}</h5>
    //         </div>
    //         <div class="contact__right">
    //         <button class="btn_delete"><i class="fa-solid
    //                 fa-trash-can"></i></button>
    //         <button class="btn_modify"><i class="fa-solid
    //                 fa-pen-to-square"></i></button>
    //         </div>
    //     `
    //         contactContent.appendChild(contactItem);
    //     } else {
    //         alert('Boşluqları doldurun');
    //     }

    // });

    const children = contactMessage.children;
    console.log(children);
    for (let i = 0; i < children.length; i++) {
        if (children[i].className === 'success' || children[i].className === 'error') {
            children[i].remove();
        }
    }

    //variant 3 Optimal
    if (!status) {
        statusMessage('error', 'Required failed');
        return;
    }
    const tr = document.createElement('tr');

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
    statusMessage('success', 'Successfully!');

    nameInput.value = '';
    surnameInput.value = '';
    emailInput.value = '';
});


// variant 1
// function controlInputs(newPerson) {
//     if (newPerson.name === '' || newPerson.surname === '' || newPerson.email === '') {
//         return false;
//     } else {
//         return true;
//     }
// }

// variant 2
// function controlInputs(newPerson) {
//     for (let key in newPerson) {
//         if (newPerson[key] === '') {
//             return false;
//         } else {
//             return true;
//         }

//     }
// }

// variant 3 Optimal
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
}