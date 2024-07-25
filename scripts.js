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
            openModal(index);
        });
    });

    close.addEventListener('click', closeModal);
    modal.addEventListener('click', closeModal);

    function openModal(index) {
        currentIndex = index;
        modal.style.display = 'block';
        modalImg.src = images[currentIndex].src;
        modalImg.classList.add('enter-from-bottom');
        modalImg.addEventListener('animationend', () => {
            modalImg.classList.remove('enter-from-bottom');
        }, { once: true });
    }

    function closeModal() {
        modal.style.display = 'none';
    }

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
        if (isSwiping) return;
        isSwiping = true;
        let newIndex;
        let exitClass;
        let enterClass;

        if (direction === 'up') {
            newIndex = (currentIndex + 1) % images.length;
            exitClass = 'exit-to-top';
            enterClass = 'enter-from-bottom';
        } else if (direction === 'down') {
            newIndex = (currentIndex - 1 + images.length) % images.length;
            exitClass = 'exit-to-bottom';
            enterClass = 'enter-from-top';
        }

        modalImg.classList.add(exitClass);
        modalImg.addEventListener('transitionend', () => {
            modalImg.classList.remove(exitClass);
            modalImg.src = images[newIndex].src;
            modalImg.classList.add(enterClass);
            modalImg.addEventListener('transitionend', () => {
                modalImg.classList.remove(enterClass);
                isSwiping = false;
                currentIndex = newIndex;
            }, { once: true });
        }, { once: true });
    }
});
