/**
 * API Service for Backend Communication
 */

const API_BASE_URL = '/api'; // Using relative path for unified serving

const apiFetch = async (endpoint, options = {}) => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...defaultOptions,
            ...options
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        showToast(error.message, 'error');
        throw error;
    }
};

const ApiService = {
    // Auth
    login: (credentials) => apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    }),

    register: (userData) => apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    }),

    // Events
    getEvents: (params = '') => apiFetch(`/events${params}`),
    getEvent: (id) => apiFetch(`/events/${id}`),

    // Bookings
    createBooking: (bookingData) => apiFetch('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData)
    }),

    getMyBookings: () => apiFetch('/bookings/my'),

    // Admin
    getAdminStats: () => apiFetch('/admin/stats'),
    getAllBookings: () => apiFetch('/admin/bookings'),
    updateBookingStatus: (id, status) => apiFetch(`/admin/bookings/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
    }),

    createEvent: (eventData) => apiFetch('/admin/events', {
        method: 'POST',
        body: JSON.stringify(eventData)
    })
};
