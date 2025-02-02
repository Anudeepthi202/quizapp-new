
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
    console.error('Error loading data:', error); // Logs the error in the console
    document.getElementById('quiz-container').innerHTML = `
      <p>Failed to load quiz data. Please try again later.</p>
      <p>Error details: ${error.message}</p> <!-- Shows detailed error message on the webpage -->
    `;
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
  
  data.questions.forEach((question) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    // Display question description
    questionElement.innerHTML = `<h3>${question.description}</h3>`;
    
    // Display options as buttons
    const optionsContainer = document.createElement('div');
    question.options.forEach((option) => {
      const optionButton = document.createElement('button');
      optionButton.textContent = option.description;
      
      optionButton.onclick = () => {
        const feedback = document.createElement('p');
        if (option.is_correct) {
          feedback.textContent = 'Correct!';
          feedback.style.color = 'green';
        } else {
          feedback.textContent = 'Incorrect. Try again.';
          feedback.style.color = 'red';
        }
        questionElement.appendChild(feedback);
      };

      optionsContainer.appendChild(optionButton);
    });

    questionElement.appendChild(optionsContainer);
    questionsContainer.appendChild(questionElement);
  });

  quizContainer.appendChild(questionsContainer);
}
