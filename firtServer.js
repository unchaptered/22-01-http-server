import * as http from "http";

http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});

    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello Server</p>');

    res.end('<p>Hello Server!<p>');
}).listen(8080, ()=>{console.log('✅ createServer.js : Connecting into 8080 Port')});