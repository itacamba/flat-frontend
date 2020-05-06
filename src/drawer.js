function displayDrawer(user_info){
    // debugger

    let doc = document.getElementById("content")
    while(doc.firstChild){
        doc.removeChild(doc.firstChild)
    }
    
    
    //div parent for word
    //logged-in user //user_info.included[0].attributes.name
    const loggedInUser = user_info.included[0]
    
    //word: 
    const prArr =  user_info.included.filter(e => (e.type === "player_round"))
    const plArr = user_info.included.filter(e => (e.type === "player"))
    const roundInfo = user_info.included[1]
    const word = user_info.included.slice(-1)[0].attributes
    
    const playerRoundId = prArr.find(obj => obj.attributes['player_id'] == user_info.included[0].id)
    
     let canvasHeaderDiv = document.createElement("div")
        // div for word
        let wordH1 = document.createElement("h1") 
        wordH1.id = "word-id"
        //TODO Make an if/else statement to show either blank when no topic is chosen, or a word, when topic is chosen. 
        wordH1.innerText = `Word: ${word.name}`
        
        let gameH1 = document.createElement("h1") 
        //TODO Make an if/else statement to show either blank when no topic is chosen, or a word, when topic is chosen. 
        gameH1.innerText = `Game ID: ${user_info.included[1].attributes.game_id}`
        // append word once picked
    // append h1 to canvasHEaderDiv
    canvasHeaderDiv.append(wordH1, gameH1)
    

    // current painting id
    const paintingId = user_info.included[2].id
    

    // div for right menu
    let rightMenuDiv = document.createElement("div")
        // div for dropdown
        let topicRoundDiv = document.createElement("div")
            // h2 for topic title
            let topicH2 =document.createElement("h2")
            topicH2.id = "word-topic"
            topicH2.innerText = ` Topic: ${word.topic}`
            // round
            const roundH2 = document.createElement("h2")
            roundH2.innerText = `Round: ${roundInfo.attributes.number}` 
            // button random word
            const randomBtn = document.createElement("button")
            randomBtn.dataset.round = roundInfo.id
            randomBtn.innerText = "Generate Word"
            randomBtn.addEventListener("click", getRandomWord)
            
        topicRoundDiv.append(topicH2, roundH2, randomBtn)

        let guessesMadeDiv = document.createElement("div")
            let guessesUl = document.createElement("ul")
            guessesUl.id = "guesses-ul"
            
        guessesMadeDiv.append(guessesUl)
    rightMenuDiv.append(topicRoundDiv, guessesMadeDiv)

      

// ***********************************************************
    


    // div for canvas
    let canvasDiv = document.createElement("div")
    canvasDiv.id = "canvas-container"

    easel = new Easel({
        container: canvasDiv,
        width: 800,
        height: 500,
        fillColor: '#ddd'
      })


    adapter = new Adapter("http://localhost:3000/")
    
    //   the sending of data to the DB
      setInterval(() => {
          
        adapter
        // debugger
          .sendData(paintingId, easel.data())
        //   fetch("http://localhost:3000/" + `paintings/${paintingId}`, {
        //     method: "PATCH",
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({data: easel.data()})
        //   })
          
        
      }, 5000)



    //   setInterval(() => {
          
    //       fetch("http://localhost:3000/" + `player_rounds/${playerRoundId.id}`)
    //        .then(resp => resp.json())
    //        .then(playerRound => {
               
    //            if (playerRound.data.attributes.role === "guesser"){
    //                displayGuesser(playerRound)
    //            }
    //        })
          
        
    //   }, 5000)

// ***********************************************************


    //the canvas
    // let canvas = document.createElement("convas")
        // canvas = createCanvas()
        // canvas.id = "canvas"
        
        
    // append canvas to div
    // canvasDiv.append(canvas)

    
    // div for footer canvas
    let footerCanvas = document.createElement("div")

        
        // div for submit button
        let clearCanvasBtn = document.createElement("button")
        clearCanvasBtn.innerText = "Clear Canvas"
        clearCanvasBtn.addEventListener("click", () =>{
            easel.clear()
            // ctx.clearRect(0, 0, canvas.width, canvas.height)
        })
        
        // div for submit button
        // let submitCanvasBtn = document.createElement("button")
        // submitCanvasBtn.innerText = "Submit Drawing"
        
    // append colors and button to footerCanvas 
    footerCanvas.append(clearCanvasBtn)

    //append everything to index.html
    
    doc.append(canvasHeaderDiv, rightMenuDiv, canvasDiv, footerCanvas)

    // displayCanvasFunc(user_info.data.attributes.role)
    // guessesDisplay()

    displayGuesses(roundInfo)
}
