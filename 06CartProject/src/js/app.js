'use strict';

// 1ci variant
// const addToCart = document.querySelectorAll('.add__cart');

// addToCart.forEach(item => {
//     item.addEventListener('click', e => {
//         e.preventDefault();

//         const target = e.target.parentElement.parentElement;
//         const img = target.children[0].getAttribute('src');
//         const cardName = target.parentElement.children[1].textContent;
//         const price = target.parentElement.children[2].textContent;

//         const newProduct = {
//             img: img,
//             name: cardName,
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
            price: span[i].textContent,
            count: 1
        }

        setLS(newProduct);
        statusMessage(newProduct.name);
    })
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

function setLS(newProduct) {
    let data = getLS();
    let newData = data.find(item => item.name == newProduct.name);
    if (!newData) {
        data.push(newProduct)
    } else {
        newData.count++;
    }

    localStorage.setItem('products', JSON.stringify(data));
}

function statusMessage(title) {
    const mes = document.querySelector('.status__message');

    mes.style.display = 'flex';
    mes.children[1].textContent = `"${title}" has been added to your cart`

    setTimeout(() => {
        document.querySelector('.status__message').style.display = 'none';
    }, 3000)
}


