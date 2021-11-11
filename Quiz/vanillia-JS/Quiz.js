let questions_array =[]; //Empty array to store the questions(question+ options)
let currentQuestion = 0; //Set the question number
let correct;
let incorrect;
let score = 0;

//Once the page loads, assign this function to the start button
function loaded(){
    let starts_button = document.getElementById("process-button");
    starts_button.addEventListener('click', function(){
        startQuiz();
        //Get a question when the 'start' button is clicked for first time
        getQuestion();
        //display the submit button
        document.getElementById('submit-div').style.display="block"
    })
    let submitButton= document.getElementById('submit-button').addEventListener('click', () =>{
        submitAnswer();
    });
}



//Start playing
function startQuiz(){


    let start_div = document.getElementById("process-div");

    //Get process-button to replace it after being clicked
    let start_button = document.getElementById("process-button");
    

    //Create a button
    const next_ques_btn = document.createElement('button');
    //Assign an Id to the btn
    next_ques_btn.id="Next-Question-Button";

    //Create text for the button
    next_ques_btn.innerHTML = "Next Question";
    


    start_div.removeChild(start_button);
    start_div.appendChild(next_ques_btn);
    

    //Add an eventListener
    next_ques_btn.addEventListener('click', ()=> {
        currentQuestion++;
        displayQuestion();
    });
}



//get API from the open trivia api
function getQuestion(){
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(res=> data=res.json())
    .then(data => {
        questions_array = data['results']; //Assign everything the 'results' obj
        displayQuestion();
    }); 
}

function displayQuestion(){
    gameOver();

    let display_question ="<div><b>" + questions_array[currentQuestion]['question'] + "</b></div>"; 

    //In order to shuffle the correct answer instead of being always the first or last
    let randomPos = Math.floor(Math.random() * 4);
    correct = questions_array[currentQuestion]['correct_answer']; //save the correct answer of the quiz
    incorrect = questions_array[currentQuestion]['incorrect_answers']; //save the correct answer of the quiz

    /*Loop to shuffle the answers. If the i is matched with the randomPos, add the correct answer to that position, else add all the wrong answers. Lastly check if randomPos is 3, if yes add the correct answer in the last position*/
    for( let i =0; i < 3; i++) {
        //Assign correct answer to index i if true
        if(i == randomPos) {
            display_question+="<div><label><input type='radio'class=\"radio-buttons\" name=\"question-group\" value='" + correct + "'>" + correct + "</label></div>"
        }
        //Print the incorrect options if above if not true
        display_question+="<div><label><input type='radio' class=\"radio-buttons\" name=\"question-group\"value='" + incorrect[i]+ "'>" + incorrect[i] + "</label></div>"
    }
    //Assign correct answer to index 3 if randPos is 3
    if(randomPos == 3){
        display_question+="<div><label><input type='radio' class=\"radio-buttons\" name=\"question-group\" value='" + correct + "'>" + correct + "</label></div>"
    }  
    document.getElementById('questions').innerHTML=display_question;

    console.log(correct);//TODO:Delete it
    // display question order and length (1/10);
    document.getElementById('current-question').innerHTML= "<div>" + (currentQuestion+1) + '/' +questions_array.length + "</div>"; 
}

    
// Add a submit button
function submitAnswer (){
    let userAnswer = document.querySelector("input[name=question-group]:checked").value;//Take the value from the options
    //add the number of questions displayed
    currentQuestion++;
    if(userAnswer == correct){
        score++;
    }
    gameOver();
    displayQuestion();

}
    //After the quiz is over, display score, create a button to start a new quiz
function gameOver(){
    let submit = document.getElementById("submit-button");
    let nxtQues = document.getElementById('Next-Question-Button');
    if(currentQuestion ==questions_array.length){
        //Hide everything after the quiz ends and display only the score and the restart button
        document.getElementById('Quiz').style="display:none"
        document.getElementById('Game-Over').style="display:block";
        //display the score to the user
        document.getElementById("score").innerHTML ="Final score is: " + score;
    }
}

//restart the quiz after ending
function restart(){
    window.location.reload();
}

//Change the mode(from day to night and reverse) //TODO: add it to the left right corner
function changeMode(){
    //Get the button id and the text of the tag
    let buttonText = document.getElementById("night-day-button").innerHTML;
        //The if statement will change the text of the button and the bg-color
    if(buttonText=="Day Mode"){
        document.getElementById("night-day-button").innerHTML = "Night Mode";
        //Change the body background color to day
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";

    }else{
        //Change the body background color to night
        document.getElementById("night-day-button").innerHTML = "Day Mode";
        document.body.style.backgroundColor= "rgb(41, 38, 41)";//black
        document.body.style.color = "rgb(228, 224, 228)";
    }
}