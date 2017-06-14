---
title: AWS Lambda Proxy Integration 활용
description: 'AWS Lambda function 에서 HTTP status code 와 헤더를 포함해 Response 하기'
header: AWS Lambda Proxy Integration 활용
---

지금까지 작성한 API 들은 성공이든 실패든 HTTP status 200 OK 를 던져주고 에러 코드나 메세지 등으로 구분하여 작성했습니다. 이번 서비스를 준비하면서 좀더 표준적인 API 설계를 해보고 싶어서 상태 코드로 에러를 분류하는 방법을 시도해 보았고, 고심 끝에 (…) 나온 방법들을 공유합니다.

API-Gateway 단의 Integration response 를 커스텀하는 방법과, Lambda Proxy Integration 을 사용하는 방법이 있는데,

> 참고) StackOverFlow : [Is there a way to change the http status codes returned by amazon api gateway?](http://stackoverflow.com/questions/31329495/is-there-a-way-to-change-the-http-status-codes-returned-by-amazon-api-gateway)

후자인 Lambda Proxy Integration 을 활용해 HTTP status code 를 넘겨주는 방법을 선택해 적용하였습니다. (쉬워서..)

API-Gateway 에서 메소드를 선택해 Integration Request 메뉴로 들어갑니다.

![integration_request_api_gateway](/img/more-usage-lambda-proxy-integration/integration_request_api_gateway.png)
> /users/{user_id}/email PUT : 해당 유저의 email 을 변경하는 API 입니다.

use Lambda Proxy integration 체크박스를 체크해줍니다. 이렇게 하게 되면, Lamba Function 에서 event Object 의 구조가 바뀌게 되는데, 예를들어 path 로 넘겨준 파라미터는,

```
event.pathParameters
```
에 들어가고, body로 넘겨준 파라미터들은

```
event.body
```

에 들어가게 됩니다.

이외에도,

```json
{
  "resource": "/users/{user_id}/email",
  "path": "/users/USER123123/email",
  "httpMethod": "PUT",
  "headers": null,
  "queryStringParameters": null,
  "pathParameters": {
    "user_id": "USER123123"
  },
  "stageVariables": null,
  "requestContext": {
    "accountId": "------------",
    "resourceId": "--------",
    "stage": "test-invoke-stage",
    "requestId": "test-invoke-request",
    "identity": {
      "cognitoIdentityPoolId": null,
      "accountId": "--------",
      "cognitoIdentityId": null,
      "caller": "140528894134",
      "apiKey": "test-invoke-api-key",
      "sourceIp": "test-invoke-source-ip",
      "accessKey": "---------------",
      "cognitoAuthenticationType": null,
      "cognitoAuthenticationProvider": null,
      "userArn": "--------",
      "userAgent": "Apache-HttpClient/4.5.x (Java/1.8.0_102)",
      "user": "--------"
    },
    "resourcePath": "/users/{user_id}/email",
    "httpMethod": "PUT",
    "apiId": "--------"
  },
  "body": null,
  "isBase64Encoded": false
}
```

와 같은 정보들이 event 로 넘어옵니다. 저는 이미 Lambda 함수를 작성한 상태였기 때문에, 함수의 가장 상단에

```js
var body = JSON.parse(event.body);
// event.new_email 을 body.new_email 로
```

과 같이 바꿔주는 형태로 Lambda 함수를 재작성 했습니다.
이제 본래의 목적이었던 HTTP status code 를 람다 함수 내에서 리턴할 수 있게 됩니다. callback 으로 다음과 같은 오브젝트를 리턴하면, HTTP status code, 헤더와 함께 에러 메시지 등을 body 에 실어 보낼 수 있습니다.

```js
returnObject = {
    statusCode: 400,
    body: JSON.stringify({ <OBJECT> }),
    headers: {'Content-Type': 'application/json'}
}
```

조금 응용하여, error 를 반환하는 함수를 작성해 보았습니다.

```js
var errorResponse = function (statusCode, errorCode, detailMessage) {
    var messageMap = {
        400: 'Bad Request',
        401: 'Unauthonized',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowd',
        406: 'Not Acceptable',
        409: 'Conflict',
        500: 'Internal Server Error'
    };

    return {
        statusCode: statusCode,
        body: JSON.stringify({
            code: errorCode,
            message: messageMap[statusCode],
            detail: detailMessage
        }),
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With' : 'XMLHttpRequest',
            'Access-Control-Allow-Origin' : '*'
        }
    }
};
```
에러 상황일 때, 다음과 같이 함수를 종료시키게 되면…

```js
callback(null, errorResponse(400, 'EC-01-05', 'new_email 이 비어있습니다.'));
context.fail(null);
return;
```

![api-gateway-headers](/img/more-usage-lambda-proxy-integration/api_gateway_headers.png)
> HTTP Status code / Response Body, Headers 가 넘어온 API-Gateway 테스트 화면

이렇게 400 Bad Request 와 함께 에러코드를 받아볼 수 있게됩니다.
