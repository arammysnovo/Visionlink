// API service for VisionLink frontend
const API_BASE_URL = 'https://8000-iptd97e9xxhgnokeyk0ul-7d2806c0.manus.computer/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Helper method to get headers
  getHeaders(includeAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Token ${this.token}`;
    }

    return headers;
  }

  // Helper method to handle responses
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `HTTP ${response.status}`);
    }
    return response.json();
  }

  // Authentication methods
  async register(userData) {
    const response = await fetch(`${this.baseURL}/auth/register/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });
    
    const data = await this.handleResponse(response);
    if (data.token) {
      this.token = data.token;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  async login(credentials) {
    const response = await fetch(`${this.baseURL}/auth/login/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    });
    
    const data = await this.handleResponse(response);
    if (data.token) {
      this.token = data.token;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  async logout() {
    try {
      await fetch(`${this.baseURL}/auth/logout/`, {
        method: 'POST',
        headers: this.getHeaders(true),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  async getProfile() {
    const response = await fetch(`${this.baseURL}/auth/profile/`, {
      headers: this.getHeaders(true),
    });
    return this.handleResponse(response);
  }

  async updateProfile(profileData) {
    const response = await fetch(`${this.baseURL}/auth/profile/update/`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(profileData),
    });
    return this.handleResponse(response);
  }

  // Plans methods
  async getPlans() {
    const response = await fetch(`${this.baseURL}/plans/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getPlan(slug) {
    const response = await fetch(`${this.baseURL}/plans/${slug}/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getPopularPlans() {
    const response = await fetch(`${this.baseURL}/plans/popular/`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async subscribeToPlan(planId, notes = '') {
    const response = await fetch(`${this.baseURL}/plans/subscribe/`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify({ plan: planId, notes }),
    });
    return this.handleResponse(response);
  }

  // Chatbot methods
  async sendChatMessage(message, sessionId = null) {
    const response = await fetch(`${this.baseURL}/chatbot/message/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ 
        message, 
        session_id: sessionId || this.getSessionId() 
      }),
    });
    return this.handleResponse(response);
  }

  async getChatHistory(sessionId = null) {
    const url = sessionId 
      ? `${this.baseURL}/chatbot/history/?session_id=${sessionId}`
      : `${this.baseURL}/chatbot/history/`;
    
    const response = await fetch(url, {
      headers: this.getHeaders(this.token ? true : false),
    });
    return this.handleResponse(response);
  }

  async sendChatFeedback(conversationId, rating, comment = '') {
    const response = await fetch(`${this.baseURL}/chatbot/feedback/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ 
        conversation_id: conversationId, 
        rating, 
        comment 
      }),
    });
    return this.handleResponse(response);
  }

  // Utility methods
  getSessionId() {
    let sessionId = localStorage.getItem('chatSessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('chatSessionId', sessionId);
    }
    return sessionId;
  }

  isAuthenticated() {
    return !!this.token;
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

