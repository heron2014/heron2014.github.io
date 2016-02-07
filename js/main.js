(function($) {
	
	var sectionFrom,
    slide = $('.slide'),
    slideActive = $('.slide.active'),
    navLink = $('.nav a'),
    navLi = $('.nav li'),
    mainTl = new TimelineMax();

      //navigation
    navLink.on('click', function(e) {

      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }

      var sectionFrom = $('.slide.active'),
        sectionToId = $(e.target).attr('href'),
        sectionTo = $('div' + sectionToId);

      if (sectionFrom.attr('id') !== sectionTo.attr('id')) {
        slideToSection(sectionFrom, sectionTo);
      }

    });

    function slideToSection(sectionFrom, sectionTo) {

	    var bcg = sectionTo.find('.bcg'),
	      bcgFrom = sectionFrom.find('.bcg'),
	      tlLeft = new TimelineLite({onComplete: setActiveSection(sectionFrom, sectionTo)}),
	      tlRight = new TimelineLite();

	    console.log(sectionFrom.index());

	    if (sectionFrom.index() < sectionTo.index()) {
	      console.log('going down');
	      tlLeft
	        .to(sectionFrom, 1.2, {x: '-=100%', ease:Power4.easeInOut, clearProps: 'all'}, '0') //last parameter 0 means that we want these 2 tweens to happen at the same time
	        .to(sectionTo, 1.2, {x: '0%', ease:Power4.easeInOut}, '0')
	        .to(bcgFrom, 1.2, {x: '30%', ease:Power4.easeInOut, clearProps: 'all'}, '0')
	        .from(bcg, 1.2, {x: '-30%', ease:Power4.easeInOut, clearProps: 'all'}, '0');
	    } else {
	      tlRight
	        .set(sectionTo, {x: '-100%'})
	        .to(sectionFrom, 1.2, {x: '100%', ease:Power4.easeInOut, clearProps: 'all'}, '0')
	        .to(sectionTo, 1.2, {x: '0%', ease:Power4.easeInOut}, '0')
	        .to(bcgFrom, 1.2, {x: '-30%', ease:Power4.easeInOut, clearProps: 'all'}, '0')
	        .from(bcg, 1.2, {x: '30%', ease:Power4.easeInOut, clearProps: 'all'}, '0');
	    }

    }

    function setActiveSection(sectionFrom, sectionTo){

        // Add active class to the current slide
      sectionFrom.removeClass('active');
      sectionTo.addClass('active');

      

        // Highlight current slide in the navigation
      var currentSlideIndex = parseInt($(sectionTo).attr('id').slice(-2)) -1;
        navLi.removeAttr('class');
        navLi.eq(currentSlideIndex).addClass('active');

    }

     function init() {
        //set active slide visible

        TweenLite.set(slideActive, {x: '0%'});

        //Fade slides in - screen flikers , first its show dark background then it moves to slide image - issue
        
        
    }

    init();

})(jQuery);