# Quiz_App
A simple online quiz application
Here, I'll explain what the functions in javascript are doing and their working.

Here's a breakdown of how the code works:

1. The code uses the `fetch` function to retrieve the quiz questions from a JSON file named `questions.json`.
2. After fetching the JSON data, it uses the `response.json()` method to parse the response and convert it into a JavaScript object.
3. The necessary HTML elements are assigned to variables using the `getElementById` method.
4. Two variables, `currentQuestionIndex` and `score`, are initialized to keep track of the current question and the user's score.
5. The `showQuestion` function is defined to display the current question and its options.
6. Inside `showQuestion`, the previous options are cleared, and new options are created based on the current question's data.
7. The `checkAnswer` function is defined to check the user's selected option and update the score accordingly.
8. If there are more questions, the `currentQuestionIndex` is incremented, and the next question is shown using `showQuestion`. 
Otherwise, the `showResult` function is called to display the quiz completion message and the final score.
9. The `shuffleArray` function is defined to randomize the order of the questions array using the Fisher-Yates algorithm.
10. The `restartQuiz` function is defined to reset the quiz by setting `currentQuestionIndex` and `score` to their initial values,
shuffling the questions array, and hiding the result container.
11. Event listeners are added to the submit button and restart button to call the `checkAnswer` and `restartQuiz` functions,
respectively.
12. Finally, the `showQuestion` function is called initially to start the quiz.
