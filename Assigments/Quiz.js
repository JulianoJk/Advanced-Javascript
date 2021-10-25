//Button to start and stop guessing
//TODO: Change the label of the button to start-end to play and stop playing
function process(){
    let b =document.getElementById("process-btn").innerHTML;
    if(b == "Start"){
        document.getElementById("process-btn").innerHTML="Stop";
    }else{
        document.getElementById("process-btn").innerHTML="Start";
    }

}

//Change the mode(from day to night and reverse) //TODO: add it to the left right corner
function changeMode(){
    //Get the button id and the text of the tag
    let buttonText = document.getElementById("night-day-button").innerHTML;
        //The if statement will change the text of the button and the bg-color
    if(buttonText=="Night Mode"){
        document.getElementById("night-day-button").innerHTML = "Day Mode";
        //Change the body background color to day
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";

    }else{
        //Change the body background color to night
        document.getElementById("night-day-button").innerHTML = "Night Mode";
        document.body.style.backgroundColor= "rgb(41, 38, 41)";
        document.body.style.color = "rgb(228, 224, 228)";
    }


}

//get API from the open trivia api
function getQuestion(){
    fetch("https://opentdb.com/api.php?amount=4&difficulty=easy&type=multiple")
    .then(res=> data=res.json())
    .then(data => displayQuestion(data))//whatever we declare the name of the arg, it will get the data from the previous .then()
    //Call the next function and pass the data arg to the function 

}

function displayQuestion(data){
    //from the API response, from the api data, from the results key at position 0 get the question and save it to a variable
    let result = data['results'][0]
    console.log(data); //TODO: Remove the log here
    // Assign the results from and make it bold.Later add it ti the html body
    //In order to shuffle the correct answer instead of being always the first or last
    let randomPos = Math.floor(Math.random() * 4);
    let html = '<div><b>' + result['question'] + '</b></div>';
    console.log(result['correct_answer']) //TODO: Remove the log here
    for(let i = 0; i < 3; i++) {
        if(i == randomPos) {
            html += "<div><input type='radio' name=\"question-group\">" + result['correct_answer'] + "</div>"
        }
        html += "<div><input type='radio' name=\"question-group\">" + result['incorrect_answers'][i] + "</div>"
    }
    if(randomPos == 3) {
        html += "<div><input type='radio' name=\"question-group\">" + result['correct_answer'] + "</div>"
    }

    document.getElementById('questions').innerHTML = html
}

// Add a submit button
function submitAnswer (){

}

//Check score
function checkScore(){

}
//display the score to the user(live)
function displayScore() {

}