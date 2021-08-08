const guessedLettersList = document.querySelector (".guessed-letters");//The list of guessed letters
const guessButton = document.querySelector (".guess"); //The guess button
const playerGuess = document.querySelector (".letter"); //The player input field
const playerPrompt = document.querySelector ("label"); //The prompt for a letter
const wordProgress = document.querySelector (".word-in-progress"); //Paragraph showing the word as it progresses
const remaining = document.querySelector (".remaining"); //Paragraph with number of remaining guesses
const numRemaining = document.querySelector ("span"); //Actual number remaining
const message = document.querySelector (".message"); //paragraph of messages to the player
const againButton = document.querySelector (".play-again"); //button to play again
const simonImage = document.querySelector(".simon"); //image of simon
const secretMessage = document.querySelector(".secret-message");//secret message paragraph
const secretPrompt = document.querySelector(".secret");//prompt to keep playing
let word = "magnolia"; //My test word
let wordArray = ["you", "are", "special", "to", "me"];
let guessedLetters = [];
let remainingGuesses = 8;


const selectWord = function (wordArray) {
    word = wordArray.shift();
    //wordArray.push(word);
    console.log(wordArray);
    letterPlaceHolders(word);
};


const letterPlaceHolders = function (word) {
    const placeHolderArray = []; //Creates the initial array and populates with the dot
    for (const letter of word) { 
        placeHolderArray.push("●");
        console.log(letter); //so I can see it in the console when I call the function
    }
    wordProgress.innerText = placeHolderArray.join(""); //This makes it a string again so it shows up in paragraph
};
 
selectWord(wordArray);


guessButton.addEventListener ("click", function(e) {
 e.preventDefault();
 const guess = playerGuess.value; 
 console.log(guess);
 playerGuess.value = ""; 
 const goodGuess = validGuess(guess); //running the validation function and saving the final return to a variable.
    if (goodGuess) { //if we get a result from the validator, then run the makeGuess function
        makeGuess(guess); 
    }
});


const validGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "Please enter one letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter only one letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "That is not a letter.";
    } else {
        message.innerText = "";
        return input;
    }
};

const makeGuess = function (letter) { //This function is saving the player's guess to an array and checking it for duplicates
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You've already guessed that letter. Try again."
    } else {
        guessedLetters.push(letter);
        showLetters ();
        guessCount(letter);
        updateWord(guessedLetters);
    }
    console.log(guessedLetters);
}

const showLetters = function () {
    guessedLettersList.innerHTML = "";
    guessedLetters.forEach (function(letter) {
        const li = document.createElement("li");
        li.innerText = `${letter}`;
        console.log(li);
        guessedLettersList.append(li);
    });
}

const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase(); 
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordProgress.innerText = revealWord.join("");
    win();
};

//console.log(updateWord());

const guessCount = function (guess) {
    pulledWord = word.toUpperCase();
        if (!pulledWord.includes(guess)) {
            message.innerText = `The word does not contain ${guess}.`;
            remainingGuesses -= 1;
        } else {
            message.innerText = `Good guess! The letter ${guess} is in the word!`;
            
        };
        if (remainingGuesses === 0) {
            message.innerText = `No more guesses! The word is ${pulledWord}.`;
            simonImage.innerHTML = "<img src='img/sad-simon.jpg'/>";
            startOver();
            lastWordRestart();
        };
        if (remainingGuesses === 1) {
            numRemaining.innerText = `${remainingGuesses} guess`;
        };
        if (remainingGuesses > 1) {
            numRemaining.innerText = `${remainingGuesses} guesses`;
        };
}



const win = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("win");
        message.classList.add("highlight");
        message.innerText = "You guessed the word! Congrats!";
        simonImage.innerHTML = "<img src='img/simon-sun.jpg'/>";
        startOver();
        lastWordRestart();
    } 
};

const lastWordRestart = function () {
    if (wordArray.length === 0) {
        simonImage.innerHTML = "<img src='img/foot-2.jpeg'/> <img src='img/foot-3.jpg'/>";
        secretMessage.classList.remove("hide");
        secretPrompt.classList.add("hide");
        againButton.innerText = "Play again";
        wordArray = ["you", "are", "special", "to", "me"];
    }
};


const startOver = function () {
    guessButton.classList.add("hide");
    guessedLettersList.classList.add("hide");
    remaining.classList.add("hide");
    againButton.classList.remove("hide");
    playerGuess.classList.add("hide");
    playerPrompt.classList.add("hide");
};

againButton.addEventListener ("click", function () {
   message.classList.remove("win");
   message.classList.remove("highlight");
   message.innerText = "";
   guessedLettersList.innerText = "";
   remainingGuesses = 8; 
   guessedLetters = [];
   numRemaining.innerText = `${remainingGuesses} guesses`;
   guessButton.classList.remove("hide");
   guessedLettersList.classList.remove("hide");
   remaining.classList.remove("hide");
   playerGuess.classList.remove("hide");
   playerPrompt.classList.remove("hide");
   againButton.classList.add("hide");
   simonImage.innerHTML = "";
   secretMessage.classList.add("hide");
   selectWord(wordArray);
   againButton.innerText = "Keep Playing";

});




















