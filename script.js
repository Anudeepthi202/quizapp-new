// Fetch quiz data from the API
fetch('https://api.jsonserve.com/Uw5CrX')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load data');
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    // Successfully received data, now display it
    displayQuestions(data);
  })
  .catch(error => {
    // If there’s an error, show an error message
    console.error('Error loading data:', error);
    document.getElementById('quiz-container').innerHTML = 'Failed to load quiz data';
  });

// Function to display questions on the page
function displayQuestions(data) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Clear any existing content

  // Loop through each question and display it
  data.questions.forEach((question) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <h3>${question.description}</h3>
      <ul>
        ${question.answers.map(answer => `<li>${answer}</li>`).join('')}
      </ul>
      <p><strong>Correct Answer:</strong> ${question.correct_answer}</p>
    `;
    quizContainer.appendChild(questionElement);
  });
}
