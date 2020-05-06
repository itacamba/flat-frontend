

function displayGuesses(roundInfo){
adapter = new Adapter("http://localhost:3000/")
let guessesDiv = document.getElementById("guesses-div")
        
        setInterval(() => {
//  debugger
            adapter.getGuesses(roundInfo.id)
            .then(resp => resp.json())
            .then(data => { 
                const prArr = data.guesses // returns arr of pr objects
                if (prArr.length > 0 ){        
                    guessesDiv.innerHTML = ""
                    prArr.forEach(  guess => {
                        // debugger
                            const div = document.createElement("div")
                            div.classList.add("guess-bk")
                            div.innerText = guess
                            guessesDiv.append(div)
                        
                    })
                }
            })
        

        }, 5000);

  }


 