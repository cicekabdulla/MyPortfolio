'use strict';

function getLS() {
    let arr;

    if (localStorage.getItem('products') == null) {
        arr = [];
    } else {
        arr = JSON.parse(localStorage.getItem('products'));
    }

    return arr;
}

function toTable(value) {
    const tr = document.createElement('tr');
    tr.textContent = value;
    tr.innerHTML = `
    <td>
    <div>
        <img src=${value.img} alt="">
        <h4>${value.name}</h4>
    </div>
    </td>
    <td>
        <div>
            <span>${value.price}</span>
            <i class="fa-solid fa-xmark"></i>
        </div>
    </td> 
    `

    document.querySelector('tbody').appendChild(tr);
}

const data = getLS();
data.forEach(item => {
    toTable(item)
})