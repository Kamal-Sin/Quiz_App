fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        const instructionsDiv = document.getElementById('instructions');
        const startButton = document.getElementById('start-btn');
        const quizContainer = document.getElementById('quiz-container');
        const resultContainer = document.getElementById('result-container');
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const resultElement = document.getElementById('result');
        const scoreElement = document.getElementById('score');
        const submitButton = document.getElementById('submit-btn');
        const restartButton = document.getElementById('restart-btn');
        const timerElement = document.getElementById('timer');

        let currentQuestionIndex = 0;
        let score = 0;
        let timer;

        function showQuestion() {
            const currentQuestion = data.questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;

            // Clear previous options
            optionsElement.innerHTML = '';

            // Create options
            currentQuestion.options.forEach(option => {
                const li = document.createElement('li');
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'option';
                radio.value = option;
                li.appendChild(radio);
                li.appendChild(document.createTextNode(option));
                optionsElement.appendChild(li);
            });

            quizContainer.style.display = 'block';

            // Start the timer
            startTimer();
        }

        function showResult() {
            quizContainer.style.display = 'none';
            resultContainer.style.display = 'block';
            resultElement.textContent = 'Quiz Completed!';
            scoreElement.textContent = `Score: ${score} / ${data.questions.length}`;
            if (score < 3) {
                alert("You failed! Better luck next time.");
            } else {
                alert("You passed!");
            }
        }

        function checkAnswer() {
            const selectedOption = document.querySelector('input[name="option"]:checked');
            if (selectedOption) {
                const userAnswer = selectedOption.value;
                const currentQuestion = data.questions[currentQuestionIndex];
                if (userAnswer === currentQuestion.answer) {
                    score++;
                }
                currentQuestionIndex++;
                if (currentQuestionIndex < data.questions.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            }
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function restartQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            shuffleArray(data.questions);
            resultContainer.style.display = 'none';
            showQuestion();
        }

        function startQuiz() {
            instructionsDiv.style.display = 'none';
            startButton.style.display = 'none';
            showQuestion();
        }

        function startTimer() {
            let timeLeft = 10; // 10 seconds

            timerElement.textContent = `Time left: ${timeLeft} seconds`;

            timer = setInterval(() => {
                timeLeft--;
                timerElement.textContent = `Time left: ${timeLeft} seconds`;

                if (timeLeft === 0) {
                    clearInterval(timer);
                    timerElement.textContent = 'Time expired!';
                    currentQuestionIndex++;
                    if (currentQuestionIndex < data.questions.length) {
                        showQuestion();
                    } else {
                        showResult();
                    }
                }
            }, 1000); // 1 second intervals
        }


        startButton.addEventListener('click', startQuiz);
        submitButton.addEventListener('click', () => {
            clearInterval(timer);
            checkAnswer();
        });
        restartButton.addEventListener('click', restartQuiz);
    });
