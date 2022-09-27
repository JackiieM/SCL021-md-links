#!/usr/bin/env node
// IMPORTS
const path = require('path');
const fs = require('fs')

// FUNCIONES DE LECTURA
// Verifica si la ruta es un archivo, si es directory retorna false
const routeType = (source) => {
    if(source.isFile() === true) {
        return true
    } return false
}
// Transforma input links de relativos a absolutos
const getAbsoluteLink = (source) => {
    if(path.isAbsolute(source) === false){
        return path.resolve(source)
    } return source
}
// Busca y filtra archivos .md de una ruta
const filterFiles = (source, validExt) => {
    const foundFiles = [];
    fs.readdir(source,(err, files) => {
        if(err) {
            console.log ("Esta ruta no es un directorio.")
        } else {
            
            console.log ("Archivos encontrados:")
            files.forEach(file => {
                if (path.extname(file) === validExt) {
                    foundFiles.push(file);
                    console.log(file)
                }
            })
            if(foundFiles.length === 0) {
                return console.log("No se encontraron archivos .md en este directorio.")
            } return console.log(foundFiles)
        }
    }) 
}
// Verifica si la extensión del archivo es .md
const extValidator = (source, sourceExt, validExt) => {
    if(source && sourceExt === validExt){
        return "Archivo válido! continuando análisis..."
    } else {
        return "Whoops! Este no es un archivo .md, por favor ingresa un archivo compatible."
    }
}
// break de lloración
module.exports = {routeType, getAbsoluteLink, extValidator, filterFiles};