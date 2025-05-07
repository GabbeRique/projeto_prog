/**
 * API Service for fetching data from json-server
 */
class ApiService {
  constructor() {
    this.baseUrl = '/api';
  }
  
  /**
   * Generic fetch method with error handling
   */
  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }
  
  /**
   * Get all categories
   */
  async getCategories() {
    return this.fetchData('categories');
  }
  
  /**
   * Get all popular destinations
   */
  async getDestinations() {
    return this.fetchData('destinations');
  }
  
  /**
   * Get all recommended places
   */
  async getRecommended() {
    return this.fetchData('recommended');
  }
  
  /**
   * Get user profile
   */
  async getProfile() {
    return this.fetchData('profile');
  }
  
  /**
   * Search destinations by name
   */
  async searchDestinations(query) {
    const destinations = await this.getDestinations();
    const recommended = await this.getRecommended();
    
    const allPlaces = [...destinations, ...recommended];
    
    return allPlaces.filter(place => 
      place.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

// Export the API service
const apiService = new ApiService();