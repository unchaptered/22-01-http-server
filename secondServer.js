import * as http from 'http';

const PORT=8080;
const server=http.createServer((req,res)=>{
    res.writeHead(200, { 'Content-Type':'text/html; charset=utf-8'});
    res.write('<h1>Hello Node</h1>');
    res.end('<p>Hello Server!</p>');
});

server.listen(PORT);

server.on('listening', ()=>{
    console.log(`✅ secondServer.js : Success to ${PORT}`);
});

server.once('error', (error)=>{
    console.log(`✅ secondServer.js : Failed to ${PORT}`);
});