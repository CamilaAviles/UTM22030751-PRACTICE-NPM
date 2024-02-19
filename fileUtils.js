// console.log("Camila Aviles Vargas");
// console.log(process.argv)

// const fs = require("fs"); // Siempre hasta arriba, sin nada antes (ni comentarios)
const JSON_FILE = "books.json";

import fs from "fs";

export const readFile = (jsonPath) => {
    try {
        const jsonData = fs.readFileSync(jsonPath); //Leer archivo
        const data = JSON.parse (jsonData); //parse lo convierte a json ya que lo lee como string
        return (data);

    } catch (error) {
        console.log(error);
    }
}


export const updateFile = (newData, jsonPath) => {
    try {
        //const jsonData = fs.readFileSync(jsonPath); //Leer archivo JSON
        const data = JSON.stringify (newData)
        const newJson = fs.writeFileSync(jsonPath, data) //primero se pone el archivo que se quiere actualizar y luego por cual se va a actualizar
        return (data);

    } catch (error) {
        console.log(error);
    }
}

console.log(updateFile([], "books-test.json"))









// const sum = (n1, n2) => console.log(parseInt(n1) + parseInt(n2));

// const substract = (n1,n2) => console.log(parseInt(n1) - parseInt(n2));

// const newArgs = process.argv.slice(2)

// console.log (newArgs)

// const n1 = newArgs [1];
// const n2 = newArgs [2];

// if (newArgs [0] === "sum") {
//     sum (n1, n2) 
// }

// if (newArgs [0] === "substract") {
//     substract (n1, n2) 
// }