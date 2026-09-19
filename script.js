/* =========================================================
   FITFUEL - COMPLETE FRONTEND
   Products + Supabase + Cart + Calculator
   Exercise Hub + Train Like The Pros
========================================================= */

let products = [];
let selectedCategory = "all";

let cart = JSON.parse(localStorage.getItem("fitfuel_cart")) || [];


/* =========================================================
   FALLBACK PRODUCTS
   These appear if Supabase cannot be read.
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
        description: "Steady running or jogging to improve cardiovascular fitness and calorie expenditure.",
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
        description: "Fast-paced skipping exercise for conditioning and coordination.",
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
        description: "Full-body conditioning movement combining a squat, plank and jump.",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80"
    },

    {
        id: 4,
        name: "Bodyweight Squat",
        category: "legs",
        goals: ["muscle building", "strength", "fat loss"],
        body: "Legs",
        difficulty: "Beginner",
        equipment: "None",
        sets: "3",
        reps: "12–20",
        description: "Fundamental lower-body exercise for beginners and home workouts.",
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
        description: "Compound strength exercise targeting the lower body.",
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
        description: "Popular gym movement for building pressing strength.",
        image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80"
    },

    {
        id: 8,
        name: "Pull Ups",
        category: "back",
        goals: ["muscle building", "strength"],
        body: "Back",
        difficulty: "Intermediate",
        equipment: "Pull-up Bar",
        sets: "3",
        reps: "5–12",
        description: "Bodyweight pulling exercise for the back and arms.",
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
        description: "Overhead pressing movement for the shoulders.",
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
        goals: ["strength", "home workout", "fat loss"],
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
        description: "Dynamic exercise combining core work with cardiovascular conditioning.",
        image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1000&q=80"
    },

    {
        id: 15,
        name: "Lunges",
        category: "legs",
        goals: ["muscle building", "strength", "fat loss"],
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
        description: "Low-impact cardiovascular activity that can be performed indoors or outdoors.",
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
    }
];


/* =========================================================
   SPORT TRAINING DATABASE
========================================================= */

const sportPlans = {

    football: {
        title: "Football Training",
        description: "Focus on speed, acceleration, conditioning, lower-body strength and agility.",
        exercises: [
            "Running",
            "Bodyweight Squat",
            "Lunges",
            "Mountain Climbers",
            "Plank"
        ]
    },

    cricket: {
        title: "Cricket Training",
        description: "Build coordination, mobility, rotational strength and running fitness.",
        exercises: [
            "Running",
            "Lunges",
            "Plank",
            "Dumbbell Row",
            "Shoulder Press"
        ]
    },

    basketball: {
        title: "Basketball Training",
        description: "Work on conditioning, leg strength, jumping ability and agility.",
        exercises: [
            "Bodyweight Squat",
            "Lunges",
            "Jump Rope",
            "Running",
            "Plank"
        ]
    },

    tennis: {
        title: "Tennis Training",
        description: "Develop conditioning, core stability, shoulder strength and movement.",
        exercises: [
            "Running",
            "Jump Rope",
            "Plank",
            "Shoulder Press",
            "Lunges"
        ]
    },

    boxing: {
        title: "Boxing Conditioning",
        description: "Improve conditioning, core strength and total-body endurance.",
        exercises: [
            "Jump Rope",
            "Burpees",
            "Mountain Climbers",
            "Running",
            "Plank"
        ]
    },

    swimming: {
        title: "Swimming Fitness",
        description: "Build whole-body conditioning and supporting strength.",
        exercises: [
            "Running",
            "Pull Ups",
            "Plank",
            "Shoulder Press",
            "Bodyweight Squat"
        ]
    }
};


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function formatPrice(price) {
    return "₹" + Number(price || 0).toLocaleString("en-IN");
}


function getProductImage(category) {

    const images = {
        protein:
            "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80",

        supplements:
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",

        snacks:
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476b?auto=format&fit=crop&w=800&q=80",

        accessories:
            "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=800&q=80"
    };

    return images[String(category || "").toLowerCase()]
        || images.supplements;
}


/* =========================================================
   LOAD PRODUCTS FROM SUPABASE
========================================================= */

async function loadProducts() {

    const grid = document.getElementById("productGrid");

    if (grid) {
        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:40px;
                color:#aaa;
            ">
                Loading FitFuel products...
            </div>
        `;
    }

    try {

        if (
            !window.supabaseClient ||
            typeof window.supabaseClient.from !== "function"
        ) {
            throw new Error("Supabase client not available");
        }

        const { data, error } =
            await window.supabaseClient
                .from("products")
                .select("*")
                .order("id", { ascending: true });

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            throw new Error("No products found in Supabase");
        }

        products = data.map((product, index) => {

            return {
                id: product.id ?? index + 1,
                name: product.name || product.title || "FitFuel Product",
                category:
                    String(
                        product.category ||
                        product.subcategory ||
                        "supplements"
                    ).toLowerCase(),
                description:
                    product.description ||
                    "Quality fitness product from FitFuel.",
                price:
                    Number(
                        product.price ??
                        product.amount ??
                        0
                    ),
                image:
                    product.image ||
                    product.image_url ||
                    product.photo ||
                    getProductImage(product.category)
            };

        });

        console.log("Supabase products loaded:", products);

    } catch (error) {

        console.warn(
            "Supabase products could not be loaded. Using fallback products.",
            error
        );

        products = fallbackProducts;

    }

    displayProducts();
}


/* =========================================================
   DISPLAY PRODUCTS
========================================================= */

function displayProducts() {

    const grid = document.getElementById("productGrid");

    if (!grid) return;

    const searchInput =
        document.getElementById("searchInput");

    const searchTerm =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

    let filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "all" ||
            String(product.category).toLowerCase() ===
            selectedCategory.toLowerCase();

        const searchable =
            `${product.name} ${product.description} ${product.category}`
                .toLowerCase();

        const matchesSearch =
            !searchTerm ||
            searchable.includes(searchTerm);

        return matchesCategory && matchesSearch;

    });


    if (filteredProducts.length === 0) {

        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:50px 20px;
                color:#aaa;
            ">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }


    grid.innerHTML =
        filteredProducts
            .map(product => `

                <article class="product-card"
                    style="
                        overflow:hidden;
                        transition:transform .25s ease,
                                   box-shadow .25s ease;
                    ">

                    <div style="
                        height:220px;
                        overflow:hidden;
                        background:#111;
                    ">

                        <img
                            src="${escapeHTML(product.image)}"
                            alt="${escapeHTML(product.name)}"
                            loading="lazy"
                            onerror="this.src='${getProductImage(product.category)}'"
                            style="
                                width:100%;
                                height:100%;
                                object-fit:cover;
                                display:block;
                            "
                        >

                    </div>

                    <div style="padding:20px;">

                        <div style="
                            font-size:12px;
                            text-transform:uppercase;
                            letter-spacing:2px;
                            color:#a8ff00;
                            margin-bottom:8px;
                        ">
                            ${escapeHTML(product.category)}
                        </div>

                        <h3>
                            ${escapeHTML(product.name)}
                        </h3>

                        <p style="color:#999;">
                            ${escapeHTML(product.description)}
                        </p>

                        <div style="
                
