function displayGuesses(user_info){
    console.log(user_info)
    const loggedInUser = user_info.included[0]
    const prArr =  user_info.included.filter(e => e.type === "player_round")
    const plArr = user_info.included.filter(e => e.type === "player").concat(loggedInUser)
    const roundInfo = user_info.included[1]
    const word = user_info.included.slice(-1)[0].attributes


    prArr.forEach(pr => {
        //find parent 
        const guessesUl = document.getElementById("guesses-ul")
        console.log(pr)
        pr.attributes.guesses.forEach(guess => {
            const newLi = document.createElement("li")
            newLi.innerText = guess
            guessesUl.append(newLi)
        })
    })
}