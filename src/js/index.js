const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedCards = [];
const messageElement = document.getElementById('message');

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        const pronome = this.dataset.pronome;
        const backElement = this.querySelector('.back');
        backElement.innerHTML = `<img src="./src/imagens/${pronome}.png" alt="Imagem do pronome ${pronome}">`;

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
    const img1Src = card1.querySelector('.back img').getAttribute('src');
    const img2Src = card2.querySelector('.back img').getAttribute('src');

    if (img1Src === img2Src) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        messageElement.textContent = 'Par encontrado!';
        checkForWin();
        flippedCards = [];
        const pronome1 = card1.dataset.pronome;
        const pronome2 = card2.dataset.pronome;
        card1.querySelector('.front').innerHTML = `<img src="./src/imagens/${pronome1}.png" alt="Imagem do pronome ${pronome1}">`;
        card2.querySelector('.front').innerHTML = `<img src="./src/imagens/${pronome2}.png" alt="Imagem do pronome ${pronome2}">`;
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.querySelector('.back').innerHTML = '';
            card2.querySelector('.back').innerHTML = '';
            messageElement.textContent = 'Tente novamente.';
            flippedCards = [];
        }, 1000);
    }
}

function checkForWin() {
    if (matchedCards.length === cards.length) {
        messageElement.textContent = 'Você venceu! Obrigado pela atenção! Alunos: William e Mayra.';
    }
}

function shuffleCards() {
    const cardsArray = Array.from(cards);
    cardsArray.sort(() => Math.random() - 0.5);
    cardsArray.forEach(card => {
        const randomIndex = Math.floor(Math.random() * cardsArray.length);
        card.style.order = randomIndex;
        card.classList.remove('flipped', 'matched');
        card.querySelector('.back').innerHTML = '';
    });
    matchedCards = [];
    messageElement.textContent = '';
}

shuffleCards();
cards.forEach(card => card.addEventListener('click', flipCard));
