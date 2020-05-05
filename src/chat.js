function guessesDisplay(){
    // div for guesses
    let guessesMadeDiv = document.createElement("div")
    // ul
    let guessesUl = document.createElement("ul")
        // li
        let guessLi = document.createElement("li")
        guessLi.innerText = "Chine guessed: dog"
        let guessLi1 = document.createElement("li")
        guessLi1.innerText = "Ann guessed: pokemon"
        let guessLi2 = document.createElement("li")
        guessLi2.innerText = "Paul guessed: cat"
    // append lis to ul
    guessesUl.append(guessLi, guessLi1, guessLi2)
// append ul to guessesMadeDiv
guessesMadeDiv.append(guessesUl)
// append dropdownDiv , guessesMadeDiv to rightMenuDiv
rightMenuDiv.append(topicRoundDiv, guessesMadeDiv)
}




//user hits submit(event listener)
//event listener will call the guessesDisplay(event, player)


// ***an idea*** add a guess attribute to the player_round table, starting with a value of no guess made.
// when a player makes a guess, the guess attribute updates with the guess that was made
// the browser will only show the last guess that was made by each player. 


//pull messages without refreshing the page
// const refreshInterval = setInterval(function(){
    // guessesDisplay()
// }, 100)


// function guessesDisplay(event, player){
//     //create the UL in the drawer/guesser.js
//     //querySelect the UL
//     guess = document.createElement('li')
//     guess.innerText: `${player.name} : ${event.target.value}`

//     UL.append(guess)

// }

// const refreshInterval = setInterval(function(){
    // document.createElement('ul')
    //query select the element we need to append that to, and append it. 
// }, 100)