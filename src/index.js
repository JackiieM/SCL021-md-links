#!/usr/bin/env node
// IMPORTS 
const { routeType, getAbsoluteLink, extValidator, filterFiles, searchURL, uniqueLinks, validateLinks} = require('./fileReader.js');
const path = require('path');
const fs = require('fs');
const colors = require('colors');


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
        // Primero verifica si la ruta es a un archivo
        if(routeType(inputType)) {
            // De ser así, comprobamos que la extensión del archivo sea .md
            if(extValidator(fileExt, validExt) === false){
                // Si el archivo no es .md, se rechaza 
                reject ("Este no es un archivo .md :(".red.bold)
            } else {
                // Pero si el archivo sí es .md, se analiza y se extraen los links
                searchURL(route)
                .then(links => {
                    links.forEach(url => {
                    linksArr.push(url)  
                    })
                    if(options === "--stats --validate" || options === "--validate --stats") {
                        const total = linksArr.length
                        const unique = uniqueLinks(linksArr)
                        
                        Promise.allSettled(validateLinks(linksArr))
                        .then(res => {
                            const linksObj = res.map(url => url.value)
                            const validLinks = linksObj.filter(url => url.code === 200).length
                            const brokenLinks = total - validLinks

                            const results = `
Archivo: ${path.parse(route).base}`.yellow.inverse + `
---------------------------------------------------
Total de links: ${total}
Links únicos: ${unique}
Links validados: ${validLinks}
Links rotos: ${brokenLinks}
---------------------------------------------------`
                                    
                            resolve(results)   
                        })
                        .catch(err => {
                            reject(err)
                        })

                        } else if (options === "--stats"){
                            const total = linksArr.length
                            const unique = uniqueLinks(linksArr)
                            const results = `
Archivo: ${path.parse(route).base}`.yellow.inverse + `
---------------------------------------------------
Total de links: ${total}
Links únicos: ${unique}
---------------------------------------------------`
                            resolve(results)

                        } else if (options === "--validate") {
                            Promise.allSettled(validateLinks(linksArr))
                            .then(res => {
                                const linksObj = res.map(url => url.value)
                                console.log(`Archivo: ${path.parse(route).base}`.yellow.inverse)
                                resolve(linksObj)
                            })
                            .catch(err => {
                                reject(err)
                            })
                        }
                })
                .catch(err => {
                    reject(err)
                })
            }
        } else {
            filterFiles(absoluteLink, validExt)
            .then(files => {
                if(files.length === 0){
                    reject("No hay archivos .md en este directorio :(".red.bold)
                } else {
                    files.forEach(markdown => {
                        searchURL(markdown)
                        .then(links =>{
                            links.forEach(url => {
                                linksArr.push(url)
                            })
                            if(options === "--stats --validate" || options === "--validate --stats") {
                                const total = linksArr.length
                                const unique = uniqueLinks(linksArr)
                                Promise.allSettled(validateLinks(linksArr))
                                .then(res => {
                                    const linksObj = res.map(url => url.value)
                                    const validLinks = linksObj.filter(url => url.code === 200).length;
                                    const brokenLinks = total - validLinks
                                    const results = `
Archivo: ${path.parse(markdown).base}`.yellow.inverse + `
---------------------------------------------------
Total de links: ${total}
Links únicos: ${unique}
Links validados: ${validLinks}
Links rotos: ${brokenLinks}
---------------------------------------------------`
        
                                    resolve(console.log(results))    
                                })
                                .catch(err=>{
                                    reject(err)
                                })
                            }  else if (options === "--stats"){
                                const total = linksArr.length
                                const unique = uniqueLinks(linksArr)
                                const results = `Archivo: ${path.parse(markdown).base}`.yellow.inverse + `
---------------------------------------------------
Total de links: ${total}
Links únicos: ${unique}
---------------------------------------------------`
                                resolve(console.log(results))
    
                            } else if (options === "--validate") {
                                Promise.allSettled(validateLinks(linksArr))
                                .then(res => {
                                    const linksObj = res.map(url => url.value)
                                    resolve(console.log(`Archivo: ${path.parse(markdown).base}`.yellow.inverse, linksObj))
                                })
                                .catch(err => {
                                    reject(err)
                                })
                            }
                        })
                        .catch(err =>{
                            reject(err)
                        })
                    })
                }
            })
            .catch(err => {
                reject(err)
            })
        }
    })
}

module.exports = {mdLinks, absoluteLink}