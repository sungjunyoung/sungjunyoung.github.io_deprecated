---
title: Git rebase, 제대로 알아보기
description: Git rebase, 제대로 알아보기
header: Git rebase, 제대로 알아보기
---

> git의 rebase 기능은  아무리 문서를 보고 써먹으려고 해봐도 이해가 잘 되지 않는 기능입니다. (저만 그럴수도…) 다음은 왜 rebase 를 써야하는지에 대해서 알아보고, 정리하고, 실습해본 포스트입니다.

## 개요

git [공식 문서](https://git-scm.com/book/ko/v1/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase%ED%95%98%EA%B8%B0)에서, rebase 는 merge 보다 깨끗한 히스토리를 만들며, merge 외에 브랜치를 합치는 또다른 방법 정도로 작성되어 있습니다. 제가 공식문서를 보면서 든 생각은, 굳이? 였습니다. 굳이 깨끗한 히스토리를 만들기위해서 무슨 동작을 하는지도 모르겠고 헷갈리는 rebase 를 쓰느니 차라리 merge commit 이 생기더라도 `git merge master` 로 한번에 합쳐버리는 merge 를 사용하는게 더 낫다고 생각되었습니다. 이후, git 에 대한 강연을 들을 몇몇 기회가 있었는데([송태웅 개발자님의 Git/Github 입문 튜토리얼 (오픈핵)](https://www.facebook.com/openhack.kr/videos/1618550701541361/)), 여기서 뒤통수를 한대 얻어맞은 듯한 깨달음을 얻고(?) 포스트를 작성하게 되었습니다. 

## Rebase ?

`git-rebase - Reapply commits on top of another base tip`  - git 공식 rebase 설명

공식 문서에서의 rebase 에 대한 한줄 설명은 바로 이렇습니다. 감이 오시나요? 말 그대로 re, base 입니다. "베이스를 재배치한다." 정도의 뜻이 되겠네요. 왜 이런 과정이 필요할까요? 간단하지만 간단하지 않은(?) 상황을 만들어 보고 rebase 의 존재 이유부터 알아보겠습니다.

## Rebase !

![1](/img/git-rebase/1.png)
> 커밋은 두개밖에 없지만, 과거 팀원들과 계속 진행중이던 프로젝트라고 가정하고 시작해 보겠습니다. 프로젝트는 [다음 저장소](https://github.com/sungjunyoung/blog_rebase)에서 보실 수 있습니다.

현재 프로젝트에는, README.md 파일과, feature1.txt (기능1) 파일이 존재합니다. 제 프로젝트가 아닌 `오픈소스` 혹은 `공동 작업중인 프로젝트`라고 또다른 가정을 하겠습니다. 또한 기존에 있던 기능 외에 새로운 기능을 구현하기 위해 `clone` 을 한 상태라고 생각해봅시다 :)

여러분의 팀은 새로운 기능 구현을 위해, `feature2` 라는 브랜치를 만들고, 이곳에서 작업을 시작합니다. feature2.txt 파일을 만들고, 이곳에서 "feature2 구현 중" 이라고 작성하고 커밋을 하겠습니다. 
![2](/img/git-rebase/2.png) 
master 브랜치에 아무 변경점이 없기 때문에, 그래프가 일자로 보여지지만, 실제로는 이런 형태가 되겠네요
![3](/img/git-rebase/3.png) 
계속 `feature2` 에 대한 구현을 진행해보겠습니다. 진행 중에, `master` 브랜치에서 `feature1` 에 대해 버그 이슈가 발견되어, 버그에 대해 수정된 커밋이 `merge` 되었다고 가정해 볼까요?
![4](/img/git-rebase/4.png) 

또한 조금 복잡하긴 하지만, `feature2` 구현 중에도 버그가 발견되어, `feature2` 에서 `feature2_bug1` 브랜치를 만들어서 수정을 하도록 합시다. 와중에 `feature2` 는 다른 팀원에 의해서 기능개발이 계속 진행되고 있구요. 
> 현실은 언제나 가정보다 복잡하니까요.. :)

이런 과정에 의해 만들어진 브랜치 그래프를 한번 보겠습니다.
![5](/img/git-rebase/5.png) 

문제는 이렇게 만들어놓은 브랜치들을 합치는 데에서 발생합니다. 이 브랜치들을 모두 `merge` 시킨다면 어떤 형태가 될까요? 
![6](/img/git-rebase/6.png) 

보기에는 깔끔하게 정돈된 브랜치 그래프 같은데.. 어떤 점이 문제가 될까요? 현재로서는 rebase 의 과정을 알아보기 위한 `toy project` 이지만, 프로젝트가 커지게 되고, 한 이슈에 대해 서브이슈가 생겨나고, 서브 이슈에 대한 버그가 생기게 되면, 방금과 같은 과정으로 브랜치를 모두 `merge`하는 것은 문제가 됩니다. `master` 브랜치 입장에서는 feature2 를 구현하는 과정 중에 있었던 서브이슈, 버그픽스 등 세부적인 사항들을 모두 알고 있기에는 `전체적인 과정`을 보는 데에 있어서 너무 과한 것이죠. 말로는 잘 이해가 안가지만, 이런 상황을 잘 드러내주는 프로젝트의 브랜치를 한번 보겠습니다.
![7](/img/git-rebase/7.png) 
> 방학 중에 제가 [알고리즘 스터디를 진행했던 프로젝트](https://github.com/sungjunyoung/algorithm-study)입니다... 

위 프로젝트를 시작할 때에는, 한 문제에 대한 브랜치를 한눈에 보고, 바로 찾아갈 수 있겠지! 하고 진행했었는데.. 스터디가 끝나고 나서 브랜치를 보니

다음과 같은 문제들이 있었습니다.
1. 프로젝트의 전체 진행 과정을 알아보는 것이 불가능하다.
2. `merge commit` 들로 인해 히스토리가 너저분하다.
3. 뭘한건지 모르겠다(...)

그럼 브랜치가 잘 정돈된 예도 한번 보겠습니다.
![8](/img/git-rebase/8.png) 
> 요즘 열심히 공부하고 있는 apache lucene-solr 프로젝트의 브랜치 히스토리입니다.

각 브랜치가 무엇을 했는지 명확히 알 수 있고, `master` 브랜치는 마치 한명이 작업한 것처럼 깔끔합니다. 이렇게 히스토리를 관리하기 위해 바로 `rebase` 가 필요해집니다. 아까 진행하던 토이 프로젝트의 브랜치를 다시한번 보겠습니다.

![5](/img/git-rebase/5.png) 

`rebase` 를 이용하여 `보기좋은` 히스토리를 한번 만들어 볼까요? 먼저, `feature2_bug1` 브랜치는 `feature2` 브랜치로 흡수되도록 하여 마치 `feature2` 브랜치에서 계속 작업을 한 것처럼 만들어 보겠습니다.

`feature2_bug1` 브랜치에 체크아웃 후, `git rebase feature2` 를 실행합니다.

![9](/img/git-rebase/9.png) 

첫번째 줄부터 차근차근 보겠습니다.
- 먼저 `git`은 `feature2` 브랜치의 최신 커밋으로 가서 `feature2_bug1` 브랜치가 나온 지점부터  붙입니다. 
- 이후에, `feature2_bug1` 브랜치의 첫 커밋부터, `complict` 가 있는지 검사를 하게 됩니다. `complict` 가 발견되면, 그 지점에서 잠깐 멈춰서 사용자가 해결(`resolve`)해 줄 때까지 임시 브랜치 (그림에서 2c68114) `대기` 하게 됩니다. 아래 그림과 같은 상태가 되죠.
![10](/img/git-rebase/10.png) 

그럼 `git` 이 원하는데로 `complict` 를 해결해 줍시다. feature2.txt 파일의 내용을 보게되면, 다음과 같이 파일은 `complict resolve` 를 기다리고 있습니다.

![11](/img/git-rebase/11.png) 

저희는 `feature2_bug1` 브랜치에서 두번의 커밋을 했고, `rebase`는 이 두개의 커밋을 차례로 흘러가면서 `feature2` 브랜치와 충돌이 있는지 확인할 것입니다. 현재 검사하고 있는 커밋의 충돌을 해결하고 다음 커밋에서 또다시 충돌이 일어나면 해결하고.. 이렇게 `feature2` 브랜치에 `feature2_bug1` 브랜치를 맞춰가는 것이죠. `feature2_bug1` 브랜치의 첫번째 커밋에 대한 `complict` 를 해결하고, 다음 커밋으로 넘어가겠습니다.

![12](/img/git-rebase/12.png) 
![13](/img/git-rebase/13.png) 

가장 윗줄에 `Applying: feature2 버그수정중 2..` 를 보면 아시듯, 다음 커밋으로 넘어갔습니다! 이번엔 두번째 커밋에 `rebase`가 `complict` 해결을 기다리며 대기합니다.

![16](/img/git-rebase/16.png) 

이 커밋이 `feature2_bug1` 브랜치의 마지막 커밋이니, 여기서 또다시 complict 를 해결해 보겠습니다.

![14](/img/git-rebase/14.png) 
![15](/img/git-rebase/15.png) 

충돌을 모두 해결했고, 저희는 다시 임시브랜치가 아닌 `feature2_bug1` 브랜치로 돌아왔습니다. `rebase`가 끝난것이죠. 이제 깔끔하게 `merge` 가 가능한 상태가 되었습니다. `complict` 떄문에 `merge commit` 이 생길 일이 없고, `merge` 한 다음에 `feature2_bug1` 브랜치는 없애버려도 무방하죠. 한번 볼까요?

![17](/img/git-rebase/17.png) 

이제 저희 토이 프로젝트는 다음과 같은 히스토리를 가지게 되었습니다!
![18](/img/git-rebase/18.png) 

이제  `master` 브랜치에 `feature2`를 합치려고 합니다. 그냥 `rebase`하면 깔끔하게 한줄로 히스토리가 정리가 되겠죠? 하지만 여기서 주의할 사항이 있습니다.

공식 문서를 보겠습니다: [Rebase의 위험성](https://git-scm.com/book/ko/v1/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase%ED%95%98%EA%B8%B0#Rebase의-위험성) 

## Rebase 의 위험성
Rebase 는 `커밋의 역사` 를 바꿔 버립니다. `master` 브랜치는 github 상에 올라가 있는 `remote` 브랜치 이므로, `rebase` 를 진행하여 `master` 에 억지로 푸시해 버린다면 (`--force`) 다른 팀원들이 master 브랜치의 최신사항을 반영하기 위해 `pull` 을 할때, 역사는 그때부터 완벽히 꼬여버립니다.

 `feature2`브랜치를 리모트에 푸시 하기전에 브랜치를 정리하려고 `rebase`를 사용하는 것도 괜찮고(지금까지의 과정이었죠), 혼자 쓰는 로컬 브랜치에서 `rebase`를 하는 경우도 괜찮지만, 이미 공개되어 사용자들이 사용하는 커밋의 역사를 자신이 바꾸어버리면 당연히 문제가 생겨 버리겠죠.

그래서 `feature2` 브랜치는 merge 하기로 합니다. 최종적으로 완성된 토이 프로젝트의 브랜치 그래프는 다음과 같이 됩니다.

![19](/img/git-rebase/19.png) 

깔끔하게 잘 정돈된 브랜치가 완성되었네요 :) 

## Rebase 이용하기
지금까지 알아봤듯, `rebase`는 브랜치의 `base`를 재배치시키고, `commit 의 역사`를 수정합니다. 이 `commit 의 역사`를 수정하는 역할 때문에, 이미 커밋된 로그 메시지를 수정할 때도 `rebase`를 사용할 수 있습니다. (이게 rebase 를 더 헷갈리게 만드는 듯 합니다..) `rebase` 의 옵션인 `--interactive` 를 적용하여 실행하게 되면(ex. `git rebase --interactive HEAD~3`), `vi` 가 켜지고 커밋들에 대해 시행할 작업들을 고를 수 있는 화면이 나옵니다. `pick`, `edit`, `squash` 옵션 중에서 선택할 수 있는데, `edit` 을 선택하면 커밋 메시지를 수정할 수 있게 됩니다. 자세한 사용법은 [git-rebase 공식 documentaion](https://git-scm.com/docs/git-rebase) 을 참고해 주세요.

## 마치며
첫 포스팅인데 잘 이해가 될런지 모르겠습니다. 혹시 틀린 사실에 대한 피드백이나 궁금증은 댓글이나, [블로그 저장소](https://github.com/sungjunyoung/sungjunyoung.github.io) 에서 `pull-request`를 보내주시면 감사하겠습니다! :)
