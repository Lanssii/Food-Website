// Uses TWO free APIs together
// TheMealDB - Breakfast, Main Dishes, Desserts, All (food)
// TheCocktailDB - Drinks

const productsContainer = document.getElementById("products");

// Prices
const FOOD_PRICES = [9.99, 15.99, 20.99, 12.55, 12.99, 18.05, 11.49, 13.75];
const DRINK_PRICES = [7.25, 5.89, 8.5, 6.99, 9.25, 7.99, 6.49, 8.99];

function normalizeMeal(meal, index) {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    thumb: meal.strMealThumb,
    description: meal.strInstructions
      ? meal.strInstructions.slice(0, 80) + "..."
      : "A delicious dish crafted with the finest fresh ingredients.",
    price: FOOD_PRICES[index % FOOD_PRICES.length],
    type: "food",
  };
}

function normalizeDrink(drink, index) {
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    thumb: drink.strDrinkThumb,
    description: drink.strInstructions
      ? drink.strInstructions.slice(0, 80) + "..."
      : "A handcrafted cocktail made with premium ingredients.",
    price: DRINK_PRICES[index % DRINK_PRICES.length],
    type: "drink",
  };
}

// Fetch
async function getMeals(category = null) {
  const url = category
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    : `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.meals || []).slice(0, 12).map(normalizeMeal);
}

async function getDrinks() {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
  );
  const data = await res.json();
  return (data.drinks || []).slice(0, 12).map(normalizeDrink);
}

// "All" tab: fetch food + drinks at the same time, then merge & shuffle
async function getAllItems() {
  const [meals, drinks] = await Promise.all([getMeals(), getDrinks()]);

  const mixed = [...meals.slice(0, 6), ...drinks.slice(0, 6)];
  return mixed.sort(() => Math.random() - 0.5);
}

// Render
function renderCards(items) {
  if (!items.length) {
    productsContainer.innerHTML = "<p class='no-results'>No items found.</p>";
    return;
  }

  productsContainer.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <div class="image-container">
        <img src="${item.thumb}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="product-info">
        <p class="price">$${item.price.toFixed(2)}</p>
        <h4 class="product-name">${item.name}</h4>
        <p class="product-detail">${item.description}</p>
      </div>
    `;
    productsContainer.appendChild(card);
  });
}

function setLoading() {
  productsContainer.innerHTML = "<p class='loading'>Loading...</p>";
}

function setError() {
  productsContainer.innerHTML =
    "<p class='error'>Failed to load products. Please try again.</p>";
}

// Category buttons
const CATEGORIES = {
  All: () => getAllItems(),
  Breakfast: () => getMeals("Breakfast"),
  "Main Dishes": () => getMeals("Chicken"),
  Drinks: () => getDrinks(),
  Desserts: () => getMeals("Dessert"),
};

// Load
async function loadCategory(label) {
  setLoading();
  try {
    const fetcher = CATEGORIES[label];
    if (!fetcher) return;
    const items = await fetcher();
    renderCards(items);
  } catch (err) {
    console.error("Fetch error:", err);
    setError();
  }
}

// Buttons
function initButtons() {
  const buttons = document.querySelectorAll(".buttons-section button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("btn-active"));
      btn.classList.add("btn-active");
      loadCategory(btn.textContent.trim());
    });
  });
}

// Init
initButtons();
loadCategory("All");
