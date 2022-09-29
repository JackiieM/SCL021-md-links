#!/usr/bin/env node
// IMPORTS 
const { routeType, getAbsoluteLink, extValidator, filterFiles, searchURL, uniqueLinks} = require('./fileReader.js');
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

const mdLinks = (absoluteLink) => {
    return new Promise((resolve, reject) => {
        const filesArr = [];
        const linksArr = [];
        // Primero verifica si la ruta es a un archivo
        if(routeType(inputType) === true) {
            // De ser así, comprobamos que la extensión del archivo sea .md
            if(extValidator(fileExt, validExt) === false){
                // Si el archivo no es .md, se rechaza 
                reject ("Este no es un archivo .md :(")
            } else {
                // Pero si el archivo sí es .md, se analiza y se extraen los links
                searchURL(absoluteLink)
                .then(links => {
                    links.forEach(url => {
                    linksArr.push(url)  
                    })
                    console.log(uniqueLinks(linksArr))
                    return console.log(`Total de links: ${linksArr.length}`, linksArr)
                })
            }
        }
    })
}
mdLinks(absoluteLink)
.then()
.catch(error => {
    console.log(error)
})

/*filterFiles(absoluteLink, validExt)
.then((files) =>{
  console.log(files[0])
})*/

//searchURL(absoluteLink)









/*const mdLinks = (absoluteLink) => {
    return new Promise((resolve, reject) => {
        if(absoluteLink === undefined){
            reject("Por favor ingresa una ruta para analizar :)")
        } else {
            if(routeType(absoluteLink) === true){
                if(extValidator(fileExt, validExt) === true) {
                    resolve(console.log("Archivo válido! continuando análisis..."))
                } else {
                    console.log("Whoops! Este no es un archivo .md, por favor ingresa un archivo compatible.")
                }
            } else {
                console.log(filterFiles(absoluteLink, validExt))
            }
        }
    })
}

module.exports = { mdLinks}*/


