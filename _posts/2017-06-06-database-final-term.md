---
title: 17-1 학기 데이터베이스 기말고사 정리
descriptiON: '17-1 학기 데이터베이스 기말고사 나올것만 정리하기'
header: 17-1 학기 데이터베이스 기말고사 정리
---

> 시험에 나올것만 정리 / 안나와도 책임은 안집니당...


### 5장 - ER 모델
#### ER 모델
- 엔티티 : 독립적으로 존재하면서 고유하게 식별 가능한 실세계의 객체
	- 엔티티 타입 : 동일한 애트리뷰트들을 가진 엔티티의 틀
	- 엔티티 집합 : 동일한 애트리뷰트들을 가진 엔티티들의 모임
	- ER 다이어그램에서 사각형으로 나타냄
	- 강한 엔티티 타입 : 독자적으로 존재하며 엔티티 타입 내에서 자신의 키 애트리뷰트로 고유하게 엔티티들을 식별할 수 있는 엔티티 타입
	- 약한 엔티티 타입 : 키를 형성하기에 충분한 애트리뷰트들을 갖지 못한 엔티티 타입
- 에트리뷰트
	- 하나의 엔티티를 형성하는 집합
		- 사원 엔티티는 사원번호, 이름 등의 에트리뷰트를 가짐
	- 에트리뷰트의 도메인은 그 에트리뷰트가 가질 수 있는 모든 가능한 값들의 집합
	- ER 다이어그램에서 타원형으로 나타냄, 실선으로 엔티티 타입과 연결
	- 종류
		- 단순 에트리뷰트 : 더이상 다른 에트리뷰트로 나눌 수 없는 에트리뷰트
		- 복합 에트리뷰트 : 두개 이상 에트리뷰트로 이루어진 에트리뷰트
		- 단일 값 에트리뷰트 : 각 엔티티마다 정확히 하나의 값을 갖는 에트리뷰트 (대부분 애트리뷰트는 단일 값 에트리뷰트)
		- 다치 에트리뷰트 : 각 엔티티마다 여러개의 값을 가질 수 있는 애트리뷰트, ER 다이어그램에서 이중선 타원으로 표현
		- 유도된 애트리뷰트 : 다른 에트리뷰트의 값으로부터 얻어진 에트리뷰트, ER 다이어그램에서 점선 타원으로 표현
		![6](/img/database-final-term/6.png)
- 약한 엔티티 타입
	- 키를 형성하기에 충분한 에트리뷰트를 갖지 못한 엔티티 타입
	- 약한 엔티티 타입에게 키 애트리뷰트를 제공하는 엔티티 타입을 `소유 엔티티 타입` 또는 `식별 엔티티 타입`
	- ER에서 이중선 직사각형으로 표시
	- 부분 키 : 부양가족의 이름처럼 한 사원에 속한 부양가족 내에서는 서로 다르지만 회사 전체 사원들의 부양가족들 전체에서는 같은 경우가 생길 수 있는 애트리뷰트
- 관계와 관계 타입
	- 관계 : 엔티티들 사이에 존재하는 연관이나 연결
	- ER 에서 다이아몬드로 표기
- 차수
	- 관계의 차수는 관게로 연결된 엔티티 타입들의 갯수
- 카디날리티
	- 카디날리티 비율은 한 엔티티가 참여할 수 있는 관계의 수 (1:N, 1:1)
- 전체 참여와 부분 참여
	- 전체 참여 : 어떤 관계에 있어 타입 E1이 모든 엔티티들이 관계 타입 R에 의해서 E2 와 연관된다는 것을 의미
	- 부분참여  : 어떤 관계에 엔티티 타입 E1의 일부 엔티티만 참여하는 것을 의미
	- 약한 엔티티 타입은 항상 관계에 전체 참여
	 ![7](/img/database-mid-term/C3A152D9-0B9F-43D9-B580-BE966539E7AE.png)
		- 한명의 사원은 1개의 부서를 갖는다.
		- 하나의 부서는 한명 이상의 사원을 갖는다.
	 ![8](/img/database-mid-term/5F0EA880-25D4-439F-8FD6-647F458764E9.png)
		- 한명의 사원은 부양가족을 0 명 이상의 부양가족을 갖는다.
		- 부양가족은 1명의 사원을 갖는다.
	- 설명을 보고 ER 스키마 다이어그램을 그릴 수 있어야 함 / ER 스키마 다이어그램을 보고 해석할 수 있어야 함
		 ![9](/img/database-mid-term/254F39CB-94EF-4575-85DF-F05E66044B81.png)
 - 세발 표기법
  ![10](/img/database-final-term/10.png)


### 2장 - 관계 데이터 모델과 제약조건
#### 관계 데이터 모델의 개념
- `기본적인 용어`
	- 릴레이션 : 테이블
	- 레코드 : 릴레이션의 각 행
		- 튜플 : 레코드 ( 릴레이션의 각 행)
	- 애트리뷰트 : 릴레이션에서 이름을 가진 하나의 열
	- 도메인 : 프로그래밍 언어의 데이터 타입과 유사, 한 애트리뷰트에 나타날 수 있는 값들의 집합
	- 널값 : 알려지지 않음, 적용할수 없음
	- 릴레이션 스키마 : 릴레이션의 이름과 릴레이션의 애트리뷰트들의 집합, 릴레이션을 위한 틀 / 기본 키 애트리뷰트에는 밑줄 표시 (`내포`)
	- 릴레이션 인스턴스 : 릴레이션에 어느 시점에 들어있는 튜플들의 집합, 시간의 흐름에 따라 계속 변함 (`외연`)
- `차수(degree)와 카디날리티(cardinality)`
	- 관계 데이터 모델에서의 카디날리티 : 행(튜플) 의 수 - 계속 변함
	- 관계 데이터 모델에서의 차수 : 열(애트리뷰트) 의 수 - 잘 안변함
	- 차수 : 한 릴레이션에 들어있는 애트리뷰트들의 수
		- 최소 1개
	- 카디날리티 : 릴레이션의 튜플 수
		- 유효한 릴레이션은 카디날리티 0을 가질 수 있다.
	- 차수는 자주 바뀌지 않지만, 카디날리티는 시간이 지남에 따라 계속 변한다.
- `관계 데이터 모델에서의 내포와 외포`
	- 내포 : 릴레이션 스키마 (relation schema)
		- 릴레이션의 이름과 릴레이션의 애트리뷰트들의 집합
		- 표기법 : 릴레이션이름(<U>애트리뷰트1</U> , 애트리뷰트2, …애트리뷰트N)
		- 기본 키 애트리뷰트에는 밑줄 표시
	- 외연 : 릴레이션 인스턴스 (relation instance)
		- 릴레이션에 어느 시점에 들어있는 튜플의 집합
		- 시간의 흐름에 따라 계속 변함
		- 일반적으로 릴레이션에는 현재의 인스턴스만 저장됨

#### 릴레이션의 특성
- 각 릴레이션은 오직 하나의 레코드 타입만 포함
- 한 애트리뷰트 내의 값들은 모두 같은 유형
- 애트리뷰트들의 순서는 중요하지 않음
- 동일한 튜플이 두개 이상 존재하지 않음 (키가 존재)
- 한 튜플의 각 애트리뷰트는 원자값을 가짐
- 애트리뷰트의 이름은 릴레이션 내에서만 고유
- 튜플의 순서는 중요하지 않음

#### 릴레이션의 키
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
![5](/img/database-final-term/5.png)

#### 무결성 제약조건
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


### 7장 - 릴레이션 정규화
#### 정규화 개요
- 정규화 : 주어진 릴레이션 스키마를 `함수적 종석성` 과 `기본 키` 를 기반으로 분석하여, 원래의 릴레이션을 분해함으로서 `중복`과 `세가지 갱신이상`을 최소화함
- `좋은 스키마를 설계하는 목적`
	- 정보의 중복과 갱신 이상이 생기지 않도록
	- 직관적인 이해, 미래의 성장에 대비
- `갱신 이상`
	- 수정 이상 : 반복 데이터 중 일부만 수정하면 데이터의 불일치 발생
	- 삽입 이상 : 불필요한 정보를 함께 저장하지 않고는 정보를 저장하는 것이 불가능
	- 삭제 이상 : 유용한 정보를 함께 삭제하지 않고는 어떤 정보를 삭제하는것이 불가능
- `정규화가 안되있으면`
	- 정보의 중복
	- 수정 이상
	- 삽입 이상
	- 삭제 이상
- `릴레이션 분해`
	- 하나의 릴레이션을 두개 이상의 릴레이션으로 나눔
- `데이터 베이스 설계의 비공식적 지침`
	- 이해하기 쉽고 명확한 스키마
	- NULL 값을 피함
	- 가짜 튜플이 생기지 않도록
	- 스키마를 정제

#### 함수적 종속성
- `함수적 종속성` : 정규화 이론의 핵심, 릴레이션의 애트리뷰트들의 의미로부터 결정되며, 릴레이션 스키마에 대한 주장, 릴레이션의 모든 인스턴스들이 만족해야함, 2정규형부터 BCNF 까지 적용
- `결정자` : 어떤 애트리뷰트의 값은 다른 애트리뷰트의 값을 고유하게 결정할 수 있음
![1](/img/database-final-term/1.png)
	- 애트리뷰트 A 가 애트리뷰트 B 의 결정자이면 B가 A에 함수적으로 종속한다고 말함
- `완전 함수적 종속성`
![2](/img/database-final-term/2.png)
- 이행적 함수적 종속성
	- 한 릴레이션의 애트리뷰트 A, B, C 가 주어졋을 때, 애트리뷰트 C가 이행적으로 A에 종속한다는 것은 A->B AND B->C 가 성립하는 것이다.

#### 릴레이션 분해
- `릴레이션 분해` : 릴레이션을 분해하면 중복이 감소하고, 갱신이상이 줄어들지만, 몇몇 잠재적인 문제를 야기할 수 도 있다.
	- 조인이 필요한 질의로 변경 가능성
	- 분해된 릴레이션들을 사용해 원래 릴레이션을 재구성하지 못할 수 있음
	- 어떤 종속성을 검사하기 위해서는 분해된 릴레이션들의 조인이 필요할 수 있음
- `무손실 분해` : 분해된 두 릴레이션을 조인하면 원래의 릴레이션에 들어있는 정보를 완전하게 얻을 수 있음 (정보의 손실이 없음)

#### 제1정규형, 제2정규형, 제3정규형, BCNF
- `제1정규형`
	- 릴레이션의 모든 애트리뷰트가 원자값만을 가지게 하는것
	- 반복 그룹이 나타나지 않게 함
	- 두 릴레이션으로 분해해서 제1정규형으로
- `제2정규형`
	- 릴레이션이 제1정규형을 만족하면서 어떤 후보 키에도 속하지 않는 모든 애트리뷰트들이 릴레이션의 기본 키에 완전하게 함수적으로 종속하는 것
- `제3정규형`
	- 릴레이션이 제2정규형을 만족하면서, 키가 아닌 모든 애트리뷰트가 릴레이션의 기본 키에 이행적으로 종속하지 않는 것
- `BCNF`
	- 릴레이션이 제3정규형을 만족하고, 모든 결정자가 후보 키
	- 하나의 후보키만을 가진 릴레이션이 제3정규형을 만족하면 동시에 BCNF 도 만족
![3](/img/database-final-term/3.png)
- `정리`
	![4](/img/database-final-term/4.png)

### 역정규화
- 데이터 중복 및 갱신 이상을 대가로 성능상의 요구를 만족시키기 위해 보다 낮은 정규형으로 되돌아가는 것