$(document).ready(function () {
    var $gridContainer = $('.grid');
    var $modalGridContainer = $('.modal-grid');

    var modal = $('[data-remodal-id=modal]').remodal();

    $gridContainer.imagesLoaded().progress(function () {
        $gridContainer.masonry({
            itemSelector: '.grid-item',
            columnWidth: 10,
            horizontalOrder: true
        });
    });

    $modalGridContainer.imagesLoaded(function () {
        $modalGridContainer.masonry({
            itemSelector: '.modal-grid-item',
            columnWidth: 10,
            horizontalOrder: true
        })
    });


    $('.grid-item').mouseenter(function () {
        // $(this).find('.grid-term').css("color", "white");
        // $(this).find('.grid-term').css("text-shadow", "-1px 0 #bbb, 0 1px #bbb, 1px 0 #bbb, 0 -1px #bbb");
        // $(this).find('.grid-title').css("color", "white");
        // $(this).find('.grid-title').css("text-shadow", "-1px 0 #555, 0 1px #555, 1px 0 #555, 0 -1px #555");
        $(this).find('img').css("filter", "brightness(80%)");
        $(this).css('cursor', 'pointer');
    });


    $('.grid-item').mouseleave(function () {
        // $(this).find('.grid-term').css("color", "#888");
        // $(this).find('.grid-term').css("text-shadow", "");
        // $(this).find('.grid-title').css("color", "#555");
        // $(this).find('.grid-title').css("text-shadow", "");
        $(this).find('img').css("filter", "brightness(100%)");

    });

    function setModalText(id) {
        $('.modal-images').empty();
        $('.modal-tags').empty();
        switch (id) {
            case 'naver':
                $('.modal-date').text('2017.12 ~ now');
                $('.modal-link').attr("href", "https://navercorp.com/");
                $('.modal-title').text("네이버");
                $('.modal-subtitle').text("PaaS");
                $('.modal-desc').text("2017년 12월부터 인턴으로 들어와 현재 네이버 PaaS 팀에서 재직중입니다. " +
                    "네이버 개발자를 위한 스토리지 인프라를 제공하기 위해 달리고 있습니다 :)");
                break;
            case 'khu':
                $('.modal-date').text('2012.03 ~ 2019.01');
                $('.modal-link').attr("href", "http://ce.khu.ac.kr/");
                $('.modal-title').text("경희대학교 컴퓨터공학과");
                $('.modal-subtitle').text("3학년 2학기 이후 휴학 중");
                $('.modal-desc').text("2012년 경희대학교 컴퓨터공학과로 진학하여 2017년 현재까지 공부 중입니다." +
                    " 컴퓨터공학과 동아리인 T.G.WinG 에 소속되어 회장, 스터디장을 맡아 활동했습니다.");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/khu-1.jpg\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/khu-2.jpg\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/khu-3.jpg\">" +
                    "</div>");
                break;
            case 'swmaestro':
                $('.modal-date').text('2017.08 ~ 2017.12');
                $('.modal-link').attr("href", "http://www.swmaestro.kr/web/web/main.do");
                $('.modal-title').text("SW 마에스트로");
                $('.modal-subtitle').text("8기 연수생 / 인증자");
                $('.modal-desc').text("2017년 8월에 SW 마에스트로 연수생으로 들어와 딥러닝 기반 폰트 생성 " +
                    "서비스인 fontto 를 개발했습니다. 서버 아키텍쳐, 프론트엔드를 담당했습니다. " +
                    "http://fontto.twiiks.co 에서 데모를 구경하실 수 있으며, https://github.com/orgs/twiiks/dashboard" +
                    "에서 제작중인 코드를 보실 수 있습니다.");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/swmaestro-1.jpg\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/swmaestro-3.jpg\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/swmaestro-2.jpg\">" +
                    "</div>");
                break;
            case 'nomadstar':
                $('.modal-date').text('2016.08 ~ 2017.02');
                $('.modal-link').attr("href", "http://nomadstar.com/nomad/");
                $('.modal-title').text("노마드스타");
                $('.modal-subtitle').text("서버개발 인턴");
                $('.modal-desc').text("반려동물 SNS 인 '쓰담'을 서비스중인 스타트업 '노마드스타'에서" +
                    "약 6개월간 서버개발 인턴으로 일했습니다. AWS 서버이전, 홈페이지 제작, 서버 API 작성, " +
                    "AWS Lambda 기반 백엔드 아키텍쳐 구축 등의 업무를 진행했습니다.");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/nomadstar-1.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/nomadstar-2.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/nomadstar-3.png\">" +
                    "</div>");
                break;
            case 'softcon':
                $('.modal-date').text('2016.12.19');
                $('.modal-link').attr("href", "https://www.slideshare.net/SungJunyoung/ss-69345868");
                $('.modal-title').text("서버의 ㅅ자도 모르던 인턴의 아마존 웹서비스 이전기");
                $('.modal-subtitle').text("경희대학교 컴퓨터공학과 softcon");
                $('.modal-desc').text("경희대학교 컴퓨터공학과와 NAVER D2 에서 주관한 " +
                    "softcon 에서, 인턴쉽을 진행하며 기존 국내 클라우드 서버에서 아마존 웹서비스로 " +
                    "서버를 이전하면서의 경험을 공유한 경험이 있습니다.");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/softcon-1.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/softcon-2.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/softcon-3.png\">" +
                    "</div>");
                break;
            case 'campus-seminar':
                $('.modal-date').text('2017.02.24');
                $('.modal-link').attr("href", "http://d2.naver.com/news/9930078");
                $('.modal-title').text("텀프로젝트에서 제품 프로젝트로");
                $('.modal-subtitle').text("NAVER Campus Seminar");
                $('.modal-desc').text("NAVER Campus Seminar 에서 학생 연사로, 지금까지" +
                    " 학교에서 텀 프로젝트만 하다가 실제로 서비스되는 제품에 들어가는 코드를 작성하면서 " +
                    "경험했던 이야기들을 발표했습니다.");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/campus-seminar-1.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/campus-seminar-2.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/campus-seminar-3.png\">" +
                    "</div>");
                break;
            case 'airplane':
                $('.modal-date').text('2016.06');
                $('.modal-link').attr("href", "https://github.com/sungjunyoung/Airplane");
                $('.modal-title').text("Airplane");
                $('.modal-subtitle').text("파일시스템 기반 SNS 어플리케이션");
                $('.modal-desc').text("swift를 알게되고, iOS 에 관심이 생겨 " +
                    "경험해 보기 위해 진행했던 프로젝트입니다. 파일 시스템을 데이터베이스로" +
                    "사용해 로컬에서만 실행해 볼 수 있다는 점이(?) 특징입니다.");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/airplane-1.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/airplane-2.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/airplane-3.png\">" +
                    "</div>");
                $('.modal-tags').append("" +
                    "<div class=\"modal-tag\">#swift</div>" +
                    "<div class=\"modal-tag\">#ios</div>");
                break;
            case 'gggggggguk':
                $('.modal-date').text('2016.07');
                $('.modal-link').attr("href", "https://github.com/sungjunyoung/Gggggggguk");
                $('.modal-title').text("Gggggggguk");
                $('.modal-subtitle').text("꾸우우우우우우욱 오래 누르는 사람이 이기는 게임");
                $('.modal-desc').text("firebase 를 사용해보고 싶어 진행하게 된 프로젝트입니다." +
                    " 버튼을 가장 오랫동안 누르고 있는 사람이 1등으로 올라가는 안드로이드 어플리케이션입니다. " +
                    "write 권한이 public 이어서 1등 조작 사건 등 재밌는 일이 많았습니다.");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/gggggggguk-1.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/gggggggguk-2.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/gggggggguk-3.png\">" +
                    "</div>");
                $('.modal-tags').append("" +
                    "<div class=\"modal-tag\">#android</div>" +
                    "<div class=\"modal-tag\">#firebase</div>");
                break;
            case 'sockdak':
                $('.modal-date').text('2017.05');
                $('.modal-link').attr("href", "https://github.com/sungjunyoung/sockdak_v2.0");
                $('.modal-title').text("속닥");
                $('.modal-subtitle').text("우리끼리 속닥!");
                $('.modal-desc').text("경희대학교 컴퓨터공학과에서 주최한 khuthon " +
                    "에서 우승한 아이디어로, 실제 서비스를 해보고 싶어 제작하게 되었습니다. " +
                    "경희대학교 종합정보시스템과 연동하여, 실제로 강의를 듣는 사람들끼리만 " +
                    "소통이 가능한 것이 특징입니다. meteor 플랫폼을 기반으로 " +
                    "nodejs, react 를 사용해 구현하였으며, 아쉽게도 실제 서비스로 런칭하지는 " +
                    "못했습니다.");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/sockdak-1.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/sockdak-2.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/sockdak-3.png\">" +
                    "</div>");
                $('.modal-tags').append("" +
                    "<div class=\"modal-tag\">#meteor</div>" +
                    "<div class=\"modal-tag\">#nodejs</div>" +
                    "<div class=\"modal-tag\">#react</div>");
                break;
            case 'getjjal':
                $('.modal-date').text('2017.06');
                $('.modal-link').attr("href", "https://github.com/sungjunyoung/get-jjal");
                $('.modal-title').text("겟짤");
                $('.modal-subtitle').text("짤방 개인화 서비스");
                $('.modal-desc').text("겟짤은 자신만의 짤방을 수집하고 싶은 친구의 아이디어로" +
                    " 시작된 프로젝트입니다. 짤방 url 을 등록해 자신만의 짤방을 모을 수 있고, " +
                    "다른 사람의 짤방을 줍줍(?) 할 수도 있습니다. url, 태그만 입력하면 간편하게" +
                    " 짤방을 등록할 수 있습니다. 자칫하면 번거로울 수 있는 태그의 관계를 " +
                    "잘 정의하여 구축한 것이 특징입니다. express, react 를 사용해 제작되었습니다.");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/getjjal-1.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/getjjal-2.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/getjjal-3.png\">" +
                    "</div>");
                $('.modal-tags').append("" +
                    "<div class=\"modal-tag\">#express</div>" +
                    "<div class=\"modal-tag\">#nodejs</div>" +
                    "<div class=\"modal-tag\">#mysql</div>" +
                    "<div class=\"modal-tag\">#react</div>");
                break;
            case 'kfd':
                $('.modal-date').text('2017.06');
                $('.modal-link').attr("href", "https://github.com/sungjunyoung/klas-file-downloader");
                $('.modal-title').text("KLAS 파일 다운로더");
                $('.modal-subtitle').text("짜증나는 KLAS 강의자료, KLAS 파일다운로더로 쉽게!");
                $('.modal-desc').text("경희대학교 강의 정보시스템인 KLAS 의 강의자료 다운" +
                    "절차가 너무 번거로워 제작한 서비스입니다. 전체 다운로드를 못하는 점, 로그인 세션이 유지되지" +
                    " 않는 점 등 불편 요소로 느껴졋던 것들을 개선시켰습니다. electron 을 이용해 " +
                    "mac, windows 에서 사용할 수 있도록 네이티브 앱으로 포팅했고, " +
                    "npm 을 사용할 수 있는 유저들은 커멘드라인 한줄로 강의자료를 모두 다운받을수 있다는 " +
                    "점이 특징입니다.");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/klasfd-1.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/klasfd-2.png\">" +
                    "</div>");
                $('.modal-images').append("" +
                    "<div class=\"modal-image-wrapper\">" +
                    "<img src=\"img/about/klasfd-3.png\">" +
                    "</div>");
                $('.modal-tags').append("" +
                    "<div class=\"modal-tag\">#electron</div>" +
                    "<div class=\"modal-tag\">#nodejs</div>");
                break;
            case 'more-projects':
                window.open('https://github.com/sungjunyoung?tab=repositories', '_blank')
                return false;
                break;
            case 'btghackathon':
                $('.modal-date').text('2013.12.15');
                $('.modal-link').attr("href", "https://www.facebook.com/b2ghackathon/photos/a.1423976957837645.1073741830.1382490738652934/1423976994504308/?type=3&theater");
                $('.modal-title').text("Born To Global Hackathon");
                $('.modal-subtitle').text("특별상");
                $('.modal-desc').text("KSIA 한국 학생 IT 연합에서 주최하는 Born To Global 해커톤에서, " +
                    "관심사가 같은 사람끼리 연결해주는 facebook 챗봇을 개발해 특별상을 수상했습니다. " +
                    "facebook api, python 을 이용하여 작성하였습니다.");
                $('.modal-tags').append("" +
                    "<div class=\"modal-tag\">#facebook-api</div>" +
                    "<div class=\"modal-tag\">#python</div>");
                break;
            case 'appjam':
                $('.modal-date').text('2016.03.26');
                $('.modal-link').attr("href", "img/about/appjam-result.jpg");
                $('.modal-title').text("SKT Smarteen Appjam");
                $('.modal-subtitle').text("장려상");
                $('.modal-desc').text("세계 각국의 사람들과 언어가 아닌, 손짓과 그림으로 소통하는 감성 " +
                    "안드로이드 어플리케이션으로 장려상을 수상했습니다. 안드로이드 레이아웃 및 webrtc 연결을 담당하였습니다.");
                $('.modal-tags').append("" +
                    "<div class=\"modal-tag\">#android</div>" +
                    "<div class=\"modal-tag\">#webrtc</div>");
                break;
            case 'hueday':
                $('.modal-date').text('2016.07.08');
                $('.modal-link').attr("href", "https://m.blog.naver.com/PostView.nhn?blogId=philips_led&logNo=220764934715&proxyReferer=https%3A%2F%2Fwww.facebook.com%2F");
                $('.modal-title').text("Philips Hue Day");
                $('.modal-subtitle').text("2등");
                $('.modal-desc').text("iOS 제작 경험을 토대로, " +
                    "Philips SDK 와 Instagram SDK 를 사용하여 인스타그램 사진들을 넘기면 어울리는 색상의 조명으로 " +
                    "바꾸어주는 iOS 어플리케이션인 Huestagram 을 만들어 2등을 수상했습니다.");
                $('.modal-tags').append("" +
                    "<div class=\"modal-tag\">#swift</div>" +
                    "<div class=\"modal-tag\">#ios</div>" +
                    "<div class=\"modal-tag\">#instagram sdk</div>" +
                    "<div class=\"modal-tag\">#hue sdk</div>");
                break;
            case 'khuthon':
                $('.modal-date').text('2016.10.10');
                $('.modal-link').attr("href", "https://thon.khlug.org/about/2016");
                $('.modal-title').text("교내 해커톤 Khuthon");
                $('.modal-subtitle').text("우승");
                $('.modal-desc').text("경희대학교 컴퓨터공학과와 NAVER D2 에서 주최한 교내 해커톤인 Khuthon 에서, " +
                    "학교 종합정보시스템과 연계하여 실제 강의를 수강하는 사람끼리 대화를 주고받을 수 있는 쉿!강의중 이라는 " +
                    "서비스로 우승을 했습니다. express 기반의 서버 API, firebase 구축을 담당했습니다.");
                $('.modal-tags').append("" +
                    "<div class=\"modal-tag\">#android</div>" +
                    "<div class=\"modal-tag\">#express</div>" +
                    "<div class=\"modal-tag\">#nodejs</div>" +
                    "<div class=\"modal-tag\">#firebase</div>");
                break;
            case 'openhack':
                $('.modal-date').text('2017.09.15');
                $('.modal-link').attr("href", "https://sigoss.github.io/hackathon2017-2/index.html");
                $('.modal-title').text("소프트웨어 중심대학 오픈소스 해커톤, 오픈핵");
                $('.modal-subtitle').text("과학기술정보통신부장관상");
                $('.modal-desc').text("개발자를 위한 URL 공유 사이트를 만들어 우승을 한 경험이 있습니다. " +
                    "이 서비스(포크레인) 의 특징은 작성하기 버튼이 따로 없고, pull request 를 통해서만 " +
                    "URL 작성하기(공유하기)가 가능하다는 것입니다. 웹 UI 작성 및 서버 API를 담당했습니다. ");
                $('.modal-tags').append("" +
                    "<div class=\"modal-tag\">#express</div>" +
                    "<div class=\"modal-tag\">#nodejs</div>" +
                    "<div class=\"modal-tag\">#github</div>");
                break;
            case 'khackathon':
                $('.modal-date').text('2017.11.04');
                $('.modal-link').attr("href", "/img/about/khackathon-result.jpeg");
                $('.modal-title').text("대학생 디지털솔루션 챌린지 K-Hackathon");
                $('.modal-subtitle').text("한국컴퓨터정보학회장상");
                $('.modal-desc').text("미아를 잃어버린 시점과 현재의 얼굴이 달라 미아를 찾지 못하는 경우가 많은 점에서 " +
                    "착안하여, 머신러닝을 이용해 미아의 얼굴을 예측해 주는 서비스로 한국컴퓨터정보학회장상을 수상했습니다. " +
                    "어드민 페이지와 데이터 수집 및 전처리를 담당했습니다.");
                $('.modal-tags').append("" +
                    "<div class=\"modal-tag\">#express</div>" +
                    "<div class=\"modal-tag\">#nodejs</div>" +
                    "<div class=\"modal-tag\">#react</div>" +
                    "<div class=\"modal-tag\">#python</div>");
                break;

        }
        return true;

    }

    $('.grid-item').click(function () {
        var id = $(this).attr('id');
        if (setModalText(id)) {
            $modalGridContainer.imagesLoaded(function () {
                modal.open();
            })
        }


    })
});
