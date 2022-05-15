// dictionaryapi: https://dictionaryapi.com/account/my-keys

// Create some variables
const someWords = ["bamboozle", "indefatigable", "email", "hex",
                    "outreachy", "ormskirk", "crab"]

// Get elements from DOM
const wordOfDayEl = document.querySelector("#word-of-day-el");
const searchWordInput = document.querySelector("#search-el");
const searchBtn = document.querySelector("#search-btn");
const displaySearchedWordEl = 
            document.querySelector("#display-searched-word-el");
const displayRandomWordBtn = 
        document.querySelector("#display-random");
const displayDefsDiv = document.querySelector("#display-defs-div");

let theSearch;
let randomNumber = Math.floor(Math.random() * someWords.length);
let dictionaryUri; 
        // "https://dictionaryapi.com/api/v3/references/" + "collegiate" +
        //  "/json/" + ($word) + "?key=" + "1f4f1500-c7c7-4dad-8e3c-28577244a069";
  
// Manipulate Document
wordOfDayEl.textContent = someWords[randomNumber];
displayRandomWordBtn.addEventListener("click", getRandWord)
searchBtn.addEventListener("click", displaySearchedWord)
searchWordInput.addEventListener("keypress", function(e){

    if(e.keyCode === 13){
        e.preventDefault()
        // console.log(e)
        displaySearchedWord()
    }
})


function displaySearchedWord(){
    theSearch = searchWordInput.value ;
    // check if entered word has two words
    //theSearch = theSearch.replace(/\s/g, "+");
    console.log(theSearch);
    
    searchForDef(theSearch)
    
    searchWordInput.value = "";
    
}

function searchForDef(searchItem){
    if(searchItem){
        //displaySearchedWordEl.textContent = theSearch;
        dictionaryUri = "https://dictionaryapi.com/api/v3/references/" + "collegiate" +
         "/json/" + searchItem + "?key=" + "1f4f1500-c7c7-4dad-8e3c-28577244a069";

        fetch(dictionaryUri)  
        .then(response => {
            if(response.ok){
                return response.json();
            } 
        }) 
        .then(data => {
            if(data[0].shortdef){
                const definitions = data[0].shortdef;
                const wordType = data[0].fl;
                const etymology = data[0].et;
                let etymReplaced = etymology[0][1]
                let count = 0

                //replace the markdown in the etymology element
                etymReplaced = etymReplaced.replaceAll("{it}", "<i>")
                etymReplaced = etymReplaced.replaceAll("{/it}", "</i>")
                console.log("the data: ", data[0]);
                console.log("etymology: ", etymReplaced)
                
                //console.log("the definition: ", data[0].shortdef) 
                displayDefsDiv.innerHTML = `
                                            <h1>Your search: <br>
                                            <span id="display-searched-word-el"
                                            class="fst-italic">
                                                ${theSearch}
                                            </span> 
                                            </h1>
                                            <span>${wordType} </span>  
                                            `;
                definitions.forEach(element => {
                    count ++
                    displayDefsDiv.innerHTML += `<p class="lead">
                                               ${count}) ${element}
                                            </p>`;                                

                });

                displayDefsDiv.innerHTML += `<span>etymology: 
                                                ${etymReplaced} </span>`;                                 

            } else {
                    alert("looks like your search has not returned a " + 
                        "result")
                    displayDefsDiv.innerHTML = `<h1>Enter an existing word: <br>
                                            <span id="display-searched-word-el"
                                            class="fst-italic">

                                            </span> 
                                            </h1>`
            }                        
        })
        .catch(err => {
            console.error(err);
        });
    } else {alert("Did you enter a search word")}

}

function getRandWord (){ 
    randomNumber = Math.floor(Math.random() * someWords.length)
    wordOfDayEl.textContent = someWords[randomNumber]
    
}