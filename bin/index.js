#!/usr/bin/env node
// IMPORTS 
const { routeType, getAbsoluteLink, extValidator, filterFiles, searchURL, uniqueLinks, validateLinks} = require('./fileReader.js');
const path = require('path');
const fs = require('fs');


// Variables globales
const userInput = process.argv[2] // Ruta entregada por el usuario
const absoluteLink = getAbsoluteLink(userInput) // Devuelve ruta absoluta
const inputType = fs.statSync(absoluteLink) // Devuelve true si es archivo y false si es carpeta
const validExt = ".md" // Extensión deseada
const fileExt = path.extname(absoluteLink) // Extensión del archivo


// Lo que tengo para la demo :' D
/*console.log("------------------------------------------")
console.log("\x1b[32m", "Ruta absoluta:", "\x1b[0m", absoluteLink)
console.log("------------------------------------------")
console.log("¿Es un archivo?:", routeType(inputType))
console.log("------------------------------------------")
console.log("¿Es un archivo .md?:", extValidator(fileExt, validExt))
console.log("------------------------------------------")*/

const mdLinks = (route, option) => {
    return new Promise((resolve, reject) => {
        const filesArr = [];
        const linksArr = [];
        // Primero verifica si la ruta es a un archivo
        if(routeType(inputType)) {
            // De ser así, comprobamos que la extensión del archivo sea .md
            if(extValidator(fileExt, validExt) === false){
                // Si el archivo no es .md, se rechaza 
                reject ("Este no es un archivo .md :(")
            } else {
                // Pero si el archivo sí es .md, se analiza y se extraen los links
                searchURL(route)
                .then(links => {
                    links.forEach(url => {
                    linksArr.push(url)  
                    })
                    if(option === "--stats") {
                        const total = linksArr.length
                        const unique = uniqueLinks(linksArr)
                        const validated = validateLinks(linksArr)
                        console.log(validated)
                        resolve (console.log("Links en total:", total), console.log("Links unicos:", unique), console.table(linksArr))
                    }
                })
            }
        }
    })
}
mdLinks(absoluteLink, "--stats")
.then(out => {
    console.log(out)
})
.catch(error => {
    console.log(error)
})

//module.exports = { mdLinks}


