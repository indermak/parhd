
/* Affix JS */

$(window).scroll(function() {
  /* affix after scrolling 100px */
  if ($(document).scrollTop() > 100) {
    $('.navbar').addClass('affix');
  } else {
    $('.navbar').removeClass('affix');
  }
});


//$('.owl-carousel').owlCarousel({
//    loop:true,
//    margin:10,
//    responsiveClass:true,
//    responsive:{
//        0:{
//            items:1,
//            nav:true
//        },
//        600:{
//            items:3,
//            nav:false
//        },
//        1000:{
//            items:3,
//            nav:true,
//            loop:false
//        }
//    }
//})




$(document).ready(function(){
    $('.sub-product').owlCarousel({
        margin:10,
  loop: true,
  nav:true,
  dots: false,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayTimeout: 8000,
       
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:3
            }
        }
    })

$('.owl-blog').owlCarousel({
    margin:20,

	
  loop:true,
  
  dots:true,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayTimeout: 2500,
      responsiveClass:true,
    responsive:{
        0:{
            items:1
 
        },
        600:{
            items:3
        },
        1000:{
            items:3
        }
    }
})



$('.owl-three').owlCarousel({
    margin:30,
	  loop: true,
  dots: true,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayTimeout: 2500,
    responsiveClass:true,
	
    responsive:{
        0:{
            items:1
   
   
        },
        600:{
            items:3
     
	 
        },
        1000:{
            items:3

        }
    }
})
});


//Counter
$('.count').each(function() {
  $(this).prop('Counter', 0).animate({
    Counter: $(this).text()
  }, {
    duration: 8000,
    easing: 'swing',
    step: function(now) {
      $(this).text(Math.ceil(now));
    }
  });
});




