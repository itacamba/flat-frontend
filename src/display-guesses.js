

function displayGuesses(roundInfo){
adapter = new Adapter("http://localhost:3000/")
let guessesUl = document.getElementById("guesses-ul")
        
        setInterval(() => {
//  debugger
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
        

        }, 5000);

  }