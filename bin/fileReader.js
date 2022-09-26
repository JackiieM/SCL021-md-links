#!/usr/bin/env node
// IMPORTS
const path = require('path');
const fs = require('fs');

// Variables globales
const userInput = process.argv[2]
let absoluteLink = userInput; // Si el directorio es relativo, aquí se guarda el valor absoluto
const inputType = fs.statSync(absoluteLink)
const validExt = ".md"
const fileExt = path.extname(userInput)
console.log(process.argv[2])
console.log("¿Es un link absoluto?:", path.isAbsolute(userInput))
console.log("Link absoluto:", path.resolve(userInput))
console.log("¿Es un archivo?:", inputType.isFile())
console.log("¿Es una carpeta?:", inputType.isDirectory())

// FUNCIONES DE LECTURA



//transforma input links de relativos a absolutos
const getAbsoluteLink = () => {
    if(path.isAbsolute(userInput) === false){
        absoluteLink = path.resolve(userInput)
    }
}
getAbsoluteLink()
// Verifica si la extensión del archivo es .md
const extValidator = () => {
    if(absoluteLink && fileExt === validExt){
        console.log("Archivo válido! continuando análisis...")
    } else {
        console.log("Whoops! Este no es un archivo .md, por favor ingresa un archivo compatible.")
    }
}

extValidator() 
// break de lloración