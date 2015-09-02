(function() {
  
  var names = ['Courtney Perets', 'Coatney', 'Coats', 'C-Peasy', 'Shortney'];
  var images = ['../../images/intro/profPic01.jpg', ' ../../images/intro/profPic02.jpg', '../../images/intro/profPic03.jpg', '../../images/intro/profPic04.jpg'];
       
  function init() {
    rearrangeName();
    applyImageOverlay();

  }
  
  function rearrangeName() {
    var myIndex = 1;
    var print = $('#changeName');

    print.text(names[0]);

    print.on('click', function() {
      print.addClass('hideName');

      setTimeout( function(){ 
          nextElement();
      }  , 400 );      
      
      setTimeout( function(){ 
          print.removeClass('hideName');
      }  , 400 );              
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
  
  $(document).on('ready', function() {
      init();
  });
  
})();
