/**
 * UI Service for rendering data and handling UI interactions
 */
class UiService {
  constructor() {
    // DOM Elements
    this.categoriesContainer = document.getElementById('categories-container');
    this.destinationsContainer = document.getElementById('destinations-container');
    this.recommendedContainer = document.getElementById('recommended-container');
    this.profileName = document.getElementById('profile-name');
    this.profileAvatar = document.getElementById('profile-avatar');
    this.searchInput = document.getElementById('search-input');
    this.searchButton = document.getElementById('search-button');
    
    // Category icon mapping (fallbacks to material icons)
    this.categoryIcons = {
      'Resort': 'beach_access',
      'Homestay': 'home',
      'Hotel': 'hotel',
      'Lodge': 'cabin',
      'Villa': 'house',
      'Apartment': 'apartment',
      'Hostel': 'bunk_bed',
      'default': 'place'
    };
  }
  
  /**
   * Render categories in the UI
   */
  renderCategories(categories) {
    if (!categories || categories.length === 0) {
      this.categoriesContainer.innerHTML = '<div class="no-data">No categories found</div>';
      return;
    }
    
    this.categoriesContainer.innerHTML = '';
    
    categories.forEach(category => {
      const iconName = this.categoryIcons[category.name] || this.categoryIcons.default;
      
      const categoryElement = document.createElement('div');
      categoryElement.className = 'category-item';
      categoryElement.innerHTML = `
        <div class="category-icon">
          <i class="material-icons">${iconName}</i>
        </div>
        <div class="category-name">${category.name}</div>
      `;
      
      this.categoriesContainer.appendChild(categoryElement);
    });
    
    // Add "See All" category
    const seeAllElement = document.createElement('div');
    seeAllElement.className = 'category-item';
    seeAllElement.innerHTML = `
      <div class="category-icon">
        <i class="material-icons">grid_view</i>
      </div>
      <div class="category-name">See all</div>
    `;
    
    this.categoriesContainer.appendChild(seeAllElement);
  }
  
  /**
   * Render destinations in the UI
   */
  renderDestinations(destinations) {
    if (!destinations || destinations.length === 0) {
      this.destinationsContainer.innerHTML = '<div class="no-data">No destinations found</div>';
      return;
    }
    
    this.destinationsContainer.innerHTML = '';
    
    destinations.forEach(destination => {
      const destinationElement = document.createElement('div');
      destinationElement.className = 'destination-card';
      destinationElement.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}">
        <div class="destination-info">
          <div class="destination-name">${destination.name}</div>
          <div class="destination-rating">
            <i class="material-icons">star</i>
            ${destination.rating}
          </div>
        </div>
      `;
      
      this.destinationsContainer.appendChild(destinationElement);
    });
  }
  
  /**
   * Render recommended places in the UI
   */
  renderRecommended(recommended) {
    if (!recommended || recommended.length === 0) {
      this.recommendedContainer.innerHTML = '<div class="no-data">No recommendations found</div>';
      return;
    }
    
    this.recommendedContainer.innerHTML = '';
    
    recommended.forEach(place => {
      const recommendedElement = document.createElement('div');
      recommendedElement.className = 'recommended-card';
      recommendedElement.innerHTML = `
        <img src="${place.image}" alt="${place.name}">
        <div class="recommended-info">
          <div class="recommended-name">${place.name}</div>
          <div class="recommended-rating">
            <i class="material-icons">star</i>
            ${place.rating}
          </div>
        </div>
      `;
      
      this.recommendedContainer.appendChild(recommendedElement);
    });
  }
  
  /**
   * Render profile information
   */
  renderProfile(profile) {
    if (!profile) {
      return;
    }
    
    this.profileName.textContent = profile.name;
    
    // Check if we have a custom avatar or use the placeholder
    if (profile.avatar && profile.avatar !== 'avatar.png') {
      this.profileAvatar.src = `images/${profile.avatar}`;
    } else {
      // Use a placeholder avatar from a free service
      this.profileAvatar.src = 'https://ui-avatars.com/api/?name=' + 
        encodeURIComponent(profile.name) + '&background=5e60ce&color=fff';
    }
  }
  
  /**
   * Initialize UI event listeners
   */
  initEventListeners(searchCallback) {
    // Search functionality
    this.searchButton.addEventListener('click', () => {
      const query = this.searchInput.value.trim();
      if (query) {
        searchCallback(query);
      }
    });
    
    this.searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const query = this.searchInput.value.trim();
        if (query) {
          searchCallback(query);
        }
      }
    });
    
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }
  
  /**
   * Render search results
   */
  renderSearchResults(results) {
    // For simplicity, just update the recommended section with search results
    if (results.length > 0) {
      this.renderRecommended(results);
      document.querySelector('.recommended-section h2').textContent = 'Search Results';
    } else {
      this.recommendedContainer.innerHTML = '<div class="no-data">No results found</div>';
      document.querySelector('.recommended-section h2').textContent = 'Search Results';
    }
  }
}

// Export the UI service
const uiService = new UiService();