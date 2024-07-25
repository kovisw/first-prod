document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const close = document.getElementById('close');
    let currentIndex = 0;

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
            currentIndex = index;
        });
    });

    close.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Swipe functionality
    let touchStartY = 0;
    let touchEndY = 0;

    modalImg.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });

    modalImg.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndY < touchStartY) {
            // Swipe up
            currentIndex = (currentIndex + 1) % images.length;
        }
        if (touchEndY > touchStartY) {
            // Swipe down
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
        modalImg.src = images[currentIndex].src;
    }
});
