let currentImageIndex = 0;

const images = Array.from(
    document.querySelectorAll('.thumbnail')
);

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');

function openLightbox(index) {
    if (!images.length || !lightbox || !lightboxImage) return;

    currentImageIndex = index;
    showImage(currentImageIndex);
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove('show');
    document.body.style.overflow = '';
}

function showImage(index) {
    if (!images.length || !lightboxImage) return;

    currentImageIndex =
        (index + images.length) % images.length;

    lightboxImage.src = images[currentImageIndex].src;
    lightboxImage.alt = images[currentImageIndex].alt;
}

function changeImage(direction) {
    showImage(currentImageIndex + direction);
}

images.forEach((img, index) => {
    img.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Close when clicking the dark background
if (lightbox) {
    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard controls
document.addEventListener('keydown', event => {
    if (!lightbox || !lightbox.classList.contains('show')) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') changeImage(-1);
    if (event.key === 'ArrowRight') changeImage(1);
});

// Mobile swipe controls
let touchStartX = 0;
let touchEndX = 0;

if (lightbox) {
    lightbox.addEventListener('touchstart', event => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', event => {
        touchEndX = event.changedTouches[0].screenX;

        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) > 50) {
            changeImage(distance < 0 ? 1 : -1);
        }
    }, { passive: true });
}

