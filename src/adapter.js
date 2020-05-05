class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL
    //use to stop requests
    // this.lastImageData = ''
  }

  sendData(imageId, imageData) {
    
    return fetch(this.baseURL + `paintings/${imageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({data: imageData})
    })
  }

  getData(imageId) {
    return fetch(this.baseURL + `paintings/${imageId}`)
  }

  getGuesses(roundId){
    return fetch(this.baseURL + `rounds/${roundId}`)
  }


}