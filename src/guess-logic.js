// -create function to check if word submitted by guesser, matches word of the round

function wordCheck(e){
    console.log(e)
    e.preventDefault()
    

    const player_id = e.currentTarget.dataset.guesserId
   
    const guess = e.currentTarget.firstElementChild.value.toLowerCase() // this is a word
    const wordOfRound =  e.currentTarget.dataset.word.toLowerCase()
    
    const roundId = e.currentTarget.dataset.roundId

    const playerRoundId = e.currentTarget.dataset.playerRound

    const guesserName = e.currentTarget.dataset.guesserName

     
    //  fetch PATCH to DISPLAY ON DOM
//**********************************************
     
        
//         .then(resp => resp.json()).then(data => {
// debugger
//             console.log(`/rounds/:id/guesses => returns ${data}`)
//         })
        // .then(resp => resp.json())
        // .then(pRoundObj => { 
        //     const lastGuess = pRoundObj.guesses.slice(-1)[0]
        //     displayGuess(lastGuess)
        // })

        // function displayGuess(lastGuess) {
        //     console.log(lastGuess)
        //     // target parent
        //     const guessesDiv = document.getElementById("guesses-ul")
        //     const guess = document.createElement("li")
        //     guess.innerText = lastGuess
        //     guessesDiv.append(guess)
        //     // create child
        //     // append 
        // }

    
    // IF guess is right 
    if(guess === wordOfRound){  
        
        console.log("word is right")
            const obj = {
                player_id: player_id,
                player_round_id: playerRoundId 
                
            }
            
    // we do a fetch patch to roundsController #end_round action 
   
            fetch(`http://localhost:3000/rounds/${roundId}/endround`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(resp => resp.json())
            .then(playerRoundInfo => {
// debugger
                console.log(playerRoundInfo)
                // displayDrawer(playerRoundInfo)
                playerStatus(playerRoundInfo)

            })


    } else if (guess != wordOfRound) {
       
        console.log("Word is wrong")
        fetch(`http://localhost:3000/rounds/${roundId}/guesses`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ guess: `${guesserName}: ${guess}`})
        }).then( e.target.reset())
        // display a nice message on the DOM
        // debugger
        // displayGuesser()
    }

}


