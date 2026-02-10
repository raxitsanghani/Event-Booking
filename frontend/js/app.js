/**
 * EventFlow - Global Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateNavAuth();
    initThemeToggle();
});

/**
 * Theme Management
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update icon
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
            }
        });
    }
}

/**
 * Authentication Mock
 */
function saveSession(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    updateNavAuth();
}

function getSession() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return token ? { token, user } : null;
}

function clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

/**
 * Global Navigation Auth State
 */
function updateNavAuth() {
    const navAuth = document.getElementById('nav-auth');
    if (!navAuth) return;

    const session = getSession();
    if (session) {
        navAuth.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <a href="dashboard.html" class="nav-link">My Dashboard</a>
                <div class="profile-avatar" onclick="window.location.href='profile.html'">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name || session.user.email)}&background=random" alt="User">
                </div>
            </div>
        `;
    }
}

/**
 * Modal System
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(e.target.id);
    }
});

/**
 * Toast Notifications (Top-Right)
 */
function showToast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.style.cssText = 'position: fixed; top: 2rem; right: 2rem; z-index: 9999;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconMap = {
        success: 'ri-checkbox-circle-line',
        error: 'ri-error-warning-line',
        info: 'ri-information-line',
        warning: 'ri-alert-line'
    };

    toast.innerHTML = `
        <i class="${iconMap[type]}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

/**
 * Global Notifications System
 */
function addNotification(title, message) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const newNotif = {
        title: title,
        message: message,
        time: 'Just now',
        unread: true,
        timestamp: new Date().getTime()
    };
    notifications.unshift(newNotif);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    showToast(title, 'info');
}

/**
 * Global Booking System
 */
function saveBooking(bookingData) {
    const bookings = getBookings();
    const newBooking = {
        id: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        ...bookingData,
        timestamp: new Date().getTime()
    };
    bookings.unshift(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return newBooking;
}

function getBookings() {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
}

function deleteBooking(bookingId) {
    const bookings = getBookings().filter(b => b.id !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return bookings;
}

function updateBookingStatus(bookingId, status) {
    const bookings = getBookings().map(b => {
        if (b.id === bookingId) {
            return { ...b, status };
        }
        return b;
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return bookings;
}

/**
 * Global Logout Handling
 */
document.addEventListener('click', (e) => {
    const logoutBtn = e.target.closest('.logout-btn');
    if (logoutBtn) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            clearSession();
        }
    }
});
