document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('modal');
    let modalImg = document.getElementById('modal-img');
    const close = document.getElementById('close');
    const modalContentContainer = document.getElementById('modal-content-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
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
    prevButton.addEventListener('click', () => swipeImage('down'));
    nextButton.addEventListener('click', () => swipeImage('up'));

    function openModal(index) {
        currentIndex = index;
        modal.style.display = 'block';
        modalImg.src = images[currentIndex].src;
        modalImg.classList.remove('enter-from-bottom', 'enter-from-top', 'exit-to-top', 'exit-to-bottom');
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

        const newImg = document.createElement('img');
        newImg.src = images[newIndex].src;
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
});
