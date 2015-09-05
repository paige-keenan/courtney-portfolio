(function() {
  
  var names = ['Courtney Perets', 'Coatney', 'Coats', 'C-Peasy', 'Shortney'];
  var images = ['../../images/intro/profPic01.jpg', ' ../../images/intro/profPic02.jpg', '../../images/intro/profPic03.jpg', '../../images/intro/profPic04.jpg'];
       
  function init() {
    rearrangeName();
    applyImageOverlay();
    revealHidden();
    applyBackground();
  }
  
  function rearrangeName() {
    var myIndex = 1;
    var print = $('#changeName');

    print.text(names[0]);

    print.on('click', function() {

      setTimeout( function(){ 
          nextElement();
      }  , 200 );                  
    });

    function nextElement() {
      print.text(names[myIndex]);
      myIndex = (myIndex + 1) % (names.length);
    }
  }

  function applyImageOverlay() {
    var myIndex = 1;
    var imageSwap = $('.intro__container__image-portrait');

    imageSwap.attr('src', images[0]);

    imageSwap.on('click', function() {
      nextImage();
    });

    function nextImage() {
      imageSwap.attr('src', images[myIndex]);
      myIndex = (myIndex + 1) % (images.length);
    }   
  }

  function revealHidden() {
    $('.hide-mobile img').on('click', function(event) {
      $(this).parent('section').children('p, a').toggleClass('show');
    });
  }

  function applyBackground() {
    $('section.beach').on('click', function(event) {
      $('.intro').toggleClass('beachy-background');
    });
  }

  
  $(document).on('ready', function() {
      init();
  });
  
})();
