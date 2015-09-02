(function() {
  
  var names = ['Courtney Perets', 'Coatney', 'Coats', 'C-Peasy', 'Shortney'];
       
  function init() {
    rearrangeName();
  }
  
  function rearrangeName() {
    var myIndex = 1;
    var print = $('.intro__container h2');

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
  
  $(document).on('ready', function() {
      init();
  });
  
})();
