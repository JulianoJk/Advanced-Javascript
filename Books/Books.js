/*
Build a web page books.html.

This page will have a text field and a button. The user will type an ISBN of a book and upon click the page will display the details of the book (e.g. Title, publication year, number of pages, etc) and the Cover page image.

The APIs for book data can be found here: https://openlibrary.org/developers/api

ISBN API: https://openlibrary.org/isbn/9780140328721.json (replace 9780140328721 with the user's input)

Covers API: https://covers.openlibrary.org/b/isbn/0385472579-M.jpg (replace 0385472579 with the user's input)
*/

//TODO: Check if user's input is only numbers and not letters
//TODO: Get book's API
//TODO: Save the Books API to a variable and try to replace the url of api with users var: https://openlibrary.org/isbn/[usersInput].json


//Retrieve user's ISBN number 
function getISBN(){
    let userInput = document.getElementById('text-field');
    let isbn = userInput.value;
    if(isbn!=''){
        //Clear the text
        userInput.value=''; 
        retrieveData(isbn);
    }else{
        document.getElementById("empty-input").style.display = "block";
        
    }
    
}
function retrieveData(number){
    let url =`https://openlibrary.org/isbn/${number}.json`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayInfo(data);
    })
    //Catch error(found no ISBN)
    .catch(err =>{
        document.getElementById('invalid-input').style.display="block";
    })


}

//TODO: When a book is found, replace document with book info

function clearMsgs(){
    document.getElementById('invalid-input').style.display="none";
    document.getElementById('empty-input').style.display="none";
    
}
//Display info about the book(Title, publication year, number of pages, etc)
function displayInfo(data){
    // Make div visible //TODO:Delete it
    // document.getElementsByClassName('book-info').style.display="block";
    //Display Title
    document.getElementById('title').innerHTML = 'Title: ' + data['title'];

    //Display publication year
    console.log(data['publish_date'] );//TODO:DELETE 
}