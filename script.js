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
  const newRecipeAdditionalTimeInput = document.getElementById(
    "new-recipe-additional-time"
  );
  const additionalTime = document.getElementById("additional-time");

  // --- Profile Elements ---
  const profileElements = {
    avatarBtn: document.getElementById("avatar-btn"),
    closeProfileModalBtn: document.getElementById("close-profile-modal"),
    avatarInput: document.getElementById("avatar-input"),
    profileForm: document.getElementById("profile-form"),
    deleteAccountBtn: document.getElementById("delete-account-btn"),
    changeAvatarBtn: document.getElementById("change-avatar-btn"),
    headerAvatar: document.getElementById("avatar-img"),
    profileModal: document.getElementById("profile-modal"),
  };

  // Initialize profile event listeners
  if (profileElements.avatarBtn) {
    profileElements.avatarBtn.addEventListener("click", () => {
      if (profileElements.profileModal) {
        profileElements.profileModal.classList.remove("hidden");
      }
    });
  }

  if (profileElements.closeProfileModalBtn) {
    profileElements.closeProfileModalBtn.addEventListener("click", () => {
      if (profileElements.profileModal) {
        profileElements.profileModal.classList.add("hidden");
      }
    });
  }

  if (profileElements.avatarInput) {
    profileElements.avatarInput.addEventListener(
      "change",
      handleProfileImageChange
    );
  }

  if (profileElements.profileForm) {
    profileElements.profileForm.addEventListener("submit", handleProfileSubmit);
  }

  if (profileElements.deleteAccountBtn) {
    profileElements.deleteAccountBtn.addEventListener("click", deleteAccount);
  }

  if (profileElements.changeAvatarBtn) {
    profileElements.changeAvatarBtn.addEventListener("click", () => {
      if (profileElements.avatarInput) {
        profileElements.avatarInput.click();
      }
    });
  }

  // --- State ---
  let currentUser = null;
  let recipes = [];
  let currentRecipeId = null;
  let currentCameraStream = null;
  let capturedImageBlob = null;
  let existingImageBase64ForEdit = null;
  let shoppingListItems = [];
  let mealPlan = {};
  let userData = { favorites: [], comments: {}, profile: {} };
  let allCategories = new Set();
  let allDietaryTypes = new Set([
    "Gluten-Free",
    "Vegan",
    "Vegetarian",
    "Dairy-Free",
    "Nut-Free",
    "Keto",
    "Fish",
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
  const MAX_PDF_IMAGE_SIZE_PTS = 100;

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
      // Save current user to localStorage for persistence
      localStorage.setItem("currentUser", username);

      userData = loadFromLocalStorage(
        `${USER_DATA_STORAGE_KEY}.${username}`
      ) || {
        favorites: [],
        comments: {},
        profile: {},
      };
      authSection.classList.add("hidden");
      mainApp.style.display = "block";
      loadRecipes().then(() => displayRecipes());
      loadShoppingList();
      loadMealPlan();

      // Update both profile and header avatars immediately
      const headerAvatar = document.getElementById("avatar-img");
      const profileAvatar = document.getElementById("profile-avatar");
      if (userData.profile?.avatar) {
        if (headerAvatar) headerAvatar.src = userData.profile.avatar;
        if (profileAvatar) profileAvatar.src = userData.profile.avatar;
      } else {
        const defaultAvatar =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23808080' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
        if (headerAvatar) headerAvatar.src = defaultAvatar;
        if (profileAvatar) profileAvatar.src = defaultAvatar;
      }
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
    userData = { favorites: [], comments: {}, profile: {} };
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
    } catch (e) {
      console.error("Error loading recipes:", e);
      recipes = loadFromLocalStorage(RECIPES_STORAGE_KEY) || [];
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
        <div class="recipe-header">
          <h3 class="recipe-title">${recipe.name}</h3>
          <i class="fa-solid fa-chevron-down collapse-icon"></i>
        </div>
        <div class="recipe-content">
          ${recipe.description ? `<p>${recipe.description}</p>` : ""}
          <p><strong>Prep Time:</strong> ${recipe.prepTime || "N/A"}</p>
          <p><strong>Total Time:</strong> ${recipe.totalTime || "N/A"}</p>
          ${
            recipe.categories
              ? `<p><strong>Categories:</strong> ${recipe.categories.join(
                  ", "
                )}</p>`
              : ""
          }
          ${
            recipe.dietaryType
              ? `<p><strong>Dietary Type:</strong> ${recipe.dietaryType}</p>`
              : ""
          }
          ${
            recipe.dietaryTypes && recipe.dietaryTypes.length > 0
              ? `<p><strong>Dietary Types:</strong> ${recipe.dietaryTypes.join(
                  ", "
                )}</p>`
              : ""
          }
        </div>
      `;
      li.dataset.id = recipe.id;

      // Add click handler for the header to toggle expansion
      const header = li.querySelector(".recipe-header");
      header.addEventListener("click", (e) => {
        e.stopPropagation();
        li.classList.toggle("expanded");
      });

      // Add click handler for the whole recipe to show details
      li.addEventListener("click", (e) => {
        if (!e.target.closest(".recipe-header")) {
          showRecipeDetails(recipe.id);
        }
      });

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
          r.dietaryTypes?.some((type) =>
            type.toLowerCase().includes(searchTerm)
          )
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((r) =>
        r.categories?.includes(selectedCategory)
      );
    }
    if (selectedDietary) {
      filtered = filtered.filter((r) =>
        r.dietaryTypes?.includes(selectedDietary)
      );
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
    if (!recipe) {
      recipeDetailsSection.classList.add("hidden");
      recipeListSection.classList.remove("hidden");
      alert("Recipe not found.");
      return;
    }

    recipeListSection.classList.add("hidden");
    recipeDetailsSection.classList.remove("hidden");
    mainApp.style.display = "block"; // Ensure main app is visible
    authSection.classList.add("hidden"); // Hide login screen

    detailsTitle.textContent = recipe.name;
    detailsDescription.textContent =
      recipe.description || "No description available.";
    detailsCategories.innerHTML = "";
    const combinedTags = [...(recipe.categories || [])];
    if (recipe.dietaryTypes && recipe.dietaryTypes.length > 0) {
      combinedTags.push(...recipe.dietaryTypes);
    }
    combinedTags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "category-tag";
      span.textContent = tag;
      detailsCategories.appendChild(span);
    });

    prepTime.textContent = recipe.prepTime || "N/A";
    cookTime.textContent = recipe.cookTime || "N/A";
    additionalTime.textContent = recipe.additionalTime || "N/A";
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

    // Conditionally show/hide buttons based on login state
    editRecipeBtn.style.display = currentUser ? "inline-flex" : "none";
    deleteRecipeBtn.style.display = currentUser ? "inline-flex" : "none";
    addCommentBtn.style.display = currentUser ? "inline-flex" : "none";
    newCommentInput.style.display = currentUser ? "block" : "none";
    addToShoppingListBtn.style.display = currentUser ? "inline-flex" : "none";
    addToMealPlanBtn.style.display = currentUser ? "inline-flex" : "none";
    addRecipeBtn.style.display = currentUser ? "inline-flex" : "none";
    logoutBtn.style.display = currentUser ? "inline-flex" : "none";
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
        <div class="comment-meta">${comment.user} - ${new Date(
        comment.timestamp
      ).toLocaleString()}</div>
        ${comment.text}
        ${
          currentUser
            ? `
          <div class="comment-actions">
            <button class="edit-comment-btn">Edit</button>
            <button class="delete-comment-btn">Delete</button>
          </div>
        `
            : ""
        }
      `;
      if (currentUser) {
        li.querySelector(".edit-comment-btn").addEventListener("click", () =>
          editComment(recipeId, index)
        );
        li.querySelector(".delete-comment-btn").addEventListener("click", () =>
          deleteComment(recipeId, index)
        );
      }
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
      delete recipe.image_blob;
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

    // Preserve recipe ID and creator
    updatedRecipe.id = recipeId;
    updatedRecipe.createdBy = recipes[index].createdBy;

    // Handle image conversion
    if (updatedRecipe.imageBlob) {
      updatedRecipe.imageBase64 = await blobToBase64(updatedRecipe.imageBlob);
      updatedRecipe.image = URL.createObjectURL(updatedRecipe.imageBlob);
      delete updatedRecipe.imageBlob;
    } else if (recipes[index].imageBase64) {
      updatedRecipe.imageBase64 = recipes[index].imageBase64;
      updatedRecipe.image = recipes[index].image;
    }

    // Update recipe in array
    recipes[index] = updatedRecipe;

    // Save to storage
    try {
      await saveRecipesToIndexedDB();
      saveToLocalStorage(RECIPES_STORAGE_KEY, recipes);
      console.log("Recipe updated:", updatedRecipe);

      // Update categories and dietary types sets
      updatedRecipe.categories?.forEach((cat) => allCategories.add(cat));
      updatedRecipe.dietaryTypes?.forEach((type) => allDietaryTypes.add(type));

      // Refresh filters
      populateCategoryFilter();

      // Show updated recipe
      showRecipeDetails(recipeId);
    } catch (error) {
      console.error("Failed to update recipe:", error);
      throw error;
    }
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

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(recipe.name, margin, y, { maxWidth });
    y += 10;

    // Image handling
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

    // Description
    if (recipe.description) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Description:", margin, y);
      y += 6;
      doc.setFontSize(10);
      doc.text(recipe.description, margin, y, { maxWidth });
      y += doc.splitTextToSize(recipe.description, maxWidth).length * 5 + 5;
    }

    // Time information
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
    doc.text(`Additional Time: ${recipe.additionalTime || "N/A"}`, margin, y);
    y += 5;
    doc.text(`Total Time: ${recipe.totalTime || "N/A"}`, margin, y);
    y += 5;
    doc.text(`Servings: ${recipe.servings || "N/A"}`, margin, y);
    y += 10;

    // Categories and Dietary Types
    const combinedTags = [...(recipe.categories || [])];
    if (recipe.dietaryTypes && recipe.dietaryTypes.length > 0) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Categories & Dietary Types:", margin, y);
      y += 6;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      if (recipe.categories && recipe.categories.length > 0) {
        doc.text(`Categories: ${recipe.categories.join(", ")}`, margin, y);
        y += 5;
      }

      doc.text(`Dietary Types: ${recipe.dietaryTypes.join(", ")}`, margin, y);
      y += 10;
    }

    // Ingredients
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

    // Instructions
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
      // Add extra spacing after instructions
      y += 10;
    }

    // Nutrition Information
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

    // Group items by recipe
    const groupedItems = {};
    shoppingListItems.forEach((item) => {
      if (!groupedItems[item.recipeId]) {
        groupedItems[item.recipeId] = {
          recipeName: item.recipeName,
          items: [],
        };
      }
      groupedItems[item.recipeId].items.push(item);
    });

    // Display items grouped by recipe
    Object.entries(groupedItems).forEach(([recipeId, data]) => {
      const recipeHeader = document.createElement("div");
      recipeHeader.className = "shopping-list-recipe-header";
      recipeHeader.innerHTML = `<h3>${data.recipeName}</h3>`;
      shoppingList.appendChild(recipeHeader);

      data.items.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="shopping-item-text">${item.text}</span>
          <div class="shopping-item-info">
            <span class="shopping-item-recipe">For ${item.servings} servings</span>
            <button class="btn btn-danger remove-item-btn">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `;

        li.querySelector(".remove-item-btn").addEventListener("click", () => {
          shoppingListItems = shoppingListItems.filter(
            (i) => !(i.text === item.text && i.recipeId === item.recipeId)
          );
          saveShoppingList();
          displayShoppingList();
        });

        shoppingList.appendChild(li);
      });
    });
  }

  function addToShoppingList() {
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (!recipe || !recipe.ingredients) {
      alert("No recipe or ingredients found!");
      return;
    }

    const selectedServings =
      parseInt(servingSizeSelect.value) || recipe.servings;
    const factor = selectedServings / recipe.servings;
    let addedItems = false;

    recipe.ingredients.forEach((ing) => {
      const qty = parseQuantity(ing.quantity);
      const adjustedQty =
        qty !== null ? formatQuantity(qty * factor) : ing.quantity;
      const item = {
        text: `${adjustedQty} ${ing.unit || ""} ${ing.name}`.trim(),
        recipeId: recipe.id,
        recipeName: recipe.name,
        originalQty: ing.quantity,
        servings: selectedServings,
      };

      // Check if item already exists from this recipe
      const existingIndex = shoppingListItems.findIndex(
        (i) => i.text === item.text && i.recipeId === item.recipeId
      );

      if (existingIndex === -1) {
        shoppingListItems.push(item);
        addedItems = true;
      }
    });

    if (addedItems) {
      saveShoppingList();
      displayShoppingList();
      alert("Ingredients added to shopping list!");
    } else {
      alert("These ingredients are already in your shopping list!");
    }
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

  // --- Share Functionality ---
  function handleShareFallback(method, url) {
    switch (method) {
      case "email":
        window.location.href = `mailto:?subject=Check out this recipe: ${
          recipes.find((r) => r.id === currentRecipeId).name
        }&body=Here's a great recipe: ${url}`;
        break;
      case "copy":
        navigator.clipboard
          .writeText(url)
          .then(() => alert("Recipe URL copied to clipboard!"))
          .catch((err) => alert("Failed to copy URL: " + err));
        break;
      case "social":
        alert(
          `Please share this URL manually on your preferred platform: ${url}`
        );
        break;
      default:
        alert(
          "Invalid option. Please try again with 'email', 'copy', or 'social'."
        );
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

  // --- Profile Management Functions ---
  function showProfileModal() {
    const profileModal = document.getElementById("profile-modal");
    const profileUsername = document.getElementById("profile-username");
    const profileEmail = document.getElementById("profile-email");
    const profileName = document.getElementById("profile-name");
    const profileAvatar = document.getElementById("profile-avatar");
    const headerAvatar = document.getElementById("avatar-img");

    if (!currentUser) {
      alert("Please log in to view your profile.");
      return;
    }

    // Initialize userData.profile if it doesn't exist
    userData.profile = userData.profile || {};

    profileUsername.value = currentUser;
    profileEmail.value = userData.profile?.email || "";
    profileName.value = userData.profile?.name || "";

    if (userData.profile?.avatar) {
      profileAvatar.src = userData.profile.avatar;
      headerAvatar.src = userData.profile.avatar;
    } else {
      // Set default avatar
      const defaultAvatar =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23808080' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
      profileAvatar.src = defaultAvatar;
      headerAvatar.src = defaultAvatar;
    }

    profileModal.classList.remove("hidden");
  }

  async function handleProfileImageChange(event) {
    if (!currentUser) {
      alert("Please log in to update your profile.");
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      alert("Profile image must be less than 5MB");
      event.target.value = ""; // Clear the file input
      return;
    }

    try {
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e.error);
        reader.readAsDataURL(file);
      });

      // Validate image by preloading it
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Invalid image file"));
        img.src = base64Image;
      });

      // Update state and UI
      userData.profile = userData.profile || {};
      userData.profile.avatar = base64Image;

      const profileAvatar = document.getElementById("profile-avatar");
      const headerAvatar = document.getElementById("avatar-img");

      if (profileAvatar) profileAvatar.src = base64Image;
      if (headerAvatar) headerAvatar.src = base64Image;

      // Save to localStorage
      await saveToLocalStorage(
        `${USER_DATA_STORAGE_KEY}.${currentUser}`,
        userData
      );
      alert("Profile image updated successfully!");
    } catch (error) {
      console.error("Error processing profile image:", error);
      alert("Failed to process profile image. Please try again.");
    } finally {
      event.target.value = ""; // Clear the file input
    }
  }

  function handleProfileSubmit(event) {
    event.preventDefault(); // Prevent form submission

    if (!currentUser) {
      alert("Please log in to update your profile.");
      return;
    }

    const emailInput = document.getElementById("profile-email");
    const nameInput = document.getElementById("profile-name");

    if (!emailInput || !nameInput) {
      console.error("Profile form elements not found");
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      alert("Please enter a valid email address.");
      return;
    }

    userData.profile.email = emailInput.value;
    userData.profile.name = nameInput.value;

    try {
      saveToLocalStorage(`${USER_DATA_STORAGE_KEY}.${currentUser}`, userData);
      alert("Profile updated successfully!");
      closeProfileModal();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile changes. Please try again.");
    }
  }

  function closeProfileModal() {
    document.getElementById("profile-modal").classList.add("hidden");
  }

  function deleteAccount() {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    const users = loadFromLocalStorage(USERS_STORAGE_KEY) || {};
    delete users[currentUser];
    saveToLocalStorage(USERS_STORAGE_KEY, users);

    // Remove all user data
    localStorage.removeItem(`${USER_DATA_STORAGE_KEY}.${currentUser}`);
    localStorage.removeItem(`${SHOPPING_LIST_STORAGE_KEY}.${currentUser}`);
    localStorage.removeItem(`${MEAL_PLAN_STORAGE_KEY}.${currentUser}`);

    logout();
    alert("Your account has been deleted.");
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
    if (!currentUser) {
      alert("Please log in to add a recipe.");
      return;
    }
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

    // Hide all other sections first
    recipeListSection.classList.add("hidden");
    recipeDetailsSection.classList.add("hidden");
    shoppingListSection.classList.add("hidden");
    mealPlanSection.classList.add("hidden");

    // Show add recipe section
    addRecipeSection.classList.remove("hidden");
  });

  backBtn.addEventListener("click", () => {
    recipeDetailsSection.classList.add("hidden");
    if (currentUser) {
      recipeListSection.classList.remove("hidden");
    } else {
      mainApp.style.display = "none";
      authSection.classList.remove("hidden");
    }
  });

  cancelAddBtn.addEventListener("click", () => {
    addRecipeSection.classList.add("hidden");
    recipeListSection.classList.remove("hidden");
    if (imagePreview.src) URL.revokeObjectURL(imagePreview.src);
  });

  addRecipeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate required fields
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

    // Parse ingredients
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

    // Create recipe object
    const recipe = {
      name: newRecipeNameInput.value.trim(),
      description: newRecipeDescriptionInput.value.trim() || "",
      categories: newRecipeCategoriesInput.value
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c),
      dietaryTypes: Array.from(newRecipeDietaryInput.selectedOptions).map(
        (opt) => opt.value
      ),
      prepTime: newRecipePrepTimeInput.value.trim() || "",
      cookTime: newRecipeCookTimeInput.value.trim() || "",
      additionalTime: newRecipeAdditionalTimeInput.value.trim() || "",
      totalTime: newRecipeTotalTimeInput.value.trim() || "",
      servings: parseInt(newRecipeServingsInput.value) || 1,
      ingredients: ingredients,
      instructions: newRecipeInstructionsInput.value.trim(),
      nutrition: {
        calories: newRecipeCaloriesInput.value.trim() || "N/A",
        protein: newRecipeProteinInput.value.trim() || "N/A",
        carbs: newRecipeCarbsInput.value.trim() || "N/A",
        fat: newRecipeFatInput.value.trim() || "N/A",
      },
    };

    // Handle image
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

    try {
      if (isEditing && currentRecipeId) {
        await updateRecipe(currentRecipeId, recipe);
      } else {
        await addRecipe(recipe);
      }

      // Reset form and state
      addRecipeForm.reset();
      imagePreview.classList.add("hidden");
      imagePreview.src = "";
      capturedImageBlob = null;
      existingImageBase64ForEdit = null;
      isEditing = false;

      // Show recipe list
      addRecipeSection.classList.add("hidden");
      recipeListSection.classList.remove("hidden");

      // Refresh display
      displayRecipes();
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Failed to save recipe. Please try again.");
    }
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

    // Fill in all form fields
    newRecipeNameInput.value = recipe.name;
    newRecipeDescriptionInput.value = recipe.description || "";
    newRecipeCategoriesInput.value = recipe.categories?.join(", ") || "";
    newRecipePrepTimeInput.value = recipe.prepTime || "";
    newRecipeCookTimeInput.value = recipe.cookTime || "";
    newRecipeAdditionalTimeInput.value = recipe.additionalTime || "";
    newRecipeTotalTimeInput.value = recipe.totalTime || "";
    newRecipeServingsInput.value = recipe.servings || 1;
    newRecipeIngredientsInput.value =
      recipe.ingredients
        ?.map((ing) =>
          `${ing.quantity || ""} ${ing.unit || ""} ${ing.name || ""}`.trim()
        )
        .join("\n") || "";
    newRecipeInstructionsInput.value = recipe.instructions || "";

    // Fill nutrition info
    newRecipeCaloriesInput.value = recipe.nutrition?.calories || "";
    newRecipeProteinInput.value = recipe.nutrition?.protein || "";
    newRecipeCarbsInput.value = recipe.nutrition?.carbs || "";
    newRecipeFatInput.value = recipe.nutrition?.fat || "";

    // Handle dietary types
    Array.from(newRecipeDietaryInput.options).forEach((option) => {
      option.selected = recipe.dietaryTypes?.includes(option.value) || false;
    });

    // Handle image preview
    if (recipe.imageBase64) {
      existingImageBase64ForEdit = recipe.imageBase64;
      imagePreview.src = recipe.image;
      imagePreview.classList.remove("hidden");
    } else {
      imagePreview.classList.add("hidden");
      imagePreview.src = "";
      existingImageBase64ForEdit = null;
    }

    // Hide other sections and show add recipe form
    recipeDetailsSection.classList.add("hidden");
    recipeListSection.classList.add("hidden");
    shoppingListSection.classList.add("hidden");
    mealPlanSection.classList.add("hidden");
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
    const recipeUrl = `${window.location.origin}${window.location.pathname}?recipe=${recipe.id}`;

    if (navigator.share) {
      navigator
        .share({
          title: recipe.name,
          text: recipe.description || "Check out this delicious recipe!",
          url: recipeUrl,
        })
        .then(() => console.log("Recipe shared successfully"))
        .catch((err) => console.error("Share failed:", err));
    } else {
      const shareMethod = prompt(
        "How would you like to share this recipe?\nOptions: 'email', 'copy', 'social'",
        "copy"
      );
      if (shareMethod) {
        handleShareFallback(shareMethod.toLowerCase(), recipeUrl);
      }
    }
  });

  servingSizeSelect.addEventListener("change", () => {
    const recipe = recipes.find((r) => r.id === currentRecipeId);
    if (recipe) {
      servingsInfo.textContent = `${servingSizeSelect.value} servings`;
      adjustIngredients(recipe.ingredients, recipe.servings);
    }
  });

  addCommentBtn.addEventListener("click", () => addComment(currentRecipeId));

  addToShoppingListBtn.addEventListener("click", () => {
    if (!currentUser) {
      alert("Please log in to add items to shopping list.");
      return;
    }
    addToShoppingList();
  });

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
    recipeDetailsSection.classList.add("hidden");
    shoppingListSection.classList.add("hidden");
    mealPlanSection.classList.add("hidden");
    addRecipeSection.classList.add("hidden");
    if (currentUser) {
      recipeListSection.classList.remove("hidden");
      mainApp.style.display = "block";
      authSection.classList.add("hidden");
    } else {
      mainApp.style.display = "none";
      authSection.classList.remove("hidden");
    }
    recipesNavBtn.classList.add("active");
    shoppingListNavBtn.classList.remove("active");
    mealPlanNavBtn.classList.remove("active");
    displayRecipes();
  });

  shoppingListNavBtn.addEventListener("click", () => {
    recipeListSection.classList.add("hidden");
    shoppingListSection.classList.remove("hidden");
    mealPlanSection.classList.add("hidden");
    recipeDetailsSection.classList.add("hidden");
    addRecipeSection.classList.add("hidden");
    recipesNavBtn.classList.remove("active");
    shoppingListNavBtn.classList.add("active");
    mealPlanNavBtn.classList.remove("active");
    displayShoppingList();
  });

  mealPlanNavBtn.addEventListener("click", () => {
    recipeListSection.classList.add("hidden");
    shoppingListSection.classList.add("hidden");
    mealPlanSection.classList.remove("hidden");
    recipeDetailsSection.classList.add("hidden");
    addRecipeSection.classList.add("hidden");
    recipesNavBtn.classList.remove("active");
    shoppingListNavBtn.classList.remove("active");
    mealPlanNavBtn.classList.add("active");
    displayMealPlan();
  });

  clearShoppingListBtn.addEventListener("click", clearShoppingList);
  clearMealPlanBtn.addEventListener("click", clearMealPlan);

  // Initialize Profile Management
  function initializeProfileFunctionality() {
    const profileElements = {
      avatarBtn: document.getElementById("avatar-btn"),
      closeProfileModalBtn: document.getElementById("close-profile-modal"),
      avatarInput: document.getElementById("avatar-input"),
      profileForm: document.getElementById("profile-form"),
      deleteAccountBtn: document.getElementById("delete-account-btn"),
      changeAvatarBtn: document.getElementById("change-avatar-btn"),
      headerAvatar: document.getElementById("avatar-img"),
    };

    // Verify all elements exist
    if (Object.values(profileElements).some((element) => !element)) {
      console.error(
        "Some profile elements were not found:",
        Object.entries(profileElements)
          .filter(([key, value]) => !value)
          .map(([key]) => key)
      );
      return;
    }

    // Add event listeners
    profileElements.avatarBtn.addEventListener("click", showProfileModal);
    profileElements.closeProfileModalBtn.addEventListener(
      "click",
      closeProfileModal
    );
    profileElements.avatarInput.addEventListener(
      "change",
      handleProfileImageChange
    );
    profileElements.profileForm.addEventListener("submit", handleProfileSubmit);
    profileElements.deleteAccountBtn.addEventListener("click", deleteAccount);
    profileElements.changeAvatarBtn.addEventListener("click", () => {
      profileElements.avatarInput.click();
    });

    // Override login function to handle avatar
    const originalLogin = window.login;
    window.login = (username, password) => {
      originalLogin(username, password);
      if (userData.profile?.avatar) {
        profileElements.headerAvatar.src = userData.profile.avatar;
      }
    };
  }

  // Initialize profile functionality
  initializeProfileFunctionality();

  // --- Initialization ---
  const savedTheme = loadFromLocalStorage(THEME_STORAGE_KEY) || "light";
  body.dataset.theme = savedTheme;
  themeCheckbox.checked = savedTheme === "dark";
  document.querySelector(".mode-text").textContent =
    savedTheme === "dark" ? "Dark Mode" : "Light Mode";

  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("recipe");

  // Handle direct recipe access or default to auth screen
  if (recipeId) {
    loadRecipes().then(() => {
      if (recipes.some((r) => r.id === recipeId)) {
        authSection.classList.add("hidden");
        mainApp.style.display = "block";
        showRecipeDetails(recipeId);
      } else {
        authSection.classList.remove("hidden");
        mainApp.style.display = "none";
        alert("Recipe not found.");
        usernameInput.focus();
      }
    });
  } else {
    authSection.classList.remove("hidden");
    mainApp.style.display = "none";
    usernameInput.focus();
  }

  // Load persisted user session if it exists
  const savedUserData = localStorage.getItem("currentUser");
  if (savedUserData) {
    currentUser = savedUserData;
    userData = loadFromLocalStorage(
      `${USER_DATA_STORAGE_KEY}.${currentUser}`
    ) || {
      favorites: [],
      comments: {},
      profile: {},
    };

    // Update UI for logged in state
    authSection.classList.add("hidden");
    mainApp.style.display = "block";

    // Load avatar if it exists
    const headerAvatar = document.getElementById("avatar-img");
    if (headerAvatar && userData.profile?.avatar) {
      headerAvatar.src = userData.profile.avatar;
    }

    // Load other user data
    loadRecipes().then(() => displayRecipes());
    loadShoppingList();
    loadMealPlan();
  }
});
