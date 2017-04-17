---
title: 17-1 학기 데이터베이스 중간고사 정리
description: '17-1 학기 데이터베이스 중간고사 나올것만 정리하기'
header: 17-1 학기 데이터베이스 중간고사 정리
---

> 시험에 나올것만 정리 / 안나와도 책임은 안집니당...

### 1장 - 데이터베이스 시스템
- 데이터 베이스 사용자
	- ![database-mid-term](/img/database-mid-term/5E7E6106-DD19-479F-99CC-23D7648AD337.png)

- ANSI/SPARC 아키텍쳐와 데이터 독립성
	- ANSI/SPARC 아키텍쳐
		- ![database-mid-term](/img/database-mid-term/5F0EA880-25D4-439F-8FD6-647F458764E9.png)
		- 각 단계별 설명
			- 외부 단계
				- 데이터 베이스의 각 사용자의 뷰
				- 같은 단계지만 다수의 서로 다른 뷰가 제공
				- 최종 사용자와 응용 프로그래머는 데이터베이스의 일부분에만 관심을 가지므로 동일한 데이터에 대해 서로 다른 표현들을 제공할 수 있음
				- 전체 지하철 노선도에 대하여 출근길에 해당하는 지하철 선로에만 관심을 가진다.
			- 개념 단계
				- 조직체 정보의 모델
				- 어떠 데이터가 저장되어 있는지, 어떤 관계가 존재하고, 어떤 무결성 제약 조건들이 명시되어 있는지 기술
				- 전체 데이터베이스의 논리적인 구조를 기술함
				- 데이터베이스에 대한 사용자 공동체의 뷰를 나타냄
				- 데이터베이스마다 한개의 개념 스키마가 존재
				- 저장 구조와 독립적
			- 내부 단계
				- 실제 물리적 데이터 구조에 관한 스키마
				- 데이터 베이스에 어떤 데이터가 어떻게 저장되어있는지를 기술
				- 인덱스, 해싱 등과 같은 접근 경로, 데이터 압축 등을 기술
				- 개념 스키마에는 영향을 미치지 않으면서 성능을 향상시키기 위해 내부 스키마를 변경하는 것이 바람직
				- 물리적인 저장장치를 직접 다루지는 않음 ( 내부 단계 아래는 물리적 단계 )
				- 물리적 단계는 DBMS 의 지시에 따라 운영체제가 관리함
	- 데이터의 독립성
		- 상위 단계의 스키마 정의에 영향을 주지 않으면서 다른 단계의 스키마 정의를 변경할 수 있음을 의미
			- 논리적인 데이터 독립성
				- 내부 스키마와 개념 스키마 사이
				- 개념 스키마의 변화로부터 외부 스키마가 영향을 받지 않음
				- 기존 외부 스키마에 영향을 미치지 않고, 응용 프로그램을 다시 작성할 필요 없이 개념 스키마에 대한 변화가 가능해야 함
			- 물리적인 데이터 독립성
				- 개념 스키마와 내부 스키마 사이
				- 내부 스키마의 변화가 개념적 스키마에 영향을 미치지 않으며, 따라서 외부 스키마 (또는 응용 프로그램) 에도 영향을 미치지 않음을 의미
	- 데이터 베이스 시스템 아키텍쳐
		- ![database-mid-term](/img/database-mid-term/8E493047-C964-448D-A63B-FB113E884366.png)
				- 데이터 정의어 컴파일러 (DDL Compilier) 모듈
					- 데이터 정의어에 따라 데이터베이스를 정의하고, 해당 명세를 시스템 카탈로그에 저장한다.
				- 질의 처리기
					- 데이터 조작어를 수행하는 최적의 방법을 찾음
					- 질의를 기계어로 번역
				- 런타임 데이터베이스 관리기 모듈
					- 디스크에 저장된 데이터베이스에 접근
				- 트랜젝션 관리
					- 동시성 제어 모듈
					- 회복 모듈
			- 클라이언트 - 서버 데이터베이스 시스템
				- 데이터베이스가 하나의 데이터베이스 서버에 저장
				- 데이터베이스의 기능이 서버와 클라이언트에 분산됨
				- 서버는 데이터베이스를 저장하고 DBMS 를 운영하면서 여러 클라이언트에서 온 질의를 최적화, 권한검사, 동시성제어, 회복 기능을 수행하고, 데이터베이스의 무결성을 유지하며 데이터베이스 접근을 관리
				- 클라이언트는 사용자 인터페이스를 관리하고 응용들을 수행
				- ![database-mid-term](/img/database-mid-term/63FDC1EA-E277-4B2D-A0E5-A210F564AE1A.png)
				- 2층 모델 : 클라이언트와 데이터베이스 서버가 직접 연결
				- 3층 모델 : 클라이언트와 데이터베이스 서버 사이에 응용 서버 (API 서버) 가 추가됨
				- 장점
					- 데이터베이스를 보다 넓은 지역에서 접근 가능
					- 하드웨어 비용 절감
					- 다양한 컴퓨터 시스템을 사용가능
				- 단점
					- 보안 취약 가능성

### 2장 - 관계 데이터 모델과 제약조건
- 기본적인 용어
	- 릴레이션 : 테이블
	- 레코드 : 릴레이션의 각 행
		- 튜플 : 레코드 ( 릴레이션의 각 **행**)
	- 애트리뷰트 : 릴레이션에서 이름을 가진 하나의 **열**
	- 관계 데이터 모델에서의 카디날리티 : 행(튜플) 의 수 - 계속 변함
	- 관계 데이터 모델에서의 차수 : 열(애트리뷰트) 의 수 - 잘 안변함
- 차수(degree)와 카디날리티(cardinality)
	- 차수 : 한 릴레이션에 들어있는 애트리뷰트들의 수
		- 최소 1개
	- 카디날리티 : 릴레이션의 튜플 수
		- 유효한 릴레이션은 카디날리티 0을 가질 수 있다.
	- 차수는 자주 바뀌지 않지만, 카디날리티는 시간이 지남에 따라 계속 변한다.
- 관계 데이터 모델에서의 내포와 외포
	- 내포 : 릴레이션 스키마 (relation schema)
		- 릴레이션의 이름과 릴레이션의 애트리뷰트들의 집합
		- 표기법 : 릴레이션이름(<U>애트리뷰트1</U> , 애트리뷰트2, …애트리뷰트N)
		- 기본 키 애트리뷰트에는 밑줄 표시
	- 외연 : 릴레이션 인스턴스 (relation instance)
		- 릴레이션에 어느 시점에 들어있는 튜플의 집합
		- 시간의 흐름에 따라 계속 변함
		- 일반적으로 릴레이션에는 현재의 인스턴스만 저장됨
- 릴레이션의 키 
	- 종류 - 수퍼 키(superkey), 후보 키(candidate key), 기본 키(primary key), 대체 키(alternate key), 외래 키(foreign key)
	- 수퍼 키 
		- 튜플을 고유하게 식별하는데 꼭 필요하지만은 않은 애트리뷰트 
	- 후보 키
		- 각 튜플을 고유하게 식별하는 최소한의 애트리뷰트들의 모임
	- **기본 키**
		- 한 릴레이션 후보 키가 두개 이상 있으면 설계자 또는 데이터베이스 관리자가 이들 중 하나를 기본 키로 선정
		- 자연스러운 기본 키를 찾을 수 없는 경우에는 레코드 번호와 같이 인위적인 키 애트리뷰트를 추가할 수 있다. (Id)
	- 대체 키
		- 기본 키가 아닌 후보 키
	- 외래 키
		- 어떤 릴레이션의 기본 키를 참조하는 애트리뷰트
	- 수퍼 키 > 대체 키 > 후보 키 > 기본 키

- 무결성 제약조건
	- 도메인 제약조건
		- 각 애트리뷰트 값이 반드시 원자값, 애트리뷰트 값의 디폹트 값, 범위 등을 지정가능
	- 키 제약조건
		- 키 애트리뷰트에 중복된 값이 존재해서는 안됨
	- 기본 키와 **엔티티 무결성 제약조건**
		- 릴레이션의 기본 키를 구성하는 어떤 애트리뷰트도 NULL 값을 가질 수 없음을 의미
		- 대체 키에는 적용되지 않음
		- 사용자는 릴레이션을 사용하는 데이터 정의문에서 어떤 애트리뷰트가 릴레이션의 기본 키의 구성요소인지 DBMS 에게 알려주고, DBMS 가 엔티티 무결성 제약조건을 감독한다.
	- 외래 키와 **참조 무결성 제약조건**
		- 두 릴레이션 간 연관된 튜플 사이의 일관성을 유지하는데 사용되는 제약조건
		- 릴레이션 R2의 외래 키가 릴레이션 R1의 기본 키를 참조할때, 참조 무결성 제약조건은 다음 중 하나가 성립하면 만족
			- R2의 외래 키의 값은 R1의 어떤 튜플의 기본 키값과 같다.
			- R2의 외래 키가 자신을 포함하고 있는 릴레이션의 기본 키를 구성하고 있지 않으면, NULL 값을 가진다.

### 5장 - 데이터베이스 설계와 ER 모델

- 데이터베이스 설계의 주요 단계
    - ![database-mid-term](/img/database-mid-term/254F39CB-94EF-4575-85DF-F05E66044B81.png)
    - 개념적 설계
        - 모든 물리적인 사항과 독립적으로, 조직체의 정보의 모델의 구축
        - 대표적인 데이터 모델 : ER 모델
        - 엔티티 타입, 관계 타입, 애트리뷰트를 식별하고, 애트리뷰트들의 도메인을 결정하고, 후보 키와 기본키 애트리뷰트를 결정함
        - 완성된 개념적 스키마 (ER 스키마) 는 ER 다이어그램으로 표현됨
    - 논리적 설계
        - 데이터 모델 ( 개념적 스키마 ) 에 알고리즘을 적용하여 논리적 스키마를 생성함
        - 관계 데이터베이스 스키마를 더 좋은 관계 데이터베이스 스키마로 변환하기 위해 **정규화** 과정을 적용함
    - 물리적 설계
        - 처리 요구사항을 만족시키기 위해 저장 구조와 접근 경로 등을 결정하고, 응답시간, 트랜젝션 처리율 등 성능 향상을 위한 설계
- **ER 모델**
    - ER 모델에서의 차수
        - 관계로 연결된 엔티티 타입들의 개수를 의미
        - ![database-mid-term](/img/database-mid-term/A7F76782-3ABD-4887-830A-2E9607294935.png)
    - 카디날리티
        - 한 엔티티가 참여할 수 있는 관계의 수
        - 관계 타입에 참여하는 엔티티들의 가능한 조합을 제한
        - 1:1, 1:N, M:N 등
        - 카디날리티에 관한 정보는 간선 위에 나타냄
    - 전체 참여와 부분 참여
        - 전체 참여 : 어떤 관계에 있어 타입 E1이 모든 엔티티들이 관계 타입 R에 의해서 E2 와 연관된다는 것을 의미
        - 부분참여  : 어떤 관계에 엔티티 타입 E1의 일부 엔티티만 참여하는 것을 의미
        - 약한 엔티티 타입은 항상 관계에 전체 참여
        - ![database-mid-term](/img/database-mid-term/C3A152D9-0B9F-43D9-B580-BE966539E7AE.png)
            - 한명의 사원은 1개의 부서를 갖는다.
            - 하나의 부서는 한명 이상의 사원을 갖는다.
        - ![database-mid-term](/img/database-mid-term/D652C9BB-7A08-4A4A-9B75-DC096ED7CF31.png)
            - 한명의 사원은 부양가족을 0 명 이상의 부양가족을 갖는다.
            - 부양가족은 1명의 사원을 갖는다.
        - 설명을 보고 ER 스키마 다이어그램을 그릴 수 있어야 함 / ER 스키마 다이어그램을 보고 해석할 수 있어야 함
            - ![database-mid-term](/img/database-mid-term/F7D941AE-A754-4BC9-856E-9FC47D3EB6BC.png)

### SQL 함수정리
-  문자열 함수
	- LOWER(string) : 소문자로
	- UPPER(string) : 대문자로
	- INITCAP(string)  : 맨앞만 대문자로, 나머지는 소문자로
	- CONCAT(string, string) : 첫번째 두번째 합치기
	- SUBSTR(string, int, int) : 1, 2 사이에 있는 문자열 반환,  1이 음수이면 문자열 끝에서 시작, 2를 생략하면 문자열 끝까지 반환
	- LENGTH(string) : 문자열 길이 반환
	- INSTR(string, string) : 0 에 대해 1의 위치 반환
	- L/R PAD(string, int, string) : 1 만큼 문자열 길이 늘리고 2로 빈공간 채워서 반환, 좌우정렬
	- TRIM(string from string) : 1의 앞뒤에서 0을 제외하고 반환
	- REPLACE(string, string, string) : 0에서 1을 찾고 있으면 2로 바꿔서 반환

- 숫자 함수
	- ROUND(int, int) : 소숫점 1번째 자리에서 반올림한다. 1이 생략되면, 소숫점은 없음
	- TRUNC(int, int) : 1번째 자리의 나머지는 버린다. 1이 생략되면 default 0
	- MOD(int, int) : 0을 1로 나눈 나머지를 반환한다.
> DUAL 은 함수 및 계산결과를 보는데 사용하는 더미 테이블을 생성한다.

-  날짜 함수
	- MONTHS_BETWEEN : 두 날짜 사이의 달수
	- ADD_MONTHS : 날짜에 달 수를 더한다.
	- NEXT_DAY : 명시한 날짜 이후 첫번째 해당 요일 일자
	- LAST_DAY : 달의 마지막날
	- ROUND : 정오를 기준으로 날짜 반올림
	- TRUNC : 날짜에서 시간 부분 버림

- 일반 함수
	- NVL(expression1, expression2) : ex1 값이 NULL 인 경우 ex2 값 반환하며 그렇지 않으면 ex1 값을 반환
	- NVL2(expression1, expression2, expression3)  : ex1 이 NULL 인 경우 ex3 반환, 아닌경우 ex2 반환


### 실습 SQL 문들 

1. DEPARTMENTS 테이블에서 전체를 본다.
    ```sql
    SELECT * FROM DEPARTMENTS 
    ```
2. Employees 테이블에서 EMPLOYEE_ID 와 성과 이름을 합친것, JOB_ID 와 HIRE_DATE 에 “STARTDATE” 라는 레이블을 붙여서 본다.
    ```sql
    SELECT EMPLOYEE_ID, FIRST_NAME || ' ' || LAST_NAME, JOB_ID, HIRE_DATE AS "STARTDATE" FROM employees;
    ```
4. 추가예정
    ```sql
    SELECT FIRST_NAME || ' ' || LAST_NAME || ', ' || JOB_ID AS "Employee and Title" FROM employees;
    ```
5. 추가예정
    ```sql
    SELECT FIRST_NAME || ' ' || LAST_NAME AS NAME, SALARY FROM employees WHERE SALARY > 12000;
    ```
6. 추가예정
    ```sql
    SELECT FIRST_NAME || ' ' || LAST_NAME AS NAME, DEPARTMENT_ID FROM employees WHERE EMPLOYEE_ID = 176;
    ```
7. 추가예정
    ```sql
    SELECT FIRST_NAME || ' ' || LAST_NAME AS NAME, SALARY FROM employees WHERE SALARY < 5000 OR SALARY > 12000;
    ```
8. 추가예정
    ```sql
    SELECT FIRST_NAME || ' ' || LAST_NAME AS NAME, DEPARTMENT_ID FROM employees WHERE DEPARTMENT_ID = 20 OR DEPARTMENT_ID = 50 ORDER BY FIRST_NAME;
    ```
9. 추가예정
    ```sql
    SELECT FIRST_NAME || ' ' || LAST_NAME AS NAME, DEPARTMENT_ID FROM employees WHERE MANAGER_ID IS NULL
    ```
10. 추가예정
    ```sql
    SELECT FIRST_NAME || ' ' || LAST_NAME AS NAME, SALARY, COMMISSION_PCT FROM employees WHERE COMMISSION_PCT IS NOT NULL ORDER BY SALARY DESC, COMMISSION_PCT DESC;
    ```
11. 추가예정
    ```sql
    SELECT sysdate FROM DUAL
    ```
12. 추가예정
    ```sql
    SELECT INITCAP(last_name) last_name, LENGTH(last_name) length_of_last_name FROM employees WHERE SUBSTR(last_name, 0,1) IN ('J','A','M')
    ```
13. 추가예정
    ```sql
    SELECT employee_id, first_name, job_id, DECODE(job_id, 'AD_PRES', 'A', 'ST_MAN', 'B', 'IT_PROG', 'C', 'SA_REP', 'D', 'ST_CLERK','E','O') job_grade FROM employees
    ```
14. 추가예정
    ```sql
    SELECT employee_id, first_name, job_id, CASE job_id WHEN 'AD_PRES' THEN 'A' WHEN 'ST_MAN' THEN 'B' WHEN 'IT_PROG' THEN 'C' WHEN 'SA_REP' THEN 'D' WHEN 'ST_CLERK' THEN 'E' ELSE 'O' END AS job_grade FROM employees
    ```
15. 추가예정
    ```sql
    select e.last_name,e.department_id , d.department_name from employees e left outer join departments d on (e.department_id = d.department_id)
    ```
16. 추가예정
    ```sql
    select e.last_name, d.department_name, l.location_id, l.city from employees e
    join departments d on (e.department_id = d.department_id)
    join locations l on (d.location_id = l.location_id)
    where e.commission_pct is not null
    ```
16. 추가예정
    ```sql
    select e.last_name, d.department_name from employees e
    join departments d on (e.department_id = d.department_id and e.last_name like '%a%')
    ```
17. 추가예정
    ```sql
    select e.last_name, e.job_id, d.department_id, d.department_name from employees e
    join departments d on (e.department_id = d.department_id)
    join locations l on (d.location_id = l.location_id and l.city = 'Toronto')
    ```
18. 추가예정
    ```sql
    select e.first_name, d.department_name, l.location_id, l.city  from employees e
    join departments d on (e.department_id = d.department_id)
    join locations l on (l.location_id = d.location_id)
    where l.city = 'Oxford' and e.commission_pct is not null
    ```
19. 추가예정
    ```sql
    select employee_id, first_name, salary, salary * 1.15 as New_Salary from employees
    ```
20. 추가예정
    ```sql
    select last_name, NVL(TO_CHAR(commission_pct),'No Commission') COMM from employees
    ```
21. 추가예정
    ```sql
    select first_name, job_id, salary from employees where job_id in ('SA_REP','ST_CLERK') and salary not in (2500, 3500, 7000)
    ```
22. 추가예정
    ```sql
    select first_name Employee, salary Monthly_Salary from employees where salary >= 5000 and salary <= 12000 and department_id in (20, 50)
    ```
23. 추가예정
    ```sql
    select first_name from employees where substr(first_name,0, 3) like '%a'
    ```