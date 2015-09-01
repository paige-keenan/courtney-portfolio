$(function() {
    function init() {
        preventCarousel();
        moveCarousel();
        changeCursor();
        showModal();
        hideModal();
    }

    function preventCarousel() {
        // Don't carousel on tablet+
        if($(window).width() > 768) {

            $('.carousel ul').each(function() {
                var groups = $(this).children('.group').length;
                $(this).width(100 * groups + '%');
                var width = (100 / groups + '%'); 
                $(this).children('.group').width(width);
            });
        }    
    }    

    function moveCarousel() {
        // Move Carousel based on position
        $('.group').on('click', function(event){
            var distanceFromLeft = event.clientX - $(this).offset().left;   
            var length =  $(this).parent('.ul').length
            var groupNumber = $(this).parent().children('.group').length;
            var percentChange = 100 / groupNumber;
            var groupIndex = $(this).attr('data-group');

            if (distanceFromLeft >= halfWay) {
                var dataPosition = $(this).parent('ul').attr('data-position', -1 * (percentChange * groupIndex));
                var dataCurrent = $(this).attr('data-current', - (percentChange * groupIndex));

                if($(this).hasClass('last')) {
                    event.preventDefault();
                } else {
                    $(this).parent('ul').css({'transform': 'translateX(-' + percentChange * groupIndex +'%)'});
                }
            } 

            else {
                var position = parseInt($(this).parent('ul').attr('data-position'));
                var moveBack = parseInt($(this).parent().find('.group').attr('data-current'));
                moveBack = moveBack * (groupIndex);
                
                var moveHere = $(this).prev().prev().attr('data-current');
                parseInt(moveHere);

                if($(this).index() === 1 ) {
                    moveHere = 0;
                }

                $(this).parent('ul').css({'transform': 'translateX(' + moveHere +'%)'});
            }           
        });
    }  

    function changeCursor() {
        // Change default cursor
        $('.group').mousemove(function(event) {
            var distanceFromLeft = event.clientX - $(this).offset().left;       
            if (distanceFromLeft >= halfWay) {
                $('.group').css( 'cursor', 'url(../../images/cursor-rightarrow.svg), auto' );
            } else {
                $('.group').css( 'cursor', 'url(../images/cursor-leftarrow.svg), auto' );
            }
        });    
    }   

    function showModal() {
        $('.modalify').on('click', function(event){
            var $imgSrc = $(this).attr('src');
            $('.modalized').attr('src', $imgSrc);
            $('.modal').addClass('show');
            event.preventDefault;
        });
    } 

    function hideModal() {
        $('.modal').on('click', function(event) {
            $('.modal').removeClass('show');
        });
    }


    init();
    var groupWidth = $('.group').width();
    var halfWay = groupWidth / 2;

});
