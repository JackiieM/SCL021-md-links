#!/usr/bin/env node
// IMPORTS
const path = require('path');
const fs = require('fs')
const urlRegEx = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
// FUNCIONES DE LECTURA
// Transforma input de ruta de relativos a absolutos
const getAbsoluteLink = (source) => {
    if(path.isAbsolute(source) === false){
        return path.resolve(source)
    } return source
}
// Verifica si la ruta es un archivo, si es un directorio retorna false
const routeType = (source) => {
    if(source.isFile() === true) {
        return true
    } return false
}
// Verifica si la extensión del archivo es .md
const extValidator = (sourceExt, validExt) => {
    if(sourceExt === validExt){
        return true
    }  return false
}
// Busca y filtra archivos .md de un directorio
const filterFiles = (source, validExt) => {
    const foundFiles = [];
    fs.readdir(source,(err, files) => {
        if(err) {
            console.log ("\x1b[31m","Esta ruta no es un directorio.", "\x1b[0m")
        } else {
            console.log ("\x1b[32m", "Archivos encontrados:", "\x1b[0m")
            files.forEach(file => {
                if (path.extname(file) === validExt) {
                    foundFiles.push(file);
                    console.log(file)
                }
            })
            if(foundFiles.length === 0) {
                return console.log("No se encontraron archivos .md en este directorio.")
            } 
            return foundFiles;
        }
    }) 
}

// break de lloración
module.exports = {routeType, getAbsoluteLink, extValidator, filterFiles};