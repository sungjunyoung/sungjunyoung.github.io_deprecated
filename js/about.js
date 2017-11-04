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
        $(this).find('.grid-term').css("color", "white");
        $(this).find('.grid-term').css("text-shadow", "-1px 0 #bbb, 0 1px #bbb, 1px 0 #bbb, 0 -1px #bbb");
        $(this).find('.grid-title').css("color", "white");
        $(this).find('.grid-title').css("text-shadow", "-1px 0 #555, 0 1px #555, 1px 0 #555, 0 -1px #555");
        $(this).css('cursor', 'pointer');
    });


    $('.grid-item').mouseleave(function () {
        $(this).find('.grid-term').css("color", "#888");
        $(this).find('.grid-term').css("text-shadow", "");
        $(this).find('.grid-title').css("color", "#555");
        $(this).find('.grid-title').css("text-shadow", "");

    });

    function setModalText(id) {
        $('.modal-images').empty();
        $('.modal-tags').empty();
        switch (id) {
            case 'khu':
                $('.modal-date').text('2012.03 ~ now');
                $('.modal-link').attr("href", "http://ce.khu.ac.kr/");
                $('.modal-title').text("경희대학교 컴퓨터공학과");
                $('.modal-subtitle').text("3학년 2학기 이후 휴학 중");
                $('.modal-desc').text("2012년 경희대학교 컴퓨터공학과로 진학하여 2017년 현재까지 공부 중입니다." +
                    " 컴퓨터공학과 동아리인 T.G.WinG 에 소속되어 있으며 학교앞에서 자취중입니다.");
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
                $('.modal-date').text('2017.08 ~ now');
                $('.modal-link').attr("href", "http://www.swmaestro.kr/web/web/main.do");
                $('.modal-title').text("SW 마에스트로");
                $('.modal-subtitle').text("8기 연수생");
                $('.modal-desc').text("2017년 8월에 SW 마에스트로 연수생으로 들어와 딥러닝 기반 폰트 생성 " +
                    "서비스인 fontto 를 개발하고 있습니다. 서버 아키텍쳐, 프론트엔드를 담당하고 있습니다. " +
                    "http://fontto.twiiks.co 에서 데모를 구경하실 수 있습니다.");
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
                    "AWS Lambda 기반 백엔드 아키텍쳐를 구축했습니다.");
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
