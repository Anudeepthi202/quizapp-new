// Fetch quiz data from the API
fetch('https://api.jsonserve.com/Uw5CrX')
  .then(response => {
    // Log the response status to the console for debugging
    console.log('Response Status:', response.status);

    if (!response.ok) {
      throw new Error('Failed to load data');
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    // Log the received data to ensure the structure is correct
    console.log('Received data:', data);

    // Check if the data has the correct format
    if (!data.questions || !Array.isArray(data.questions)) {
      console.error('Data format is incorrect! Expected an array of questions.');
      document.getElementById('quiz-container').innerHTML = 'Invalid data format. Please try again later.';
      return;
    }

    // Proceed to display questions if the format is correct
    displayQuestions(data);
  })
  .catch(error => {
    // Log any errors and display an error message on the page
    console.error('Error loading data:', error);
    document.getElementById('quiz-container').innerHTML = 'Failed to load quiz data. Please try again later.';
  });

// Function to display questions on the page
function displayQuestions(data) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Clear any existing content

  // If no questions are available, show an error message
  if (data.questions.length === 0) {
    quizContainer.innerHTML = 'No questions available.';
    return;
  }

  // Loop through each question and display it
  data.questions.forEach((question, index) => {
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
