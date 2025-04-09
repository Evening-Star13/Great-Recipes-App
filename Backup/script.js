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
  const dietaryFilter = document.getElementById("dietary-filter");
  const prepTimeFilter = document.getElementById("prep-time-filter");
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
  const newRecipeDietaryInput = document.getElementById("new-recipe-dietary");
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
  const switchCameraBtn = document.getElementById("switch-camera-btn");
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
  let existingImageBase64ForEdit = null; // Changed to store base64
  let shoppingListItems = [];
  let mealPlan = {};
  let userData = { favorites: [], comments: {} };
  let allCategories = new Set();
  let allDietaryTypes = new Set([
    "Gluten-Free",
    "Vegan",
    "Vegetarian",
    "Dairy-Free",
    "Nut-Free",
  ]);
  let isFrontCamera = false;
  let isEditing = false;

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
  const MAX_PDF_IMAGE_SIZE_PTS = 100; // 300px * 0.75 (jsPDF default pt/px ratio)

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

  function deleteRecipeFromIndexedDB(id) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([RECIPE_STORE], "readwrite");
      const store = transaction.objectStore(RECIPE_STORE);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = (event) =>
        reject("Error deleting recipe from IndexedDB: " + event.target.error);
    });
  }

  function saveRecipesToIndexedDB() {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([RECIPE_STORE], "readwrite");
      const store = transaction.objectStore(RECIPE_STORE);
      recipes.forEach((recipe) => store.put(recipe));
      transaction.oncomplete = () => resolve();
      transaction.onerror = (event) =>
        reject("Error saving recipes to IndexedDB: " + event.target.error);
    });
  }

  function loadRecipesFromIndexedDB() {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([RECIPE_STORE], "readonly");
      const store = transaction.objectStore(RECIPE_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) =>
        reject("Error loading recipes from IndexedDB: " + event.target.error);
    });
  }

  // --- Image Handling Helpers ---
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }

  function base64ToBlob(base64) {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  // --- General Helper Functions ---
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
        return Number(parts[0]) / Number(parts[1]);
      }
    }
    const numeric = parseFloat(qtyString);
    return isNaN(numeric) ? null : numeric;
  }

  function formatQuantity(num) {
    if (num === null || isNaN(num) || num <= 0) return "N/A";
    const whole = Math.floor(num);
    const fractional = num - whole;
    if (fractional === 0) return `${whole}`;
    const precision = 100;
    const numerator = Math.round(fractional * precision);
    const denominator = precision;
    const divisor = gcd(numerator, denominator);
    const simplifiedNum = numerator / divisor;
    const simplifiedDen = denominator / divisor;
    return whole === 0
      ? `${simplifiedNum}/${simplifiedDen}`
      : `${whole} ${simplifiedNum}/${simplifiedDen}`;
  }

  function parseTime(timeStr) {
    if (!timeStr || typeof timeStr !== "string") return null;
    const match = timeStr.match(/(\d+\.?\d*)\s*(min|hr|hour|hours|m|h)?/i);
    if (!match) return null;
    const value = parseFloat(match[1]);
    const unit = match[2] ? match[2].toLowerCase() : "min";
    return unit.includes("h") ? value * 60 : value;
  }

  function formatTime(minutes) {
    if (!minutes || isNaN(minutes)) return "N/A";
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = Math.round(minutes % 60);
      return remainingMinutes === 0
        ? `${hours} hr`
        : `${hours} hr ${remainingMinutes} min`;
    }
    return `${Math.round(minutes)} min`;
  }

  function saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving to localStorage (${key}):`, e);
    }
  }

  function loadFromLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`Error loading from localStorage (${key}):`, e);
      return null;
    }
  }

  // --- Authentication Functions ---
  function showAuthError(message) {
    authError.textContent = message;
    authError.classList.remove("hidden");
    setTimeout(() => authError.classList.add("hidden"), 5000);
  }

  function login(username, password) {
    const users = loadFromLocalStorage(USERS_STORAGE_KEY) || {};
    if (users[username] && users[username].password === password) {
      currentUser = username;
      userData = loadFromLocalStorage(
        `${USER_DATA_STORAGE_KEY}.${username}`
      ) || {
        favorites: [],
        comments: {},
      };
      authSection.classList.add("hidden");
      mainApp.style.display = "block";
      loadRecipes();
      loadShoppingList();
      loadMealPlan();
    } else {
      showAuthError("Invalid username or password.");
    }
  }

  function register(username, password) {
    const users = loadFromLocalStorage(USERS_STORAGE_KEY) || {};
    if (users[username]) {
      showAuthError("Username already exists.");
      return;
    }
    users[username] = { password };
    saveToLocalStorage(USERS_STORAGE_KEY, users);
    login(username, password);
  }

  function logout() {
    saveToLocalStorage(`${USER_DATA_STORAGE_KEY}.${currentUser}`, userData);
    saveRecipesToIndexedDB().catch((e) =>
      console.error("Failed to save recipes on logout:", e)
    );
    currentUser = null;
    userData = { favorites: [], comments: {} };
    recipes = [];
    shoppingListItems = [];
    mealPlan = {};
    authSection.classList.remove("hidden");
    mainApp.style.display = "none";
    usernameInput.value = "";
    passwordInput.value = "";
  }

  // --- Recipe Management ---
  async function loadRecipes() {
    loadingSpinner.classList.remove("hidden");
    try {
      await initIndexedDB();
      const indexedRecipes = await loadRecipesFromIndexedDB();
      recipes = indexedRecipes || [];
      if (!recipes.length) {
        recipes = loadFromLocalStorage(RECIPES_STORAGE_KEY) || [];
        if (recipes.length) await saveRecipesToIndexedDB();
      }
      // Regenerate image URLs from base64
      recipes = recipes.map((recipe) => {
        if (recipe.imageBase64) {
          const blob = base64ToBlob(recipe.imageBase64);
          recipe.image = URL.createObjectURL(blob);
        }
        return recipe;
      });
      recipes.forEach((recipe) => {
        recipe.categories?.forEach((cat) => allCategories.add(cat));
        if (recipe.dietaryType) allDietaryTypes.add(recipe.dietaryType);
      });
      saveToLocalStorage(RECIPES_STORAGE_KEY, recipes);
      populateCategoryFilter();
      displayRecipes();
    } catch (e) {
      console.error("Error loading recipes:", e);
      recipes = loadFromLocalStorage(RECIPES_STORAGE_KEY) || [];
      displayRecipes();
    } finally {
      loadingSpinner.classList.add("hidden");
    }
  }

  function populateCategoryFilter() {
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    Array.from(allCategories)
      .sort()
      .forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
      });
  }

  function displayRecipes(filteredRecipes = recipes) {
    recipeList.innerHTML = "";
    if (filteredRecipes.length === 0) {
      recipeList.innerHTML =
        '<li class="no-results">No recipes found matching your criteria.</li>';
      return;
    }
    filteredRecipes.forEach((recipe) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${recipe.name}</strong>
        <br>
        ${recipe.description ? `<small>${recipe.description}</small><br>` : ""}
        <small>Prep: ${recipe.prepTime || "N/A"} | Total: ${
        recipe.totalTime || "N/A"
      }</small>
      `;
      li.dataset.id = recipe.id;
      li.addEventListener("click", () => showRecipeDetails(recipe.id));
      recipeList.appendChild(li);
    });
  }

  function filterRecipes() {
    let filtered = [...recipes];
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedDietary = dietaryFilter.value;
    const maxPrepTime = parseTime(prepTimeFilter.value);
    const favoritesOnly = favoritesFilter.checked;

    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchTerm) ||
          r.description?.toLowerCase().includes(searchTerm) ||
          r.categories?.some((cat) => cat.toLowerCase().includes(searchTerm)) ||
          r.dietaryType?.toLowerCase().includes(searchTerm)
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((r) =>
        r.categories?.includes(selectedCategory)
      );
    }
    if (selectedDietary) {
      filtered = filtered.filter((r) => r.dietaryType === selectedDietary);
    }
    if (maxPrepTime) {
      filtered = filtered.filter((r) => parseTime(r.prepTime) <= maxPrepTime);
    }
    if (favoritesOnly && currentUser) {
      filtered = filtered.filter((r) => userData.favorites.includes(r.id));
    }
    displayRecipes(filtered);
  }

  function showRecipeDetails(id) {
    currentRecipeId = id;
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) return;

    recipeListSection.classList.add("hidden");
    recipeDetailsSection.classList.remove("hidden");
    detailsTitle.textContent = recipe.name;
    detailsDescription.textContent =
      recipe.description || "No description available.";
    detailsCategories.innerHTML = "";
    const combinedTags = [...(recipe.categories || [])];
    if (recipe.dietaryType) combinedTags.push(recipe.dietaryType);
    combinedTags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "category-tag";
      span.textContent = tag;
      detailsCategories.appendChild(span);
    });

    prepTime.textContent = recipe.prepTime || "N/A";
    cookTime.textContent = recipe.cookTime || "N/A";
    totalTime.textContent = recipe.totalTime || "N/A";
    servingsInfo.textContent = `${recipe.servings} servings`;
    baseServingInfo.textContent = `(Base recipe makes ${recipe.servings} servings)`;

    servingSizeSelect.innerHTML = "";
    for (let i = 1; i <= MAX_SERVINGS; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      if (i === recipe.servings) option.selected = true;
      servingSizeSelect.appendChild(option);
    }

    adjustIngredients(recipe.ingredients || [], recipe.servings);
    detailsInstructions.textContent =
      recipe.instructions || "No instructions provided.";

    if (recipe.image) {
      detailsImage.src = recipe.image;
      detailsImage.classList.remove("hidden");
    } else {
      detailsImage.classList.add("hidden");
      detailsImage.src = "";
    }

    nutritionCalories.textContent = recipe.nutrition?.calories || "N/A";
    nutritionProtein.textContent = recipe.nutrition?.protein || "N/A";
    nutritionCarbs.textContent = recipe.nutrition?.carbs || "N/A";
    nutritionFat.textContent = recipe.nutrition?.fat || "N/A";

    favoriteBtn.classList.toggle(
      "favorited",
      currentUser && userData.favorites.includes(id)
    );
    favoriteBtn.querySelector("i").className =
      currentUser && userData.favorites.includes(id)
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart";

    displayComments(id);
  }

  function adjustIngredients(ingredients, baseServings) {
    const selectedServings = parseInt(servingSizeSelect.value) || baseServings;
    const factor = selectedServings / baseServings;
    detailsIngredients.innerHTML = "";

    ingredients.forEach((ing) => {
      const li = document.createElement("li");
      const qty = parseQuantity(ing.quantity);
      if (qty !== null) {
        const adjustedQty = qty * factor;
        li.innerHTML = `<span class="ingredient-qty">${formatQuantity(
          adjustedQty
        )}</span><span class="ingredient-unit">${ing.unit || ""}</span> ${
          ing.name
        }`;
      } else {
        li.textContent =
          ing.quantity + (ing.unit ? ` ${ing.unit} ` : " ") + ing.name;
        li.classList.add("non-scalable");
      }
      detailsIngredients.appendChild(li);
    });
  }

  function displayComments(recipeId) {
    commentsList.innerHTML = "";
    const comments = userData.comments[recipeId] || [];
    comments.forEach((comment, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="comment-meta">${currentUser} - ${new Date(
        comment.timestamp
      ).toLocaleString()}</div>
        ${comment.text}
        <div class="comment-actions">
          <button class="edit-comment-btn">Edit</button>
          <button class="delete-comment-btn">Delete</button>
        </div>
      `;
      li.querySelector(".edit-comment-btn").addEventListener("click", () =>
        editComment(recipeId, index)
      );
      li.querySelector(".delete-comment-btn").addEventListener("click", () =>
        deleteComment(recipeId, index)
      );
      commentsList.appendChild(li);
    });
  }

  function addComment(recipeId) {
    if (!currentUser) {
      alert("Please log in to add a comment.");
      return;
    }
    const text = newCommentInput.value.trim();
    if (!text) return;
    if (!userData.comments[recipeId]) userData.comments[recipeId] = [];
    userData.comments[recipeId].push({
      text,
      timestamp: Date.now(),
      user: currentUser,
    });
    newCommentInput.value = "";
    displayComments(recipeId);
    saveToLocalStorage(`${USER_DATA_STORAGE_KEY}.${currentUser}`, userData);
  }

  function editComment(recipeId, index) {
    const comments = userData.comments[recipeId];
    if (!comments || !comments[index]) return;
    const newText = prompt("Edit your comment:", comments[index].text);
    if (newText !== null && newText.trim()) {
      comments[index].text = newText.trim();
      comments[index].timestamp = Date.now();
      displayComments(recipeId);
      saveToLocalStorage(`${USER_DATA_STORAGE_KEY}.${currentUser}`, userData);
    }
  }

  function deleteComment(recipeId, index) {
    if (confirm("Are you sure you want to delete this comment?")) {
      userData.comments[recipeId].splice(index, 1);
      if (userData.comments[recipeId].length === 0) {
        delete userData.comments[recipeId];
      }
      displayComments(recipeId);
      saveToLocalStorage(`${USER_DATA_STORAGE_KEY}.${currentUser}`, userData);
    }
  }

  async function addRecipe(recipe) {
    recipe.id = Date.now().toString();
    recipe.createdBy = currentUser;
    if (recipe.imageBlob) {
      recipe.imageBase64 = await blobToBase64(recipe.imageBlob);
      recipe.image = URL.createObjectURL(recipe.imageBlob);
      delete recipe.image_blob; // Clean up temporary field
    }
    recipes.push(recipe);
    saveRecipesToIndexedDB()
      .then(() => {
        saveToLocalStorage(RECIPES_STORAGE_KEY, recipes);
        console.log("Recipe added:", recipe);
        displayRecipes();
      })
      .catch((e) => console.error("Failed to save recipe:", e));
    recipe.categories?.forEach((cat) => allCategories.add(cat));
    if (recipe.dietaryType) allDietaryTypes.add(recipe.dietaryType);
    populateCategoryFilter();
  }

  async function updateRecipe(recipeId, updatedRecipe) {
    const index = recipes.findIndex((r) => r.id === recipeId);
    if (index === -1) return;
    updatedRecipe.id = recipeId;
    updatedRecipe.createdBy = recipes[index].createdBy;
    if (updatedRecipe.imageBlob) {
      updatedRecipe.imageBase64 = await blobToBase64(updatedRecipe.imageBlob);
      updatedRecipe.image = URL.createObjectURL(updatedRecipe.imageBlob);
      delete updatedRecipe.imageBlob; // Clean up
    } else if (recipes[index].imageBase64) {
      updatedRecipe.imageBase64 = recipes[index].imageBase64;
      updatedRecipe.image = recipes[index].image;
    }
    recipes[index] = updatedRecipe;
    saveRecipesToIndexedDB()
      .then(() => {
        saveToLocalStorage(RECIPES_STORAGE_KEY, recipes);
        console.log("Recipe updated:", updatedRecipe);
        showRecipeDetails(recipeId);
        displayRecipes();
      })
      .catch((e) => console.error("Failed to update recipe:", e));
    updatedRecipe.categories?.forEach((cat) => allCategories.add(cat));
    if (updatedRecipe.dietaryType)
      allDietaryTypes.add(updatedRecipe.dietaryType);
    populateCategoryFilter();
  }

  function deleteRecipe(id) {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) return;
    recipes = recipes.filter((r) => r.id !== id);
    if (userData.favorites.includes(id)) {
      userData.favorites = userData.favorites.filter((fid) => fid !== id);
    }
    delete userData.comments[id];
    deleteRecipeFromIndexedDB(id)
      .then(() => {
        saveToLocalStorage(RECIPES_STORAGE_KEY, recipes);
        saveToLocalStorage(`${USER_DATA_STORAGE_KEY}.${currentUser}`, userData);
        console.log("Recipe deleted:", id);
        recipeDetailsSection.classList.add("hidden");
        recipeListSection.classList.remove("hidden");
        displayRecipes();
        if (recipe.image) URL.revokeObjectURL(recipe.image);
      })
      .catch((e) => {
        console.error("Failed to delete recipe:", e);
        recipes.push(recipe); // Rollback on failure
        displayRecipes();
      });
  }

  // --- PDF Generation ---
  async function downloadRecipeAsPDF() {
    if (!currentRecipeId || typeof jspdf === "undefined") {
      console.error(
        "Cannot generate PDF: jsPDF not loaded or no recipe selected."
      );
      return;
    }
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (!recipe) return;

    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;
    let y = margin;

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(recipe.name, margin, y, { maxWidth });
    y += 10;

    if (recipe.imageBase64) {
      try {
        const imgData = recipe.imageBase64;
        const imgProps = doc.getImageProperties(imgData);
        let imgWidth = imgProps.width * 0.75;
        let imgHeight = imgProps.height * 0.75;
        const aspectRatio = imgWidth / imgHeight;

        if (
          imgWidth > MAX_PDF_IMAGE_SIZE_PTS ||
          imgHeight > MAX_PDF_IMAGE_SIZE_PTS
        ) {
          if (aspectRatio > 1) {
            imgWidth = MAX_PDF_IMAGE_SIZE_PTS;
            imgHeight = imgWidth / aspectRatio;
          } else {
            imgHeight = MAX_PDF_IMAGE_SIZE_PTS;
            imgWidth = imgHeight * aspectRatio;
          }
        }

        if (y + imgHeight + 10 > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        doc.addImage(imgData, "JPEG", margin, y, imgWidth, imgHeight);
        y += imgHeight + 10;
      } catch (e) {
        console.error("Error adding image to PDF:", e);
      }
    }

    if (recipe.description) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Description:", margin, y);
      y += 6;
      doc.setFontSize(10);
      doc.text(recipe.description, margin, y, { maxWidth });
      y += doc.splitTextToSize(recipe.description, maxWidth).length * 5 + 5;
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Time:", margin, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Prep Time: ${recipe.prepTime || "N/A"}`, margin, y);
    y += 5;
    doc.text(`Cook Time: ${recipe.cookTime || "N/A"}`, margin, y);
    y += 5;
    doc.text(`Total Time: ${recipe.totalTime || "N/A"}`, margin, y);
    y += 5;
    doc.text(`Servings: ${recipe.servings || "N/A"}`, margin, y);
    y += 10;

    const combinedTags = [...(recipe.categories || [])];
    if (recipe.dietaryType) combinedTags.push(recipe.dietaryType);
    if (combinedTags.length) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Categories & Dietary Types:", margin, y);
      y += 6;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(combinedTags.join(", "), margin, y, { maxWidth });
      y +=
        doc.splitTextToSize(combinedTags.join(", "), maxWidth).length * 5 + 5;
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Ingredients:", margin, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    recipe.ingredients.forEach((ing) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      const text = `${ing.quantity || ""} ${ing.unit || ""} ${ing.name}`.trim();
      doc.text(`• ${text}`, margin, y);
      y += 5;
    });
    y += 5;

    if (recipe.instructions) {
      if (y > doc.internal.pageSize.getHeight() - margin - 20) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Instructions:", margin, y);
      y += 6;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const instructionLines = doc.splitTextToSize(
        recipe.instructions,
        maxWidth
      );
      instructionLines.forEach((line) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += 5;
      });
    }

    if (recipe.nutrition) {
      if (y > doc.internal.pageSize.getHeight() - margin - 20) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Nutritional Information (per serving):", margin, y);
      y += 6;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Calories: ${recipe.nutrition.calories || "N/A"}`, margin, y);
      y += 5;
      doc.text(`Protein: ${recipe.nutrition.protein || "N/A"}`, margin, y);
      y += 5;
      doc.text(`Carbs: ${recipe.nutrition.carbs || "N/A"}`, margin, y);
      y += 5;
      doc.text(`Fat: ${recipe.nutrition.fat || "N/A"}`, margin, y);
    }

    doc.save(`${recipe.name.replace(/[^a-z0-9]/gi, "_")}.pdf`);
  }

  // --- Shopping List & Meal Plan ---
  function loadShoppingList() {
    shoppingListItems =
      loadFromLocalStorage(`${SHOPPING_LIST_STORAGE_KEY}.${currentUser}`) || [];
    displayShoppingList();
  }

  function saveShoppingList() {
    saveToLocalStorage(
      `${SHOPPING_LIST_STORAGE_KEY}.${currentUser}`,
      shoppingListItems
    );
  }

  function displayShoppingList() {
    shoppingList.innerHTML = "";
    shoppingListItems.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item;
      const removeBtn = document.createElement("button");
      removeBtn.className = "btn btn-danger";
      removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
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
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (!recipe) return;
    const selectedServings =
      parseInt(servingSizeSelect.value) || recipe.servings;
    const factor = selectedServings / recipe.servings;
    recipe.ingredients.forEach((ing) => {
      const qty = parseQuantity(ing.quantity);
      const adjustedQty =
        qty !== null ? formatQuantity(qty * factor) : ing.quantity;
      const item = `${adjustedQty} ${ing.unit || ""} ${ing.name}`.trim();
      if (!shoppingListItems.includes(item)) shoppingListItems.push(item);
    });
    saveShoppingList();
    alert("Ingredients added to shopping list!");
  }

  function clearShoppingList() {
    if (confirm("Are you sure you want to clear your shopping list?")) {
      shoppingListItems = [];
      saveShoppingList();
      displayShoppingList();
    }
  }

  function loadMealPlan() {
    mealPlan =
      loadFromLocalStorage(`${MEAL_PLAN_STORAGE_KEY}.${currentUser}`) || {};
    displayMealPlan();
  }

  function saveMealPlan() {
    saveToLocalStorage(`${MEAL_PLAN_STORAGE_KEY}.${currentUser}`, mealPlan);
  }

  function displayMealPlan() {
    const slots = mealPlanCalendar.querySelectorAll(".day-slot");
    slots.forEach((slot, index) => {
      const day = DAYS_OF_WEEK[index];
      const recipeId = mealPlan[day];
      const recipe = recipeId ? recipes.find((r) => r.id === recipeId) : null;
      const p = slot.querySelector("p");
      p.textContent = recipe ? recipe.name : "No meal planned";
      const btn = slot.querySelector("button");
      btn.onclick = () => {
        delete mealPlan[day];
        saveMealPlan();
        displayMealPlan();
      };
    });
  }

  function addToMealPlan() {
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (!recipe) return;
    const day = prompt(
      "Enter the day to schedule this meal (Mon, Tue, Wed, Thu, Fri, Sat, Sun):"
    );
    if (!day || !DAYS_OF_WEEK.includes(day)) {
      alert("Invalid day! Please use: Mon, Tue, Wed, Thu, Fri, Sat, Sun.");
      return;
    }
    mealPlan[day] = currentRecipeId;
    saveMealPlan();
    displayMealPlan();
    alert(`${recipe.name} added to ${day}'s meal plan!`);
  }

  function clearMealPlan() {
    if (confirm("Are you sure you want to clear your meal plan?")) {
      mealPlan = {};
      saveMealPlan();
      displayMealPlan();
    }
  }

  // --- Camera Functions ---
  async function openCamera() {
    cameraModal.classList.remove("hidden");
    try {
      currentCameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFrontCamera ? "user" : "environment" },
      });
      cameraVideo.srcObject = currentCameraStream;
      cameraError.classList.add("hidden");
    } catch (e) {
      console.error("Error accessing camera:", e);
      cameraError.textContent = "Unable to access camera: " + e.message;
      cameraError.classList.remove("hidden");
    }
  }

  function closeCamera() {
    if (currentCameraStream) {
      currentCameraStream.getTracks().forEach((track) => track.stop());
      currentCameraStream = null;
    }
    cameraVideo.srcObject = null;
    cameraModal.classList.add("hidden");
  }

  async function switchCamera() {
    isFrontCamera = !isFrontCamera;
    closeCamera();
    await openCamera();
  }

  function capturePhoto() {
    const context = cameraCanvas.getContext("2d");
    cameraCanvas.width = cameraVideo.videoWidth;
    cameraCanvas.height = cameraVideo.videoHeight;
    context.drawImage(
      cameraVideo,
      0,
      0,
      cameraCanvas.width,
      cameraCanvas.height
    );
    cameraCanvas.toBlob((blob) => {
      if (blob.size > MAX_IMAGE_SIZE) {
        alert("Captured image exceeds 5MB. Please try again.");
        return;
      }
      capturedImageBlob = blob;
      const url = URL.createObjectURL(blob);
      imagePreview.src = url;
      imagePreview.classList.remove("hidden");
      imageCaptureStatus.classList.remove("hidden");
      closeCamera();
    }, "image/jpeg");
  }

  // --- Event Listeners ---
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login(usernameInput.value.trim(), passwordInput.value);
  });

  registerBtn.addEventListener("click", () =>
    register(usernameInput.value.trim(), passwordInput.value)
  );

  logoutBtn.addEventListener("click", logout);

  searchInput.addEventListener("input", filterRecipes);

  filterBtn.addEventListener("click", () =>
    filtersSection.classList.toggle("hidden")
  );

  applyFiltersBtn.addEventListener("click", () => {
    filterRecipes();
    filtersSection.classList.add("hidden");
  });

  addRecipeBtn.addEventListener("click", () => {
    isEditing = false;
    currentRecipeId = null;
    formTitle.textContent = "Add New Recipe";
    saveUpdateBtn.textContent = "Save Recipe";
    addRecipeForm.reset();
    imagePreview.classList.add("hidden");
    imagePreview.src = "";
    imageCaptureStatus.classList.add("hidden");
    capturedImageBlob = null;
    existingImageBase64ForEdit = null;
    recipeListSection.classList.add("hidden");
    addRecipeSection.classList.remove("hidden");
  });

  backBtn.addEventListener("click", () => {
    recipeDetailsSection.classList.add("hidden");
    recipeListSection.classList.remove("hidden");
  });

  cancelAddBtn.addEventListener("click", () => {
    addRecipeSection.classList.add("hidden");
    recipeListSection.classList.remove("hidden");
    if (imagePreview.src) URL.revokeObjectURL(imagePreview.src);
  });

  addRecipeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!newRecipeNameInput.value.trim()) {
      alert("Recipe name is required.");
      return;
    }
    if (!newRecipeIngredientsInput.value.trim()) {
      alert("Ingredients are required.");
      return;
    }
    if (!newRecipeInstructionsInput.value.trim()) {
      alert("Instructions are required.");
      return;
    }

    const ingredients = newRecipeIngredientsInput.value
      .split("\n")
      .map((line) => {
        const parts = line.trim().split(/\s+/);
        if (parts.length < 2)
          return { quantity: line.trim(), name: "", unit: "" };
        const qty = parseQuantity(parts[0]);
        const unitIndex = qty !== null && parts.length > 2 ? 1 : null;
        const unit = unitIndex ? parts[unitIndex] : "";
        const name = parts.slice(unitIndex ? 2 : 1).join(" ");
        return { quantity: parts[0], unit, name };
      })
      .filter((ing) => ing.quantity || ing.name);

    const recipe = {
      name: newRecipeNameInput.value.trim(),
      description: newRecipeDescriptionInput.value.trim() || "",
      categories: newRecipeCategoriesInput.value
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c),
      dietaryType: newRecipeDietaryInput.value || "",
      prepTime: newRecipePrepTimeInput.value.trim() || "",
      cookTime: newRecipeCookTimeInput.value.trim() || "",
      totalTime: newRecipeTotalTimeInput.value.trim() || "",
      servings: parseInt(newRecipeServingsInput.value) || 1,
      ingredients,
      instructions: newRecipeInstructionsInput.value.trim(),
      nutrition: {
        calories: newRecipeCaloriesInput.value.trim() || "N/A",
        protein: newRecipeProteinInput.value.trim() || "N/A",
        carbs: newRecipeCarbsInput.value.trim() || "N/A",
        fat: newRecipeFatInput.value.trim() || "N/A",
      },
    };

    if (capturedImageBlob) {
      recipe.imageBlob = capturedImageBlob;
    } else if (newRecipeImageInput.files[0]) {
      if (newRecipeImageInput.files[0].size > MAX_IMAGE_SIZE) {
        alert("Image size exceeds 5MB limit.");
        return;
      }
      recipe.imageBlob = newRecipeImageInput.files[0];
    } else if (isEditing && existingImageBase64ForEdit) {
      recipe.imageBase64 = existingImageBase64ForEdit;
      recipe.image = URL.createObjectURL(
        base64ToBlob(existingImageBase64ForEdit)
      );
    }

    if (isEditing && currentRecipeId) {
      await updateRecipe(currentRecipeId, recipe);
    } else {
      await addRecipe(recipe);
    }

    addRecipeSection.classList.add("hidden");
    recipeListSection.classList.remove("hidden");
    if (imagePreview.src) URL.revokeObjectURL(imagePreview.src);
  });

  deleteRecipeBtn.addEventListener("click", () =>
    deleteRecipe(currentRecipeId)
  );

  editRecipeBtn.addEventListener("click", () => {
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (!recipe) return;
    isEditing = true;
    formTitle.textContent = "Edit Recipe";
    saveUpdateBtn.textContent = "Update Recipe";
    newRecipeNameInput.value = recipe.name;
    newRecipeDescriptionInput.value = recipe.description || "";
    newRecipeCategoriesInput.value = recipe.categories?.join(", ") || "";
    newRecipeDietaryInput.value = recipe.dietaryType || "";
    newRecipePrepTimeInput.value = recipe.prepTime || "";
    newRecipeCookTimeInput.value = recipe.cookTime || "";
    newRecipeTotalTimeInput.value = recipe.totalTime || "";
    newRecipeServingsInput.value = recipe.servings || 1;
    newRecipeIngredientsInput.value = recipe.ingredients
      .map((ing) => `${ing.quantity} ${ing.unit || ""} ${ing.name}`.trim())
      .join("\n");
    newRecipeInstructionsInput.value = recipe.instructions || "";
    newRecipeCaloriesInput.value = recipe.nutrition?.calories || "";
    newRecipeProteinInput.value = recipe.nutrition?.protein || "";
    newRecipeCarbsInput.value = recipe.nutrition?.carbs || "";
    newRecipeFatInput.value = recipe.nutrition?.fat || "";

    if (recipe.imageBase64) {
      imagePreview.src = recipe.image;
      imagePreview.classList.remove("hidden");
      existingImageBase64ForEdit = recipe.imageBase64;
    } else {
      imagePreview.classList.add("hidden");
      imagePreview.src = "";
      existingImageBase64ForEdit = null;
    }
    capturedImageBlob = null;
    imageCaptureStatus.classList.add("hidden");

    recipeDetailsSection.classList.add("hidden");
    addRecipeSection.classList.remove("hidden");
  });

  downloadPdfBtn.addEventListener("click", downloadRecipeAsPDF);

  favoriteBtn.addEventListener("click", () => {
    if (!currentUser) {
      alert("Please log in to favorite recipes.");
      return;
    }
    const isFavorited = userData.favorites.includes(currentRecipeId);
    if (isFavorited) {
      userData.favorites = userData.favorites.filter(
        (id) => id !== currentRecipeId
      );
    } else {
      userData.favorites.push(currentRecipeId);
    }
    favoriteBtn.classList.toggle("favorited");
    favoriteBtn.querySelector("i").className = isFavorited
      ? "fa-regular fa-heart"
      : "fa-solid fa-heart";
    saveToLocalStorage(`${USER_DATA_STORAGE_KEY}.${currentUser}`, userData);
  });

  shareBtn.addEventListener("click", () => {
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (!recipe) return;
    const url = window.location.href.split("?")[0] + "?recipe=" + recipe.id;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("Recipe URL copied to clipboard!"));
  });

  servingSizeSelect.addEventListener("change", () => {
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (recipe) {
      servingsInfo.textContent = `${servingSizeSelect.value} servings`;
      adjustIngredients(recipe.ingredients, recipe.servings);
    }
  });

  addCommentBtn.addEventListener("click", () => addComment(currentRecipeId));

  addToShoppingListBtn.addEventListener("click", addToShoppingList);

  addToMealPlanBtn.addEventListener("click", addToMealPlan);

  newRecipeImageInput.addEventListener("change", () => {
    if (newRecipeImageInput.files[0]) {
      if (newRecipeImageInput.files[0].size > MAX_IMAGE_SIZE) {
        alert("Image size exceeds 5MB limit.");
        newRecipeImageInput.value = "";
        return;
      }
      const url = URL.createObjectURL(newRecipeImageInput.files[0]);
      imagePreview.src = url;
      imagePreview.classList.remove("hidden");
      capturedImageBlob = null;
      imageCaptureStatus.classList.add("hidden");
    }
  });

  themeCheckbox.addEventListener("change", () => {
    body.dataset.theme = themeCheckbox.checked ? "dark" : "light";
    saveToLocalStorage(THEME_STORAGE_KEY, body.dataset.theme);
    document.querySelector(".mode-text").textContent = themeCheckbox.checked
      ? "Dark Mode"
      : "Light Mode";
  });

  openCameraBtn.addEventListener("click", openCamera);
  closeCameraBtn.addEventListener("click", closeCamera);
  switchCameraBtn.addEventListener("click", switchCamera);
  capturePhotoBtn.addEventListener("click", capturePhoto);

  contactBtn.addEventListener("click", () => {
    window.location.href =
      "mailto:support@example.com?subject=Contact%20Us%20-%20My%20Recipe%20App";
  });

  recipesNavBtn.addEventListener("click", () => {
    recipeListSection.classList.remove("hidden");
    shoppingListSection.classList.add("hidden");
    mealPlanSection.classList.add("hidden");
    recipesNavBtn.classList.add("active");
    shoppingListNavBtn.classList.remove("active");
    mealPlanNavBtn.classList.remove("active");
    displayRecipes();
  });

  shoppingListNavBtn.addEventListener("click", () => {
    recipeListSection.classList.add("hidden");
    shoppingListSection.classList.remove("hidden");
    mealPlanSection.classList.add("hidden");
    recipesNavBtn.classList.remove("active");
    shoppingListNavBtn.classList.add("active");
    mealPlanNavBtn.classList.remove("active");
    displayShoppingList();
  });

  mealPlanNavBtn.addEventListener("click", () => {
    recipeListSection.classList.add("hidden");
    shoppingListSection.classList.add("hidden");
    mealPlanSection.classList.remove("hidden");
    recipesNavBtn.classList.remove("active");
    shoppingListNavBtn.classList.remove("active");
    mealPlanNavBtn.classList.add("active");
    displayMealPlan();
  });

  clearShoppingListBtn.addEventListener("click", clearShoppingList);
  clearMealPlanBtn.addEventListener("click", clearMealPlan);

  // --- Initialization ---
  const savedTheme = loadFromLocalStorage(THEME_STORAGE_KEY) || "light";
  body.dataset.theme = savedTheme;
  themeCheckbox.checked = savedTheme === "dark";
  document.querySelector(".mode-text").textContent =
    savedTheme === "dark" ? "Dark Mode" : "Light Mode";

  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("recipe");
  if (recipeId) {
    authSection.classList.remove("hidden");
    mainApp.style.display = "none";
    usernameInput.focus();
    authForm.addEventListener(
      "submit",
      () => {
        loadRecipes().then(() => {
          if (recipes.some((r) => r.id === recipeId)) {
            showRecipeDetails(recipeId);
          }
        });
      },
      { once: true }
    );
  }
});
