$(document).ready(function () {
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 10,
        horizontalOrder: true
    });

    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }

    $('.grid-item').mouseenter(function () {
            $(this).find('.grid-term').css("color", "white");
            $(this).find('.grid-term').css("text-shadow", "-1px 0 #888, 0 1px #888, 1px 0 #888, 0 -1px #888");
            $(this).find('.grid-title').css("color", "white");
            $(this).find('.grid-title').css("text-shadow", "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black")
            $(this).css('cursor', 'pointer');
        }
    );


    $('.grid-item').mouseleave(function () {
            $(this).find('.grid-term').css("color", "#aaa");
            $(this).find('.grid-term').css("text-shadow", "");
            $(this).find('.grid-title').css("color", "#272727");
            $(this).find('.grid-title').css("text-shadow", "")

        }
    );

    $('.grid-item').click(function () {
        const url = $(this).attr('id');
        window.open(url, '_blank');
    })
});
