/**
 * Main application file that orchestrates between API and UI
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the application
  initApp();
});

/**
 * Initialize the application
 */
async function initApp() {
  try {
    // Load initial data
    await loadCategories();
    await loadDestinations();
    await loadRecommended();
    await loadProfile();
    
    // Set up event listeners
    uiService.initEventListeners(handleSearch);
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

/**
 * Load and render categories
 */
async function loadCategories() {
  try {
    const categories = await apiService.getCategories();
    uiService.renderCategories(categories);
  } catch (error) {
    console.error('Error loading categories:', error);
    uiService.categoriesContainer.innerHTML = 
      '<div class="error">Failed to load categories</div>';
  }
}

/**
 * Load and render popular destinations
 */
async function loadDestinations() {
  try {
    const destinations = await apiService.getDestinations();
    uiService.renderDestinations(destinations);
  } catch (error) {
    console.error('Error loading destinations:', error);
    uiService.destinationsContainer.innerHTML = 
      '<div class="error">Failed to load destinations</div>';
  }
}

/**
 * Load and render recommended places
 */
async function loadRecommended() {
  try {
    const recommended = await apiService.getRecommended();
    uiService.renderRecommended(recommended);
  } catch (error) {
    console.error('Error loading recommended places:', error);
    uiService.recommendedContainer.innerHTML = 
      '<div class="error">Failed to load recommendations</div>';
  }
}

/**
 * Load and render user profile
 */
async function loadProfile() {
  try {
    const profile = await apiService.getProfile();
    uiService.renderProfile(profile);
  } catch (error) {
    console.error('Error loading profile:', error);
    document.getElementById('profile-name').textContent = 'Guest User';
  }
}

/**
 * Handle search functionality
 */
async function handleSearch(query) {
  try {
    const results = await apiService.searchDestinations(query);
    uiService.renderSearchResults(results);
  } catch (error) {
    console.error('Error searching:', error);
  }
}