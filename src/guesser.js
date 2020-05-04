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
        // div for points
    //     let pointsDiv = document.createElement("div")
    //     pointsDiv.innerText = `Points: ${loggedInUser.attributes.points}`
    //     // div for guesses
    //     let guessesMadeDiv = document.createElement("div")
    //     let guessesUl = document.createElement("ul")
    //     let guessLi = document.createElement("li")
    //     guessLi.innerText = "Chine guessed: dog"
    //     let guessLi1 = document.createElement("li")
    //     guessLi1.innerText = "Ann guessed: pokemon"
    //     let guessLi2 = document.createElement("li")
    //     guessLi2.innerText = "Paul guessed: cat"
    
    //     guessesUl.append(guessLi, guessLi1, guessLi2)
    //     guessesMadeDiv.append(guessesUl)
    // rightMenuDiv.append(pointsDiv, guessesMadeDiv)


    // ***********************************************************
    // showing an img tag for the guesser
    let painting = document.createElement("img")
    painting.id = "painting"


    // // div for canvas
    // let canvasDiv = document.createElement("div")
    // canvasDiv.id = "canvas-container"

    // easel = new Easel({
    //     container: canvasDiv,
    //     width: 200,
    //     height: 200,
    //     fillColor: '#ddd'
    //   })
      

    adapter = new Adapter("http://localhost:3000/")

    setInterval(() => {
        adapter
          .getData(paintingId)
          .then(res => res.json())
          .then(data => {painting.src = data.url})
      }, 5000)
    
    //   // the sending of data to the DB
    //   setInterval(() => {
    //     adapter
    //       .sendData(paintingId, easel.data())
    //   }, 200)



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

    // displayCanvasFunc(user_info.data.attributes.role)
}