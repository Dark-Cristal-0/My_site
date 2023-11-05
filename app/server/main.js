const fs = require("fs")
const method = require("./Method/index")
const path = require("path")
const readline = require("readline")
const http = require("http")

const main =()=>{
    const serv = http.createServer((req,res)=>{
        console.log(req.method)
        if(fs.existsSync(__dirname + "/Method/"+req.method)){
            method[req.method](req,res)
        }else{
            res.writeHead(500,{"Content-Type":"text/html"})
            res.end("<h1 align='center'>Error 500</h1>")
        }
        console.log(`${req.url}`)
        res.writeHead(200,{})
    })
    serv.listen(3000,"localhost")
}

module.exports ={
    main,
}