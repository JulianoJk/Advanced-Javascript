//Retrieve user's ISBN number 
function getISBN(){
    let userInput = document.getElementById('text-field');
    let isbn = userInput.value;
    if(isbn!=''){
        //Clear the text
        userInput.value=''; 
        
    }else{
        document.getElementById("empty-input").style.display = "block";
        
    }
    retrieveData(isbn);
}
function retrieveData(number){
    let url =`https://openlibrary.org/isbn/${number}.json`;
    let img = `https://covers.openlibrary.org/b/isbn/${number}-M.jpg`
    

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayInfo(data, img);
    })
    // Catch error(found no ISBN)
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
function displayInfo(data, img){
    //Display the div containing all book information div
    document.getElementById('books-info-div').style.display="block";
    
    document.getElementById('book-title').innerHTML =`Title: ${data['title']}`
    //Display pages
    document.getElementById('book-pages').innerHTML=`Pages: ${data['number_of_pages']}`
    //Display publication year
    document.getElementById('book-publ-year').innerHTML=`Publication year: ${data['publish_date']}`

    //Display book cover
    document.getElementById('cover').src = img;
    
}
