/**
 * Global App Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    checkAuth();
    initAuthHeader();

    // Global Logout Listener
    document.querySelectorAll('[href*="logout"], .logout-btn').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
        });
    });
});

/**
 * Handle Auth Header (Login/Join vs Profile)
 */
function initAuthHeader() {
    const navAuth = document.getElementById('nav-auth');
    if (!navAuth) return;

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (token) {
        // Logged in: Show Avatar
        const avatarUrl = user.avatar || `https://ui-avatars.com/api/?name=${user.email || 'User'}&background=random`;
        navAuth.innerHTML = `
            <a href="dashboard.html" class="profile-avatar" title="Account Dashboard">
                <img src="${avatarUrl}" alt="Profile">
            </a>
        `;
    } else {
        // Not logged in: Show Login/Join (This is default in HTML if JS doesn't run, but good to reset if needed)
        navAuth.innerHTML = `
            <a href="login.html" class="nav-link">Login</a>
            <a href="register.html" class="btn btn-primary">Join Now</a>
        `;
    }
}

/**
 * Authentication & Session Management
 */
function checkAuth() {
    const publicPages = ['login.html', 'register.html', 'admin-login.html'];
    let currentPage = window.location.pathname.split('/').pop();
    if (!currentPage) currentPage = 'index.html';

    const token = localStorage.getItem('token');
    const loginTime = localStorage.getItem('loginTime');
    const isAdminPage = currentPage.startsWith('admin');

    // 1. Check if session has expired (24 hours = 86,400,000 ms)
    if (loginTime) {
        const currentTime = new Date().getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (currentTime - parseInt(loginTime) > twentyFourHours) {
            logoutUser('Your session has expired. Please log in again.');
            return;
        }
    }

    // 2. Protect private pages
    if (!publicPages.includes(currentPage)) {
        if (!token) {
            window.location.href = 'login.html';
        }
    }
}

function logoutUser(message) {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('user');
    if (message) {
        // We use a query param or alert because toasts will be lost on redirect
        alert(message);
    }
    window.location.href = 'login.html';
}

function saveSession(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loginTime', new Date().getTime().toString());
}

/**
 * Theme Management
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);

            // Notification for theme change (subtle)
            showToast(`Switched to ${newTheme} mode`, 'info');
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
    }
}

/**
 * Mobile Navigation
 */
function initMobileNav() {
    const menuBtn = document.querySelector('#mobile-menu-btn');
    const nav = document.querySelector('#main-nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
}

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
        success: 'ri-checkbox-circle-fill',
        error: 'ri-error-warning-fill',
        info: 'ri-information-fill',
        warning: 'ri-alert-fill'
    };

    toast.innerHTML = `
        <i class="${iconMap[type] || 'ri-information-fill'}" style="color: var(--${type})"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
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
