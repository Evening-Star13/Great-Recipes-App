document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  if (typeof jspdf === "undefined") {
    console.error("jsPDF library is not loaded. PDF generation will not work.");
    const downloadPdfBtn = document.getElementById("download-pdf-btn");
    if (downloadPdfBtn) {
      downloadPdfBtn.disabled = true;
      downloadPdfBtn.title = "PDF generation library failed to load.";
    }
  }

  // --- DOM Elements ---
  const authSection = document.getElementById("auth-section");
  const mainApp = document.getElementById("main-app");
  const authForm = document.getElementById("auth-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const authError = document.getElementById("auth-error");
  const logoutBtn = document.getElementById("logout-btn");

  const body = document.body;
  const recipeList = document.getElementById("recipe-list");
  const recipeDetailsSection = document.getElementById(
    "recipe-details-section"
  );
  const addRecipeSection = document.getElementById("add-recipe-section");
  const recipeListSection = document.getElementById("recipe-list-section");
  const shoppingListSection = document.getElementById("shopping-list-section");
  const mealPlanSection = document.getElementById("meal-plan-section");
  const searchInput = document.getElementById("search-input");
  const filterBtn = document.getElementById("filter-btn");
  const filtersSection = document.getElementById("filters-section");
  const applyFiltersBtn = document.getElementById("apply-filters-btn");
  const categoryFilter = document.getElementById("category-filter");
  const prepTimeFilter = document.getElementById("prep-time-filter");
  const ratingFilter = document.getElementById("rating-filter");
  const favoritesFilter = document.getElementById("favorites-filter");
  const addRecipeBtn = document.getElementById("add-recipe-btn");
  const backBtn = document.getElementById("back-btn");
  const cancelAddBtn = document.getElementById("cancel-add-btn");
  const addRecipeForm = document.getElementById("add-recipe-form");
  const deleteRecipeBtn = document.getElementById("delete-recipe-btn");
  const editRecipeBtn = document.getElementById("edit-recipe-btn");
  const downloadPdfBtn = document.getElementById("download-pdf-btn");
  const favoriteBtn = document.getElementById("favorite-btn");
  const shareBtn = document.getElementById("share-btn");
  const detailsTitle = document.getElementById("details-title");
  const detailsDescription = document.getElementById("details-description");
  const detailsCategories = document.getElementById("details-categories");
  const detailsIngredients = document.getElementById("details-ingredients");
  const detailsInstructions = document.getElementById("details-instructions");
  const detailsImage = document.getElementById("details-image");
  const prepTime = document.getElementById("prep-time");
  const cookTime = document.getElementById("cook-time");
  const totalTime = document.getElementById("total-time");
  const servingsInfo = document.getElementById("servings-info");
  const servingSizeSelect = document.getElementById("serving-size-select");
  const baseServingInfo = document.getElementById("base-serving-info");
  const detailsNutritionList = document.getElementById("details-nutrition");
  const nutritionCalories = document
    .getElementById("nutrition-calories")
    ?.querySelector("span");
  const nutritionProtein = document
    .getElementById("nutrition-protein")
    ?.querySelector("span");
  const nutritionCarbs = document
    .getElementById("nutrition-carbs")
    ?.querySelector("span");
  const nutritionFat = document
    .getElementById("nutrition-fat")
    ?.querySelector("span");
  const ratingStars = document.getElementById("rating-stars");
  const ratingText = document.getElementById("rating-text");
  const commentsList = document.getElementById("comments-list");
  const newCommentInput = document.getElementById("new-comment");
  const addCommentBtn = document.getElementById("add-comment-btn");
  const addToShoppingListBtn = document.getElementById(
    "add-to-shopping-list-btn"
  );
  const addToMealPlanBtn = document.getElementById("add-to-meal-plan-btn");
  const formTitle = document.getElementById("form-title");
  const newRecipeNameInput = document.getElementById("new-recipe-name");
  const newRecipeDescriptionInput = document.getElementById(
    "new-recipe-description"
  );
  const newRecipeCategoriesInput = document.getElementById(
    "new-recipe-categories"
  );
  const newRecipePrepTimeInput = document.getElementById(
    "new-recipe-prep-time"
  );
  const newRecipeCookTimeInput = document.getElementById(
    "new-recipe-cook-time"
  );
  const newRecipeTotalTimeInput = document.getElementById(
    "new-recipe-total-time"
  );
  const newRecipeServingsInput = document.getElementById("new-recipe-servings");
  const newRecipeIngredientsInput = document.getElementById(
    "new-recipe-ingredients"
  );
  const newRecipeInstructionsInput = document.getElementById(
    "new-recipe-instructions"
  );
  const newRecipeImageInput = document.getElementById("new-recipe-image");
  const imagePreview = document.getElementById("image-preview");
  const imageCaptureStatus = document.getElementById("image-capture-status");
  const saveUpdateBtn = document.getElementById("save-update-btn");
  const newRecipeCaloriesInput = document.getElementById("new-recipe-calories");
  const newRecipeProteinInput = document.getElementById("new-recipe-protein");
  const newRecipeCarbsInput = document.getElementById("new-recipe-carbs");
  const newRecipeFatInput = document.getElementById("new-recipe-fat");
  const themeCheckbox = document.getElementById("theme-checkbox");
  const cameraModal = document.getElementById("camera-modal");
  const openCameraBtn = document.getElementById("open-camera-btn");
  const closeCameraBtn = document.getElementById("close-camera-btn");
  const cameraVideo = document.getElementById("camera-video");
  const cameraCanvas = document.getElementById("camera-canvas");
  const capturePhotoBtn = document.getElementById("capture-photo-btn");
  const cameraError = document.getElementById("camera-error");
  const contactBtn = document.getElementById("contact-btn");
  const shoppingList = document.getElementById("shopping-list");
  const clearShoppingListBtn = document.getElementById(
    "clear-shopping-list-btn"
  );
  const mealPlanCalendar = document.getElementById("meal-plan-calendar");
  const clearMealPlanBtn = document.getElementById("clear-meal-plan-btn");
  const recipesNavBtn = document.getElementById("recipes-nav-btn");
  const shoppingListNavBtn = document.getElementById("shopping-list-nav-btn");
  const mealPlanNavBtn = document.getElementById("meal-plan-nav-btn");
  const loadingSpinner = document.getElementById("loading-spinner");

  // --- State ---
  let currentUser = null;
  let recipes = [];
  let currentRecipeId = null;
  let currentCameraStream = null;
  let capturedImageBlob = null;
  let existingImageSrcForEdit = null;
  let shoppingListItems = [];
  let mealPlan = {};
  let userData = { favorites: [], ratings: {}, comments: {} };
  let allCategories = new Set();
  let imageObjectURLs = [];

  // --- Storage Keys ---
  const USERS_STORAGE_KEY = "myRecipesApp.users";
  const USER_DATA_STORAGE_KEY = "myRecipesApp.userData";
  const RECIPES_STORAGE_KEY = "myRecipesApp.recipes";
  const THEME_STORAGE_KEY = "myRecipesApp.theme";
  const SHOPPING_LIST_STORAGE_KEY = "myRecipesApp.shoppingList";
  const MEAL_PLAN_STORAGE_KEY = "myRecipesApp.mealPlan";
  const DB_NAME = "MyRecipeAppDB";
  const DB_VERSION = 1;
  const RECIPE_STORE = "recipes";

  // --- Constants ---
  const MAX_SERVINGS = 40;
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB limit
  const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // --- IndexedDB Setup ---
  let db;
  function initIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        db = event.target.result;
        if (!db.objectStoreNames.contains(RECIPE_STORE)) {
          db.createObjectStore(RECIPE_STORE, { keyPath: "id" });
        }
      };
      request.onsuccess = (event) => {
        db = event.target.result;
        resolve(db);
      };
      request.onerror = (event) => {
        console.error("IndexedDB initialization error:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  // --- Helper Functions ---
  function gcd(a, b) {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    if (b === 0) return a;
    return gcd(b, a % b);
  }

  function parseQuantity(qtyString) {
    if (!qtyString || typeof qtyString !== "string") return null;
    qtyString = qtyString.trim();

    if (qtyString.includes(" ") && qtyString.includes("/")) {
      const mixedParts = qtyString.split(" ");
      if (mixedParts.length === 2) {
        const whole = parseFloat(mixedParts[0]);
        const fractionParts = mixedParts[1].split("/");
        if (
          fractionParts.length === 2 &&
          !isNaN(whole) &&
          !isNaN(fractionParts[0]) &&
          !isNaN(fractionParts[1]) &&
          fractionParts[1] !== "0"
        ) {
          return whole + Number(fractionParts[0]) / Number(fractionParts[1]);
        }
      }
    }

    if (qtyString.includes("/")) {
      const parts = qtyString.split("/");
      if (
        parts.length === 2 &&
        !isNaN(parts[0]) &&
        !isNaN(parts[1]) &&
        parts[1] !== "0"
      ) {
        const numerator = Number(parts[0]);
        const denominator = Number(parts[1]);
        if (denominator > 100) return qtyString;
        return numerator / denominator;
      }
    }

    const num = parseFloat(qtyString);
    if (!isNaN(num)) {
      if (num > 1000) return qtyString;
      return num;
    }

    return qtyString;
  }

  function formatQuantity(num) {
    if (num === null || num === undefined) return "";
    if (typeof num !== "number" || isNaN(num)) return String(num);
    if (num === 0) return "0";

    const tolerance = 0.0075;
    const denominators = [2, 3, 4, 5, 6, 8, 10, 12, 16];
    const sign = num < 0 ? "-" : "";
    num = Math.abs(num);
    const integerPart = Math.floor(num);
    const fractionalPart = num - integerPart;

    if (
      fractionalPart < tolerance ||
      Math.abs(fractionalPart - 1) < tolerance
    ) {
      return sign + Math.round(num);
    }

    let bestNumerator = 0;
    let bestDenominator = 1;
    let minError = Infinity;
    for (const d of denominators) {
      const numerator = Math.round(fractionalPart * d);
      if (numerator === 0 || numerator > d) continue;
      const error = Math.abs(fractionalPart - numerator / d);
      const currentErrorWeight = error / (d * 0.1 + 1);
      const minErrorWeight = minError / (bestDenominator * 0.1 + 1);
      if (currentErrorWeight < minErrorWeight && error < tolerance * 1.5) {
        minError = error;
        bestNumerator = numerator;
        bestDenominator = d;
      }
    }

    if (minError < tolerance && bestNumerator > 0) {
      const commonDivisor = gcd(bestNumerator, bestDenominator);
      const simplifiedNumerator = bestNumerator / commonDivisor;
      const simplifiedDenominator = bestDenominator / commonDivisor;
      let output = sign;
      if (integerPart > 0) output += integerPart + " ";
      output += `${simplifiedNumerator}/${simplifiedDenominator}`;
      return output;
    } else {
      const roundedNum = parseFloat(num.toFixed(2));
      if (Math.abs(roundedNum - Math.round(roundedNum)) < tolerance)
        return sign + Math.round(roundedNum);
      if (Math.abs((num * 10) % 1) < 0.1)
        return sign + parseFloat(num.toFixed(1));
      return sign + parseFloat(num.toFixed(2));
    }
  }

  function parseIngredientsInput(textareaValue) {
    if (!textareaValue || typeof textareaValue !== "string") return [];
    const lines = textareaValue
      .split("\n")
      .filter((line) => line.trim() !== "");
    const ingredients = [];
    const knownTextQuantities = [
      "pinch",
      "dash",
      "sprinkle",
      "to",
      "a",
      "some",
    ];
    const commonUnits = [
      "cup",
      "cups",
      "oz",
      "ounce",
      "ounces",
      "tsp",
      "tsps",
      "teaspoon",
      "teaspoons",
      "tbsp",
      "tbsps",
      "tablespoon",
      "tablespoons",
      "g",
      "gram",
      "grams",
      "kg",
      "kgs",
      "kilogram",
      "kilograms",
      "lb",
      "lbs",
      "pound",
      "pounds",
      "ml",
      "milliliter",
      "milliliters",
      "l",
      "liter",
      "liters",
      "pinch",
      "pinches",
      "dash",
      "dashes",
      "clove",
      "cloves",
      "can",
      "cans",
      "jar",
      "jars",
      "package",
      "packages",
      "pkg",
      "bunch",
      "bunches",
      "head",
      "heads",
      "slice",
      "slices",
      "large",
      "medium",
      "small",
      "stick",
      "sticks",
    ];

    lines.forEach((line) => {
      line = line.trim();
      let quantity = null;
      let unit = "";
      let name = line;
      let quantityStr = "";

      const qtyMatch = line.match(
        /^([0-9]+\s+[0-9]+\/[0-9]+|[0-9./]+|\w+)(\s+|$)/
      );
      if (qtyMatch) {
        const potentialQty = qtyMatch[1];
        const parsedPotentialQty = parseQuantity(potentialQty);
        if (
          typeof parsedPotentialQty === "number" ||
          knownTextQuantities.includes(String(parsedPotentialQty).toLowerCase())
        ) {
          quantity = parsedPotentialQty;
          quantityStr = potentialQty;
          name = line.substring(quantityStr.length).trim();
        }
      }

      if (quantityStr) {
        const nameParts = name.split(" ");
        if (
          nameParts.length > 0 &&
          commonUnits.includes(nameParts[0].toLowerCase())
        ) {
          unit = nameParts[0];
          name = nameParts.slice(1).join(" ").trim();
        }
      }

      if (quantity === null && !quantityStr) name = line;
      ingredients.push({
        quantity: quantity,
        unit: unit,
        name: name || "Unnamed Ingredient",
      });
    });
    return ingredients;
  }

  function formatIngredientsForTextarea(ingredients) {
    if (!ingredients || !Array.isArray(ingredients)) return "";
    return ingredients
      .map((ing) => {
        let qtyStr = formatQuantity(ing.quantity);
        if (qtyStr === null || qtyStr === undefined) qtyStr = "";
        const unitStr = ing.unit ? ` ${ing.unit}` : "";
        const nameStr = ing.name || "";
        let line = "";
        if (String(qtyStr).trim()) line += String(qtyStr).trim();
        if (unitStr.trim()) line += (line ? " " : "") + unitStr.trim();
        if (nameStr.trim()) line += (line ? " " : "") + nameStr.trim();
        return line;
      })
      .join("\n");
  }

  // --- Authentication Functions ---
  function loadUsers() {
    try {
      const users = localStorage.getItem(USERS_STORAGE_KEY);
      return users ? JSON.parse(users) : {};
    } catch (error) {
      console.error("Error loading users from localStorage:", error);
      return {};
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users to localStorage:", error);
    }
  }

  function loadUserData() {
    const data = localStorage.getItem(
      `${USER_DATA_STORAGE_KEY}_${currentUser}`
    );
    if (data) {
      userData = JSON.parse(data);
    } else {
      userData = { favorites: [], ratings: {}, comments: {} };
    }
  }

  function saveUserData() {
    localStorage.setItem(
      `${USER_DATA_STORAGE_KEY}_${currentUser}`,
      JSON.stringify(userData)
    );
  }

  function handleLogin(event) {
    event.preventDefault();
    const username = usernameInput?.value.trim();
    const password = passwordInput?.value;
    if (!username || !password) {
      authError?.classList.remove("hidden");
      authError.textContent = "Please enter both username and password.";
      return;
    }

    const users = loadUsers();
    if (users[username] && users[username].password === password) {
      currentUser = username;
      authSection?.classList.add("hidden");
      if (mainApp) mainApp.style.display = "block";
      loadUserData();
      initializeApp();
    } else {
      authError?.classList.remove("hidden");
      authError.textContent = "Invalid username or password.";
    }
  }

  function handleRegister() {
    const username = usernameInput?.value.trim();
    const password = passwordInput?.value;
    if (!username || !password) {
      authError?.classList.remove("hidden");
      authError.textContent = "Please enter both username and password.";
      return;
    }

    const users = loadUsers();
    if (users[username]) {
      authError?.classList.remove("hidden");
      authError.textContent = "Username already exists.";
      return;
    }

    users[username] = { password };
    saveUsers(users);
    currentUser = username;
    authSection?.classList.add("hidden");
    if (mainApp) mainApp.style.display = "block";
    loadUserData();
    initializeApp();
  }

  function handleLogout() {
    currentUser = null;
    userData = { favorites: [], ratings: {}, comments: {} };
    authSection?.classList.remove("hidden");
    if (mainApp) mainApp.style.display = "none";
    authForm?.reset();
    authError?.classList.add("hidden");
    cleanupObjectURLs();
  }

  // --- Theme Functions ---
  function applyTheme(theme) {
    body.dataset.theme = theme === "dark" ? "dark" : "light";
    if (themeCheckbox) themeCheckbox.checked = theme === "dark";
    const modeText = document.querySelector(".mode-text");
    if (modeText)
      modeText.textContent = theme === "dark" ? "Dark Mode" : "Light Mode";
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  function toggleTheme() {
    const currentTheme = body.dataset.theme === "dark" ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  }

  // --- Recipe Management Functions ---
  function loadRecipes() {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([RECIPE_STORE], "readonly");
      const store = transaction.objectStore(RECIPE_STORE);
      const request = store.getAll();
      request.onsuccess = () => {
        recipes = request.result;
        resolve(recipes);
      };
      request.onerror = (event) => {
        console.error("Error loading recipes:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  function saveRecipe(recipe) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([RECIPE_STORE], "readwrite");
      const store = transaction.objectStore(RECIPE_STORE);
      const request = store.put(recipe);
      request.onsuccess = () => {
        if (!recipes.some((r) => r.id === recipe.id)) {
          recipes.push(recipe);
        } else {
          recipes = recipes.map((r) => (r.id === recipe.id ? recipe : r));
        }
        resolve();
      };
      request.onerror = (event) => {
        console.error("Error saving recipe:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  function deleteRecipe(recipeId) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([RECIPE_STORE], "readwrite");
      const store = transaction.objectStore(RECIPE_STORE);
      const request = store.delete(recipeId);
      request.onsuccess = () => {
        recipes = recipes.filter((r) => r.id !== recipeId);
        if (userData.favorites.includes(recipeId)) {
          userData.favorites = userData.favorites.filter(
            (id) => id !== recipeId
          );
          saveUserData();
        }
        if (userData.ratings[recipeId]) {
          delete userData.ratings[recipeId];
          saveUserData();
        }
        if (userData.comments[recipeId]) {
          delete userData.comments[recipeId];
          saveUserData();
        }
        resolve();
      };
      request.onerror = (event) => {
        console.error("Error deleting recipe:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  function displayRecipes(filteredRecipes = recipes) {
    if (!recipeList) return;
    recipeList.innerHTML = "";
    if (filteredRecipes.length === 0) {
      const li = document.createElement("li");
      li.classList.add("no-results");
      li.textContent = "No recipes found.";
      recipeList.appendChild(li);
      return;
    }

    filteredRecipes.forEach((recipe) => {
      const li = document.createElement("li");
      li.textContent = recipe.name;
      if (userData.favorites.includes(recipe.id)) {
        li.innerHTML = `<i class="fa-solid fa-heart"></i> ${recipe.name}`;
      }
      li.addEventListener("click", () => showRecipeDetails(recipe.id));
      recipeList.appendChild(li);

      recipe.categories?.forEach((cat) => allCategories.add(cat));
    });

    updateCategoryFilter();
  }

  function updateCategoryFilter() {
    if (!categoryFilter) return;
    const currentSelection = categoryFilter.value;
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    Array.from(allCategories)
      .sort()
      .forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
      });
    if (
      Array.from(categoryFilter.options).some(
        (opt) => opt.value === currentSelection
      )
    ) {
      categoryFilter.value = currentSelection;
    }
  }

  function filterRecipes() {
    let filteredRecipes = [...recipes];
    const searchTerm = searchInput?.value.toLowerCase().trim() || "";
    const selectedCategory = categoryFilter?.value || "";
    const maxPrepTime = parseInt(prepTimeFilter?.value) || 0;
    const minRating = parseInt(ratingFilter?.value) || 0;
    const favoritesOnly = favoritesFilter?.checked || false;

    if (searchTerm) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm) ||
          recipe.description?.toLowerCase().includes(searchTerm) ||
          recipe.categories?.some((cat) =>
            cat.toLowerCase().includes(searchTerm)
          ) ||
          recipe.ingredients?.some((ing) =>
            ing.name.toLowerCase().includes(searchTerm)
          )
      );
    }

    if (selectedCategory) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.categories?.includes(selectedCategory)
      );
    }

    if (maxPrepTime > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) => {
        const prepTimeValue = parseInt(recipe.prepTime) || 0;
        return prepTimeValue <= maxPrepTime;
      });
    }

    if (minRating > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) => {
        const avgRating = calculateAverageRating(recipe.id);
        return avgRating >= minRating;
      });
    }

    if (favoritesOnly) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        userData.favorites.includes(recipe.id)
      );
    }

    displayRecipes(filteredRecipes);
  }

  function showRecipeDetails(recipeId) {
    currentRecipeId = recipeId;
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) return;

    recipeListSection?.classList.add("hidden");
    addRecipeSection?.classList.add("hidden");
    shoppingListSection?.classList.add("hidden");
    mealPlanSection?.classList.add("hidden");
    recipeDetailsSection?.classList.remove("hidden");

    if (detailsTitle) detailsTitle.textContent = recipe.name;
    if (detailsDescription)
      detailsDescription.textContent =
        recipe.description || "No description available.";
    if (prepTime) prepTime.textContent = recipe.prepTime || "N/A";
    if (cookTime) cookTime.textContent = recipe.cookTime || "N/A";
    if (totalTime) totalTime.textContent = recipe.totalTime || "N/A";
    if (servingsInfo) servingsInfo.textContent = recipe.servings || "N/A";

    if (detailsCategories) {
      detailsCategories.innerHTML = "";
      if (recipe.categories && recipe.categories.length > 0) {
        recipe.categories.forEach((cat) => {
          const span = document.createElement("span");
          span.classList.add("category-tag");
          span.textContent = cat;
          detailsCategories.appendChild(span);
        });
      } else {
        detailsCategories.textContent = "No categories assigned.";
      }
    }

    if (servingSizeSelect) {
      servingSizeSelect.innerHTML = "";
      const baseServings = Number(recipe.servings) || 1;
      for (let i = 1; i <= MAX_SERVINGS; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        if (i === baseServings) option.selected = true;
        servingSizeSelect.appendChild(option);
      }
      if (baseServingInfo) {
        baseServingInfo.textContent = `(Original: ${baseServings} serving${
          baseServings !== 1 ? "s" : ""
        })`;
      }
    }

    displayIngredients(recipe);
    if (detailsInstructions)
      detailsInstructions.textContent =
        recipe.instructions || "No instructions provided.";

    if (detailsImage) {
      if (recipe.image) {
        const objectURL = URL.createObjectURL(recipe.image);
        imageObjectURLs.push(objectURL);
        detailsImage.src = objectURL;
        detailsImage.classList.remove("hidden");
      } else {
        detailsImage.src = "";
        detailsImage.classList.add("hidden");
      }
    }

    if (nutritionCalories)
      nutritionCalories.textContent = recipe.nutrition?.calories || "N/A";
    if (nutritionProtein)
      nutritionProtein.textContent = recipe.nutrition?.protein || "N/A";
    if (nutritionCarbs)
      nutritionCarbs.textContent = recipe.nutrition?.carbs || "N/A";
    if (nutritionFat) nutritionFat.textContent = recipe.nutrition?.fat || "N/A";

    updateFavoriteButton(recipe.id);
    displayRating(recipe.id);
    displayComments(recipe.id);
  }

  function displayIngredients(recipe, servingsOverride = null) {
    if (!detailsIngredients || !recipe) return;
    detailsIngredients.innerHTML = "";
    const baseServings = Number(recipe.servings) || 1;
    const targetServings =
      servingsOverride !== null ? servingsOverride : baseServings;
    const scaleFactor = targetServings / baseServings;

    recipe.ingredients.forEach((ing) => {
      const li = document.createElement("li");
      let qtyText = "";
      if (typeof ing.quantity === "number" && !isNaN(ing.quantity)) {
        const scaledQty = ing.quantity * scaleFactor;
        qtyText = formatQuantity(scaledQty);
        li.innerHTML = `<span class="ingredient-qty">${qtyText}</span><span class="ingredient-unit">${
          ing.unit || ""
        }</span>${ing.name}`;
      } else {
        li.textContent = `${ing.quantity || ""} ${ing.unit || ""} ${
          ing.name
        }`.trim();
        li.classList.add("non-scalable");
      }
      detailsIngredients.appendChild(li);
    });
  }

  function updateFavoriteButton(recipeId) {
    if (!favoriteBtn) return;
    const isFavorited = userData.favorites.includes(recipeId);
    favoriteBtn.classList.toggle("favorited", isFavorited);
    const icon = favoriteBtn.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-regular", !isFavorited);
      icon.classList.toggle("fa-solid", isFavorited);
      icon.classList.toggle("fa-heart", true);
    }
    const textNode = favoriteBtn.lastChild;
    if (textNode && textNode.nodeType === 3) {
      textNode.textContent = isFavorited ? " Favorited" : " Favorite";
    }
  }

  function toggleFavorite(recipeId) {
    const index = userData.favorites.indexOf(recipeId);
    if (index === -1) {
      userData.favorites.push(recipeId);
    } else {
      userData.favorites.splice(index, 1);
    }
    saveUserData();
    updateFavoriteButton(recipeId);
    filterRecipes();
  }

  function calculateAverageRating(recipeId) {
    const ratings = userData.ratings[recipeId] || [];
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return Math.round((sum / ratings.length) * 10) / 10;
  }

  function displayRating(recipeId) {
    if (!ratingStars || !ratingText) return;
    const ratings = userData.ratings[recipeId] || [];
    const userRating = ratings.length > 0 ? ratings[ratings.length - 1] : 0;
    const avgRating = calculateAverageRating(recipeId);

    ratingStars.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i");
      star.classList.add("fa-star");
      star.classList.add(i <= userRating ? "fa-solid" : "fa-regular");
      star.dataset.value = i;
      star.addEventListener("click", () => rateRecipe(recipeId, i));
      star.addEventListener("mouseover", () => {
        const stars = ratingStars.querySelectorAll("i");
        stars.forEach((s, index) => {
          if (index < i) {
            s.classList.remove("fa-regular");
            s.classList.add("fa-solid");
          } else {
            s.classList.remove("fa-solid");
            s.classList.add("fa-regular");
          }
        });
      });
      star.addEventListener("mouseout", () => {
        const stars = ratingStars.querySelectorAll("i");
        stars.forEach((s, index) => {
          if (index < userRating) {
            s.classList.remove("fa-regular");
            s.classList.add("fa-solid");
          } else {
            s.classList.remove("fa-solid");
            s.classList.add("fa-regular");
          }
        });
      });
      ratingStars.appendChild(star);
    }

    ratingText.textContent =
      userRating > 0
        ? `Your Rating: ${userRating} / 5${
            avgRating > 0 ? ` (Avg: ${avgRating})` : ""
          }`
        : avgRating > 0
        ? `Average Rating: ${avgRating} / 5`
        : "Not rated yet";
  }

  function rateRecipe(recipeId, rating) {
    if (!userData.ratings[recipeId]) userData.ratings[recipeId] = [];
    const existingRatingIndex = userData.ratings[recipeId].length - 1;
    if (existingRatingIndex >= 0) {
      userData.ratings[recipeId][existingRatingIndex] = rating;
    } else {
      userData.ratings[recipeId].push(rating);
    }
    saveUserData();
    displayRating(recipeId);
    filterRecipes();
  }

  function displayComments(recipeId) {
    if (!commentsList) return;
    commentsList.innerHTML = "";
    const comments = userData.comments[recipeId] || [];
    if (comments.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No comments yet.";
      commentsList.appendChild(li);
      return;
    }

    comments.forEach((comment) => {
      const li = document.createElement("li");
      const meta = document.createElement("div");
      meta.classList.add("comment-meta");
      meta.textContent = `By ${comment.user} on ${new Date(
        comment.timestamp
      ).toLocaleString()}`;
      const text = document.createElement("p");
      text.textContent = comment.text;
      li.appendChild(meta);
      li.appendChild(text);
      commentsList.appendChild(li);
    });
  }

  function addComment(recipeId) {
    if (!newCommentInput || !currentUser || !recipeId) return;
    const commentText = newCommentInput.value.trim();
    if (!commentText) return;

    if (!userData.comments[recipeId]) userData.comments[recipeId] = [];
    userData.comments[recipeId].push({
      user: currentUser,
      text: commentText,
      timestamp: new Date().toISOString(),
    });
    saveUserData();
    newCommentInput.value = "";
    displayComments(recipeId);
  }

  function showAddRecipeForm(editMode = false, recipe = null) {
    recipeListSection?.classList.add("hidden");
    recipeDetailsSection?.classList.add("hidden");
    shoppingListSection?.classList.add("hidden");
    mealPlanSection?.classList.add("hidden");
    addRecipeSection?.classList.remove("hidden");

    if (formTitle) {
      formTitle.innerHTML = editMode
        ? '<i class="fa-solid fa-pen-to-square"></i> Edit Recipe'
        : '<i class="fa-solid fa-pen-to-square"></i> Add New Recipe';
    }
    if (saveUpdateBtn) {
      saveUpdateBtn.innerHTML = editMode
        ? '<i class="fa-solid fa-save"></i> Update Recipe'
        : '<i class="fa-solid fa-save"></i> Save Recipe';
    }

    if (editMode && recipe) {
      currentRecipeId = recipe.id;
      existingImageSrcForEdit = recipe.image
        ? URL.createObjectURL(recipe.image)
        : null;
      if (existingImageSrcForEdit)
        imageObjectURLs.push(existingImageSrcForEdit);
      newRecipeNameInput.value = recipe.name || "";
      newRecipeDescriptionInput.value = recipe.description || "";
      newRecipeCategoriesInput.value = recipe.categories?.join(", ") || "";
      newRecipePrepTimeInput.value = recipe.prepTime || "";
      newRecipeCookTimeInput.value = recipe.cookTime || "";
      newRecipeTotalTimeInput.value = recipe.totalTime || "";
      newRecipeServingsInput.value = recipe.servings || 1;
      newRecipeIngredientsInput.value = formatIngredientsForTextarea(
        recipe.ingredients
      );
      newRecipeInstructionsInput.value = recipe.instructions || "";
      newRecipeCaloriesInput.value = recipe.nutrition?.calories || "";
      newRecipeProteinInput.value = recipe.nutrition?.protein || "";
      newRecipeCarbsInput.value = recipe.nutrition?.carbs || "";
      newRecipeFatInput.value = recipe.nutrition?.fat || "";
      if (imagePreview && recipe.image) {
        imagePreview.src = existingImageSrcForEdit;
        imagePreview.classList.remove("hidden");
      } else if (imagePreview) {
        imagePreview.src = "";
        imagePreview.classList.add("hidden");
      }
    } else {
      addRecipeForm?.reset();
      currentRecipeId = null;
      existingImageSrcForEdit = null;
      capturedImageBlob = null;
      if (imagePreview) {
        imagePreview.src = "";
        imagePreview.classList.add("hidden");
      }
      if (imageCaptureStatus) imageCaptureStatus.classList.add("hidden");
    }
  }

  function handleAddOrUpdateRecipe(event) {
    event.preventDefault();
    const isEditMode = !!currentRecipeId;
    const recipeId = isEditMode ? currentRecipeId : Date.now().toString();
    const ingredients = parseIngredientsInput(newRecipeIngredientsInput?.value);
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }

    const categories = newRecipeCategoriesInput?.value
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat !== "");

    const recipe = {
      id: recipeId,
      name: newRecipeNameInput?.value.trim(),
      description: newRecipeDescriptionInput?.value.trim(),
      categories: categories,
      prepTime: newRecipePrepTimeInput?.value.trim(),
      cookTime: newRecipeCookTimeInput?.value.trim(),
      totalTime: newRecipeTotalTimeInput?.value.trim(),
      servings: parseInt(newRecipeServingsInput?.value) || 1,
      ingredients: ingredients,
      instructions: newRecipeInstructionsInput?.value.trim(),
      image:
        capturedImageBlob ||
        (isEditMode && existingImageSrcForEdit
          ? recipes.find((r) => r.id === recipeId)?.image
          : null),
      nutrition: {
        calories: newRecipeCaloriesInput?.value.trim() || "",
        protein: newRecipeProteinInput?.value.trim() || "",
        carbs: newRecipeCarbsInput?.value.trim() || "",
        fat: newRecipeFatInput?.value.trim() || "",
      },
    };

    saveRecipe(recipe)
      .then(() => {
        if (!isEditMode) {
          allCategories = new Set([...allCategories, ...categories]);
        }
        capturedImageBlob = null;
        existingImageSrcForEdit = null;
        showRecipeDetails(recipeId);
        filterRecipes();
      })
      .catch((error) => {
        console.error("Failed to save recipe:", error);
        alert("Failed to save recipe. Please try again.");
      });
  }

  function handleDeleteRecipe() {
    if (!currentRecipeId) return;
    if (confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(currentRecipeId)
        .then(() => {
          currentRecipeId = null;
          recipeDetailsSection?.classList.add("hidden");
          recipeListSection?.classList.remove("hidden");
          filterRecipes();
        })
        .catch((error) => {
          console.error("Failed to delete recipe:", error);
          alert("Failed to delete recipe. Please try again.");
        });
    }
  }

  function downloadRecipeAsPDF() {
    if (!currentRecipeId || typeof jspdf === "undefined") return;
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (!recipe) return;

    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    let yOffset = 20;

    doc.setFontSize(20);
    doc.text(recipe.name, 20, yOffset);
    yOffset += 10;

    if (recipe.description) {
      doc.setFontSize(12);
      doc.text("Description:", 20, yOffset);
      yOffset += 6;
      doc.setFontSize(10);
      doc.text(doc.splitTextToSize(recipe.description, 170), 20, yOffset);
      yOffset += 10 + (recipe.description.length / 50) * 5;
    }

    doc.setFontSize(12);
    doc.text("Time Information:", 20, yOffset);
    yOffset += 6;
    doc.setFontSize(10);
    doc.text(`Prep Time: ${recipe.prepTime || "N/A"}`, 20, yOffset);
    yOffset += 5;
    doc.text(`Cook Time: ${recipe.cookTime || "N/A"}`, 20, yOffset);
    yOffset += 5;
    doc.text(`Total Time: ${recipe.totalTime || "N/A"}`, 20, yOffset);
    yOffset += 5;
    doc.text(`Servings: ${recipe.servings || "N/A"}`, 20, yOffset);
    yOffset += 10;

    if (recipe.categories && recipe.categories.length > 0) {
      doc.setFontSize(12);
      doc.text("Categories:", 20, yOffset);
      yOffset += 6;
      doc.setFontSize(10);
      doc.text(recipe.categories.join(", "), 20, yOffset);
      yOffset += 10;
    }

    doc.setFontSize(12);
    doc.text("Ingredients:", 20, yOffset);
    yOffset += 6;
    recipe.ingredients.forEach((ing) => {
      doc.setFontSize(10);
      const qtyText = formatQuantity(ing.quantity);
      const line = `${qtyText} ${ing.unit || ""} ${ing.name}`.trim();
      doc.text(`- ${line}`, 20, yOffset);
      yOffset += 5;
    });
    yOffset += 5;

    doc.setFontSize(12);
    doc.text("Instructions:", 20, yOffset);
    yOffset += 6;
    doc.setFontSize(10);
    doc.text(
      doc.splitTextToSize(
        recipe.instructions || "No instructions provided.",
        170
      ),
      20,
      yOffset
    );
    yOffset += 10 + (recipe.instructions?.length / 50) * 5;

    if (
      recipe.nutrition &&
      Object.values(recipe.nutrition).some((val) => val)
    ) {
      doc.setFontSize(12);
      doc.text("Nutritional Information (per serving):", 20, yOffset);
      yOffset += 6;
      doc.setFontSize(10);
      doc.text(`Calories: ${recipe.nutrition.calories || "N/A"}`, 20, yOffset);
      yOffset += 5;
      doc.text(`Protein: ${recipe.nutrition.protein || "N/A"}`, 20, yOffset);
      yOffset += 5;
      doc.text(`Carbs: ${recipe.nutrition.carbs || "N/A"}`, 20, yOffset);
      yOffset += 5;
      doc.text(`Fat: ${recipe.nutrition.fat || "N/A"}`, 20, yOffset);
    }

    doc.save(`${recipe.name}.pdf`);
  }

  function shareRecipe() {
    if (!currentRecipeId || !navigator.share) {
      alert("Sharing is not supported on this device.");
      return;
    }
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (!recipe) return;

    navigator
      .share({
        title: recipe.name,
        text: `Check out this recipe for ${recipe.name}!`,
        url: window.location.href,
      })
      .catch((error) => console.error("Error sharing recipe:", error));
  }

  // --- Shopping List Functions ---
  function loadShoppingList() {
    const stored = localStorage.getItem(
      `${SHOPPING_LIST_STORAGE_KEY}_${currentUser}`
    );
    shoppingListItems = stored ? JSON.parse(stored) : [];
    displayShoppingList();
  }

  function saveShoppingList() {
    localStorage.setItem(
      `${SHOPPING_LIST_STORAGE_KEY}_${currentUser}`,
      JSON.stringify(shoppingListItems)
    );
  }

  function displayShoppingList() {
    if (!shoppingList) return;
    shoppingList.innerHTML = "";
    if (shoppingListItems.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Your shopping list is empty.";
      shoppingList.appendChild(li);
      return;
    }

    shoppingListItems.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.quantity || ""} ${item.unit || ""} ${
        item.name
      }`.trim();
      const removeBtn = document.createElement("button");
      removeBtn.classList.add("btn", "btn-danger");
      removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i> Remove';
      removeBtn.addEventListener("click", () => {
        shoppingListItems.splice(index, 1);
        saveShoppingList();
        displayShoppingList();
      });
      li.appendChild(removeBtn);
      shoppingList.appendChild(li);
    });
  }

  function addToShoppingList() {
    if (!currentRecipeId) return;
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (!recipe) return;

    const targetServings =
      parseInt(servingSizeSelect?.value) || recipe.servings || 1;
    const baseServings = recipe.servings || 1;
    const scaleFactor = targetServings / baseServings;

    recipe.ingredients.forEach((ing) => {
      let qty = ing.quantity;
      if (typeof qty === "number" && !isNaN(qty)) {
        qty = qty * scaleFactor;
        qty = formatQuantity(qty);
      }
      const existingItem = shoppingListItems.find(
        (item) => item.name === ing.name && item.unit === ing.unit
      );
      if (existingItem) {
        if (
          typeof existingItem.quantity === "number" &&
          typeof qty === "number"
        ) {
          existingItem.quantity += qty;
          existingItem.quantity = formatQuantity(existingItem.quantity);
        }
      } else {
        shoppingListItems.push({
          quantity: qty,
          unit: ing.unit,
          name: ing.name,
        });
      }
    });

    saveShoppingList();
    alert("Ingredients added to shopping list!");
    showShoppingListSection();
  }

  function clearShoppingList() {
    if (confirm("Are you sure you want to clear your shopping list?")) {
      shoppingListItems = [];
      saveShoppingList();
      displayShoppingList();
    }
  }

  // --- Meal Plan Functions ---
  function loadMealPlan() {
    const stored = localStorage.getItem(
      `${MEAL_PLAN_STORAGE_KEY}_${currentUser}`
    );
    mealPlan = stored ? JSON.parse(stored) : {};
    displayMealPlan();
  }

  function saveMealPlan() {
    localStorage.setItem(
      `${MEAL_PLAN_STORAGE_KEY}_${currentUser}`,
      JSON.stringify(mealPlan)
    );
  }

  function displayMealPlan() {
    if (!mealPlanCalendar) return;
    mealPlanCalendar.innerHTML = "";

    DAYS_OF_WEEK.forEach((day) => {
      const dayMealPair = document.createElement("div");
      dayMealPair.classList.add("day-meal-pair");

      const dayHeader = document.createElement("div");
      dayHeader.classList.add("day-header");
      dayHeader.textContent = day;
      dayMealPair.appendChild(dayHeader);

      const slot = document.createElement("div");
      slot.classList.add("day-slot");
      const recipeId = mealPlan[day];
      if (recipeId) {
        const recipe = recipes.find((r) => r.id === recipeId);
        if (recipe) {
          const p = document.createElement("p");
          p.textContent = recipe.name;
          slot.appendChild(p);
          const removeBtn = document.createElement("button");
          removeBtn.classList.add("btn", "btn-danger");
          removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
          removeBtn.addEventListener("click", () => {
            delete mealPlan[day];
            saveMealPlan();
            displayMealPlan();
          });
          slot.appendChild(removeBtn);
        }
      } else {
        const p = document.createElement("p");
        p.textContent = "No meal planned.";
        slot.appendChild(p);
      }
      dayMealPair.appendChild(slot);

      mealPlanCalendar.appendChild(dayMealPair);
    });
  }

  function addToMealPlan() {
    if (!currentRecipeId) return;
    const day = prompt(
      "Enter the day to schedule this recipe (Mon, Tue, Wed, Thu, Fri, Sat, Sun):"
    );
    if (!day || !DAYS_OF_WEEK.includes(day)) {
      alert("Please enter a valid day (Mon, Tue, Wed, Thu, Fri, Sat, Sun).");
      return;
    }

    mealPlan[day] = currentRecipeId;
    saveMealPlan();
    alert(`Recipe scheduled for ${day}!`);
    showMealPlanSection();
  }

  function clearMealPlan() {
    if (confirm("Are you sure you want to clear your meal plan?")) {
      mealPlan = {};
      saveMealPlan();
      displayMealPlan();
    }
  }

  // --- Camera Functions ---
  function cleanupCamera() {
    if (currentCameraStream) {
      currentCameraStream.getTracks().forEach((track) => track.stop());
      currentCameraStream = null;
    }
    if (cameraVideo) cameraVideo.srcObject = null;
  }

  function cleanupObjectURLs() {
    imageObjectURLs.forEach((url) => URL.revokeObjectURL(url));
    imageObjectURLs = [];
  }

  function openCamera() {
    cameraModal?.classList.remove("hidden");
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        currentCameraStream = stream;
        if (cameraVideo) cameraVideo.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
        if (cameraError) {
          cameraError.classList.remove("hidden");
          cameraError.textContent =
            "Unable to access camera. Please check permissions.";
        }
      });
  }

  function capturePhoto() {
    if (!cameraVideo || !cameraCanvas) return;
    cameraCanvas.width = cameraVideo.videoWidth;
    cameraCanvas.height = cameraVideo.videoHeight;
    const ctx = cameraCanvas.getContext("2d");
    ctx.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);
    cameraCanvas.toBlob((blob) => {
      if (blob.size > MAX_IMAGE_SIZE) {
        alert("Captured image is too large. Please upload a smaller image.");
        return;
      }
      capturedImageBlob = blob;
      const objectURL = URL.createObjectURL(blob);
      imageObjectURLs.push(objectURL);
      if (imagePreview) {
        imagePreview.src = objectURL;
        imagePreview.classList.remove("hidden");
      }
      if (imageCaptureStatus) imageCaptureStatus.classList.remove("hidden");
      closeCamera();
    }, "image/jpeg");
  }

  function closeCamera() {
    cleanupCamera();
    cameraModal?.classList.add("hidden");
    if (cameraError) cameraError.classList.add("hidden");
  }

  // --- Navigation Functions ---
  function showRecipeListSection() {
    recipeListSection?.classList.remove("hidden");
    recipeDetailsSection?.classList.add("hidden");
    addRecipeSection?.classList.add("hidden");
    shoppingListSection?.classList.add("hidden");
    mealPlanSection?.classList.add("hidden");
    recipesNavBtn?.classList.add("active");
    shoppingListNavBtn?.classList.remove("active");
    mealPlanNavBtn?.classList.remove("active");
  }

  function showShoppingListSection() {
    recipeListSection?.classList.add("hidden");
    recipeDetailsSection?.classList.add("hidden");
    addRecipeSection?.classList.add("hidden");
    shoppingListSection?.classList.remove("hidden");
    mealPlanSection?.classList.add("hidden");
    recipesNavBtn?.classList.remove("active");
    shoppingListNavBtn?.classList.add("active");
    mealPlanNavBtn?.classList.remove("active");
    displayShoppingList();
  }

  function showMealPlanSection() {
    recipeListSection?.classList.add("hidden");
    recipeDetailsSection?.classList.add("hidden");
    addRecipeSection?.classList.add("hidden");
    shoppingListSection?.classList.add("hidden");
    mealPlanSection?.classList.remove("hidden");
    recipesNavBtn?.classList.remove("active");
    shoppingListNavBtn?.classList.remove("active");
    mealPlanNavBtn?.classList.add("active");
    displayMealPlan();
  }

  // --- Event Listeners ---
  authForm?.addEventListener("submit", handleLogin);
  loginBtn?.addEventListener("click", handleLogin);
  registerBtn?.addEventListener("click", handleRegister);
  logoutBtn?.addEventListener("click", handleLogout);

  themeCheckbox?.addEventListener("change", toggleTheme);

  searchInput?.addEventListener("input", filterRecipes);
  filterBtn?.addEventListener("click", () =>
    filtersSection?.classList.toggle("hidden")
  );
  applyFiltersBtn?.addEventListener("click", () => {
    filterRecipes();
    filtersSection?.classList.add("hidden");
  });
  categoryFilter?.addEventListener("change", filterRecipes);
  prepTimeFilter?.addEventListener("input", filterRecipes);
  ratingFilter?.addEventListener("change", filterRecipes);
  favoritesFilter?.addEventListener("change", filterRecipes);

  addRecipeBtn?.addEventListener("click", () => showAddRecipeForm());
  backBtn?.addEventListener("click", showRecipeListSection);
  cancelAddBtn?.addEventListener("click", showRecipeListSection);
  addRecipeForm?.addEventListener("submit", handleAddOrUpdateRecipe);
  deleteRecipeBtn?.addEventListener("click", handleDeleteRecipe);
  editRecipeBtn?.addEventListener("click", () => {
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (recipe) showAddRecipeForm(true, recipe);
  });
  downloadPdfBtn?.addEventListener("click", downloadRecipeAsPDF);
  favoriteBtn?.addEventListener("click", () => toggleFavorite(currentRecipeId));
  shareBtn?.addEventListener("click", shareRecipe);
  servingSizeSelect?.addEventListener("change", () => {
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (recipe) displayIngredients(recipe, parseInt(servingSizeSelect.value));
  });
  addCommentBtn?.addEventListener("click", () => addComment(currentRecipeId));
  addToShoppingListBtn?.addEventListener("click", addToShoppingList);
  addToMealPlanBtn?.addEventListener("click", addToMealPlan);

  newRecipeImageInput?.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        alert("Image is too large. Maximum size is 5MB.");
        newRecipeImageInput.value = "";
        return;
      }
      capturedImageBlob = file;
      const objectURL = URL.createObjectURL(file);
      imageObjectURLs.push(objectURL);
      if (imagePreview) {
        imagePreview.src = objectURL;
        imagePreview.classList.remove("hidden");
      }
      if (imageCaptureStatus) {
        imageCaptureStatus.classList.remove("hidden");
        imageCaptureStatus.textContent = "Image uploaded successfully!";
      }
    }
  });

  openCameraBtn?.addEventListener("click", openCamera);
  capturePhotoBtn?.addEventListener("click", capturePhoto);
  closeCameraBtn?.addEventListener("click", closeCamera);

  contactBtn?.addEventListener("click", () => {
    window.location.href =
      "mailto:support@barrtechsolutions.com?subject=Support%20Request%20-%20My%20Recipe%20App";
  });

  clearShoppingListBtn?.addEventListener("click", clearShoppingList);
  clearMealPlanBtn?.addEventListener("click", clearMealPlan);

  recipesNavBtn?.addEventListener("click", showRecipeListSection);
  shoppingListNavBtn?.addEventListener("click", showShoppingListSection);
  mealPlanNavBtn?.addEventListener("click", showMealPlanSection);

  // --- Initialization ---
  function initializeApp() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";
    applyTheme(savedTheme);

    loadingSpinner?.classList.remove("hidden");
    initIndexedDB()
      .then(() => loadRecipes())
      .then(() => {
        loadShoppingList();
        loadMealPlan();
        displayRecipes();
        loadingSpinner?.classList.add("hidden");
      })
      .catch((error) => {
        console.error("Initialization failed:", error);
        loadingSpinner?.classList.add("hidden");
        alert("Failed to load recipes. Please try again later.");
      });
  }

  // --- Cleanup on Unload ---
  window.addEventListener("beforeunload", () => {
    cleanupCamera();
    cleanupObjectURLs();
  });
});
