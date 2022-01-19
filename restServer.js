import * as http from "http";
import * as fs from "fs/promises";

const users={};

const PORT=8080;
http.createServer(async(req,res)=>{
    try {
        let { method, url }=req;
        console.log(method, url);

        if (method==="GET") {
            if (url==="/") {
                const data=await fs.readFile("./restServer.html");
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

                return res.end(data);
            } else if (url==="/about") {
                const data=await fs.readFile("./about.html");
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

                return res.end(data);
            } else if (url==="/users") {
                res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                return res.end(JSON.stringify(users));
            }

            // 주소가 완벽하게 다른 경로일 경우 핸들링 해주어야 함.
            try {
                const data=await fs.readFile(`.${url}`);
                return res.end(data);
            } catch(error) {
                console.error(`❎ restServer.js : ${error}`);
            }  // End of Try-Catch
        } else if(method==="POST") {
            if (url==="/user") {
                let body="";
                // req.body 를 stream 형식으로 받음
                req.on("data", ()=>{
                    body+=data;
                })

                // req.body 를 다 받으면 실행
                return res.on("end", ()=>{
                    console.log("POST 본문 (body): ", body);
                    
                    const { name }=JSON.parse(body);
                    const id=Date.now();
                    users[id]=name;
                    res.writeHead(201);
                    res.end("등록 성공");
                });
            }
        } else if (method==="PUT") {
            if (url.startsWith("/users/")) {
                const key=req.url.split("/")[2];

                let body='';
                req.on("data", (data)=>{
                    body+=data;
                });

                return req.on("end", ()=>{
                    console.log("PUT 본문 (body): ", body);

                    users[key] = JSON.parse(body).name;

                    return res.end(JSON.stringify(users));
                })
            }
        } else if (req.method==="DELETE") {
            if (url.startsWith("/users")) {
                const key=url.split("/")[2];
                delete users[key];
                return res.end(JSON.stringify(users));
            }
        } // End of if(method==="get")
        res.writeHead(404);
        return res.end("NOT FOUND");
    } catch (error) {
        console.error(`❎ restServer.js : 404 Not Found in ${PORT}`);
        res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
        return res.end(error.message);
    } // End of Try-Catch
}).listen(PORT, ()=>{
    console.log(`✅ restServer.js : Waiting to ${PORT}`);
})