

// function createCanvas(){
//     console.log('canvas is up')

//     // // creating an img tag for the view
//     // let painting = document.createElement("img")
//     // painting.id = "painting"
//     // painting.alt = ""


//     canvas = document.createElement('canvas')
//     canvas.id = "canvas"
    
//     //** canvasHolder => easel */
//     const canvasHolder = document.querySelector("#canvas-container")
//     canvasHolder.append(canvas)

//     ctx = canvas.getContext('2d');

//     //Resizing
//     // canvas.height = window.innerHeight;
//     canvas.height = 500;

//     // canvas.width = window.innerWidth;
//     canvas.width = 800;

  
//         canvasFunc()
    
// }


// function canvasFunc(){
//     console.log('I can draw')
    

//     let painting = false;

//     function startPosition(e){
//         painting = true;
//         draw(e)
//     }

//     function finishedPosition(){
//         painting = false;
//         ctx.beginPath();
//     }

//     function draw(e){
//         if(!painting) return;
//         ctx.lineWidth = 6;
//         ctx.lineCap = 'round';

//         var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
//         var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
//         var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
//         // ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
//         ctx.lineTo(canvasX, canvasY)
//         ctx.stroke()
        
//         //these make things less pixelated // Not Working, but rest of code works fine
//         ctx.beginPath();
//         ctx.moveTo(canvasX, canvasY);
//     }

//     // //this adds an event listener to where the mouse has been clicked
//     // canvas.addEventListener('mousedown', startPosition);
//     // //adds a listener to when user is no longer clicking mouse
//     // canvas.addEventListener('mouseup', finishedPosition);
//     // // adds listener to when the mouse is being dragged
//     // canvas.addEventListener('mousemove', draw);


// }



// // *****************************************************************************************


// class Easel {

//     //easel is a container with a canvas appended to it
  
//     constructor(options) {
//       this.container = options.container
//       this.width = options.width || 200
//       this.height = options.height || 200
//       this.fillColor = options.fillColor || "#ddd"
//       this.penColor = options.penColor || "#000"
//       this.penSize = options.penSize || 2
  
//       this.isDrawing = false
  
//       //this is my canvas being created
//       this.canvas = this.createCanvasElement()
      
//       //this is my ctx
//       this.context = this.canvas.getContext('2d')
  
//       this.container.append(this.canvas)
//       this.clear()
//     }
  
//     createCanvasElement() {
//       const element = document.createElement('canvas')
//       element.width = this.width
//       element.height = this.height
  
//       element.onmousemove = this.handleDrawing.bind(this)
//       element.onmousedown = this.handleStartDrawing.bind(this)
//       element.onmouseup = this.handleStopDrawing.bind(this)
  
//       return element
//     }
  
//     handleStartDrawing(event) {
//       this.isDrawing = true;
//     }
  
//     handleDrawing(event) {
//       if (!this.isDrawing) return;
  
//       const x = event.pageX - this.canvas.offsetLeft;
//       const y = event.pageY - this.canvas.offsetTop;
//       const radius = 1;
  
//       this.context.fillStyle = this.penColor;
//       this.context.beginPath();
//       this.context.moveTo(x, y);
//       this.context.arc(x, y, this.penSize, 0, Math.PI * 2, false);
//       this.context.fill();
//     }
  
//     handleStopDrawing(event) {
//       this.isDrawing = false;
//     }
  
//     clear() {
//       this.context.fillStyle = this.fillColor;
//       this.context.fillRect(0, 0, this.width, this.height);
//     }
  
//     data() {
//       return this.canvas.toDataURL()
//     }
//   }


  // **********************************************************************


  class Easel {

    //easel is a container with a canvas appended to it
  
    constructor(options) {
      this.container = options.container
      this.width = options.width || 800
      this.height = options.height || 500
      this.fillColor = options.fillColor || "#ddd"
      // this.penColor = options.penColor || "#000"
      // this.penSize = options.penSize || 2
  
      this.isDrawing = false
  
      //this is my canvas being created
      this.canvas = this.createCanvasElement()
      
      //this is my ctx
      this.ctx = this.canvas.getContext('2d')
  
      this.container.append(this.canvas)
      this.clear()
    }
  
    createCanvasElement() {
      const element = document.createElement('canvas')
      element.width = this.width
      element.height = this.height
  
      element.onmousemove = this.handleDrawing.bind(this)
      element.onmousedown = this.handleStartDrawing.bind(this)
      element.onmouseup = this.handleStopDrawing.bind(this)
  
      return element
    }
  
    handleStartDrawing(event) {
      this.isDrawing = true;
      this.handleDrawing.bind(this)
    }
  
    handleDrawing(event) {
      if (!this.isDrawing) return;
      this.ctx.lineWidth = 6;
      this.ctx.lineCap = 'round';

      var cRect = this.canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
      var canvasX = Math.round(event.clientX - cRect.left);  // Subtract the 'left' of the canvas 
      var canvasY = Math.round(event.clientY - cRect.top);   // from the X/Y positions to make  
      // ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
      this.ctx.lineTo(canvasX, canvasY)
      this.ctx.stroke()
      
      //these make things less pixelated // Not Working, but rest of code works fine
      this.ctx.beginPath();
      this.ctx.moveTo(canvasX, canvasY);
  
      // const x = event.pageX - this.canvas.offsetLeft;
      // const y = event.pageY - this.canvas.offsetTop;
      // const radius = 1;
  
      // this.context.fillStyle = this.penColor;
      // this.context.beginPath();
      // this.context.moveTo(x, y);
      // this.context.arc(x, y, this.penSize, 0, Math.PI * 2, false);
      // this.context.fill();
    }
  
    handleStopDrawing(event) {
      this.isDrawing = false;
      this.ctx.beginPath();
    }
  
    clear() {
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.ctx.fillStyle = this.fillColor;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  
    data() {
      return this.canvas.toDataURL()
    }
  }