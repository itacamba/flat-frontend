function displayCanvasFunc(playerStatus){
    console.log('canvas is up')

    canvas = document.createElement('canvas')
    canvas.id = "canvas"

    const canvasHolder = document.querySelector("#canvas-container")
    canvasHolder.append(canvas)

    ctx = canvas.getContext('2d');

    //Resizing
    // canvas.height = window.innerHeight;
    canvas.height = 500;

    // canvas.width = window.innerWidth;
    canvas.width = 800;

    if (playerStatus === "drawer"){
        canvasFunc()
    }

}

function canvasFunc(){
    console.log('I can draw')
    

    let painting = false;

    function startPosition(e){
        painting = true;
        draw(e)
    }

    function finishedPosition(){
        painting = false;
        ctx.beginPath();
    }

    function draw(e){
        if(!painting) return;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';

        var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
        var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
        var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
        // ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
        ctx.lineTo(canvasX, canvasY)
        ctx.stroke()
        
        //these make things less pixelated // Not Working, but rest of code works fine
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
    }

    //this adds an event listener to where the mouse has been clicked
    canvas.addEventListener('mousedown', startPosition);
    //adds a listener to when user is no longer clicking mouse
    canvas.addEventListener('mouseup', finishedPosition);
    // adds listener to when the mouse is being dragged
    canvas.addEventListener('mousemove', draw);


}


// the code to clear the canvas :
// ctx.clearRect(0, 0, width, height)
// add event listener to the clear button and run this code

