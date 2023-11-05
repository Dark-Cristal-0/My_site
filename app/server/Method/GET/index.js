const fs = require("fs")
const path = require("path")
const main =function(req,res){
    const send={

        text:function(){
            let filePath =`${__dirname}./../../../web${req.url}`
            if(fs.existsSync(filePath)){
                let text = fs.readFileSync(filePath,{encoding:"utf-8",flag:"r"})
                res.end(text)
             }else{
                 console.log("\tFile not defined")
                 console.log(`\t${req.url}`)
             }
        },

        media:function(type){
            let filePath =`${__dirname}./../../../web${req.url}`
            const stat = fs.statSync(filePath);
            const fileSize = stat.size;
            const range = req.headers.range;

            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
                const chunksize = (end-start)+1;
                const file = fs.createReadStream(filePath, {start, end});
                const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': type,
                };
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                'Content-Length': fileSize,
                'Content-Type': type,
                };
                res.writeHead(200, head);
                fs.createReadStream(filePath).pipe(res);
            }
        }

    }

    switch(path.extname(req.url)){
        case ".html":
            console.log("type html")
            res.writeHead(200,{"Content-Type":"text/html"})
            send.text()
        break;

        case ".css":
            console.log("type css")
            res.writeHead(200,{"Content-Type":"text/css"})
            send.text()
        break;

        case ".js":
            console.log("type js")
            res.writeHead(200,{"Content-Type":"text/javascript"})
            send.text()
        break;
//
        case ".png":
            console.log("type png")
            send.media("image/png")
        break;

        case ".jpg":
            console.log("type jpg")
            send.media("image/jpeg")
        break;

        case ".gif":
            console.log("type gif")
            send.media("image/gif")
        break;

        case ".webr":
            console.log("type webr")
            send.media("image/webr")
        break;
//
        case ".mp4":
            console.log("type mp4")
            send.media("video/mp4")
        break;

        case ".mpeg":
            console.log("type mpeg")
            send.media("video/mpeg")
        break;

        case ".ogg":
            console.log("type ogg")
            send.media("video/ogg")
        break;

        case ".webm":
            console.log("type webm")
            send.media("video/webm")
        break;

        case ".wp3":
            console.log("type mp3")
            send.media("audio/mpeg")
        break;
    }
}
module.exports = main