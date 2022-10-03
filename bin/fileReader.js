#!/usr/bin/env node
// IMPORTS
const path = require('path');
const fs = require('fs');
const https = require('https')
const urlRegEx = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
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
const filterFiles = (source, ext) => {
    return new Promise((resolve, reject) => {
        const foundFiles = [];
        fs.readdir(source, 'utf8',(err, files) => {
            if(err) {
                console.log(err)
                reject(err)
            } 
            //console.log ("\x1b[32m", "Archivos encontrados:", "\x1b[0m")
            files.forEach(file => {
                if (path.extname(file) === ext) {
                    foundFiles.push(file);
                } 
            })
            resolve(foundFiles) 
        })
    })
}
// Lectura de documentos
const searchURL = (source) => {
    return new Promise((resolve, reject) => {
        const linksData = [];
        fs.readFile(source, 'utf8', (err,data) => {
            if(err) {
                reject(console.log(err))
            } else if (data.match(urlRegEx) === null) {
                return (console.log("No hay links en este documento :("))
            } else if (data) {
                data.match(urlRegEx).forEach(link => {
                linksData.push(link)
                //console.log(link)
                })
            resolve(linksData) 
            }
        })
    })
}
// Cuenta links unicos
const uniqueLinks = (source) => {
    let unique = 0;
    source.forEach((link, index) => {
        if(source.indexOf(link) === index) {
            unique++
        }
    }) 
    return unique
}
//Valida los links 
const validateLinks = (source) => {
    return source.map(url => {
        return new Promise((resolve) => {
            https.get(url, res => {
                if(res.statusCode === 200) {
                    resolve({file: process.argv[2], url: url, "status code": res.statusCode, message: "OK"})
                } else {
                    resolve({file: process.argv[2], url: url, "status code": res.statusCode, message: "FAIL"})
                }
            })
        })
    })
}

// break de lloración
module.exports = {routeType, getAbsoluteLink, extValidator, filterFiles, searchURL, uniqueLinks, validateLinks};