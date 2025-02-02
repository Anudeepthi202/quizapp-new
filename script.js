
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
    document.getElementById('quiz-container').innerHTML = 'Failed to load quiz data. Please try again later.';
  });

function displayQuestions(data) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Clear any existing content

  // Assuming that 'data.questions' contains the array of questions
  if (data && data.questions) {
    data.questions.forEach((question) => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('question');
      
      // Handling the question description and answers
      questionElement.innerHTML = `
        <h3>${question.description}</h3>
        <ul>
          ${question.options.map(answer => `
            <li>${answer.description}</li>
          `).join('')}
        </ul>
        <p><strong>Correct Answer:</strong> ${question.options.find(option => option.is_correct).description}</p>
      `;
      quizContainer.appendChild(questionElement);
    });
  } else {
    quizContainer.innerHTML = 'No questions available.';
  }
}
