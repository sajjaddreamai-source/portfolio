// منوی همبرگری (نمایش/مخفی‌سازی)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// بستن منو بعد از کلیک روی لینک‌ها
const navItems = document.querySelectorAll('.nav-links a');
if (navLinks && navItems.length) {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}
