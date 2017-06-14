---
title: 오픈소스 소프트웨어 기말고사 정리
description: 오픈소스 소프트웨어 기말고사 정리
header: 오픈소스 소프트웨어 기말고사 정리
---

> 파이팅

# 오픈소스 정리

## 7장. node.js

- Thread VS Event

  - Thread

    - 실행의 추상적인 한 단위 - task

      - task : 실행의 정보, 메모리, file descriptor, credential, lock, network resource

    - Thread 와 Process 의 차이

      - Thread 는 메모리, file descriptor, filesystem context 를 공유하지만, Process 는 공유하지 않는다.

    - Thread 의 Switching 절차

      - Thread T1 이 pc 를 포함한 register 들을 자신의 스택에 저장한다.
      - Scheduler 가 T1 의 스택 포인터를 기억한다.
      - Scheduler 가 T2 의 스택 포인터를 가져와 복원한다.
      - T2 가 자신의 레지스터를 복원한다.
      - T2 재시작

    - Thread Scheduler

      - 각각의 Thread 의 스택 포인터를 유지
      - (우선순위나 리소스 사용에 따라) 어떤 Thread 가 실행될지 결정
      - 실행중인 Thread 를 언제 먼저 꺼낼지 결정
      - 다중 코어로 다루어져야함
      - "fork" : 새로운 Thread 를 생성

    - Thread 의 사용

      - CPU 의 병렬성을 이용
      - I/O 의 병렬성을 이용
      - 효율적인 CPU 집약적 작업

    - 문제점

      - 우선순위 역전 : 우선순위가 높은 Thread 가 낮은 thread 를 기다림 -> 일시적으로 우선순위를 조절해 해결
      - Deadlock : X 가 Y 를 기다리고, Y 가 X 를 기다림
      - 동기화 불량 : lock 을 해제하는 것을 잃어버림
      - "fork" 실패
      - 튜닝

  - Event

    - 어떤 모듈을 위해 queueing 되어진 object
    - Handler 는 block 될 수 없음

      - blocking 은 전체 시스템의 block 을 야기할 수 있음
      - block 대신 page fault 와 garbage collection

    - Event Scheduler

      - 그 다음 handle 될 이벤트 큐를 결정한다. : 우선순위와 CPU 사용에 따라
      - event handler 는 절대 선점하지 않는다. : 스택이 필요없다.
      - 다중 CPU 로 다루어진다.

    - Event Synchronization

      - Handler 는 block 될수 없다 -> 동기화가 없다.
      - Handler 는 메모리를 공유하지 않는다. -> 병렬적으로 이루어지지 않는다.
      - 모든 커뮤니케이션은 이벤트로 이루어진다.

    - Event 의 사용

      - 병렬 CPU : CPU 마다 다른 handler
      - I/O 동시성 : 이벤트로 알리는 I/O 완료, 다른 활동은 병렬적으로 이루어질 수 있음

  - Thread vs Event

    - Event base system 은 더 작은 리소스를 사용한다. -> 특히 확장성에서 더 나은 퍼포먼스를 가진다.
    - Event base system 은 포로그래밍하기 힘들다 : blocking 회피, exception handling
    - 둘다 튜닝은 힘들다.

- Node.js

  - 구글의 V8 엔진을 인터프리터로 사용해 빠르다.
  - Javascript framework 가 아니다. - runtime environment
  - Event-Driven Architecture 를 가진다. - 모든 node.js 의 라이브러리는 비동기적이다.
  - Non-blocking I/O, Single Thread
  - built-in java object 처럼 많은 모듈을 가지고 있다.
  - requre(..) 로 모듈을 로드한다.
  - 모든 built in 모듈과 npm 모듈은 pathing 이 필요없다.
  - 어플리케이션에서 만든 모듈은 path 가 필요하다.
  - 이점

    - Asynchronous

      - CPU 대기시간이 없다. - No Blocking, Asynchronous I/O

    - Productivity

      - 웹 백엔드의 장벽 제거 - javascript frontend 개발자가 backend 앱을 빠르게 제작가능
      - No Thread : 동기화, Critical section 없음 -> 간단한 프로그래밍
      - 많은 npm 모듈

  - 단점

    - Single Thread

      - CPU 작업에 특화되어있음 - 어떤 작업은 nodejs 에서 병목현상을 일으킬수 있다. / I/O 특화작업은 nodejs 에 좋다.
      - Multiple core

        - nodejs 는 single thread 와 core 에서 실행된다.
        - 다른 코어는 사용하지 않는다? / Cluster Module / Sessino Sharing ?

    - Callback

      - callback hell 을 야기할 수 있다.

    - Learning curve

      - 절차적 프로그래밍에서 이벤트 프로그래밍으로 -> 러닝커브가 높다.

  - NPM

    - node package manager
    - nodejs 를 위한 온라인 저장소
    - nodejs 패키지를 설치하기 위한 커멘드라인 유틸리티 제공
    - nodejs 를 설치하면 따라 설치된다.
    - local / global package 로 나누어짐
    - package.json

      - 패키지의 속성을 정의한다. -> node 어플리케이션의 root 디렉토리에
      - name, version, description, homepage, author, contributors, dependencies, repository...

  - Callback

    - Blocking Code

      - Callback 은 비동기적 함수이다. - 어떤 작업의 완료 시점에 호출된다.

  - Event Driven Programming

    - nodejs 는 single thread 어플리케이션이다.

      - 이벤트와 콜백으로 이루어진다.
      - 이런 이벤트들중 하나가 발견되면 콜백 함수가 호출된다. ![1](/img/opensource-final-term/1.png)

    - eventEmitter 사용

      ```javascript
        var events = require('events');
        var eventEmitter = new events.EventEmitter();
        var connectHandler = function connected(){
            console.log('connection successful.');
            eventEmitter.emit('data_received');
        };

        // connection 이라는 이벤트에 이벤트 핸들러(connectHandler) 를 등록
        eventEmitter.on('connection', connectHandler);
        // data_received 이라는 이벤트에 이벤트 핸들러 (익명함수) 를 등록
        eventEmitter.addListener('data_received', function(){
            console.log('data received successfully.');
        });

        // 이벤트 실행
        eventEmitter.emit('connection');
        /*
        실행결과
        connection successful
        data received succssfully.
        */
      ```

      ```javascript
        // 다른 함수들
        eventEmitter.listeners(event) // 이벤트에 연결된 모든 리스터들을 출력
        eventEmitter.removeListener(event, listener) // 이벤트에 연결된 특정 리스너 제거
      ```

  - File system

    - open file

      ```javascript
        var fs = require('fs');
        console.log('Going open file!');
        fs.open('input.txt','r+',function(err, fd){
            if(err){
                return console.error(err);
            }
            console.log('File opend successfully!');
        });
      ```

    - Writing file / Read file

      ```javascript
        var fs = require('fs');
        console.log('Going to write into existing file');
        fs.writeFile('input.txt','Hello World', function(err){
            if(err){
                return console.error(err);
            }
            console.log('Data Written successfully');
            console.log('Read newly written data');
            fs.readFile('input.txt', function(err, data){
                if(err){
                    return console.error(err);
                }
                console.log("Asynchronous read: " + data.toString());
            });
        });
      ```

      - 버퍼에 읽기

        ```javascript
          var fs = require('fs');
          var buf = new Buffer(1024);
          console.log('Going to open an existing file');
          fs.open('input.txt', 'r+', function(err, fd){
              if(err){
                  return console.error(err);
              }
              console.log('File opened successfully');
              console.log('Going to read the file');
              fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
                  if(err){
                      return console.error(err);
                  }
                  console.log(bytes + " bytes read");
                  if(bytes > 0){
                      console.log(buf.splice(0,bytes).toString());
                  }
              })
          })
        ```

    - 기타

      ```javascript
        fs.unlink(path,callback) // 파일 삭제
        fs.mkdir(path[, mode], callback) // 폴더 만드릭 ( mode 는 선택 )
      ```

## 8장. Node.js, Express

- Express

  - nodejs 웹 어플리케이션 프레임워크
  - HTTP 요청에 대해 응답하는 미들웨어를 설정할수 있도록 한다.
  - HTTP 메소드와 URL 에 따라 다른 행동을 취하는 라우터를 정의한다.
  - 템플릿으로 변수를 보냄으로서 동적인 HTML 페이지를 렌더한다.
  - install : `npm install express --save`
  - Hello world 예제

    ```javascript
      var express = require('express');
      var app = express();
      app.get('/', function(req,res){
          res.send('Hello Word');
      })
      var server = app.listen(3000, function(){
          console.log('App Listening at 3000 port');
      })
    ```

  - Request & Response

    - Request object : 요청의 querystring, parameter, body, HTTP header 등의 정보를 포함한다. ![2](/img/opensource-final-term/2.png)
    - Response object : HTTP 요청을 받으면 Express가 보내는 HTTP Response

  - Routing

    - `app.get('/',function(req,res){...})`
    - `app.post('/',function(req,res){...})`
    - `app.all('/', function(req,res,next){... next();})` - 어떤 method 이든 받는다.
    - `app.get('/ab*cd',function(req,res){...})` - * 에 어떤 문자열이 들어가든 패턴이 일치하면 응답한다.
    - Parameters

      - `app.get('/users/:userId', function(req,res){req.send(req.params)})` - userId 가 req.params 객체에 들어간다.

    - Handler as Array

      - `app.get('/example',[cb1,cb2])` - 콜백 함수로 어레이가 들어가면 순서대로 호출된다.

    - app.route()

      - route path 에 대해 핸들러를 체이닝할수 있다.

        ```javascript
          app.route('/book')
          .get(function (req, res) {
          res.send('Get a random book')
          })
          .post(function (req, res) {
          res.send('Add a book')
          })
          .put(function (req, res) {
          res.send('Update the book')
          })
        ```

      - router 를 모듈로 만들어 사용할 수 있다.

        ```javascript
          // routers/birds.js
          var express = require('express');
          var router = express.Router();

          router.get('/', function(req,res){
              res.send('Bird Homepage')
          });
          module.exports=router;
        ```

        ```javascript
          // app.js
          var birds = require('routers/birds');
          //...
          app.use('/birds', birds)
        ```

  - Static files

    - static 파일 (이미지, stylesheet, js, etc...) 을 serve 한다.
    - `app.use(express.static('public'))`

      - public 폴더를 static 폴더로 지정한다. (어디서든 접근할 수 있다.)

  - EJS

    - Embedded JS template ![3](/img/opensource-final-term/3.png)
    - Escaped output : `<%= %>`
    - Unescaped raw output : `<%- %>`
    - install : `npm install --save ejs`
    - setting

      ```javascript
        app.set('view engine', 'ejs');
      ```

    - usage

      ```javascript
        app.get('/', function(req,res){
            res.render('index', {title: 'Index Page!!'});
        });
      ```

  - Session Management

    - express-session : 세션을 만들고 관리한다.
    - usage

      ```javascript
        var app = express()
        var session = require('express-session');
        app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: {secure: true}
        }))
      ```

      ```javascript
        app.use(session({
            secret: 'keyboard cat',
            cookie: { maxAge: 60000 }
        }))
        app.get('/', function(req, res, next) {
            var sess = req.session;
            if (sess.views) {
                sess.views++;
                res.setHeader('Content-Type', 'text/html');
                res.write('<p>views: ' + sess.views + '</p>');
                res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
                res.end()
            } else {
                sess.views = 1;
                res.end('welcome to the session demo. refresh!');
            }
        })
      ```

      ```javascript
      	res.session.destroy(function(err){...})
      	res.session.destroy(function(err){...})
      ```
