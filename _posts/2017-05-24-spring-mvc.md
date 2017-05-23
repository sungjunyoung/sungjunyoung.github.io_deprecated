---
title: Spring MVC 정리
description: 'Spring MVC 정리'
header: Spring MVC 정리
---

![spring-img](img/spring-mvc/spring-img.jpg)

> 해커톤에서 Spring MVC 를 사용하게 될 것 같아 부랴부랴 공부해서 정리했습니다 :O

### Spring MVC

스프링이 제공하는 웹 프레임워크로, 모델-뷰-컨트롤러 디자인패턴을 적용해
 웹 어플리케이션에서 모덴과 뷰, 컨트롤러 사이에 있는 의존 관계를 의존 관계 주입 컨테이너인
 스프링에서 관리하게 됩니다. 따라서 유연한 웹 어플리케이션 구축이 가능합니다.

 org.springframework.web 패키지와 org.springframework.web.servlet 패키지에 포함된 클래스를
 사용합니다.

 ![spring-mvc](img/spring-mvc/mvc.jpg)

그림과 같이 브라우저로부터 받은 요청은 spring mvc 가 제공하는 DispatcherServlet 클래스가 모두 관리합니다.

1. 웹 브라우저에서 보낸 요청은 어플리케이션에 대해 하나만 생성된 DispatcherServlet 인스턴스가 받고,
어플리케이션 전체의 공통 처리를 실행하고, 웹 요청 URL 에 대응하는 고유 처리를 실행하는 컨트롤러를 호출합니다.
2. DispatcherServlet클래스는 웹요청 URL과 컨트롤러를 맵핑한 정보를 관리하는 기능이 없습니다. 웹 요청 URL과 컨트롤러 맵핑을 관리하는 클래스는 HandlerMapping 클래스입니다. DispatcherServlet 인스턴스는 HandlerMapping 인스턴스를 참조하고, HandlerMapping 인스턴스에서 반환된 컨트롤러에 처리를 캍깁니다.
3. 컨트롤러는 필요한 로직을 호출하고, 처리 결과인 모델과 이동할 뷰를 DispatcherServlet 인스턴스에 반환합니다. 모델과 뷰는 ModelAndView 인스턴스로 다뤄지지만, 컨트롤러가 반환하는 뷰는 뷰의 물리적 위치가 아닌 논리적 위치정보이기 때문에, DispatcherServlet 인스턴스는 그 뷰의 실체를 ViewResolver 인스턴스에 요청합니다. 그에 반환된 View 인스턴스 모델이 가진 정보를 렌더링 시킵니다.(브라우저에 출력)

Controller 구현을 제외한 HandlerMapping, ViewResolver, View 인터페이스를 구현하는 클래스는 스프링 MVC 가 제공하는 정의된 구현 클래스를 활용합니다.

스프링 MVC 는 어플리케이션이 구축하는 구성 정보를 의존관계주입 컨테이너에서 관리합니다. 즉, 스프링 설정 파일로 HandlerMapping 인터페이스를 구현하는 어떤 클래스를 사용하는지 정의하거나, 컨트롤러에서 호출하는 로직을 의존 관계로 주입해 어플리케이션의 구성을 관리합니다.

#### web.xml
java EE 웹 어플리케이션 기반이 되는 설정 파일입니다. spring mvc의 DispatcherServlet 클래스를 servlet 으로 정의하고, 확장자 .html 에 대한 요청을 모두 DispatcherServlet 클래스에 매핑합니다. 이에 의해 .html 확장자가 붙은 요청은 모두 DispatcherServlet 이 받습니다.
