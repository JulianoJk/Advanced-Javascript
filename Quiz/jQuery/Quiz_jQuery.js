let questions_array =[]; //Empty array to store the questions(question+ options)
let currentQuestion = 0; //Set the question number
let correct;
let incorrect;
let score = 0;

$(document).ready(function () {


    //Once the page loads, assign this function to the start button
    $('#process-button').click(function(){
        //Receive from the API using AJAX the questions
        $.get('https://opentdb.com/api.php?amount=10&type=multiple', function (data, status) {
            questions_array= data['results'];
            //Display the question to the user
            displayQuestion();
            //Display the next question button
            $("#skip").show();
        })
    });
    //Skip question button and move to next question, if there is any
    $("#skip").click(function(){
        gameOver();
    })
    //Display the question and remove the 'Start' button
    function displayQuestion(){

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
        $('#process-div').html(display_question);

        console.log(correct);//TODO:Delete it
        // display question order and length (1/10);
        $("#current-question").html("<div>" + (currentQuestion+1) + '/' +questions_array.length + "</div>");
        //Display the submit button
        $("#submit-button").show();

    };

    //submit the selected radio button
    $("#submit-button").click(function(){
        if ($("input").is(":checked")) {
            let userAnswer=($( "input:checked" ).val());
            if(userAnswer == correct){
                score++;
            }
        }
        gameOver()
    })

    //When the questions end, display score
    function gameOver(){
        if(currentQuestion<questions_array.length-1){
            currentQuestion++;
            displayQuestion();

        }else{
            $("#container").hide();
            $("#game-Over").show();
            $("#score").html("<h1>Final score: " + score +"</h1>");
        }
    };

    //restart the quiz after ending
    $(".reset").click(function(){
        window.location.reload();
    })

});