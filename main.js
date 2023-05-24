



var preScreen = document.getElementById("preloader");

window.addEventListener ("load", function (){
  preScreen.style.display = "none";
})






let img = document.querySelector('.img');
let container = document.querySelector('.container-fluid');


function phones(src) {
    img.src = src;
}

function colors(color) {
    container.style.background = color;
}

let search = document.querySelector('.search-box');

  document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
}


let body = document.querySelector("body");
let cartIcon = document.querySelector("#cart-icon");
let cartt = document.querySelector(".cart");
let cartClose = document.querySelector("#cart-close");

cartIcon.onclick = () => {
    cartt.classList.add('active');
    body.style.marginRight = "350px";
}
cartClose.onclick = () => {
    cartt.classList.remove('active');
    body.style.marginRight = "0";

}






// cart
// SELECT ELEMENTS
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");




productsEl.onclick = () => {
  cartt.classList.add('active');
  body.style.marginRight = "350px";
}


const porductsListEl = document.querySelector(".products-list");
const seeMoreBtn = document.querySelector(".see-more-btn");
const scrollDown = document.querySelector(".scroll");

// seeMoreBtn.onclick = () => {
//     porductsListEl.scrollIntoView({behavior: "smooth"});
// }

seeMoreBtn.onclick = () => {
  scrollDown.scrollIntoView({behavior: "smooth"});
}




// RENDER PRODUCTS
function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        
                        <img src="icons/bag-plus.png" >

                    </div>
                </div>
            </div>
        `;
  });
}
renderProdcuts();





{/* <i  class="fa-solid fa-cart-plus cart-price"></i> */}


// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}



// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
  totalItemsInCartEl.innerHTML = totalItems;
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}









// sending mails

// let sendButton = document.getElementById("btn");
// let form = document.getElementById("form");


// sendButton.addEventListener('click', function(e) {
// e.preventDefault();
// sendButton.value = 'sending.....';
// const serviceId = 'service_38s70ec';
// const templateId = 'template_qhrxtwp';

// emailjs.send (serviceId, templateId, form)
// .then(() => {
//   sendButton.value = 'send email';
//   alert('sent!');
// }, (err) => {
//   sendButton.value = 'send email';
// alert(JSON.stringify(err));
// });

// });




// const sendButton = document.getElementById("btnnn");
// const form = document.getElementById("form");
// const serviceId = 'service_38s70ec';
// const templateId = 'template_qhrxtwp';

// sendButton.addEventListener('click', function(e) {
//   e.preventDefault();
//   sendButton.value = 'Sending...';
  
//   emailjs.send(serviceId, templateId, form)
//     .then(() => {
//       sendButton.value = 'Send Email';
//       const successMsg = document.createElement('p');
//       successMsg.textContent = 'Email sent successfully!';
//       form.appendChild(successMsg);
//     })
//     .catch((err) => {
//       sendButton.value = 'Send Email';
//       console.error(err);
//       const errorMsg = document.createElement('p');
//       errorMsg.textContent = 'An error occurred, please try again later.';
//       form.appendChild(errorMsg);
//     });
// });





let serviceId = 'service_38s70ec';
let templateId = 'template_qhrxtwp';
let btnSend = document.getElementById('btnnn');

btnSend.onclick = () => {

  var params = {
    name: document.getElementById('name').value,
    reply_email: document.getElementById('mail').value,
    message: document.getElementById('message').value
  };
  
  emailjs.send(serviceId, templateId, params)
  .then(function(response) {
    alert("Message sent successfully!");
  }, function(error) {
    alert('FAILED...', error);
  });


} 













// var btnSend = document.getElementById('btn');
// var templateParams = {
//   name: document.getElementById('name'),
//   email: document.getElementById('email'),
//   message: document.getElementById('message'),
// };

// btnSend.onclick = () =>{
// emailjs.send('service_38s70ec', 'template_qhrxtwp', templateParams)
//   .then(
//      alert('SUCCESS!')
  
//   );
// }











