"use strict";

jQuery(document).ready(function($){
	var top = $("#topContainer");
	//var getApp = $("#getappContainer").offset().top;
	var contentWrapper = $("#contentWrapper");
	var naviWrap = $("#navigationWrap");
	var windowH = $(window);
	var headerHeight = 0;
	var folMenu = $("#followMenu");
	var revWrap = $(".revWrap");
	var revContain = $("#reviewContainer");
	var resMenuToggle = $("#responsiveMenuToggle");
	var bgPos;
	var scrolled = 0;

	var lastId, cur,
	    topMenuHeight = 76;


	//init style of header
	$(window).bind("load", initD);


	/**
	 * popular/recent tabs click
	 */
	$(".delTab").click(function() {
		if ($(this).hasClass("activeTabWid"))
			return;

		if ($(this).hasClass("popTabWid")) {
			$(".popTabWid").addClass("activeTabWid");
			$(".recTabWid").removeClass("activeTabWid");
			$(".delPopularPosts").show();
			$(".delRecentPosts").hide();
		} else {
			$(".popTabWid").removeClass("activeTabWid");
			$(".recTabWid").addClass("activeTabWid");
			$(".delPopularPosts").hide();
			$(".delRecentPosts").show();			
		}
	});


	/**
	 * 
	 * scroll funciton
	 * 
	 */
	$(window).scroll(function() {
		bgPos = $(window).scrollTop() * 1.2;
		$('.textureBgSection').css('background-position', '0px '+bgPos+'px');


	   // Get container scroll position
	   var fromTop = $(this).scrollTop() + topMenuHeight;
	   
	   // Get id of current scroll item
	  	var cur = scrollItems.map(function(){
	   		if ($($(this).context.hash).length > 0) {
	    	//if ($(this).offset().top <= (fromTop+5))
	      	//return this;
	       	if ($($(this).context.hash).offset().top <= (fromTop+5))
	       		return $(this).context;
	       	}

	  	 });
	  	

	  	 // Get the id of the current element
	   	cur = cur[cur.length-1];

	   	var id = cur ? cur.hash : "";
	   	var fullUrl = cur ? cur.href : "";
	   	if (lastId !== id) {
	       	lastId = id;
	      	// Set/remove active class
			menuItems.parent().removeClass("menuActive");
			menuItems.filter("[href='"+fullUrl+"']").parent().addClass("menuActive");
	   	}      

		if (headerHeight !== 0 && ($(window).scrollTop()+50) > headerHeight) {
			if (!folMenu.hasClass("fmshown")) {
				folMenu.addClass("fmshown");
				//folMenu.stop().fadeIn(300); 
			}

		}
		else {
			if (folMenu.hasClass("fmshown")) {
				folMenu.removeClass("fmshown");
				//folMenu.stop().fadeOut(300);
			}
		}

	});

	for (var i = 0; i < $(".galleryFormatWrap").length; i++) {
		var j = new d_gallery($(".galleryFormatWrap").eq(i));
		j.initGal();
	}

	    var topMenu = $("#followMenu .mainMenu");
	    // All list items
	
	    var menuItems = topMenu.find("a"),
	    // Anchors corresponding to menu items
	    scrollItems = menuItems.map(function(){
	      var item = $(this);
	      if (item.length) { return item; }
	    }); 	

 	//menu click function	
	$(".mainMenu a").click(function(e) {
		e.preventDefault();

		var link = $(this).attr("href");
		var br = link.indexOf("#"); 

		if (br !== -1)
			var linkWithoutH = link.substr(0, br );
		else
			var linkWithoutH = -1;

		var currentURL = document.URL;

		if (currentURL.indexOf("#") !== -1) {
			currentURL = currentURL.substr(0, currentURL.indexOf("#"));
		}

		if (linkWithoutH == currentURL)
			{
			     $('html,body').animate({
			         scrollTop: ($(link.substr(br)).offset().top - topMenuHeight)
			    }, 800)				
			}
		else
			window.location = link;
	});



	//reviews section
	var revCount = $('.revWrap').length;
	var naviWrap = $("#revsNavi");

	$(".revWrap").eq(0).addClass("revWrapActive");

	for (var i = 0; i < revCount; i++) {
		var revBullet = document.createElement("span");
		revBullet.className = "revBullet";

		revBullet.onclick = function() {
			if (this.className == "revBullet revBulletActive")
				return;

			var thindex = $("#revsNavi span").index( this );

			var mv = $(".revWrap").eq(0).width();
			$(".revViewport").css({
		        transform: 'translate('+(mv * thindex * (-1))+'px, 0px)',
		        '-webkit-transform' : 'translate('+(mv * thindex * (-1))+'px, 0px)'
		    });

		    $(".revWrapActive").removeClass("revWrapActive");
		    $(".revWrap").eq(thindex).addClass("revWrapActive");

		    $(".revBulletActive").removeClass('revBulletActive');
		    $(".revBullet").eq(thindex).addClass("revBulletActive");
		};

		if (i == 0) {
			revBullet.className = "revBullet revBulletActive";
			naviWrap.append(revBullet);
		}
		else
			naviWrap.append(revBullet);
	}


	//shuffle.js init
	var $grid = $('#screensWrap')

	$grid.shuffle({
	    itemSelector: '.screen-item',
	    speed: 500,
	    columnWidth: 279,
	    gutterWidth: 18
	});

    var $filterOptions = $('.filter-options'),
     $btns = $filterOptions.children();

    $btns.on('click', function() {
      var $this = $(this),
          isActive = $this.hasClass( 'active' ),
          group = isActive ? 'all' : $this.data('group');

      // Hide current label, show current label in title
      if ( !isActive ) {
        $('.filter-options .active').removeClass('active');
      }

      $this.toggleClass('active');

      // Filter elements
      $grid.shuffle( 'shuffle', group );
    });

    $btns = null;

	/**
	 * 
	 * screens config
	 * 
	 */
	var scrnItem = $("#screensWrap .filtered"),
		arrowRight = $("#screensRightAr"),
		arrowLeft = $("#screensLeftAr"), 
		nrOfSlides = 0,
		currSlide = 1;

	if ($(window).width() < 768) {
		nrOfSlides = $("#screensWrap .filtered").length;

		if (scrnItem.length < 1) {
			$(".screensArrows").hide();
		}
		else {
			arrowRight.addClass("screensArrowsActive");
			arrowLeft.removeClass("screensArrowsActive");
		}
	}
	else if ($(window).width() >= 768 && $(window).width() <= 1070) {
		nrOfSlides = Math.ceil(scrnItem.length / 2);

		if (scrnItem.length < 3) {
			$(".screensArrows").hide();
		}
		else {
			arrowRight.addClass("screensArrowsActive");
			arrowLeft.removeClass("screensArrowsActive");
		}
	}
	else {
		nrOfSlides = Math.ceil(scrnItem.length / 4);

		if (scrnItem.length < 5) {
			$(".screensArrows").hide();
		}
		else {
			arrowRight.addClass("screensArrowsActive");
			arrowLeft.removeClass("screensArrowsActive");
		}
	}

	arrowRight.click(function() {
		if (!arrowRight.hasClass("screensArrowsActive"))
			return;

		var currentWitdh = $("#screensOfHide").width()+18;
		$("#screensWrapOuter").css({
	        transform: 'translate(-'+((currentWitdh*currSlide))+'px, 0px)',
	        '-webkit-transform' : 'translate(-'+((currentWitdh*currSlide))+'px, 0px)'
	    });
	    currSlide++;

	    if (currSlide == nrOfSlides)
	    	arrowRight.removeClass("screensArrowsActive");
		if (!arrowLeft.hasClass("screensArrowsActive"))
			arrowLeft.addClass("screensArrowsActive");
	});

	arrowLeft.click(function() {
		if (!arrowLeft.hasClass("screensArrowsActive"))
			return;

		currSlide--;
		var addPX = 18
		if (currSlide == 1)
			addPX = 0;

		var currentWitdh = $("#screensOfHide").width();
		$("#screensWrapOuter").css({
	        transform: 'translate(-'+((currentWitdh*(currSlide-1))+addPX)+'px, 0px)',
	        '-webkit-transform' : 'translate(-'+((currentWitdh*(currSlide-1))+addPX)+'px, 0px)'
	    });

	    if (currSlide == 1)
	    	arrowLeft.removeClass("screensArrowsActive");
		if (!arrowRight.hasClass("screensArrowsActive"))
			arrowRight.addClass("screensArrowsActive");
	});


	/**
	 * 
	 * reconfigure screens on filter
	 * 
	 */
	$grid.on('filter.shuffle', function() {

	    //arrowLeft.removeClass("screensArrowsActive");

	});

	$grid.on('filtered.shuffle', function() { 
	    currSlide = 1;

		$("#screensWrapOuter").css({
	        transform: 'translate(0px, 0px)',
	        '-webkit-transform' : 'translate(0px, 0px)'
	    });

		scrnItem = $("#screensWrap .filtered");
		if ($(window).width() < 768) {
			nrOfSlides = scrnItem.length;

			if (scrnItem.length < 1) {
				arrowRight.removeClass("screensArrowsActive");
				arrowLeft.removeClass("screensArrowsActive");
			}
			else {
				$(".screensArrows").show();
				arrowRight.addClass("screensArrowsActive");
				arrowLeft.removeClass("screensArrowsActive");
			}
		}
		else if ($(window).width() >= 768 && $(window).width() <= 1070) {
			nrOfSlides = Math.ceil(scrnItem.length / 2);

			if (scrnItem.length < 3) {
				arrowRight.removeClass("screensArrowsActive");
				arrowLeft.removeClass("screensArrowsActive");
			}
			else {
				$(".screensArrows").show();
				arrowRight.addClass("screensArrowsActive");
				arrowLeft.removeClass("screensArrowsActive");
			}
		}
		else {
			nrOfSlides = Math.ceil(scrnItem.length / 4);
			console.log(scrnItem.length);
			if (scrnItem.length < 5) {
				//$(".screensArrows").hide();
				arrowRight.removeClass("screensArrowsActive");
				arrowLeft.removeClass("screensArrowsActive");
			}
			else {
				$(".screensArrows").show();
				arrowRight.addClass("screensArrowsActive");
				arrowLeft.removeClass("screensArrowsActive");
			}
		}
	});

	/**
	 * responsive menu show on click
	 * 
	 */
	resMenuToggle.click(function(){
		if (!folMenu.hasClass("fmToggled")) {
			folMenu.addClass("fmToggled");
			//folMenu.stop().fadeIn(300); 
		} else if (folMenu.hasClass("fmToggled")) {
			folMenu.removeClass("fmToggled");
			//folMenu.stop().fadeOut(300);
		}
	});

	/**
	 * 
	 * change styles on resize
	 * 
	 */
	function resizedw() {
		initD();
		$(".galleryFormatWrap").height($(".galleryFormatWrap img").eq(0).height());
		$(".revViewport").css({
	        transform: 'translate(0px, 0px)',
	        '-webkit-transform' : 'translate(0px, 0px)'
	    });

	    $(".revBulletActive").removeClass('revBulletActive');
	    $(".revBullet").eq(0).addClass("revBullet revBulletActive");
	    $(".revWrapActive").removeClass("revWrapActive");
	    $(".revWrap").eq(0).addClass("revWrapActive");

		//screens resizer
		scrnItem = $("#screensWrap .filtered");
		currSlide = 1;
		if ($(window).width() < 768) {
			nrOfSlides = scrnItem.length;

			if (scrnItem.length < 1) {
				$(".screensArrows").hide();
			}
			else {
				$(".screensArrows").show();
				arrowRight.addClass("screensArrowsActive");
				arrowLeft.removeClass("screensArrowsActive");
			}
		}
		else if ($(window).width() >= 768 && $(window).width() <= 1070) {
			nrOfSlides = Math.ceil(scrnItem.length / 2);

			if (scrnItem.length < 3) {
				$(".screensArrows").hide();
			}
			else {
				$(".screensArrows").show();
				arrowRight.addClass("screensArrowsActive");
				arrowLeft.removeClass("screensArrowsActive");
			}
		}
		else {
			nrOfSlides = Math.ceil(scrnItem.length / 4);

			if (scrnItem.length < 5) {
				$(".screensArrows").hide();
			}
			else {
				$(".screensArrows").show();
				arrowRight.addClass("screensArrowsActive");
				arrowLeft.removeClass("screensArrowsActive");
			}
		}

		$("#screensWrapOuter").css({
	        transform: 'translate(0px, 0px)',
	        '-webkit-transform' : 'translate(0px, 0px)'
	    });
	};

	var doit;
	window.onresize = function(){
	  clearTimeout(doit);
	  doit = setTimeout(resizedw, 300);
	};

	/**
	 * 
	 * set header slider dimensions and stuff
	 * 
	 */
	function initD() {
		//return if we are not on homepage
		//if (!top.hasClass('homeTopContainer'))
		//	contentWrapper.css("transition", "none");
		
		$(".galleryFormatWrap").height($(".galleryFormatWrap img").eq(0).height());

		headerHeight = top.height();
		contentWrapper.css('top', headerHeight);
		revWrap.css('max-width', revWrap.parent().parent().width());

		//adjust on small screens
		if ((headerHeight-100) > $(window).height())
			top.css('position', 'absolute');
		else
			top.css('position', 'fixed');

		//check if link has #example

			if (scrolled == 0) {
				setTimeout(function(){
					var link = document.URL;
					var br = link.indexOf("#"); 

					if (br !== -1) {
						if ($(link.substr(br)).length > 0)
						    $('html,body').animate({
						         scrollTop: ($(link.substr(br)).offset().top - topMenuHeight)
						    }, 800);	
					}				
				}, 400);

				scrolled = 1;
			} 


	}

	/**
	 * 
	 * contact form submit
	 * 
	 */
	$( "#sendmail" ).on( "submit", function( event ) {
		event.preventDefault();
		$(".fa-form-wait").css('display', 'inline-block');

		$.ajax( {
			type: "POST",
			url: $( "#sendmail" ).attr( 'action' ),
			data: $( "#sendmail" ).serialize(),
			success: function( response ) {
				var rpl = JSON.parse(response);

				$(".fa-form-wait").css('display', 'none');

				if (rpl.type == "error")
					$("#formSubmitMessage").html('<span style="color: #AA0000;"><i class="fa fa-exclamation-circle"></i> ' + rpl.text + '</span>');
				else {
					$("#formSubmitMessage").html('<span style="color: #40A6A6;"><i class="fa fa-check-circle"></i> ' + rpl.text + '</span>');
					$("#sendmail").slideUp();
				}
			}
		});
	});

	//galery post format function
	function d_gallery(gal) {
		var self = this;
		this.gallery = gal;
		this.imgs = $("img", self.gallery);
		this.galImg = [];
		this.controlWrap = $(".galleryControl", self.gallery.parent().prev());
		this.interval = 0;

		this.initGal = function() {
			for (var i = 0; i < self.imgs.length; i++) {

				self.galImg.push(document.createElement('div'));

				$(self.galImg[i])
					.addClass("delGalThumb")
					.click(self.clickControl);

				self.controlWrap.append(self.galImg[i]);
			}

			$(self.galImg[0]).addClass("galCActive");
			self.imgs.eq(0).addClass("activeGalImg");

			self.interval = setInterval(self.autoSlide, 7000);
		}

		this.clickControl = function() {

			if ($(this).hasClass("galCActive"))
				return;

			clearInterval(self.interval);
			var n = $(this).index();

			$(".delGalThumb", self.controlWrap).removeClass("galCActive");
			$(this).addClass("galCActive");

			$(self.imgs).removeClass("activeGalImg");
			$(self.imgs).eq(n).addClass("activeGalImg");

			self.interval = setInterval(self.autoSlide, 7000);
		}

		this.autoSlide = function() {
			if ($(".galCActive", self.controlWrap).index() == (self.imgs.length - 1)) {

				$(".galCActive", self.controlWrap).removeClass("galCActive");
				$(".delGalThumb", self.controlWrap).eq(0).addClass("galCActive");

				$(self.imgs).removeClass("activeGalImg");
				$(self.imgs).eq(0).addClass("activeGalImg");				
			} else {

				$(".galCActive", self.controlWrap).removeClass("galCActive").next().addClass("galCActive");

				$(".activeGalImg", self.gallery).removeClass("activeGalImg").next().addClass("activeGalImg");
			}
		}
	}
});


function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();
    //console.log(rect.top)
    return (
        rect.top == 0
    );
}