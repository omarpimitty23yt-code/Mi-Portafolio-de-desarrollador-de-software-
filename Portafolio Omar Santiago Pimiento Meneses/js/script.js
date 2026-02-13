// Variables globales
let currentRating = 0;
let totalReviews = 0;
let totalStars = 0;

const ratingTexts = {
    1: 'Muy malo',
    2: 'Malo',
    3: 'Regular',
    4: 'Bueno',
    5: 'Excelente'
};

// Crear estrellas
const starsContainer = document.getElementById('starsContainer');
for (let i = 1; i <= 5; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.dataset.rating = i;
    star.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
    `;
    starsContainer.appendChild(star);
}

// Event listeners para estrellas
const stars = document.querySelectorAll('.star');
const ratingText = document.getElementById('ratingText');
const ratingDisplay = document.getElementById('ratingDisplay');
const selectedRatingSpan = document.getElementById('selectedRating');
const submitBtn = document.getElementById('submitBtn');

stars.forEach(star => {
    star.addEventListener('click', () => {
        currentRating = parseInt(star.dataset.rating);
        updateStars(currentRating);
        updateUI();
    });

    star.addEventListener('mouseenter', () => {
        const rating = parseInt(star.dataset.rating);
        updateStars(rating, true);
        ratingText.textContent = ratingTexts[rating];
        ratingText.classList.remove('empty');
    });

    star.addEventListener('mouseleave', () => {
        updateStars(currentRating);
        if (currentRating > 0) {
            ratingText.textContent = ratingTexts[currentRating];
            ratingText.classList.remove('empty');
        } else {
            ratingText.textContent = 'Selecciona tu calificación';
            ratingText.classList.add('empty');
        }
    });
});

function updateStars(rating, isHover = false) {
    stars.forEach((star, index) => {
        if (index < rating) {
            if (isHover) {
                star.classList.add('hover');
                star.classList.remove('active');
            } else {
                star.classList.add('active');
                star.classList.remove('hover');
            }
        } else {
            star.classList.remove('active', 'hover');
        }
    });
}

function updateUI() {
    if (currentRating > 0) {
        ratingText.textContent = ratingTexts[currentRating];
        ratingText.classList.remove('empty');
        selectedRatingSpan.textContent = currentRating + '.0';
        ratingDisplay.classList.add('visible');
        submitBtn.disabled = false;
    } else {
        ratingText.textContent = 'Selecciona tu calificación';
        ratingText.classList.add('empty');
        ratingDisplay.classList.remove('visible');
        submitBtn.disabled = true;
    }
}

// Enviar calificación
submitBtn.addEventListener('click', () => {
    if (currentRating > 0) {
        totalReviews++;
        totalStars += currentRating;

        // Actualizar estadísticas
        const avgRating = (totalStars / totalReviews).toFixed(1);
        const satisfaction = Math.round((totalStars / (totalReviews * 5)) * 100);

        document.getElementById('avgRating').textContent = avgRating;
        document.getElementById('totalReviews').textContent = totalReviews;
        document.getElementById('satisfaction').textContent = satisfaction + '%';

        // Mostrar confirmación
        submitBtn.textContent = '✓ ¡Gracias por tu calificación!';
        submitBtn.classList.add('submitted');
        submitBtn.disabled = true;

        // Reset después de 2 segundos
        setTimeout(() => {
            currentRating = 0;
            updateStars(0);
            updateUI();
            submitBtn.textContent = 'Enviar calificación';
            submitBtn.classList.remove('submitted');
        }, 2000);
    }
});
