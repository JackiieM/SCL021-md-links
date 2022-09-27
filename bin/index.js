#!/usr/bin/env node
// IMPORTS 
const { routeType, getAbsoluteLink, extValidator, filterFiles} = require('./fileReader.js');
const path = require('path');
const fs = require('fs');

// Variables globales
const userInput = process.argv[2] // Ruta entregada por el usuario
const absoluteLink = getAbsoluteLink(userInput) // Devuelve ruta absoluta
const inputType = fs.statSync(absoluteLink) // Devuelve true si es archivo y false si es carpeta
const validExt = ".md" // Extensión deseada
const fileExt = path.extname(absoluteLink) // Extensión del archivo

// Lo que tengo para la demo :' D
console.log("------------------------------------------")
console.log("\x1b[32m", "Ruta absoluta:", "\x1b[0m", absoluteLink)
console.log("------------------------------------------")
console.log("¿Es un archivo?:", routeType(inputType))
console.log("------------------------------------------")
console.log("¿Es un archivo .md?:", extValidator(fileExt, validExt))
console.log("------------------------------------------")
filterFiles(absoluteLink, validExt)








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


