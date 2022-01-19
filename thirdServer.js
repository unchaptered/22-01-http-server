import * as http from 'http';
import * as fs from 'fs/promises';

const PORT=8080;
http.createServer(async (req,res)=>{
    try {
        const data=await fs.readFile("./thirdServer.html");

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
    } catch(error) {
        console.log(error);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.meesage);
    }
}).listen(PORT, ()=>{
    console.log(`✅ thirdServer.js : Waiting to ${PORT}`);
});
