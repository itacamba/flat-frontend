document.addEventListener("DOMContentLoaded", () => {
    // Create Game Button
    let createGameBtn = document.getElementById("create-game")
    createGameBtn.addEventListener("click", handleNewGame)
    // Join Game Button
    let joinGameBtn = document.getElementById("join-game")
    joinGameBtn.addEventListener('click', handleJoinGame)
    
    // form.addEventListener("submit", myFunc)
})
function handleNewGame(){
    // find div to append form to 
    const div = document.getElementById("forms")
    while(div.firstChild) {
        div.removeChild(div.firstChild)
    }
        
        // form create game
        const createGameForm = document.createElement("form")
        // add event listener to form
        createGameForm.addEventListener("submit", createGame )
        createGameForm.id = "new-game-form"
        // input username
        const usernameInput = document.createElement("input")
        usernameInput.placeholder = "Username"
        usernameInput.id = "username-input"
        // submit button
        const submitBtn = document.createElement("button")
        submitBtn.innerText = "Submit"
        // append inputs to form
        createGameForm.append(usernameInput, submitBtn)
        
    // append form to div parent
    div.append(createGameForm)
}

function handleJoinGame(){
    // find div to append form to
    const formsDiv = document.getElementById("forms")
    while(formsDiv.firstChild) {
        formsDiv.removeChild(formsDiv.firstChild)
    }

        // join Game form
        const enterGameForm = document.createElement("form")
        enterGameForm.id = "join-form"
        enterGameForm.addEventListener("submit", joinGame)
            // input for username
            const usernameInput = document.createElement("input")
            usernameInput.id = "join-username-field"
            usernameInput.placeholder = "Username"
            // input for game ID
            const gameId = document.createElement("input")
            gameId.id = "get-game"
            gameId.placeholder = "Game ID"
            // submit 
            const submitBtn = document.createElement("button")
            submitBtn.innerText = "Submit"
            
            

            
        //append elements to form
        enterGameForm.append(usernameInput, gameId, submitBtn)
    //appends form to div
    formsDiv.append(enterGameForm)
}


// function myFunc(e){
//     e.preventDefault()
//     let form = document.getElementById("user-form")
//     form.style.display = "none"
//     // we need an if/else statement to differ which page is shown to user based on role
//     // displayGuesser()
//     displayDrawer()
// }