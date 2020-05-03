const BASE_URL = "http://localhost:3000"
const GAMES_URL = `${BASE_URL}/games`
const ROUNDS_URL = `${BASE_URL}/rounds`
const USERS_URL = `${BASE_URL}/players`
const WORDS_URL = `${BASE_URL}/words`
const PLAYER_ROUNDS_URL = `${BASE_URL}/player_rounds`


function createGame(e){
    console.log("I'm in create Game/ fetch.js")
    e.preventDefault()
    const inp = document.getElementById("username-input").value
    // POST new game
    fetch(GAMES_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: inp})
    }).then( resp => resp.json())
    .then(data => {
        document.querySelector("#new-game-form").reset()
        // console.log(data)
        // clear forms div
        // const formDiv = document.getElementById("buttons_home")
        // formDiv.innerHTML = ""
        // debugger
        // formDiv.innerHTML = ""

        div = document.getElementById("buttons_home")
        while(div.firstChild) {
            div.removeChild(div.firstChild)
        }
        displayDrawer(data)
    })
    
    

}



function joinGame(e){
    e.preventDefault()
    // target input field
    const userInp = document.getElementById("join-username-field").value
    const gameInp = document.getElementById("get-game").value

    const newUser = {
        name: userInp
    }
    //POST FETCH TO JOIN
    fetch(GAMES_URL + `/${gameInp}/join`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newUser)
    })
    .then(resp => resp.json())
    .then(playerRound => {
        // document.querySelector("#join-form").reset()
        div = document.getElementById("buttons_home")
        while(div.firstChild) {
            div.removeChild(div.firstChild)
        }
        displayGuesser(playerRound)
    })

    // document.querySelector("#join-username-field").reset()
}


function fetchWord(wordId){
    // console.log(wordId)
    
    fetch(WORDS_URL + `/${wordId}`)
    .then(resp => resp.json())
    .then(word => renderWord(word))

}
function renderWord(word){
    console.log(word)
    return word.name
}





// function updateRound(id){

//     obj = {
//         round_in_progress: false
//     }
//     fetch(ROUNDS_URL+`/${id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(obj)
//     })
    

// }

// function updateRole(playerRoundId){

//     console.log("UpdateRole was hit")
//     obj = {
//         role: "winner"
//     }

//     fetch(PLAYER_ROUNDS_URL + `/${id}`, {
//         method: "PATCH",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(obj)
//     })
// }