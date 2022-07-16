'use strict';

// 1ci variant
// const addToCart = document.querySelectorAll('.add__cart');

// addToCart.forEach(item => {
//     item.addEventListener('click', (e) => {
//         e.preventDefault();

//         const target = e.target.parentElement.parentElement;
//         const img = target.children[0].getAttribute('src');
//         const name = target.parentElement.children[1].textContent;
//         const price = target.parentElement.children[2].textContent;

//         const newProduct = {
//             img: img,
//             name: name,
//             price: price
//         }

//         setLS(newProduct);
//     })
// })

// 2ci variant
const addToCart = document.querySelectorAll('.add__cart'),
    cardItem = document.querySelectorAll('.card__item'),
    img = document.querySelectorAll('img'),
    cardName = document.querySelectorAll('.card__name'),
    span = document.querySelectorAll('span');

for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener('click', e => {
        e.preventDefault();

        const newProduct = {
            img: img[i].getAttribute('src'),
            name: cardName[i].textContent,
            price: span[i].textContent
        }

        setLS(newProduct);
    });
}

function getLS() {
    let arr;

    if (localStorage.getItem('products') == null) {
        arr = [];
    } else {
        arr = JSON.parse(localStorage.getItem('products'));
    }

    return arr;
}

function setLS(value) {
    let data = getLS();
    data.push(value);

    localStorage.setItem('products', JSON.stringify(data));
}
