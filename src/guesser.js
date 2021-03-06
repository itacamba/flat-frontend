
function displayGuesser(user_info){
    
    console.log("I hit guesser.js/ display guesser")

    
    let doc = document.getElementById("content")
    while(doc.firstChild){
        doc.removeChild(doc.firstChild)
    }
    // debugger
    const loggedInUser = user_info.included[0]
    // const loggedInUser = user_info.included.filter(e => e.type === "round")
    const prArr =  user_info.included.filter(e => (e.type === "player_round"))
    const plArr = user_info.included.filter(e => (e.type === "player")).concat(loggedInUser)
    const roundInfo = user_info.included[1]
    word = user_info.included.slice(-1)[0].attributes
    
    const playerRoundId = prArr.find(obj => obj.attributes['player_id'] == user_info.included[0].id)
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
    canvasHeaderDiv.id = "canvas-header-div"
        // div for drawer name
        let drawerName = document.createElement("div")
        drawerName.id = "drawer-name"

        drawerName.innerText = `Drawer is: ${drawerInstance.attributes.name}`
        // div for topic
        let topic = document.createElement("div")
        topic.id = "topic-div"
        topic.innerText = `Topic: ${word.topic}`
        
    // append to canvasHeaderDiv
    canvasHeaderDiv.append(drawerName, topic)


    // div for right menu
    let rightMenuDiv = document.createElement("div")
    rightMenuDiv.id = 'right-div'
    rightMenuDiv.classList.add('col-4')
        //div for points
        let pointsDiv = document.createElement("div")
        pointsDiv.id = 'points-div'
        
        pointsDiv.innerText = `Points: ${loggedInUser.attributes.points}`
        // div for guesses
        let guessesMadeDiv = document.createElement("div")
        guessesMadeDiv.id = "guesses-div"

        
        // guessesMadeDiv.append(guessesUl)
    rightMenuDiv.append(pointsDiv, guessesMadeDiv)


    // ***********************************************************
    // showing an img tag for the guesser
    let paintingDiv = document.createElement("div")
    paintingDiv.classList.add("col-8")
    let painting = document.createElement("img")
    painting.id = "painting"
      
    

    adapter = new Adapter("http://localhost:3000/")

    setInterval(() => {
        adapter
          .getData(paintingId)
          .then(res => res.json())
          .then(data => {
              painting.src = data.url
            })
      }, 200)



      setInterval(() => {
          
        fetch("http://localhost:3000/" + `rounds/${roundInfo.id}/${loggedInUser.id}`)
         .then(resp => resp.json())
         .then(round => {
// debugger
            word = round[1].word
            topic.innerText = `Topic: ${round[1].word.topic}`
            pointsDiv.innerText = `Points: ${round[0].points}`
         })
        
      
    }, 200)

// ***********************************************************
    
    
    //div for form for guess
    let guessingFormDiv = document.createElement("div")
    guessingFormDiv.id = 'guessing-form-div'
        // form
        let form = document.createElement("form")
        form.id = "guesser-form"
        form.addEventListener("submit", wordCheck)
        form.dataset.guesserId = loggedInUser.id
        form.dataset.word = word["name"]
        form.dataset.roundId = roundInfo["id"]
        form.dataset.playerRound = user_info.data.id
        form.dataset.guesserName = loggedInUser.attributes.name


        // input
        let input = document.createElement("input")
        input.type = "text"
        input.placeholder = "Your guess here..."
        //submit
        let submit = document.createElement("input")
        submit.classList.add("yellow-btn")
        submit.type = "submit"
    // append inputs to form
    form.append(input, submit)
    //append form to div
    guessingFormDiv.append(form)
    //append everything to index.html

    paintingDiv.append(canvasHeaderDiv, painting, guessingFormDiv)
    // let footerDiv = document.createElement("div")
    // footerDiv.classList.add('row')

    let midPageDiv = document.createElement("div")
    midPageDiv.id = 'mid-page'
    midPageDiv.classList.add('row')
    midPageDiv.append(paintingDiv, rightMenuDiv)
    doc.append(midPageDiv)
    
    displayGuesses(roundInfo)
}