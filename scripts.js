document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('modal');
    let modalImg = document.getElementById('modal-img');
    const close = document.getElementById('close');
    const modalContentContainer = document.getElementById('modal-content-container');
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

    function openModal(index) {
        currentIndex = index;
        modal.style.display = 'block';
        modalImg.src = images[currentIndex].getAttribute('data-src');
        modalImg.classList.remove('enter-from-bottom', 'enter-from-top', 'exit-to-top', 'exit-to-bottom');
        modalImg.style.transform = '';
        modalImg.style.opacity = '';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    modalContentContainer.addEventListener('touchstart', (e) => {
        if (isSwiping) return;
        touchStartY = e.changedTouches[0].screenY;
    });

    modalContentContainer.addEventListener('touchend', (e) => {
        if (isSwiping) return;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // добавим порог для свайпа
        const yDiff = touchEndY - touchStartY;

        if (Math.abs(yDiff) > swipeThreshold) {
            if (yDiff < 0) {
                // Swipe up
                swipeImage('up');
            } else {
                // Swipe down
                swipeImage('down');
            }
        }
    }

    function swipeImage(direction) {
        if (isSwiping) return;
        isSwiping = true;
        let newIndex;
        let exitClass;
        let enterClass;

        if (direction === 'up' || direction === 'next') {
            newIndex = (currentIndex + 1) % images.length;
            exitClass = 'exit-to-top';
            enterClass = 'enter-from-bottom';
        } else if (direction === 'down' || direction === 'prev') {
            newIndex = (currentIndex - 1 + images.length) % images.length;
            exitClass = 'exit-to-bottom';
            enterClass = 'enter-from-top';
        }

        const newImg = document.createElement('img');
        newImg.src = images[newIndex].getAttribute('data-src');
        newImg.classList.add('modal-content', enterClass);
        modalContentContainer.appendChild(newImg);

        modalImg.classList.add(exitClass);
        modalImg.addEventListener('transitionend', () => {
            modalImg.remove();
            newImg.classList.remove(enterClass);
            modalImg = newImg;
            isSwiping = false;
            currentIndex = newIndex;
        }, { once: true });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowUp') {
                swipeImage('prev');
            } else if (e.key === 'ArrowDown') {
                swipeImage('next');
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });

    // Mouse wheel navigation
    modal.addEventListener('wheel', function(e) {
        if (modal.style.display === 'block') {
            if (e.deltaY < 0) {
                swipeImage('prev');
            } else if (e.deltaY > 0) {
                swipeImage('next');
            }
        }
    });
});
