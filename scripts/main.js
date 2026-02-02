// منوی همبرگری (نمایش/مخفی‌سازی)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

// اسکرول نرم به بخش‌ها
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        if (navLinks) {
            navLinks.classList.remove('active');
            menuToggle?.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle?.setAttribute('aria-expanded', 'false');
        }
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// فعال‌سازی لینک منو بر اساس اسکرول صفحه
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

if (sections.length && navItems.length) {
    window.addEventListener('scroll', () => {
        if (navLinks?.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle?.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle?.setAttribute('aria-expanded', 'false');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// دکمه بازگشت به بالا
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ارسال فرم تماس (بدون ربات: کاربر به تلگرام هدایت می‌شود)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value?.trim() || '';
        const email = document.getElementById('email')?.value?.trim() || '';
        const subject = document.getElementById('subject')?.value?.trim() || '';
        const message = document.getElementById('message')?.value?.trim() || '';

        const username = contactForm.getAttribute('data-telegram-username') || '';
        if (!username) {
            alert('نام کاربری تلگرام تنظیم نشده است.');
            return;
        }

        const text = [
            'پیام جدید از فرم سایت:',
            `نام: ${name}`,
            `ایمیل: ${email}`,
            `موضوع: ${subject}`,
            `پیام: ${message}`
        ].join('\n');

        const url = `https://t.me/${username}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener');
    });
}

// نمایش سال جاری در فوتر
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// اسلایدر نمونه‌کارها
const slider = document.querySelector('.portfolio-slider');
if (slider) {
    const track = slider.querySelector('.portfolio-track');
    const slides = slider.querySelectorAll('.portfolio-slide');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    const dots = slider.querySelectorAll('.slider-dots .dot');
    let currentIndex = 0;
    let timerId = null;

    const updateSlider = () => {
        if (!track) return;
        track.style.transform = `translateX(${-currentIndex * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    const goTo = (index) => {
        const maxIndex = slides.length - 1;
        currentIndex = index < 0 ? maxIndex : index > maxIndex ? 0 : index;
        updateSlider();
    };

    const next = () => goTo(currentIndex + 1);
    const prev = () => goTo(currentIndex - 1);

    prevBtn?.addEventListener('click', prev);
    nextBtn?.addEventListener('click', next);
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    const startAuto = () => {
        if (timerId) return;
        timerId = setInterval(next, 5000);
    };
    const stopAuto = () => {
        if (!timerId) return;
        clearInterval(timerId);
        timerId = null;
    };

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
    startAuto();
    updateSlider();
}
