// carousel.js

if($(window).width() < 768) {

  function Carousel(element)
  {
    var self = this;
    element = $(element);

    var container = $('ul', element);
    var panes = $('ul li', element);
    var paneWidth = 0;
    var paneCount = panes.length;
    var currentPane = 0;

    this.init = function(element) {
      setPaneDimensions();
      $(window).on("resize", function() {
        setPaneDimensions();
        showPane(currentPane);
      });
    };


    function setPaneDimensions() {  
      var panes = $('.carousel ul li'); 
      var container = $('.carousel ul')
      paneWidth = element.width();
      panes.each(function() {
        $(this).width(paneWidth);
      });
      container.each(function() {
        var paneCount = $(this).children().children('li').length;
        $(this).width(paneWidth * paneCount);
      });
    };


    this.showPane = function(index, animate) {
      // between the bounds
      index = Math.max(0, Math.min(index, paneCount - 1));
      currentPane = index;

      var offset = - ((100 / paneCount) * currentPane);
      setContainerOffset(offset, animate);
    };

    function setContainerOffset(percent, animate) {
      container.removeClass('animate');

      if(animate) {
        container.addClass('animate');
      }

      if(Modernizr.csstransforms3d) {
        container.css('transform', 'translate3d('+ percent +'%, 0, 0) scale3d(1,1,1)');
      }

      else if(Modernizr.csstransforms) {
        container.css('transform', 'translate('+ percent +'%, 0)');
      }

      else {
        var px = ((paneWidth * paneCount) / 100) * percent;
        container.css('left', px + 'px');
      }
    }

    this.next = function() { return this.showPane(currentPane + 1, true); };
    this.prev = function() { return this.showPane(currentPane - 1, true); };

    function handleHammer(ev) {

      switch(ev.type) {
        case 'dragright':
        case 'dragleft':
          // stick to the finger
          var paneOffset = - (100 / paneCount) * currentPane;
          var dragOffset = ((100 / paneWidth) * ev.gesture.deltaX) / paneCount;

          // slow down at the first and last pane
          if((currentPane == 0 && ev.gesture.direction == 'right') || (currentPane == paneCount - 1 && ev.gesture.direction == 'left')) {
            dragOffset *= .4;
          }

          setContainerOffset(dragOffset + paneOffset);
          break;

        case 'swipeleft':
          self.next();
          ev.gesture.stopDetect();
          break;

        case 'swiperight':
          self.prev();
          ev.gesture.stopDetect();
          break;

        case 'release':
          // more then 50% moved, navigate
          if(Math.abs(ev.gesture.deltaX) > paneWidth / 2) {
            if(ev.gesture.direction == 'right') {
              self.prev();
            } else {
              self.next();
            }
          }
          else {
            self.showPane(currentPane, true);
          }
          break;
      }
    }

    new Hammer(element[0], { dragLockToAxis: true }).on('release dragleft dragright swipeleft swiperight', handleHammer);
  }

  var numberOfCarousels = $('.carousel').length;
  while (numberOfCarousels > 0) {
    var index = numberOfCarousels;
    numberOfCarousels--;
    var carousel = new Carousel('.carousel[data-index=' + index + ']');
  };

  var carousel = new Carousel('.carousel[data-index=' + index + ']');
  carousel.init();
  carousel.showPane(0);

}