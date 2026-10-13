// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('show');
});

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('show');
    });
});

// Hero Slider Logic
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetTimer();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetTimer();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetTimer();
    });
});

function startTimer() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

startTimer();

// File Upload Label Update
const projectFileInput = document.getElementById('projectFile');
const fileLabel = document.getElementById('fileLabel');

if (projectFileInput) {
    projectFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            fileLabel.textContent = e.target.files[0].name;
            fileLabel.style.color = '#0088cc';
            fileLabel.style.fontWeight = '600';
        } else {
            fileLabel.textContent = 'Choose file or drag here...';
            fileLabel.style.color = 'inherit';
            fileLabel.style.fontWeight = 'normal';
        }
    });
}

// Form Submission Handler
const enquiryForm = document.getElementById('enquiryForm');
enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your enquiry and document have been submitted successfully. Our engineering team will contact you shortly.');
    enquiryForm.reset();
    fileLabel.textContent = 'Choose file or drag here...';
    fileLabel.style.color = 'inherit';
    fileLabel.style.fontWeight = 'normal';
});