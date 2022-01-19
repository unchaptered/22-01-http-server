import * as http from "http";


/**
 * res 객체에 있는 3개의 메서드와 각 역할은 다음과 같습니다.
 * 
 * res.writeHead  // 응답에 대한 정보를 기록한다. 이 영역을 **헤더**라고 부른다.
 * res.write  //  클라이언트 측으로 보낼 데이터.
 * res.end  //  클라이언트 측으로 데이터를 보내고 서버를 중지한다.
 */
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});

    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello Server</p>');

    res.end('<p>Hello Server!<p>');
}).listen(8080, ()=>{console.log('✅ createServer.js : Connecting into 8080 Port')});