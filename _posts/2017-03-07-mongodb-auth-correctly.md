---
title: mongodb 올바르게 유저 생성하기
description: 'mongodb 올바르게 유저를 생성하여 외부에서 연결 시 Authentication Fail 해결하기'
header: mongodb 올바르게 유저 생성하기
---

mongodb 유저를 생성하기 위해서는 먼저, mongodb 의 root 계정을 만들어야 합니다.

```sh
> use admin
> db.createUser({user: "ROOT_ID", pwd: "ROOT_PASSWO", roles:["root"]})
```

mongodb 서버를 재시작 한 후, 외부에서 `--auth` 플래그를 주고 root 계정으로 로그인합니다.

```sh
sudo service mongod restart
mongo

> mongo <host:port> -u "ROOT_ID" -p "ROOT_PASSWO" --authenticationDatabase "admin"
```

root 계정으로 접속이 완료되면, 사용할 데이터베이스를 만든 뒤 해당 데이터베이스의 관리 계정을 생성합니다.

> mongodb 는 use <DATABASE> 로 데이터베이스가 생성되며, 데이터를 추가하면 데이터베이스가 유지됩니다.

```sh
> use DATABASE
> db.createUser({user: "DB_USER_ID", pwd: "DB_USER_PASSWORD", roles:["dbOwner"]})
```

성공 메시지가 나오면, 해당 유저로 데이터베이스에 접속합니다.

```sh
> mongo <host:port>/DATABASE -u "DB_USER_ID" -p "DB_USER_PASSWORD"
```
