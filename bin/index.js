#!/usr/bin/env node
// IMPORTS 
const { routeType, getAbsoluteLink, extValidator, filterFiles, searchURL, uniqueLinks, validateLinks} = require('./fileReader.js');
const path = require('path');
const fs = require('fs');
const { builtinModules } = require('module');

// Variables globales
const userInput = process.argv[2] // Ruta entregada por el usuario
const absoluteLink = getAbsoluteLink(userInput) // Devuelve ruta absoluta
const inputType = fs.statSync(absoluteLink) // Devuelve true si es archivo y false si es carpeta
const validExt = ".md" // Extensión deseada
const fileExt = path.extname(absoluteLink) // Extensión del archivo

// Función principal
const mdLinks = (route, options) => {
    return new Promise((resolve, reject) => {
        const linksArr = [];
        const filesArr = [];
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
                    if(options === "--stats --validate" || "--validate --stats") {
                        const total = linksArr.length
                        const unique = uniqueLinks(linksArr)
                        
                        Promise.allSettled(validateLinks(linksArr))
                        .then(res => {
                            const linksObj = res.map(url => url.value)
                            const validLinks = linksObj.filter(url => url["status code"] === 200).length
                            const brokenLinks = total - validLinks

                            resolve(console.log("Total de links:", total),
                            console.log("Links únicos:", unique),
                            console.log("Links validados:", validLinks),
                            console.log("Links rotos:", brokenLinks))    
                        })
                        .catch(err => {
                            console.log(err)
                        })

                       
                        } else if (options === "--stats"){
                            const total = linksArr.length
                            const unique = uniqueLinks(linksArr)
                            resolve(console.log("Total de links:", total),
                            console.log("Links únicos:", unique))

                        } else if (options === "--validate") {
                            Promise.allSettled(validateLinks(linksArr))
                            .then(res => {
                                const linksObj = res.map(url => url.value)
                                resolve(console.log(linksObj))
                            })

                    }
                })
            }
        /*} else {
            filterFiles(absoluteLink, validExt)
            .then(files => {
                if(files.length === 0){
                    reject("No hay archivos .md en este directorio :(")
                } else {

                }
            })
            .catch(err => {
                reject(err)
            })*/ 
        }
    })
}

module.exports = {mdLinks, absoluteLink, inputType}