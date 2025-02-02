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
    console.log('Data received:', data);
    displayQuestions(data);
  })
  .catch(error => {
    // Log the error message to the console and show an error message on the page
    console.error('Error loading data:', error);
    document.getElementById('quiz-container').innerHTML = 'Failed to load quiz data. Please try again later.';
  });

// Function to display questions on the page
function displayQuestions(data) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Clear any existing content

  // Check if data has the expected structure (log it)
  console.log('Data structure:', data);
  if (!data || !Array.isArray(data.questions)) {
    console.error('Data format is incorrect! Expected an array of questions.');
    return;
  }

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
