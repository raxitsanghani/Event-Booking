/**
 * Global App Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
});

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
 * Toast Notifications
 */
function showToast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
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
