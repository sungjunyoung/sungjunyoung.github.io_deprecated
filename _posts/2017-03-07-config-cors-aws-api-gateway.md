---
title: AWS API Gateway CORS 설정
description: 'API Gateway + Swagger 사용 시 CORS 문제 해결'
header: AWS API Gateway CORS 설정
---

![swagger_editor_cors_introduce](/img/swagger_editor_cors_introduce.png)



Swagger Editor 에서 Try this operation 을 클릭하면, 
이런 안내문구가 나옵니다. CORS 는 Cross-origin 
resource sharing 의 약자로, 다른 도메인의 서버에 URL 을
 호출할 경우 보안상의 문제가 발생하게 되는데, 이 접근을 허용할 수
  있게 해주는 메커니즘입니다.

> Learn more 를 클릭하면 해당 이슈에 대한 자세한 설명을 볼 수 있습니다.
> 
> 참고) [https://github.com/swagger-api/swagger-editor/blob/master/docs/cors.md](https://github.com/swagger-api/swagger-editor/blob/master/docs/cors.md)

![cors-menu-of-api-gateway](/img/cors-menu-of-api-gateway.png)

API-Gateway 에서 해당 버튼을 누르고,
‘Enable CORS and replace existing CORS headers’ 를 
하게 되면 모든 것이 해결 될 줄 알았으나.. 여전히 swagger ui 
에서 테스트를 시도하면 서버에서 응답이 없습니다.

요리 저리 검색한 결과,

![enable_cors_menu](/img/enable_cors_menu.png)

위의 화면에서 Access-Control-Allow-Headers 입력란의 default 
문자열 뒤에 X-Requested-With 를 추가해 주고,

```
'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token, X-Requested-With'
```

> X-Requested-With 는 해당 요청이 Ajax 라는 것을 의미하며,
 서버에서는 미리 준비를 하게 됩니다.
> 
> 참고) https://remysharp.com/2011/04/21/getting-cors-working

방금 CORS 를 허용한 리소스 내의 메서드를 클릭하여 Method Response 로 들어갑니다.

![method_response](/img/method_response.png)

그리고 Response Headers for ~ 에서 Access-Control-Allow-Headers 와 X-Requested-With 헤더를 추가해 줍니다.

![deploy_api](/img/deploy_api.png)

해당 API 를 Deploy 하여 스테이지로 올린 후, Swagger-ui 혹은 Swagger-editor 에서 테스트 해보면, 정상적으로 작동하는 것을 확인할 수 있습니다.

![normal_response_of_api](/img/normal_response_of_api.png)
