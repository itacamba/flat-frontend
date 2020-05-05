function displayGuesser(user_info){
    // debugger
    console.log("I hit guesser.js/ display guesser")

    let doc = document.getElementById("content")
    while(doc.firstChild){
        doc.removeChild(doc.firstChild)
    }
    // debugger
    //div parent for drawer name, and topic
    const loggedInUser = user_info.included[0]
    // const loggedInUser = user_info.included.filter(e => e.type === "round")
    const prArr =  user_info.included.filter(e => e.type === "player_round")
    const plArr = user_info.included.filter(e => e.type === "player").concat(loggedInUser)
    const roundInfo = user_info.included[1]
    const word = user_info.included.slice(-1)[0].attributes

    // current painting id
    const paintingId = user_info.included[2].id

    // function to find the player round with the drawer.
    function findPrPlayerId(playerRound){
        return playerRound.attributes.role === "drawer"
    }
    const playerRoundDrawerId = prArr.find(findPrPlayerId).attributes.player_id
    
    //find the drawer player instance 
    const drawerInstance = plArr.filter(p => parseInt(p.id) === playerRoundDrawerId)[0]
 

     let canvasHeaderDiv = document.createElement("div")  
        // div for drawer name
        let drawerName = document.createElement("div")
        drawerName.innerText = `Drawer is: ${drawerInstance.attributes.name}`
        // div for topic
        let topic = document.createElement("div")
        topic.innerText = `topic: ${word.topic}`
        
    // append to canvasHeaderDiv
    canvasHeaderDiv.append(drawerName, topic)


    // div for right menu
    let rightMenuDiv = document.createElement("div")
        //div for points
        let pointsDiv = document.createElement("div")
        pointsDiv.innerText = `Points: ${loggedInUser.attributes.points}`
        // div for guesses
        let guessesMadeDiv = document.createElement("div")
        let guessesUl = document.createElement("ul")
        guessesUl.id = "guesses-ul"

        // adapter = new Adapter("http://localhost:3000/")
        
        // setInterval(() => {
        //     adapter.getGuesses(roundInfo.id)
        //     .then(resp => resp.json())
        //     .then(data => { 
        //         const prArr = data.guesses // returns arr of pr objects
        //         if (prArr.length > 0 ){        
        //             guessesUl.innerHTML = ""
        //             prArr.forEach(  guess => {
        //                 // debugger
        //                     const li = document.createElement("li")
        //                     li.innerText = guess
        //                     guessesUl.append(li)
                        
        //             })
        //         }
        //     })
        

        // }, 100);

        
        guessesMadeDiv.append(guessesUl)
    rightMenuDiv.append(pointsDiv, guessesMadeDiv)


    // ***********************************************************
    // showing an img tag for the guesser
    let painting = document.createElement("img")
    painting.id = "painting"
      

    adapter = new Adapter("http://localhost:3000/")

    setInterval(() => {
        adapter
          .getData(paintingId)
          .then(res => res.json())
          .then(data => {painting.src = data.url})
      }, 100)



// ***********************************************************
    
    
    //div for form for guess
    let guessingFormDiv = document.createElement("div")
        // form
        let form = document.createElement("form")
        form.addEventListener("submit", wordCheck)
        form.dataset.guesserId = loggedInUser.id
        form.dataset.word = word["name"]
        form.dataset.roundId = roundInfo["id"]
        form.dataset.playerRound = user_info.data.id
        form.dataset.guesserName = loggedInUser.attributes.name


        // input
        let input = document.createElement("input")
        input.type = "text"
        //submit
        let submit = document.createElement("input")
        submit.type = "submit"
    // append inputs to form
    form.append(input, submit)
    //append form to div
    guessingFormDiv.append(form)
    //append everything to index.html
    doc.append(canvasHeaderDiv, rightMenuDiv, painting, guessingFormDiv)
    
    displayGuesses(roundInfo)
}