const fs = require("fs")
const req = require("./../../main")
const res = require("./../../main")
const main=()=>{
    console.log("ok method: "+req.method)
}
module.exports = main