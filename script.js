/* =========================================
   FITFUEL FRONTEND
========================================= */


const products = [

    {
        id: 1,
        name: "Whey Protein",
        category: "protein",
        description: "Premium whey protein for muscle recovery.",
        price: 2499,
        image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 2,
        name: "Whey Isolate",
        category: "protein",
        description: "High-purity whey isolate with low fat.",
        price: 2999,
        image: "https://images.unsplash.com/photo-1579722821273-0f6c1d44362f?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,
        name: "Plant Protein",
        category: "protein",
        description: "Plant-based protein for everyday nutrition.",
        price: 2799,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,
        name: "Casein Protein",
        category: "protein",
        description: "Slow-digesting protein for overnight recovery.",
        price: 2999,
        image: "https://images.unsplash.com/photo-1595557622548-2b0e0b7b5f3d?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 5,
        name: "Creatine Monohydrate",
        category: "supplements",
        description: "Pure creatine monohydrate for strength.",
        price: 799,
        image: "https://images.unsplash.com/photo-1594498255392-43d0a98f7a7a?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "Creatine Capsules",
        category: "supplements",
        description: "Convenient creatine capsules.",
        price: 1199,
        image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 7,
        name: "Pre-Workout",
        category: "supplements",
        description: "Pre-workout formula for training sessions.",
        price: 1699,
        image: "https://images.unsplash.com/photo-1579722821273-0f6c1d44362f?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 8,
        name: "Electrolyte Mix",
        category: "supplements",
        description: "Electrolytes for hydration and performance.",
        price: 599,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 9,
        name: "Protein Bar",
        category: "snacks",
        description: "Convenient protein snack for busy days.",
        price: 99,
        image: "https://images.unsplash.com/photo-1622484211148-7e5b2a1c3e8e?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 10,
        name: "Protein Cookies",
        category: "snacks",
        description: "Crunchy cookies with added protein.",
        price: 149,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 11,
        name: "Peanut Butter",
        category: "snacks",
        description: "Creamy peanut butter with high protein.",
        price: 399,
        image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 12,
        name: "Protein Oats",
        category: "snacks",
        description: "High-protein oats for breakfast.",
        price: 349,
        image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 13,
        name: "BCAA Drink",
        category: "supplements",
        description: "Refreshing BCAA drink for training.",
        price: 999,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 14,
        name: "Shaker Bottle",
        category: "accessories",
        description: "Durable shaker bottle for your protein.",
        price: 499,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 15,
        name: "Gym Bag",
        category: "accessories",
        description: "Spacious fitness bag for your equipment.",
        price: 1299,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 16,
        name: "Resistance Bands",
        category: "accessories",
        description: "Portable resistance bands for workouts.",
        price: 699,
        image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80"
    }

];


/* =========================================
   STATE
========================================= */

let selectedCategory = "all";

let cart = JSON.parse(
    localStorage.getItem("fitfuel_cart")
) || [];


/* =========================================
   FORMAT MONEY
========================================= */

function money(value) {

    return "₹" + Number(value).toLocaleString("en-IN");

}


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts() {

    const grid =
        document.getElementById("productGrid");

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const filtered = products.filter(product => {

        const categoryMatch =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const searchMatch =
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search);

        return categoryMatch && searchMatch;

    });


    if (filtered.length === 0) {

        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
                color:#888;
            ">
                No products found.
            </div>
        `;

        return;
    }


    grid.innerHTML = filtered.map(product => `

        <article class="product-card">

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                onerror="this.style.display='none'"
            >

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <div class="product-price">
                        ${money(product.price)}
                    </div>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})">

                        +

                    </button>

                </div>

            </div>

        </article>

    `).join("");

}


/* =========================================
   CATEGORY FILTER
========================================= */

function filterCategory(category, button) {

    selectedCategory = category;


    document
        .querySelectorAll(".category")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    displayProducts();

}


/* =========================================
   CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "fitfuel_cart",
        JSON.stringify(cart)
    );

}


function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    if (!product) return;


    const existing =
        cart.find(item => item.id === productId);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,
            quantity: 1

        });

    }


    saveCart();

    updateCart();

    openCart();

}


function changeQuantity(productId, amount) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== productId);

    }


    saveCart();

    updateCart();

}


function removeFromCart(productId) {

    cart =
        cart.filter(item => item.id !== productId);

    saveCart();

    updateCart();

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const container =
        document.getElementById("cartItems");

    const count =
        cart.reduce(
            (total, item) => total + item.quantity,
            0
        );


    document.getElementById("cartCount").textContent =
        count;


    if (cart.length === 0) {

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:60px 10px;
                color:#888;
            ">
                Your cart is empty.
            </div>
        `;

        document.getElementById("cartTotal").textContent =
            "₹0";

        return;
    }


    let total = 0;


    container.innerHTML =
        cart.map(item => {

            const product =
                products.find(p => p.id === item.id);

            if (!product) return "";


            const itemTotal =
                product.price * item.quantity;

            total += itemTotal;


            return `

                <div class="cart-item">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div class="cart-item-info">

                        <h4>
                            ${product.name}
                        </h4>

                        <div class="cart-item-price">
                            ${money(itemTotal)}
                        </div>

                        <div class="quantity-controls">

                            <button
                                onclick="changeQuantity(${product.id}, -1)">
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(${product.id}, 1)">
                                +
                            </button>

                            <button
                                class="remove-item"
                                onclick="removeFromCart(${product.id})">
                                Remove
                            </button>

                        </div>

                    </div>

                </div>

            `;

        }).join("");


    document.getElementById("cartTotal").textContent =
        money(total);

}


/* =========================================
   OPEN / CLOSE CART
========================================= */

function openCart() {

    document
        .getElementById("cartDrawer")
        .classList.add("open");

    document
        .getElementById("cartOverlay")
        .classList.add("show");

}


function closeCart() {

    document
        .getElementById("cartDrawer")
        .classList.remove("open");

    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}


/* =========================================
   CALCULATOR
========================================= */

document
    .getElementById("calculatorForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const gender =
            document.getElementById("gender").value;

        const age =
            Number(document.getElementById("age").value);

        const weight =
            Number(document.getElementById("weight").value);

        const height =
            Number(document.getElementById("height").value);

        const activity =
            Number(document.getElementById("activity").value);

        const goal =
            document.getElementById("goal").value;


        if (
            !age ||
            !weight ||
            !height
        ) {

            alert("Please enter your age, weight and height.");

            return;

        }


        let bmr;


        if (gender === "male") {

            bmr =
                10 * weight +
                6.25 * height -
                5 * age +
                5;

        } else {

            bmr =
                10 * weight +
                6.25 * height -
                5 * age -
                161;

        }


        let calories =
            bmr * activity;


        if (goal === "loss") {

            calories -= 300;

        }

        if (goal === "gain") {

            calories += 250;

        }


        calories =
            Math.round(calories);


        const protein =
            Math.round(weight * 1.8);


        const fat =
            Math.round(
                calories * 0.25 / 9
            );


        const carbs =
            Math.max(
                0,
                Math.round(
                    (calories -
                        protein * 4 -
                        fat * 9) / 4
                )
            );


        document.getElementById("caloriesResult")
            .textContent = calories;

        document.getElementById("proteinResult")
            .textContent = protein;

        document.getElementById("carbsResult")
            .textContent = carbs;

        document.getElementById("fatResult")
            .textContent = fat;


        document
            .getElementById("calculatorResult")
            .classList.remove("hidden");

    });


/* =========================================
   CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    closeCart();

    document
        .getElementById("checkoutModal")
        .classList.add("show");

}


function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("show");

}


document
    .getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("customerName").value;

        const email =
            document.getElementById("customerEmail").value;

        const phone =
            document.getElementById("customerPhone").value;

        const address =
            document.getElementById("customerAddress").value;


        if (!name || !email || !phone || !address) {

            alert("Please fill all fields.");

            return;

        }


        /*
            TEMPORARY CHECKOUT

            Later this form will send the
            order to our online backend/database.
        */


        const orderNumber =
            "FF" +
            Date.now()
                .toString()
                .slice(-8);


        alert(
            "Order created successfully!\n\n" +
            "Order ID: " +
            orderNumber +
            "\n\n" +
            "Thank you, " +
            name +
            "!"
        );


        cart = [];

        saveCart();

        updateCart();

        closeCheckout();

        this.reset();

    });


/* =========================================
   INITIALIZE
========================================= */

displayProducts();

updateCart();
