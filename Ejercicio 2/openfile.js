const fs = require("fs/promises");

// Path variable
const path = "datos.txt";

let openFile = async () =>{
    try {
        let data = await fs.readFile(path, {encoding: "utf8"});
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

openFile()