let currentQuestionIndex = 0;
let score = 0;
let quizData = [];

// Fetch quiz data from the API
fetch('https://api.jsonserve.com/Uw5CrX')
  .then(response => response.json())
  .then(data => {
    quizData = data;
    loadQuestion();  // Start quiz
  })
  .catch(error => {
    console.error("Error fetching quiz data:", error);
    document.getElementById("question").innerText = "Failed to load quiz data.";
  });

// Load question
function loadQuestion() {
  if (currentQuestionIndex < quizData.length) {
    const question = quizData[currentQuestionIndex];
    document.getElementById("question").innerText = question.question;
    document.getElementById("options").innerHTML = ''; // Clear previous options

    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.innerText = answer;
      button.onclick = () => checkAnswer(answer);
      document.getElementById("options").appendChild(button);
    });
    
    // Hide Next button initially
    document.getElementById("next-button").style.display = 'none';
  } else {
    showResults();
  }
}

// Check answer
function checkAnswer(selectedAnswer) {
  const correctAnswer = quizData[currentQuestionIndex].correct_answer;
  if (selectedAnswer === correctAnswer) {
    score++;
  }

  // Show Next button
  document.getElementById("next-button").style.display = 'inline-block';

  // Disable all buttons after selection
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(button => button.disabled = true);
}

// Next Question button
document.getElementById("next-button").onclick = function() {
  currentQuestionIndex++;
  loadQuestion();
};

// Show results at the end
function showResults() {
  document.getElementById("quiz-container").style.display = 'none';
  const resultElement = document.getElementById("result");
  resultElement.style.display = 'block';
  resultElement.innerHTML = `<h2>Your Score: ${score} / ${quizData.length}</h2>`;
}
