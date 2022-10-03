#!/usr/bin/env node
const {mdLinks, absoluteLink} = require("./index.js")
const input = [process.argv[3], process.argv[4]]
let options = "";
console.log(input)

if(input[0]) {
    options = input[0]
} else if (input[0] && input[1]){
    options = input [0] + ' ' + input[1]
} else {
    options = "--stats"
}
console.log(options)
mdLinks(absoluteLink, options)
.then(out => {
    console.log(out)
})
.catch(error => {
    console.log(error)
})


