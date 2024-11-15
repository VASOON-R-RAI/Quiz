const quizQuestions = [
    {
      question: "What does HTML stand for?",
      choices: ["HyperText Markup Language", "HyperText Management Language", "Hyperlinks and Text Markup Language"],
      correct: 0
    },
    {
      question: "Which language is used for web development?",
      choices: ["Python", "JavaScript", "Java"],
      correct: 1
    },
    {
      question: "What does CSS stand for?",
      choices: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
      correct: 0
    },
    {
      question: "What is the correct syntax for a function in JavaScript?",
      choices: ["function = myFunction()", "function myFunction()", "function:myFunction()"],
      correct: 1
    },
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      choices: ["<style>", "<css>", "<script>"],
      correct: 0
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let answered = false;
  
  const questionText = document.getElementById("question-text");
  const choicesContainer = document.getElementById("choices");
  const nextButton = document.getElementById("next-btn");
  const scoreDisplay = document.getElementById("score");
  const questionNumberDisplay = document.getElementById("question-number");
  const feedbackDisplay = document.createElement("p");  // Create a feedback element
  
  // Add feedback element to the DOM
  document.querySelector('.quiz-body').appendChild(feedbackDisplay);
  
  function loadQuestion() {
    answered = false;  // Reset answered flag for the new question
    feedbackDisplay.textContent = '';  // Clear previous feedback
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";
    
    currentQuestion.choices.forEach((choice, index) => {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.onclick = () => checkAnswer(index);
      choicesContainer.appendChild(choiceButton);
    });
    
    questionNumberDisplay.textContent = `Question ${currentQuestionIndex + 1}`;
    nextButton.disabled = true; // Disable the "Next" button initially
  }
  
  function checkAnswer(selectedIndex) {
    if (answered) return;  // Prevent multiple clicks on the same question
  
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // If the answer is correct
    if (selectedIndex === currentQuestion.correct) {
      score++;
      feedbackDisplay.textContent = "Correct! Well done.";
      feedbackDisplay.style.color = "green";
    } else {
      feedbackDisplay.textContent = `Wrong! The correct answer was: ${currentQuestion.choices[currentQuestion.correct]}`;
      feedbackDisplay.style.color = "red";
    }
  
    scoreDisplay.textContent = score;
    answered = true;  // Mark the question as answered
    nextButton.disabled = false; // Enable the "Next" button after answering
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion();
    } else {
      showFinalScore();
    }
  }
  
  function showFinalScore() {
    questionText.textContent = "Quiz Finished!";
    choicesContainer.innerHTML = "";
    nextButton.style.display = "none"; // Hide the "Next" button
    scoreDisplay.textContent = `You scored ${score} out of ${quizQuestions.length}`;
  }
  
  loadQuestion();
  