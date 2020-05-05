// function displayGuesses(user_info){
//     console.log(user_info)
//     const loggedInUser = user_info.included[0]
//     const prArr =  user_info.included.filter(e => e.type === "player_round")
//     const plArr = user_info.included.filter(e => e.type === "player").concat(loggedInUser)
//     const roundInfo = user_info.included[1]
//     const word = user_info.included.slice(-1)[0].attributes


//     prArr.forEach(pr => {
//         //find parent 
//         const guessesUl = document.getElementById("guesses-ul")
//         console.log(pr)
//         pr.attributes.guesses.forEach(guess => {
//             const newLi = document.createElement("li")
//             newLi.innerText = guess
//             guessesUl.append(newLi)
//         })
//     })
// }

function displayGuesses(roundInfo){
adapter = new Adapter("http://localhost:3000/")
let guessesUl = document.getElementById("guesses-ul")
        
        setInterval(() => {
            adapter.getGuesses(roundInfo.id)
            .then(resp => resp.json())
            .then(data => { 
                const prArr = data.guesses // returns arr of pr objects
                if (prArr.length > 0 ){        
                    guessesUl.innerHTML = ""
                    prArr.forEach(  guess => {
                        // debugger
                            const li = document.createElement("li")
                            li.innerText = guess
                            guessesUl.append(li)
                        
                    })
                }
            })
        

        }, 100);

  }