/* =========================================================
   FITFUEL - COMPLETE FRONTEND
   Products + Supabase + Cart + Calculator
   Exercise Hub + Train Like The Pros
========================================================= */

"use strict";

/* =========================================================
   GLOBAL STATE
========================================================= */

let products = [];
let selectedCategory = "all";
let exerciseGoal = "all";
let exerciseDifficulty = "all";
let selectedSport = "football";

let cart = [];

try {
    cart = JSON.parse(localStorage.getItem("fitfuel_cart")) || [];
    if (!Array.isArray(cart)) cart = [];
} catch (error) {
    cart = [];
}

/* =========================================================
   FALLBACK PRODUCTS
   Used when Supabase is unavailable.
========================================================= */

const fallbackProducts = [
    {
        id: 1,
        name: "Whey Protein",
        category: "protein",
        description: "High-quality whey protein for muscle recovery.",
        price: 2499,
        image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Whey Isolate",
        category: "protein",
        description: "Fast absorbing protein with high protein content.",
        price: 2999,
        image: "https://images.unsplash.com/photo-1579722821273-0f6c2f6a7e9f?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Creatine Monohydrate",
        category: "supplements",
        description: "Supports strength, power and training performance.",
        price: 999,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Pre Workout",
        category: "supplements",
        description: "Pre-workout formula for energy and focus.",
        price: 1499,
        image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Protein Bars",
        category: "snacks",
        description: "Convenient high-protein snack.",
        price: 499,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476b?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Protein Shaker",
        category: "accessories",
        description: "Leak-resistant shaker bottle.",
        price: 399,
        image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "BCAA",
        category: "supplements",
        description: "Amino acid supplement for training support.",
        price: 1199,
        image: "https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "Mass Gainer",
        category: "protein",
        description: "High-calorie formula for gaining body mass.",
        price: 2699,
        image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        name: "Plant Protein",
        category: "protein",
        description: "Plant-based protein option for daily nutrition.",
        price: 2199,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        name: "Electrolyte Mix",
        category: "supplements",
        description: "Hydration support for training sessions.",
        price: 799,
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
    }
];

/* =========================================================
   EXERCISE DATABASE
========================================================= */

const exercises = [
    {
        id: 1,
        name: "Running",
        category: "cardio",
        goals: ["fat loss", "cardio"],
        body: "Full Body",
        difficulty: "Beginner",
        equipment: "None",
        sets: "1",
        reps: "20–30 min",
        description: "Steady running or jogging for cardiovascular fitness and conditioning.",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        name: "Jump Rope",
        category: "cardio",
        goals: ["fat loss", "cardio"],
        body: "Full Body",
        difficulty: "Intermediate",
        equipment: "Rope",
        sets: "3",
        reps: "2–5 min",
        description: "Fast-paced skipping for conditioning, coordination and footwork.",
        image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        name: "Burpees",
        category: "fat loss",
        goals: ["fat loss", "cardio", "conditioning"],
        body: "Full Body",
        difficulty: "Intermediate",
        equipment: "None",
        sets: "3",
        reps: "10–15",
        description: "Full-body conditioning exercise combining a squat, plank and jump.",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        name: "Bodyweight Squat",
        category: "legs",
        goals: ["muscle building", "strength", "fat loss", "home workout"],
        body: "Legs",
        difficulty: "Beginner",
        equipment: "None",
        sets: "3",
        reps: "12–20",
        description: "Fundamental lower-body exercise suitable for home or gym training.",
        image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 5,
        name: "Barbell Squat",
        category: "strength",
        goals: ["muscle building", "strength"],
        body: "Legs",
        difficulty: "Advanced",
        equipment: "Barbell",
        sets: "3–5",
        reps: "5–10",
        description: "Compound lower-body strength movement. Use appropriate technique and load.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 6,
        name: "Push Ups",
        category: "chest",
        goals: ["muscle building", "strength", "home workout"],
        body: "Chest",
        difficulty: "Beginner",
        equipment: "None",
        sets: "3",
        reps: "8–20",
        description: "Classic upper-body exercise for chest, shoulders and triceps.",
        image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 7,
        name: "Bench Press",
        category: "chest",
        goals: ["muscle building", "strength"],
        body: "Chest",
        difficulty: "Intermediate",
        equipment: "Barbell",
        sets: "3–4",
        reps: "6–12",
        description: "Gym pressing movement for upper-body strength and muscle development.",
        image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 8,
        name: "Pull Ups",
        category: "back",
        goals: ["muscle building", "strength", "home workout"],
        body: "Back",
        difficulty: "Intermediate",
        equipment: "Pull-up Bar",
        sets: "3",
        reps: "5–12",
        description: "Bodyweight pulling exercise targeting the back and arms.",
        image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 9,
        name: "Dumbbell Row",
        category: "back",
        goals: ["muscle building", "strength"],
        body: "Back",
        difficulty: "Intermediate",
        equipment: "Dumbbells",
        sets: "3",
        reps: "8–12",
        description: "Single-arm pulling movement for the upper back.",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 10,
        name: "Shoulder Press",
        category: "shoulders",
        goals: ["muscle building", "strength"],
        body: "Shoulders",
        difficulty: "Intermediate",
        equipment: "Dumbbells",
        sets: "3",
        reps: "8–12",
        description: "Overhead pressing movement for shoulder strength.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 11,
        name: "Bicep Curl",
        category: "arms",
        goals: ["muscle building", "strength"],
        body: "Arms",
        difficulty: "Beginner",
        equipment: "Dumbbells",
        sets: "3",
        reps: "10–15",
        description: "Simple isolation movement for the biceps.",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 12,
        name: "Tricep Dips",
        category: "arms",
        goals: ["muscle building", "strength", "home workout"],
        body: "Triceps",
        difficulty: "Intermediate",
        equipment: "Bench",
        sets: "3",
        reps: "8–15",
        description: "Bodyweight movement targeting the triceps.",
        image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 13,
        name: "Plank",
        category: "core",
        goals: ["strength", "home workout"],
        body: "Core",
        difficulty: "Beginner",
        equipment: "None",
        sets: "3",
        reps: "30–60 sec",
        description: "Core stability exercise that can be performed almost anywhere.",
        image: "https://images.unsplash.com/photo-1548261977-3f4e4e9b8a9c?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 14,
        name: "Mountain Climbers",
        category: "core",
        goals: ["fat loss", "cardio", "home workout"],
        body: "Core",
        difficulty: "Intermediate",
        equipment: "None",
        sets: "3",
        reps: "30–45 sec",
        description: "Dynamic exercise combining core work and cardiovascular conditioning.",
        image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 15,
        name: "Lunges",
        category: "legs",
        goals: ["muscle building", "strength", "fat loss", "home workout"],
        body: "Legs",
        difficulty: "Beginner",
        equipment: "None",
        sets: "3",
        reps: "10–15 each leg",
        description: "Unilateral lower-body exercise for legs and balance.",
        image: "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 16,
        name: "Cycling",
        category: "cardio",
        goals: ["fat loss", "cardio"],
        body: "Legs",
        difficulty: "Beginner",
        equipment: "Bicycle",
        sets: "1",
        reps: "30–60 min",
        description: "Low-impact cardiovascular activity for endurance.",
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 17,
        name: "Deadlift",
        category: "strength",
        goals: ["muscle building", "strength"],
        body: "Full Body",
        difficulty: "Advanced",
        equipment: "Barbell",
        sets: "3–5",
        reps: "3–8",
        description: "Compound strength movement requiring careful technique.",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 18,
        name: "Kettlebell Swing",
        category: "conditioning",
        goals: ["fat loss", "cardio", "strength"],
        body: "Full Body",
        difficulty: "Intermediate",
        equipment: "Kettlebell",
        sets: "3",
        reps: "12–20",
        description: "Explosive hip-driven exercise for conditioning and power.",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 19,
        name: "High Knees",
        category: "cardio",
        goals: ["fat loss", "cardio", "home workout"],
        body: "Full Body",
        difficulty: "Beginner",
        equipment: "None",
        sets: "3",
        reps: "30–60 sec",
        description: "Simple conditioning drill that can be performed at home.",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 20,
        name: "Glute Bridge",
        category: "legs",
        goals: ["strength", "muscle building", "home workout"],
        body: "Glutes",
        difficulty: "Beginner",
        equipment: "None",
        sets: "3",
        reps: "12–20",
        description: "Hip-extension exercise for glutes and posterior-chain strength.",
        image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80"
    }
];

/* =========================================================
   SPORT TRAINING PLANS
========================================================= */

const sportPlans = {
    football: {
        title: "Football Training",
        icon: "⚽",
        description: "Focus on acceleration, conditioning, lower-body strength, agility and core stability.",
        exercises: ["Running", "Bodyweight Squat", "Lunges", "Mountain Climbers", "Plank"]
    },

    cricket: {
        title: "Cricket Training",
        icon: "🏏",
        description: "Develop coordination, mobility, running fitness, shoulder strength and core stability.",
        exercises: ["Running", "Lunges", "Plank", "Dumbbell Row", "Shoulder Press"]
    },

    basketball: {
        title: "Basketball Training",
        icon: "🏀",
        description: "Build conditioning, leg strength, jumping ability, coordination and movement.",
        exercises: ["Bodyweight Squat", "Lunges", "Jump Rope", "Running", "Plank"]
    },

    tennis: {
        title: "Tennis Training",
        icon: "🎾",
        description: "Develop conditioning, core stability, shoulder strength and movement quality.",
        exercises: ["Running", "Jump Rope", "Plank", "Shoulder Press", "Lunges"]
    },

    boxing: {
        title: "Boxing Conditioning",
        icon: "🥊",
        description: "Work on conditioning, footwork, core strength and total-body endurance.",
        exercises: ["Jump Rope", "Burpees", "Mountain Climbers", "Running", "Plank"]
    },

    swimming: {
        title: "Swimming Support Training",
        icon: "🏊",
        description: "Build general strength, conditioning, mobility and core stability to complement swimming.",
        exercises: ["Plank", "Shoulder Press", "Running", "Bodyweight Squat", "Lunges"]
    }
};

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatPrice(value) {
    const number = Number(value) || 0;

    return number.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    });
}

function saveCart() {
    localStorage.setItem("fitfuel_cart", JSON.stringify(cart));
}

function getProductById(id) {
    return products.find(product => String(product.id) === String(id));
}

function getExerciseByName(name) {
    return exercises.find(
        exercise => exercise.name.toLowerCase() === String(name).toLowerCase()
    );
}

/* =========================================================
   SUPABASE PRODUCTS
========================================================= */

async function loadProducts() {

    const grid = document.getElementById("productGrid");

    if (grid) {
        grid.innerHTML = `
            <div class="fitfuel-loading">
                <div class="fitfuel-spinner"></div>
                <p>Loading products...</p>
            </div>
        `;
    }

    try {

        if (
            !window.supabaseClient ||
            typeof window.supabaseClient.from !== "function"
        ) {
            throw new Error("Supabase client unavailable");
        }

        const { data, error } = await window.supabaseClient
            .from("products")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            throw error;
        }

        if (Array.isArray(data) && data.length > 0) {

            products = data.map((product, index) => ({
                id: product.id ?? index + 1,
                name: product.name || product.title || "Fitness Product",
                category: String(product.category || "supplements").toLowerCase(),
                description:
                    product.description ||
                    product.details ||
                    "Premium fitness product.",
                price: Number(product.price ?? product.amount ?? 0),
                image:
                    product.image ||
                    product.image_url ||
                    product.photo ||
                    "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80"
            }));

        } else {

            products = [...fallbackProducts];

        }

    } catch (error) {

        console.warn("Supabase product loading failed:", error);

        products = [...fallbackProducts];

    }

    displayProducts();
}

/* =========================================================
   PRODUCT DISPLAY
========================================================= */

function displayProducts() {

    const grid = document.getElementById("productGrid");

    if (!grid) return;

    const searchInput = document.getElementById("searchInput");

    const searchTerm = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "all" ||
            String(product.category).toLowerCase() === selectedCategory;

        const searchableText = `
            ${product.name}
            ${product.category}
            ${product.description}
        `.toLowerCase();

        const matchesSearch =
            searchTerm === "" ||
            searchableText.includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {

        grid.innerHTML = `
            <div class="fitfuel-empty">
                <div>🔎</div>
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }

    grid.innerHTML = filteredProducts.map(product => {

        const image =
            product.image ||
            "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80";

        return `
            <article class="product-card fitfuel-product-card">

                <div class="product-image-wrap">

                    <img
                        src="${escapeHTML(image)}"
                        alt="${escapeHTML(product.name)}"
                        class="product-image"
                        loading="lazy"
                        onerror="this.style.display='none'; this.parentElement.classList.add('image-failed');"
                    >

                    <span class="product-category">
                        ${escapeHTML(product.category)}
                    </span>

                </div>

                <div class="product-info">

                    <h3>${escapeHTML(product.name)}</h3>

                    <p>
                        ${escapeHTML(product.description)}
                    </p>

                    <div class="product-bottom">

                        <strong>
                            ${formatPrice(product.price)}
                        </strong>

                        <button
                            class="primary-button add-product-button"
                            onclick="addToCart(${JSON.stringify(product.id)})"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </article>
        `;

    }).join("");
}

/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterCategory(category, button) {

    selectedCategory = String(category).toLowerCase();

    document.querySelectorAll(".category").forEach(item => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    displayProducts();
}

/* =========================================================
   CART
========================================================= */

function addToCart(productId) {

    const product = getProductById(productId);

    if (!product) {
        alert("Product is unavailable.");
        return;
    }

    const existing = cart.find(
        item => String(item.id) === String(product.id)
    );

    if (existing) {
        existing.quantity = Number(existing.quantity || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            image: product.image || "",
            quantity: 1
        });
    }

    saveCart();
    updateCart();
    openCart();

    showToast(`${product.name} added to cart`);
}

function changeQuantity(productId, change) {

    const item = cart.find(
        cartItem => String(cartItem.id) === String(productId)
    );

    if (!item) return;

    item.quantity = Number(item.quantity || 1) + Number(change);

    if (item.quantity <= 0) {
        cart = cart.filter(
            cartItem => String(cartItem.id) !== String(productId)
        );
    }

    saveCart();
    updateCart();
}

function removeFromCart(productId) {

    cart = cart.filter(
        item => String(item.id) !== String(productId)
    );

    saveCart();
    updateCart();
}

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        const quantity = Number(item.quantity) || 1;
        const price = Number(item.price) || 0;

        totalItems += quantity;
        totalPrice += price * quantity;

    });

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    if (cartTotal) {
        cartTotal.textContent = formatPrice(totalPrice);
    }

    if (!cartItems) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="fitfuel-empty-cart">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some fitness products to get started.</p>
            </div>
        `;

        return;
    }

    cartItems.innerHTML = cart.map(item => {

        const quantity = Number(item.quantity) || 1;

        return `
            <div class="fitfuel-cart-item">

                <div class="fitfuel-cart-image">

                    ${
                        item.image
                            ? `
                                <img
                                    src="${escapeHTML(item.image)}"
                                    alt="${escapeHTML(item.name)}"
                                    onerror="this.style.display='none'"
                                >
                              `
                            : "🛍️"
                    }

                </div>

                <div class="fitfuel-cart-info">

                    <h4>${escapeHTML(item.name)}</h4>

                    <strong>${formatPrice(item.price)}</strong>

                    <div class="quantity-controls">

                        <button onclick="changeQuantity(${JSON.stringify(item.id)}, -1)">
                            −
                        </button>

                        <span>${quantity}</span>

                        <button onclick="changeQuantity(${JSON.stringify(item.id)}, 1)">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-cart-item"
                    onclick="removeFromCart(${JSON.stringify(item.id)})"
                    aria-label="Remove item"
                >
                    ✕
                </button>

            </div>
        `;

    }).join("");
}

/* =========================================================
   CART DRAWER
========================================================= */

function openCart() {

    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");

    if (drawer) {
        drawer.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("show");
    }

    document.body.classList.add("cart-open");
}

function closeCart() {

    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");

    if (drawer) {
        drawer.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("show");
    }

    document.body.classList.remove("cart-open");
}

/* =========================================================
   CHECKOUT
========================================================= */

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const modal = document.getElementById("checkoutModal");

    if (modal) {
        modal.classList.add("show");
    }
}

function closeCheckout() {

    const modal = document.getElementById("checkoutModal");

    if (modal) {
        modal.classList.remove("show");
    }
}

function submitCheckout(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        closeCheckout();
        return;
    }

    const name =
        document.getElementById("customerName")?.value.trim() || "";

    const email =
        document.getElementById("customerEmail")?.value.trim() || "";

    const phone =
        document.getElementById("customerPhone")?.value.trim() || "";

    const address =
        document.getElementById("customerAddress")?.value.trim() || "";

    if (!name || !email || !phone || !address) {
        alert("Please complete all checkout fields.");
        return;
    }

    const orderNumber =
        "FF-" +
        Date.now().toString().slice(-8);

    const order = {
        orderNumber,
        customer: {
            name,
            email,
            phone,
            address
        },
        items: cart,
        createdAt: new Date().toISOString()
    };

    localStorage.setItem(
        "fitfuel_last_order",
        JSON.stringify(order)
    );

    cart = [];
    saveCart();
    updateCart();
    closeCheckout();
    closeCart();

    const form = document.getElementById("checkoutForm");

    if (form) {
        form.reset();
    }

    alert(
        "Order received!\n\n" +
        "Order ID: " +
        orderNumber +
        "\n\n" +
        "This demo checkout does not process real online payment yet."
    );
}

/* =========================================================
   CALORIE CALCULATOR
========================================================= */

function calculateCalories(event) {

    if (event) {
        event.preventDefault();
    }

    const gender =
        document.getElementById("gender")?.value || "male";

    const age =
        Number(document.getElementById("age")?.value);

    const weight =
        Number(document.getElementById("weight")?.value);

    const height =
        Number(document.getElementById("height")?.value);

    const activity =
        Number(document.getElementById("activity")?.value) || 1.2;

    const goal =
        document.getElementById("goal")?.value || "maintain";

    if (
        !age ||
        !weight ||
        !height ||
        age <= 0 ||
        weight <= 0 ||
        height <= 0
    ) {
        alert("Please enter valid age, weight and height.");
        return;
    }

    let bmr;

    if (gender === "female") {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) -
            161;

    } else {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) +
            5;

    }

    let calories = bmr * activity;

    if (goal === "loss") {
        calories -= 400;
    }

    if (goal === "gain") {
        calories += 300;
    }

    calories = Math.max(1200, Math.round(calories));

    let proteinPerKg = 1.6;

    if (goal === "loss") {
        proteinPerKg = 1.8;
    }

    if (goal === "gain") {
        proteinPerKg = 1.7;
    }

    const protein =
        Math.round(weight * proteinPerKg);

    const fat =
        Math.round((calories * 0.25) / 9);

    const carbs =
        Math.max(
            0,
            Math.round(
                (calories - protein * 4 - fat * 9) / 4
            )
        );

    const caloriesResult =
        document.getElementById("caloriesResult");

    const proteinResult =
        document.getElementById("proteinResult");

    const carbsResult =
        document.getElementById("carbsResult");

    const fatResult =
        document.getElementById("fatResult");

    const result =
        document.getElementById("calculatorResult");

    if (caloriesResult) {
        caloriesResult.textContent =
            calories.toLocaleString("en-IN");
    }

    if (proteinResult) {
        proteinResult.textContent = protein;
    }

    if (carbsResult) {
        carbsResult.textContent = carbs;
    }

    if (fatResult) {
        fatResult.textContent = fat;
    }

    if (result) {
        result.classList.remove("hidden");
        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

/* =========================================================
   EXERCISE HUB
========================================================= */

function createExerciseHub() {

    if (document.getElementById("exerciseHub")) {
        return;
    }

    const productGrid =
        document.getElementById("productGrid");

    if (!productGrid) return;

    const shopSection =
        productGrid.closest("section");

    if (!shopSection) return;

    const hub =
        document.createElement("section");

    hub.id = "exerciseHub";
    hub.className = "fitfuel-exercise-section";

    hub.innerHTML = `
        <div class="fitfuel-section-heading">

            <span>TRAIN SMART</span>

            <h2>
                Exercise <strong>Hub</strong>
            </h2>

            <p>
                Find exercises based on your goal, difficulty and training style.
            </p>

        </div>

        <div class="exercise-filters">

            <button
                class="exercise-filter active"
                data-goal="all"
                onclick="setExerciseGoal('all', this)"
            >
                All
            </button>

            <button
                class="exercise-filter"
                data-goal="fat loss"
                onclick="setExerciseGoal('fat loss', this)"
            >
                🔥 Fat Loss
            </button>

            <button
                class="exercise-filter"
                data-goal="cardio"
                onclick="setExerciseGoal('cardio', this)"
            >
                ❤️ Cardio
            </button>

            <button
                class="exercise-filter"
                data-goal="muscle building"
                onclick="setExerciseGoal('muscle building', this)"
            >
                💪 Muscle Building
            </button>

            <button
                class="exercise-filter"
                data-goal="strength"
                onclick="setExerciseGoal('strength', this)"
            >
                🏋️ Strength
            </button>

            <button
                class="exercise-filter"
                data-goal="home workout"
                onclick="setExerciseGoal('home workout', this)"
            >
                🏠 Home Workout
            </button>

        </div>

        <div class="exercise-options">

            <select
                id="exerciseDifficulty"
                onchange="setExerciseDifficulty(this.value)"
            >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>

            <input
                id="exerciseSearch"
                type="search"
                placeholder="Search exercises..."
                oninput="renderExercises()"
            >

        </div>

        <div
            id="exerciseGrid"
            class="exercise-grid"
        ></div>

        <div class="fitfuel-training-note">
            <strong>Training note:</strong>
            Start at a suitable difficulty and focus on controlled technique.
            Increase volume or resistance gradually.
        </div>
    `;

    shopSection.insertAdjacentElement(
        "afterend",
        hub
    );

    renderExercises();
}

/* =========================================================
   EXERCISE FILTERS
========================================================= */

function setExerciseGoal(goal, button) {

    exerciseGoal = goal;

    document
        .querySelectorAll(".exercise-filter")
        .forEach(item => {
            item.classList.remove("active");
        });

    if (button) {
        button.classList.add("active");
    }

    renderExercises();
}

function setExerciseDifficulty(difficulty) {

    exerciseDifficulty = difficulty;

    renderExercises();
}

function renderExercises() {

    const grid =
        document.getElementById("exerciseGrid");

    if (!grid) return;

    const search =
        document
            .getElementById("exerciseSearch")
            ?.value
            .trim()
            .toLowerCase() || "";

    const filtered =
        exercises.filter(exercise => {

            const matchesGoal =
                exerciseGoal === "all" ||
                exercise.goals.includes(exerciseGoal);

            const matchesDifficulty =
                exerciseDifficulty === "all" ||
                exercise.difficulty === exerciseDifficulty;

            const searchText = `
                ${exercise.name}
                ${exercise.category}
                ${exercise.body}
                ${exercise.equipment}
                ${exercise.description}
            `.toLowerCase();

            const matchesSearch =
                search === "" ||
                searchText.includes(search);

            return (
                matchesGoal &&
                matchesDifficulty &&
                matchesSearch
            );
        });

    if (filtered.length === 0) {

        grid.innerHTML = `
            <div class="fitfuel-empty">
                <div>🔎</div>
                <h3>No exercises found</h3>
                <p>Try another goal or search term.</p>
            </div>
        `;

        return;
    }

    grid.innerHTML = filtered.map(exercise => {

        return `
            <article class="exercise-card">

                <div class="exercise-image">

                    <img
                        src="${escapeHTML(exercise.image)}"
                        alt="${escapeHTML(exercise.name)}"
                        loading="lazy"
                        onerror="this.style.display='none'; this.parentElement.classList.add('image-failed');"
                    >

                    <span>
                        ${escapeHTML(exercise.difficulty)}
                    </span>

                </div>

                <div class="exercise-content">

                    <div class="exercise-category">
                        ${escapeHTML(exercise.category)}
                    </div>

                    <h3>
                        ${escapeHTML(exercise.name)}
                    </h3>

                    <p>
                        ${escapeHTML(exercise.description)}
                    </p>

                    <div class="exercise-meta">

                        <div>
                            <small>BODY</small>
                            <strong>
                                ${escapeHTML(exercise.body)}
                            </strong>
                        </div>

                        <div>
                            <small>EQUIPMENT</small>
                            <strong>
                                ${escapeHTML(exercise.equipment)}
                            </strong>
                        </div>

                    </div>

                    <div class="exercise-prescription">

                        <span>
                            <b>Sets</b>
                            ${escapeHTML(exercise.sets)}
                        </span>

                        <span>
                            <b>Reps / Time</b>
                            ${escapeHTML(exercise.reps)}
                        </span>

                    </div>

                </div>

            </article>
        `;

    }).join("");
}

/* =========================================================
   TRAIN LIKE THE PROS
========================================================= */

function createSportPlanner() {

    if (document.getElementById("sportPlanner")) {
        return;
    }

    const exerciseHub =
        document.getElementById("exerciseHub");

    if (!exerciseHub) return;

    const planner =
        document.createElement("section");

    planner.id = "sportPlanner";
    planner.className = "fitfuel-sport-section";

    planner.innerHTML = `
        <div class="fitfuel-section-heading">

            <span>SPORT PERFORMANCE</span>

            <h2>
                Train Like The <strong>Pros</strong>
            </h2>

            <p>
                Choose your sport and build a practical training direction.
            </p>

        </div>

        <div class="sport-buttons">

            <button
                class="sport-button active"
                onclick="selectSport('football', this)"
            >
                ⚽ Football
            </button>

            <button
                class="sport-button"
                onclick="selectSport('cricket', this)"
            >
                🏏 Cricket
            </button>

            <button
                class="sport-button"
                onclick="selectSport('basketball', this)"
            >
                🏀 Basketball
            </button>

            <button
                class="sport-button"
                onclick="selectSport('tennis', this)"
            >
                🎾 Tennis
            </button>

            <button
                class="sport-button"
                onclick="selectSport('boxing', this)"
            >
                🥊 Boxing
            </button>

            <button
                class="sport-button"
                onclick="selectSport('swimming', this)"
            >
                🏊 Swimming
            </button>

        </div>

        <div
            id="sportPlan"
            class="sport-plan"
        ></div>
    `;

    exerciseHub.insertAdjacentElement(
        "afterend",
        planner
    );

    renderSportPlan();
}

function selectSport(sport, button) {

    selectedSport = sport;

    document
        .querySelectorAll(".sport-button")
        .forEach(item => {
            item.classList.remove("active");
        });

    if (button) {
        button.classList.add("active");
    }

    renderSportPlan();
}

function renderSportPlan() {

    const container =
        document.getElementById("sportPlan");

    if (!container) return;

    const plan =
        sportPlans[selectedSport];

    if (!plan) return;

    const planExercises =
        plan.exercises
            .map(name => getExerciseByName(name))
            .filter(Boolean);

    container.innerHTML = `
        <div class="sport-plan-header">

            <div class="sport-icon">
                ${plan.icon}
            </div>

            <div>
                <h3>
                    ${escapeHTML(plan.title)}
                </h3>

                <p>
                    ${escapeHTML(plan.description)}
                </p>
            </div>

        </div>

        <div class="sport-plan-body">

            <div>

                <h4>
                    Recommended Training
                </h4>

                <div class="sport-exercise-list">

                    ${planExercises.map(exercise => `
                        <div class="sport-exercise">

                            <span>
                                ✓
                            </span>

                            <div>
                                <strong>
                                    ${escapeHTML(exercise.name)}
                                </strong>

                                <small>
                                    ${escapeHTML(exercise.sets)}
                                    sets ·
                                    ${escapeHTML(exercise.reps)}
                                </small>
                            </div>

                        </div>
                    `).join("")}

                </div>

            </div>

            <div class="sport-guidelines">

                <h4>
                    Training Focus
                </h4>

                <ul>
                    <li>Warm up before intense training.</li>
                    <li>Prioritize technique and movement quality.</li>
                    <li>Allow recovery between hard sessions.</li>
                    <li>Adjust volume to your fitness level.</li>
                    <li>Stay hydrated during training.</li>
                </ul>

            </div>

        </div>
    `;
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    let toast =
        document.getElementById("fitfuelToast");

    if (!toast) {

        toast =
            document.createElement("div");

        toast.id = "fitfuelToast";
        toast.className = "fitfuel-toast";

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(
        window.fitfuelToastTimer
    );

    window.fitfuelToastTimer =
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
}

/* =========================================================
   DYNAMIC CSS
   Keeps the new Exercise Hub and Sport Planner styled
   without requiring another CSS file edit.
========================================================= */

function injectFitFuelStyles() {

    if (document.getElementById("fitfuelDynamicStyles")) {
        return;
    }

    const style =
        document.createElement("style");

    style.id = "fitfuelDynamicStyles";

    style.textContent = `

        .fitfuel-loading,
        .fitfuel-empty,
        .fitfuel-empty-cart {
            width: 100%;
            text-align: center;
            padding: 50px 20px;
            grid-column: 1 / -1;
        }

        .fitfuel-spinner {
            width: 42px;
            height: 42px;
            margin: 0 auto 15px;
            border: 4px solid rgba(255,255,255,.15);
            border-top-color: currentColor;
            border-radius: 50%;
            animation: fitfuelSpin .8s linear infinite;
        }

        @keyframes fitfuelSpin {
            to {
                transform: rotate(360deg);
            }
        }

        .fitfuel-product-card {
            overflow: hidden;
            transition:
                transform .25s ease,
                box-shadow .25s ease;
        }

        .fitfuel-product-card:hover {
            transform: translateY(-7px);
        }

        .product-image-wrap {
            position: relative;
            min-height: 220px;
            overflow: hidden;
            background: #171717;
        }

        .product-image {
            width: 100%;
            height: 220px;
            object-fit: cover;
            display: block;
            transition: transform .4s ease;
        }

        .fitfuel-product-card:hover .product-image {
            transform: scale(1.06);
        }

        .product-category {
            position: absolute;
            top: 12px;
            left: 12px;
            padding: 6px 10px;
            border-radius: 20px;
            background: rgba(0,0,0,.75);
            color: #fff;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: .7px;
        }

        .product-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-top: 18px;
        }

        .add-product-button {
            cursor: pointer;
            border: 0;
        }

        .fitfuel-exercise-section,
        .fitfuel-sport-section {
            padding: 80px 5%;
            position: relative;
        }

        .fitfuel-exercise-section {
            background: #0c0c0c;
        }

        .fitfuel-sport-section {
            background: #101010;
        }

        .fitfuel-section-heading {
            max-width: 800px;
            margin: 0 auto 35px;
            text-align: center;
        }

        .fitfuel-section-heading > span {
            font-size: 12px;
            letter-spacing: 3px;
            font-weight: 700;
            opacity: .7;
        }

        .fitfuel-section-heading h2 {
            margin: 10px 0;
            font-size: clamp(32px, 5vw, 54px);
        }

        .fitfuel-section-heading h2 strong {
            color: #ff4d00;
        }

        .fitfuel-section-heading p {
            opacity: .7;
            line-height: 1.7;
        }

        .exercise-filters,
        .sport-buttons {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 22px;
        }

        .exercise-filter,
        .sport-button {
            border: 1px solid rgba(255,255,255,.15);
            background: rgba(255,255,255,.04);
            color: inherit;
            padding: 11px 16px;
            border-radius: 30px;
            cursor: pointer;
            transition: .2s ease;
        }

        .exercise-filter:hover,
        .exercise-filter.active,
        .sport-button:hover,
        .sport-button.active {
            background: #ff4d00;
            border-color: #ff4d00;
            color: #fff;
        }

        .exercise-options {
            max-width: 1000px;
            margin: 0 auto 30px;
            display: flex;
            gap: 12px;
        }

        .exercise-options input,
        .exercise-options select {
            flex: 1;
            min-width: 0;
            padding: 13px 15px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,.12);
            background: rgba(255,255,255,.06);
            color: inherit;
        }

        .exercise-options option {
            color: #111;
        }

        .exercise-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns:
                repeat(auto-fit, minmax(250px, 1fr));
            gap: 22px;
        }

        .exercise-card {
            background: rgba(255,255,255,.045);
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 18px;
            overflow: hidden;
            transition:
                transform .25s ease,
                border-color .25s ease;
        }

        .exercise-card:hover {
            transform: translateY(-6px);
            border-color: rgba(255,77,0,.5);
        }

        .exercise-image {
            height: 205px;
            position: relative;
            overflow: hidden;
            background: #181818;
        }

        .exercise-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform .4s ease;
        }

        .exercise-card:hover .exercise-image img {
            transform: scale(1.06);
        }

        .exercise-image span {
            position: absolute;
            right: 12px;
            top: 12px;
            padding: 6px 10px;
            border-radius: 20px;
            background: rgba(0,0,0,.78);
            color: #fff;
            font-size: 11px;
        }

        .exercise-content {
            padding: 20px;
        }

        .exercise-category {
            color: #ff6a2a;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .exercise-content h3 {
            margin: 7px 0;
            font-size: 22px;
        }

        .exercise-content p {
            opacity: .7;
            line-height: 1.55;
            font-size: 14px;
            min-height: 65px;
        }

        .exercise-meta {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 18px;
        }

        .exercise-meta div {
            padding: 10px;
            background: rgba(255,255,255,.04);
            border-radius: 10px;
        }

        .exercise-meta small {
            display: block;
            opacity: .5;
            font-size: 9px;
            margin-bottom: 5px;
        }

        .exercise-meta strong {
            font-size: 12px;
        }

        .exercise-prescription {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid rgba(255,255,255,.08);
        }

        .exercise-prescription span {
            font-size: 13px;
        }

        .exercise-prescription b {
            display: block;
            font-size: 10px;
            opacity: .5;
            margin-bottom: 3px;
        }

        .fitfuel-training-note {
            max-width: 900px;
            margin: 30px auto 0;
            padding: 16px 18px;
            border-radius: 12px;
            background: rgba(255,255,255,.04);
            border: 1px solid rgba(255,255,255,.08);
            font-size: 13px;
            line-height: 1.6;
            opacity: .8;
        }

        .sport-plan {
            max-width: 1050px;
            margin: 30px auto 0;
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 20px;
            overflow: hidden;
            background: rgba(255,255,255,.035);
        }

        .sport-plan-header {
            display: flex;
            gap: 20px;
            align-items: center;
            padding: 28px;
            border-bottom: 1px solid rgba(255,255,255,.08);
        }

        .sport-icon {
            width: 64px;
            height: 64px;
            flex: 0 0 64px;
            display: grid;
            place-items: center;
            border-radius: 16px;
            background: rgba(255,77,0,.12);
            font-size: 30px;
        }

        .sport-plan-header h3 {
            margin: 0 0 8px;
            font-size: 25px;
        }

        .sport-plan-header p {
            margin: 0;
            opacity: .7;
            line-height: 1.6;
        }

        .sport-plan-body {
            display: grid;
            grid-template-columns: 1.3fr 1fr;
            gap: 30px;
            padding: 28px;
        }

        .sport-plan-body h4 {
            margin-top: 0;
            margin-bottom: 16px;
        }

        .sport-exercise-list {
            display: grid;
            gap: 10px;
        }

        .sport-exercise {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 13px;
            border-radius: 10px;
            background: rgba(255,255,255,.04);
        }

        .sport-exercise > span {
            color: #ff6a2a;
            font-weight: bold;
        }

        .sport-exercise strong,
        .sport-exercise small {
            display: block;
        }

        .sport-exercise small {
            margin-top: 3px;
            opacity: .55;
        }

        .sport-guidelines {
            padding: 20px;
            border-radius: 14px;
            background: rgba(255,255,255,.035);
        }

        .sport-guidelines ul {
            margin: 0;
            padding-left: 20px;
            line-height: 2;
            opacity: .75;
            font-size: 14px;
        }

        .fitfuel-cart-item {
            display: flex;
            gap: 12px;
            padding: 15px 0;
            border-bottom: 1px solid rgba(255,255,255,.08);
        }

        .fitfuel-cart-image {
            width: 65px;
            height: 65px;
            flex: 0 0 65px;
            border-radius: 10px;
            overflow: hidden;
            background: #191919;
            display: grid;
            place-items: center;
        }

        .fitfuel-cart-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .fitfuel-cart-info {
            flex: 1;
            min-width: 0;
        }

        .fitfuel-cart-info h4 {
            margin: 0 0 5px;
            font-size: 14px;
        }

        .fitfuel-cart-info strong {
            font-size: 13px;
        }

        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 9px;
        }

        .quantity-controls button {
            width: 27px;
            height: 27px;
            border: 1px solid rgba(255,255,255,.15);
            border-radius: 6px;
            background: rgba(255,255,255,.05);
            color: inherit;
            cursor: pointer;
        }

        .remove-cart-item {
            align-self: flex-start;
            background: transparent;
            border: 0;
            color: inherit;
            opacity: .5;
            cursor: pointer;
        }

        .fitfuel-toast {
            position: fixed;
            left: 50%;
            bottom: 25px;
            transform: translate(-50%, 100px);
            z-index: 99999;
            background: #171717;
            color: #fff;
            border: 1px solid rgba(255,255,255,.12);
            border-radius: 12px;
            padding: 13px 18px;
            box-shadow: 0 10px 35px rgba(0,0,0,.35);
            opacity: 0;
            transition: .3s ease;
        }

        .fitfuel-toast.show {
            transform: translate(-50%, 0);
            opacity: 1;
        }

        @media (max-width: 700px) {

            .fitfuel-exercise-section,
            .fitfuel-sport-section {
                padding: 55px 18px;
            }

            .exercise-options {
                flex-direction: column;
            }

            .sport-plan-header {
                align-items: flex-start;
            }

            .sport-plan-body {
                grid-template-columns: 1fr;
            }

            .product-bottom {
                align-items: flex-start;
                flex-direction: column;
            }

            .add-product-button {
                width: 100%;
            }

            .exercise-grid {
                grid-template-columns: 1fr;
            }

        }

    `;

    document.head.appendChild(style);
}

/* =========================================================
   EVENT SETUP
========================================================= */

function setupEvents() {

    const calculatorForm =
        document.getElementById("calculatorForm");

    if (calculatorForm) {

        calculatorForm.addEventListener(
            "submit",
            calculateCalories
        );
    }

    const checkoutForm =
        document.getElementById("checkoutForm");

    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            submitCheckout
        );
    }

    const checkoutModal =
        document.getElementById("checkoutModal");

    if (checkoutModal) {

        checkoutModal.addEventListener(
            "click",
            function(event) {

                if (event.target === checkoutModal) {
                    closeCheckout();
                }

            }
        );
    }

    document.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Escape") {
                closeCart();
                closeCheckout();
            }

        }
    );
}

/* =========================================================
   INITIALIZE
========================================================= */

async function initializeFitFuel() {

    injectFitFuelStyles();

    setupEvents();

    updateCart();

    await loadProducts();

    createExerciseHub();

    createSportPlanner();

}

/* =========================================================
   START
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeFitFuel
    );

} else {

    initializeFitFuel();

}
