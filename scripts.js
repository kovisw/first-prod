document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const close = document.getElementById('close');
    let currentIndex = 0;
    let isSwiping = false;
    let touchStartY = 0;
    let touchEndY = 0;

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

    modalImg.addEventListener('touchstart', (e) => {
        if (isSwiping) return;
        touchStartY = e.changedTouches[0].screenY;
    });

    modalImg.addEventListener('touchend', (e) => {
        if (isSwiping) return;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndY < touchStartY) {
            // Swipe up
            swipeImage('up');
        }
        if (touchEndY > touchStartY) {
            // Swipe down
            swipeImage('down');
        }
    }

    function swipeImage(direction) {
        isSwiping = true;
        let newIndex;
        if (direction === 'up') {
            newIndex = (currentIndex + 1) % images.length;
            modalImg.classList.add('exit-to-left');
        } else if (direction === 'down') {
            newIndex = (currentIndex - 1 + images.length) % images.length;
            modalImg.classList.add('exit-to-right');
        }

        modalImg.addEventListener('transitionend', () => {
            modalImg.classList.remove('exit-to-left', 'exit-to-right');
            modalImg.src = images[newIndex].src;
            modalImg.classList.add(direction === 'up' ? 'enter-from-right' : 'enter-from-left');
            modalImg.addEventListener('transitionend', () => {
                modalImg.classList.remove('enter-from-right', 'enter-from-left');
                isSwiping = false;
                currentIndex = newIndex;
            }, { once: true });
        }, { once: true });
    }
});
