console.log("Odisha Rasoi website loaded successfully!");
// ==============================
// CART
// ==============================

let cartCount = 0;
let cartTotal = 0;


// ==============================
// CHANGE QUANTITY
// ==============================

function changeQuantity(button, amount) {

    const qtyBox = button.parentElement;

    const number = qtyBox.querySelector("span");

    let quantity = parseInt(number.innerText);

    quantity += amount;

    if (quantity < 1) {
        quantity = 1;
    }

    number.innerText = quantity;
}


// ==============================
// ADD TO CART
// ==============================

function addToCart(itemName, price, button) {

    const foodAction = button.parentElement;

    const quantityElement =
        foodAction.querySelector(".qty span");

    const quantity =
        parseInt(quantityElement.innerText);

    const itemTotal = price * quantity;

    cartCount += quantity;

    cartTotal += itemTotal;

    document.getElementById("cart-count").innerText =
        cartCount;

    document.getElementById("cart-total").innerText =
        cartTotal;

    button.innerText = "Added ✓";

    setTimeout(() => {

        button.innerText = "Add to Cart";

    }, 1000);

}


// ==============================
// MENU FILTER
// ==============================

function filterMenu(category, button) {

    const foodCards =
        document.querySelectorAll(".food-card");

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    // Remove active from all buttons

    filterButtons.forEach(btn => {

        btn.classList.remove("active");

    });


    // Add active to selected button

    button.classList.add("active");


    // Filter cards

    foodCards.forEach(card => {

        const cardCategory =
            card.dataset.category;


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });

}
// ==============================
// GALLERY FILTER
// ==============================

function filterGallery(category, button) {

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const filterButtons =
        document.querySelectorAll(".gallery-filter-btn");


    // Remove active class

    filterButtons.forEach(btn => {

        btn.classList.remove("active");

    });


    // Activate selected button

    button.classList.add("active");


    // Filter gallery

    galleryItems.forEach(item => {

        const itemCategory =
            item.dataset.gallery;


        if (
            category === "all" ||
            itemCategory === category
        ) {

            item.classList.remove("gallery-hidden");

        } else {

            item.classList.add("gallery-hidden");

        }

    });

}


// ==============================
// OPEN LIGHTBOX
// ==============================

function openLightbox(imageSrc) {

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightbox-image");


    lightboxImage.src = imageSrc;

    lightbox.classList.add("show");

}


// ==============================
// CLOSE LIGHTBOX
// ==============================

function closeLightbox() {

    const lightbox =
        document.getElementById("lightbox");

    lightbox.classList.remove("show");

}


// ==============================
// CLOSE LIGHTBOX WITH ESC
// ==============================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeLightbox();

    }

});
// ==============================
// CONTACT FORM
// ==============================

function submitContactForm(event) {

    event.preventDefault();

    const successMessage =
        document.getElementById("contact-success");

    successMessage.innerText =
        "Thank you! Your message has been received.";

    successMessage.classList.add("show");

    document.getElementById("contact-form").reset();

}


// ==============================
// RESERVATION FORM
// ==============================

function submitReservation(event) {

    event.preventDefault();

    const successMessage =
        document.getElementById("reservation-success");

    successMessage.innerText =
        "Your reservation request has been submitted!";

    successMessage.classList.add("show");

    document
        .getElementById("reservation-form")
        .reset();

}
// ==============================
// CHECKOUT
// ==============================

function checkoutCart() {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add some food first.");

        return;
    }


    alert(
        "Thank you for your order! Checkout will be available soon."
    );

}
// ==============================
// MOBILE NAVIGATION
// ==============================

const menuToggle =
    document.getElementById("menu-toggle");

const navMenu =
    document.getElementById("nav-menu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });

}
// ==============================
// SHOPPING CART
// ==============================

let cart = [];


// ==============================
// ADD TO CART
// ==============================

function addToCart(itemName, price, button) {

    const foodAction = button.parentElement;

    const quantityElement =
        foodAction.querySelector(".qty span");

    const quantity =
        parseInt(quantityElement.innerText);


    // Check if item already exists

    const existingItem =
        cart.find(item => item.name === itemName);


    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({
            name: itemName,
            price: price,
            quantity: quantity
        });

    }


    // Reset quantity back to 1

    quantityElement.innerText = 1;


    // Button feedback

    button.innerText = "Added ✓";

    setTimeout(() => {

        button.innerText = "Add to Cart";

    }, 1000);


    updateCart();

}


// ==============================
// UPDATE CART
// ==============================

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";


    let totalItems = 0;

    let totalPrice = 0;


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <span>🛒</span>

                <p>Your cart is empty</p>

                <small>
                    Add some delicious Odia dishes!
                </small>

            </div>
        `;

    }


    // Cart items

    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        totalItems += item.quantity;

        totalPrice += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                </div>


                <div class="cart-item-right">

                    <strong>
                        ₹${itemTotal}
                    </strong>


                    <div class="cart-item-controls">

                        <button
                            onclick="changeCartQuantity(${index}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeCartQuantity(${index}, 1)">
                            +
                        </button>

                        <button
                            class="remove-cart"
                            onclick="removeFromCart(${index})">
                            ×
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    cartCount.innerText = totalItems;

    cartTotal.innerText = totalPrice;

}


// ==============================
// CHANGE CART QUANTITY
// ==============================

function changeCartQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// ==============================
// REMOVE FROM CART
// ==============================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ==============================
// CLEAR CART
// ==============================

function clearCart() {

    if (cart.length === 0) {

        return;

    }


    cart = [];

    updateCart();

}


// ==============================
// CHECKOUT
// ==============================

function checkoutCart() {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add some food first.");

        return;

    }


    alert(
        "Thank you for your order! Checkout will be available soon."
    );

}