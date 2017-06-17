---
title: 17-1 학기 오픈소스 소프트웨어 기말고사 정리
description: 17-1 학기 오픈소스 소프트웨어 기말고사 정리
header: 17-1 학기 오픈소스 소프트웨어 기말고사 정리
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

## 9장. Linux

- Operating system : 컴퓨터의 하드웨어와 어플리케이션 간의 인터페이스를 제공하는 소프트웨어
- Kernel

  - 시스템 모니터
  - 하드웨어에 대한 액세스 제어 및 중재
  - 시스템 리소스 스케줄링 / 할당

    - 메모리, CPU, disk, descriptor..

  - 보안

  - 서비스에 대한 유저의 요청에 응답 (system call)

  - Design Goal

    - 효율적이고 빨라야한다.
    - 견고하고, 탄력적이여야한다.
    - 기능적이고, 유연하고, 호환성이 있어야한다.
    - 안전(보안) 해야한다.
    - 이식성과 확장성이 좋아야 한다.

- Unix 와 Linux

  - 리눅스는 유닉스로부터 파생되어 나왔다.

- 왜 리눅스인가

  - 오픈소스 -> 수정가능성, 확장 가능성
  - 다수의 플랫폼에서 동작한다.
  - 여러 버전을 거치면서 견고하다.
  - 널리 쓰여진다.

- 리눅스의 특징

  - 단단히 짜여지고 하나로 묶여져 잘 정의된 인터페이스를 가진 커널
  - 멀티태스킹, 다중 사용자관리, 멀티프로세싱
  - 아키텍쳐 독립성
  - 디스크 캐시 동적 사이징
  - 공유 라이브러리
  - Posix standard support
  - 여러 실행가능한 포맷
  - 여러 파일시스템
  - 여러 네트워크 프로토콜

- Linux distribution

  - redhat, debian, ubuntu, suse...
  - 각자의 강점들이 있다.

- Linux File and Directory

  - 리눅스의 디렉토리는 하나의 가상화되고 통합된 파일시스템에 포함되어 있다.
  - 물리적인 장치들은 mount point 에 마운트된다.

    - A:, C: 같은 이름이 없다.

  - Directories

    - boot: 리눅스 커널, 부트로더 설정들 -> 없으면 부팅 불가
    - bin: 파일시스템에 필요한 기본적인 명령어 존재 -> system startup 시 필요하다.
    - dev: 하드웨어 컴포넌트, 하드디스크, 키보드.. 모든 장치 파일들. divice driver 와 상호작용한다.
    - etc: 시스템 설정들. 모든 설정들은 text 파일이며 수정 가능하다.
    - home: 홈 디렉토리. 각각의 유저는 이름에 해당하는 directory 를 가지고 있다.
    - lib: 프로그래머와 프로그램에 필요한 라이브러리들. 모든 필수 라이브러리가 있다. startup 시 필요
    - proc: 커널의 인터페이스(kernel pseudo-directory). special 디렉토리이며 커널 설정, 커널 상태 모니터링 등이 포함
    - root: 루트의 홈 디렉토리. / 는 파일시스템의 root, /root 는 root 의 홈 디렉토리
    - sbin: 시스템 설정파일(하드디스크 포맷, 하드웨어 관리) root 만 해당 프로그램을 실행할 수 있다.
    - tmp: 모든 temp 파일들
    - usr: 보조 계층구조. 컴파일러, 툴 등 유용한 프로그램들이 포함, startup 시 꼭 필요하진 않다.
    - var: variable directory. 모든 dynamic file 들을 포함. 유저는 이 파일을 변경할수 없다.

- Permission ![5](/img/opensource-final-term/5.png)

- Utility

  - `pwd`: 현재 디렉토리를 출력한다.
  - `cd`: 디렉토리 변경
  - `ls`: 현재 디렉토리에 있는 파일/폴더 들 출력
  - `mkdir`: 새로운 디렉토리 만들기
  - `rmdir`: 디렉토리 삭제
  - `mv`: 파일 옮기기 / 파일 이름변경으로도 사용
  - `rm`: 파일 삭제
  - `cat`: 파일의 내용 출력
  - `cp`: 파일 복사 `-r` 옵션을 사용하면 디렉토리 안에 내용을 재귀적으로 모두 복사
  - `chmod`: 파일 권한 변경
  - Metacharacter

    - `*`: 어떤 문자열이든 포함 (.으로 시작되는 파일 제외)
    - `?`: 길이 1의 어떤 문자

- Process

  - 커널은 각각의 프로그램을 프로세스로 본다.
  - 종료되었을때 죽엇다(?) 라고한다. (kill)
  - 프로세스는 각가의 고유한 id(PID)를 가지고 있다.
  - 타입

    - Init : 모든 프로세스의 부모 프로세스
    - User Process : end user 에 의해 생성된 프로세스
    - System process / daemon : 각종 서버들, 로그 서비스..등등

  - 속성

    - PID: 고유한 프로세스 아이디 (Process ID)
    - PPID: 부모 프로세스의 아이디 (Parent Process ID)
    - TTY: 프로세스가 연결된(제어되는) 터미널
    - RUID: 명령을 내린 사용자 (Real User ID)
    - RGID: 프로세스를 시작한 유저의 그룹 (Real Group ID)

  - Process Utility

    - `top`: 동작중인 시스템의 상태를 리얼타임으로 볼수있음
    - `ps`: 현재 프로세스의 스냅샷을 출력
    - `pstree`: 프로세스 트리를 출력
    - `kill`: 프로세스 죽이기 `kill -9`(종료 시그널)
    - `&`: 백그라운드에서 커멘드 동작

      - `find / -ctime -1 > changed-file-list.txt 2>&1 &`

    - `Ctrl + C`: foreground 에 실행중인 프로세스 종료

    - `Ctrl + Z`: foreground 에 실행중인 프로세스를 일시 중단

    - `bg`: 일시중단된 프로세스를 백그라운드로 재시작
    - `fg`: foreground 에 작업을 배치하고 현재 작업으로 설정 -

- VI

  - Unix 의 에디터
  - vi 는 text formatter 가 아니다.
  - Command 모드와 Input 모드가 있다.

    - 시작할때 default 는 command 모드이다.
    - 여러 키를 입력함으로서 input 모드로 진입할 수 있다.
    - Esc 를 누름으로서 command 모드로 다시 나올수 있다.

  - 정리

    - Exit from Vi

      - `:q <enter>`: 저장하지 않고 나가기
      - `:q! <enter>`: 강제로 저장하지 않고 나가기
      - `:wq <enter>`: 저장 후 종료
      - `:x <enter>`: 저장 후 종료
      - `ZZ` : 저장 후 종료

    - Moving Around

      - `h`: 왼쪽
      - `;`: 오른쪽
      - `j`: 아래
      - `k`: 위
      - `-`: 현재 라인의 위 라인의 처음으로 커서 이동
      - `H`: 현재 스크린의 처음으로 커서 이동(Home)
      - `L`: 현재 스크린의 맨 킽으로 커서 이동 (Last)
      - `M`: 현재 스크린의 중간으로 커서 이동
      - `)`: 다음 문장으로 커서 이동
      - `}`: 다음 문단의 처음으로 커서 이동
      - `(`: 현재 문장의 맨 뒤로 커서 이동
      - `{`: 현재 문단의 맨 뒤로 커서 이동
      - `%`: 매칭되는 괄호로 커서 이동(?)
      - `Control-d`: 스크린 반 아래로 스크롤 (down)
      - `Control-u`: 스크린 반 위로 스크롤 (up)
      - `Control-f`: 스크린 전체 앞으로 스크롤 (full)
      - `Control-b`: 스크린 전체 뒤로 스크롤 (back)

    - Entering text

      - input 모드로 바꿔야 텍스트를 쓸수 있다.
      - input 모드로 바꾸려면

        - `a`: 현재 문자의 뒤에서 시작 (append)
        - `i`: 현재 문자의 앞에서 시작 (insert)
        - `I`: 현재 라인의 맨 앞에서 시작
        - `o`: 현재 라인의 뒤를 한칸 띄우고 시작
        - `O`: 현재 라인의 이전을 한칸 띄우고 시작
        - `R`: overwrite 모드

      - 텍스트 지우기

        - `x`: 현재 문자 삭제
        - `d`: 조합해서 사용가능

          - `dw`: 커서부터 띄워쓰기 전까지 삭제
          - `dd`: 해당 라인 삭제
          - `d0`: 커서에서 맨 앞까지 삭제

    - Structure of vi command

      - `n<command key(s)` : 예를들어 `5dd` 는 5라인을 삭제

    - Undo and repeat command

      - `u`: undo
      - `.`: 마지막 명령을 반복수행

    - Copy, cut and paste in vi

      - `yy`: 현재 라인을 버퍼에 복사 (yank)
      - `nyy`: n 개 라인을 복사
      - `p`: 아래에 라인을 붙여넣기
      - `P`: 위에 라인을 붙여넣기

    - Searching for a String

      - `/pattern`: pattern 에 해당하는 문자열 찾기(forwards)
      - `?pattern`: pattern 에 해당하는 문자열 찾기(backwards)
      - `(찾은 후)n`: 찾은 다음 문자
      - `%s/old/new/g`: 파일의 모든 old 문자열을 new 로 변경

    - vi Tricks

      - `4>>`: 4번 스페이스
      - ...

    - Short cuts ![4](/img/opensource-final-term/4.png)

- Utility

  - `man`: 커멘드의 설명서 출력 (`man ls`)
  - `date`: 시스템 시간 출력
  - `wc`: 파일의 newline, word, byte count 출력
  - `more`: 파일의 전체 컨텐츠를 한페이지로 출력
  - `less`: 출력된것에서 왓다리 갓다리 가능, 이외 more 와 같다.
  - `head`: 파일의 처음 10개 줄만 출력
  - `tail`: 파일의 마지막 10개 줄만 출력
  - `find`: 파일을 찾는다.

    - `find ./ -name "*.txt"`

  - `grep`: 파일에서 정규식과 일치하는 컨텐츠를 찾는다.

    - `grep "ligyu" file1.txt`

  - `sort`: 텍스트 파일의 라인을 소팅해서 출력한다.

  - `wget`: 네트워크 다운로더

    - `wget www.google.com -O google.html`

  - Pipe

    - \|
    - 출력을 다른 커멘드의 입력으로 넘길 수 있음
    - `ls -l | more`

  - Input and Output Redirection

    - 파일로부터 입력을 읽어오기

      - command < filename

    - 출력을 파일로 넘기기

      - command > filename : 출력파일 덮어쓰기
      - command >> filename : 출력파일에 붙이기
      - `wc < examples.desktop > output.txt`

  - Compressing / Decompressing files

    - tar, gzip

  - `last`: 마지막으로 로그인한 유저의 리스트를 출력

## 10장. Linux Administration

- 리눅스 부팅 프로세스

  - 유저가 컴퓨터를 켯을 때 OS 를 시작하는 프로세스 ![6](/img/opensource-final-term/6.png)
  - 부팅 순서

    1. Turn On
    2. CPU 가 BIOS 의 포인터로 점프 (0xFFFF0)
    3. BIOS 가 POST 를 실행 (Power-On Self Test)
    4. bootale device 를 검색
    5. MBR 로부터 boot sector 를 로드하고 실행
    6. OS 로드

  - BIOS

    - 칩에 임베디드 된 프로그램
    - 처음 Power-On 되면 컴퓨터에 의해 실행된다.
    - BIOS 의 기본기능

      - 컴퓨터를 구성하는 다양한 장치들을 인식하고 제어한다.

  - MBR (Master Boot Record)

    - 디스크의 첫 섹터에 위치함 (512byte)
    - OS 는 MBR 에 기본 부트로더가 들어있는 하드디스크로부터 부팅된다.
    - MBR 이 RAM 에 로드된 후, BIOS 는 MBR 를 제어한다. ![7](/img/opensource-final-term/7.png)

      - 첫 446 bytes

        - 기본 부트로더
        - 실행가능한 코드와 에러메세지 텍스트를 포함

      - 다음 64 bytes

        - 파티션 테이블
        - 네 파티션 각각의 레코드를 포함

      - 마지막 2 bytes - magic number (0xAA55)

        - MBR의 유효성 검사

  - Bootloader

    - Kernel loader 라고 불린다. - 여기서의 작업은 Linux Kernel 을 로드한다.
    - GRUB, LILO (가장 대중적인 리눅스 부트로더)
      - GRUB

        - OS 독립적 부트로더
        - GNU의 멀티 부팅 소프트웨어 패킷
        - 파일시스템 접근 / 여러 실행가능한 포맷 지원 / diskless system 지원 / OS 를 네트워크로부터 다운..

  - Kernel Image
    - Kernel
      - 컴퓨터가 꺼지기 전까지 항상 메모리에 있다.
    - Kernel Image
      - 실행가능한 커널이 아닌 커널 이미지의 압축
    - zImage
      - 512KB 이하 사이즈
    - bzImage
      - 512KB 이상
    - 커널 압축 해제 시점 : 커널을 시작하기 전

  - Init Process
    - 커널이 시작되면 init program 을 실행
    - Init : 리눅스의 모든 프로세스의 부모 / `/etc/rc.d/rc.sysinit`을 실행시킴
    - 적절한 실행 수준을 기반으로 스크립트가 실행되어 시스템을 실행하고 작동하도록 다양한 프로세스를 시작
    - The Linux Init Process
      - init process PID : 1
      - `/etc/inittab` 파일에 정의된대로 시스템 프로세스를 시작
      - shutdown 시, init 은 sequence 와 process 를 컨트롤

  - Run-level
    - 선택된 프로세스 그룹만 존재하도록 허용하는 시스템의 소프트웨어 설정
    - 각 Run-Level에 대해 init에 의해 생성 된 프로세스는 /etc/init 디렉토리에 정의된 구성 파일
    - 0~6 runlevel (안외워도..)

  - init.d
	- admin 이 각각의 daemon 을 시작/실행 할수 있는 디렉토리
	- example
	  - `cd /etc/init.d/`
	  - `httpd stop`

- User Management
  - Superuser
    - 모든 권한을 가지고 있는 유저
    - AKA root
    - Group number 0
    - root user 의 수를 제한해야한다.
      - 숙달되지 않은 유저는 심각한 문제 야기 가능성 / 보안

  - Creating a new user account
    - Manual
      - `/etc/passwd/`와 `/etc/shadow` 파일에 엔트리 추가
      - 다음 uid 와 적절한 gid 사용
    - Command
      - `useradd`나 `adduser` 커맨드 사용
      - `useradd -g <group> -d <home directory> -c <comment> -s <shell>`login-name
      - 새 그룹을 만들기 위해 `groupadd`사용
    - `/etc/passwd` 파일
      - 시스템에 의해 인식되는 유저의 리스트
      - 확장되거나 대체될 수 있는 파일
      - login 시 사용됨
        - 시스템이 `/etc/passwd`파일을 찾는다.
        - 유저의 UID 와 홈 디렉토리를 결정한다.
        - 파일의 각 행은 한 명의 사용자를 나타내며 콜론으로 구분 된 7 개의 필드를 포함
        - uid, gid, user에 대한 설명, home directory, shell 등 유저 정보를 포함
        - 암호화된 패스워드는 `/etc/shadow` 에

  - su
    - switch user
    - `su [options] [username]`
    - 해당 유저의 권한으로 새로운 shell 오픈
    - exit 으로 나갈 수 있다.

  - sudo
    - 다른 유저로 커맨드를 실행시킬 수 있다.
    - `sudo [options] [-u user] command`
    - `-u` 옵션이 없으면, default 는 root
    - 이 명령을 실행시킬 수 있게 하려면 해당 유저에게 권한을 부여해야함

  - useradd / adduser : `useradd -g <group> -s <shell> -c <comment> -d <home dirctory> <username>`
  - userdel / deluser : `userdel <username>`
  - `who`: 로그인된 유저를 보여줌
  - `whoami`: 현재 유저 출력

- Filesystem Management
  - `df`: 하나 이상의 파일시스템의 디스크 여유 공간을 출력
  - `du`: 디렉토리안에 모든 파일이 차지하는 공간을 출력
  - Mounting file system
    - 일반적인 파일시스템 마운트
      1. 디스크 드라이브 포맷
      2. 디스크 드라이브 파티션
      3. 파티션 mkfs
      4. 파일 시스템에 마운트포인트 만들기
      5. 파일시스템 마운트
    - `fdisk -l`: 디스크 리스트 출력
    - `fdisk /dev/sdb`: 파티션 만들기
    - `mkfs -t ext4 /dev/sdb1`
    - 마운트 포인트 만들기 (`mkdir`)
    - `mount -t ext4 /dev/sdb1`: 마운트
    - `umount newdisk`: 언마운트

- Filesystem Check
  - `fsck`: 파일시스템 체크 (마운트된 파일시스템에서 실행X)

- Software Package
  - Package file : 모든 실행가능한 파일과 데이터 파일을 하나의 파일로 묶음
  - RPM (RedHat 계열) / DEB (Debian 계열)
  - APT : advanced packaging tool
    - `sudo apt-get install <package list>`: 패키지 인스톨
    - `sudo apt-get remove <package list>`: 언인스톨
    - `sudo apt-get update`: 패키지 업데이트 (최신 패키지가 있는지 확인만)
    - `sudo apat-get upgrade`: 패키지 업그레이드 (실제로 최신으로 업그레이드)

- SSH
  - secure shell
  - (secure) 리모트 로그인, 리모트 커맨드 실행, 파일 전송 지원
  - client - server 아키텍쳐 (ssh server program - client program)
  - 특징
    - Privacy : 강력한 암호화
    - Integrity
    - Authentication : 서버는 호스트 키를 통해, 클라이언트는 패스워드와 public 키를 통해
    - Authorization
    - Forwarding : SSH 세션 내 Telnet 과 같은 다른 TCP 기반 서비스 캡슐화


> 만점받읍시다@
