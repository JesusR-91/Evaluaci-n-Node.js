//Imports 
const axios = require("axios")

// Variables
const urls = ['https://www.ejemplo1.com', 'https://www.ejemplo2.com', 'https://www.example.org'];

urls.forEach( async (url) =>{
    try {
        response = await axios.get(url)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }

})