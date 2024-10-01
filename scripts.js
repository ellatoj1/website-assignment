let cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartContainer = document.getElementById('cart-container');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Produktinformation
const products = [
    {
        name: "Probiotic Tampon Medium",
        price: 50,
        image: "images/ellen-probiotic-tampon-medium_1-612x800.png"
    },
    {
        name: "Probiotic Tampon Rich",
        price: 60,
        image: "images/probiotic-tampon-rich.jpg"
    },
    {
        name: "Menstrual Kit",
        price: 100,
        image: "images/menskit-1.jpg"
    }
];

// Lägg till produkt i varukorgen när användaren klickar på knappen
document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', (event) => {
        const productIndex = event.target.getAttribute('data-product-index');
        const product = products[productIndex];

        // Kolla om produkten redan finns i varukorgen
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1; // Öka antalet om produkten redan finns
        } else {
            cart.push({ ...product, quantity: 1 }); // Lägg till ny produkt med quantity: 1
        }

        updateCart();
    });
});

function updateCart() {
    // Uppdatera antalet varor i korgen
    cartCountElement.innerText = cart.reduce((acc, product) => acc + product.quantity, 0);
    
    // Visa produkterna i varukorgen
    cartItemsElement.innerHTML = ''; // Töm tidigare varor
    let total = 0;
    
    cart.forEach((product, index) => {
        total += product.price * product.quantity;
        cartItemsElement.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" width="50">
                <p>${product.name} - ${product.price} kr</p>
                <div class="quantity-controls">
                    <p>Antal:</p> 
                    <button class="decrease" data-index="${index}">-</button>
                    <p>${product.quantity}</p>
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <button class="remove" data-index="${index}">Ta bort</button>
            </div>
        `;
    });
    
    // Uppdatera totalbeloppet
    cartTotalElement.innerText = total;

    // Lägg till eventlisteners för att ta bort och justera antal
    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeFromCart(index);
        });
    });

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            increaseQuantity(index);
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            decreaseQuantity(index);
        });
    });
}


function removeFromCart(index) {
    cart.splice(index, 1); // Ta bort produkten från varukorgen
    updateCart();
}

function increaseQuantity(index) {
    cart[index].quantity += 1; // Öka antal
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Minska antal
    } else {
        removeFromCart(index); // Ta bort om antalet är 1
    }
    updateCart();
}

// Visa/Dölj varukorgen
function toggleCart() {
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
}
