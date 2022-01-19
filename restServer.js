import * as http from "http";
import * as fs from "fs/promises";

const PORT=8080;
http.createServer(async(req,res)=>{
    try {
        const { method, url }=req;

        if (method==="GET") {
            if (url==="/") {
                const data=await fs.readFile("./restServer.html");

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url==="/about") {
                const data=await fs.readFile("./about.html");

                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                return res.end(data);
            }

            // 주소가 완벽하게 다른 경로일 경우 핸들링 해주어야 함.
            try {
                const data=await fs.readFile(`.${url}`);
                return res.end(data);
            } catch(error) {
                console.error(`❎ restServer.js : ${error}`);
            }  // End of Try-Catch
        }  // End of if(method==="get")
    } catch (error) {
        console.error(`❎ restServer.js : 404 Not Found in ${PORT}`);

        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(error.message);
    } // End of Try-Catch
}).listen(PORT, ()=>{
    console.log(`✅ restServer.js : Waiting to ${PORT}`);
})