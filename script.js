
fetch('https://api.jsonserve.com/Uw5CrX')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load data');
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    console.log('Quiz data:', data); // Log the response data for debugging
    displayQuiz(data);
  })
  .catch(error => {
    console.error('Error loading data:', error);
    document.getElementById('quiz-container').innerHTML = 'Failed to load quiz data. Please try again later.';
  });

function displayQuiz(data) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Clear existing content

  // Display quiz title and other information
  const quizInfo = document.createElement('div');
  quizInfo.classList.add('quiz-info');
  quizInfo.innerHTML = `
    <h1>${data.title}</h1>
    <p><strong>Topic:</strong> ${data.topic}</p>
    <p><strong>Duration:</strong> ${data.duration} minutes</p>
    <p><strong>End Time:</strong> ${new Date(data.end_time).toLocaleString()}</p>
  `;
  quizContainer.appendChild(quizInfo);

  // Display questions
  const questionsContainer = document.createElement('div');
  questionsContainer.classList.add('questions-container');
  
  data.questions.forEach(question => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    questionElement.innerHTML = `
      <h3>${question.description}</h3>
      <ul>
        ${question.options.map(option => `
          <li>${option.description}</li>
        `).join('')}
      </ul>
      <p><strong>Correct Answer:</strong> ${question.options.find(option => option.is_correct).description}</p>
    `;

    questionsContainer.appendChild(questionElement);
  });

  quizContainer.appendChild(questionsContainer);
}

