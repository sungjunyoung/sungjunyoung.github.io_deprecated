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
            $(this).css('cursor', 'pointer');
        }
    );


    $('.grid-item').mouseleave(function () {

        }
    );

    function setModalText(id) {
        $('.modal-images').empty();
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

        }

    }

    $('.grid-item').click(function () {
        var id = $(this).attr('id');
        setModalText(id);
        modal.open();

    })
});
