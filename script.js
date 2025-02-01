document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-btn');

    let currentQuestionIndex = 0;
    let score = 0;

    const quizData = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
            answer: "Harper Lee"
        }
    ];

    function showQuestion() {
        resetState();
        const currentQuestion = quizData[currentQuestionIndex];
        questionContainer.innerText = currentQuestion.question;

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.classList.add('option');
            if (option === currentQuestion.answer) {
                button.dataset.correct = true;
            }
            button.addEventListener('click', selectAnswer);
            optionsContainer.appendChild(button);
        });
    }

    function resetState() {
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;

        if (correct) {
            score++;
            selectedButton.style.backgroundColor = '#4CAF50';
        } else {
            selectedButton.style.backgroundColor = '#f44336';
        }

        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true;
        });

        nextButton.style.display = 'block';
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
            nextButton.style.display = 'none';
        } else {
            showResults();
        }
    });

    function showResults() {
        resetState();
        questionContainer.innerText = `Quiz Completed! Your score: ${score}/${quizData.length}`;
        nextButton.style.display = 'none';
    }

    showQuestion();
});
