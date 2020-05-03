// -create function to check if word submitted by guesser, matches word of the round

function wordCheck(e){
    console.log(e)
    e.preventDefault()
    
    const player_id = e.currentTarget.dataset.guesserId
   
    const guess = e.currentTarget.firstElementChild.value.toLowerCase() // this is a word
    const wordOfRound =  e.currentTarget.dataset.word.toLowerCase()
    
    const roundId = e.currentTarget.dataset.roundId
    const playerRoundId = e.currentTarget.dataset.playerRound

  
    // IF guess is right 
    if(guess === wordOfRound){  
        
        
            const obj = {
                player_id: player_id,
                player_round_id: playerRoundId 
                
            }
    // we do a fetch patch to roundsController #end_round action 
            fetch(`http://localhost:3000/rounds/${roundId}/endround`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(resp => resp.json())
            .then(playerRoundInfo => {
                displayDrawer(playerRoundInfo)

            })


    } else if (guess != wordOfRound) {
        e.target.reset()
        console.log("Word is wrong")
        // display a nice message on the DOM
        // debugger
        // displayGuesser()
    }

}


