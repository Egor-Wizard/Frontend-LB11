$(document).ready(function () {
    const words = [
        { word: 'Hello', translation: 'Привіт' },
        { word: 'Goodbye', translation: 'До побачення' },
        { word: 'after', translation: 'Після' },
        { word: 'animal', translation: 'Тварина' },
        { word: 'car', translation: 'автомобіль' },
        { word: 'city', translation: 'Місто' },
        { word: 'class', translation: 'Клас' },
        { word: 'community', translation: 'громада' },
        { word: 'easy', translation: 'легко' },
        { word: 'eat', translation: 'їсти' },
    ];

    let currentStep = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    function renderCards() {
        const cardContainer = $('#card-container');
        cardContainer.empty();

        const shuffledWords = shuffleArray(words);

        shuffledWords.slice(0, 10).forEach((word, index) => {
            const card = $(`<div class="card">${word.word}</div>`);
            card.data('index', index);
            cardContainer.append(card);
        });
    }

    function shuffleArray(array) {
        return array.slice().sort(() => Math.random() - 0.5);
    }

    function updateStatus() {
        $('#step-info').text(`Step ${currentStep + 1} of ${words.length}`);
        $('#correct-count').text(correctCount);
        $('#incorrect-count').text(incorrectCount);
    }

    function showModal() {
        const modal = $('#result-modal');
        const proficiencyLevel = getProficiencyLevel();

        $('#proficiency-level').text(`Your proficiency level: ${proficiencyLevel}`);
        modal.show();

        $('.close').click(function () {
            modal.hide();
        });

        $(window).click(function (event) {
            if (event.target === modal[0]) {
                modal.hide();
            }
        });
    }

    function getProficiencyLevel() {
        const accuracyPercentage = (correctCount / words.length) * 100;

        if (accuracyPercentage >= 80) {
            return 'Advanced';
        } else if (accuracyPercentage >= 60) {
            return 'Intermediate';
        } else {
            return 'Beginner';
        }
    }

   
    async function translateWordAsync(word) {
        return new Promise(resolve => {
            setTimeout(() => {
                const translation = prompt(`Translate "${word}"`);
                resolve(translation);
            }, 0);
        });
    }

    renderCards();
    updateStatus();


    $('#card-container').on('click', '.card', async function () {
        const index = $(this).data('index');
        const translation = await translateWordAsync(words[index].word);

        if (translation && translation.toLowerCase() === words[index].translation.toLowerCase()) {
            correctCount++;
            $(this).addClass('correct-answer').removeClass('incorrect-answer');
        } else {
            incorrectCount++;
            $(this).addClass('incorrect-answer').removeClass('correct-answer');
        }

        currentStep++;
        updateStatus();

        if (currentStep === words.length) {
            showModal();
        }
    });
});
