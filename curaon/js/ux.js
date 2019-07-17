
$(function(){

	headerSearch();
	wGnbMenu();
	mGnbMenu();
	mainVisualSlider();
	footerMenu();
	

	requestWorkSlider();
	artWorkSlider1();
	artWorkSlider2();
	artistsSlider();

});


function headerSearch(){
	//headerSearch 
	$('.headerMenu .search').on('click', function(){
		var search = $(this).parents('.headerMenu').next('.headerSearch');
		if(!search.hasClass('on')){
			search.addClass('on');
		}else{
			search.removeClass('on');
		}
	});
	$('.headerSearch .delete').on('click', function(){
		var search = $(this).parents('.headerSearch');
		search.removeClass('on');
		search.find('input').val('');
	});
}

// 웹 gnb
function wGnbMenu(){
	// gnbMenu
	var toggling = false;
	function slidein(){
		 $(obj).stop().slideDown(300);
	}
	function slideout(){
		 $(obj).stop().slideUp(300);
		 $('.gnbMenu li').removeClass('on');
	}

	var obj = $('.gnbSubMenu');
	$('.header').mouseover(function(e) {
		//if($(obj).hasClass('fix')) return;
		if($('.header .gnbMenu li.subHas, .header .gnbSubMenu').has(e.target).length){
			 clearTimeout(toggling);
			 toggling = setTimeout(slidein, 250);
		}else{
			 clearTimeout(toggling);
			 setTimeout(slideout, 250);
		}
	});
	$('.header').mouseleave(function(e) {
		//if($(obj).hasClass('fix')) return;
		 clearTimeout(toggling);
		 setTimeout(slideout, 350);
	});

	$('.header .gnbMenu li.subHas a').mouseover(function(e) {
		var id= $(this).attr('href');
		$(this).parent().addClass('on');
		$('.gnbSubMenu .menu').hide();
		$(id).show();
	});
}

// 모바일 gnb
function mGnbMenu(){
	//gnb 
	function mSlideMenuClose(){
		var mobileMenu = $('.mSlideMenu');
		mobileMenu.stop().hide();
		$(this).removeClass('on');
		mobileMenu.removeClass('on');
			$('body').css('overflow', '');
	}

	$('.header .mBtn').on('click', function(){
		var mobileMenu = $('.mSlideMenu');
		if(mobileMenu.is(':hidden')){
			mobileMenu.stop().show();
			$(this).addClass('on');
			mobileMenu.addClass('on');
			$('body').css('overflow', 'hidden');
		}else{
			mSlideMenuClose();
		}
	});
	$('.mSlideMenu .close,  .mSlideMenu .mask').on('click', function(){
		mSlideMenuClose();
	});

	$(window).resize(function(){
		var search = $('.headerMenu');
		search.removeClass('on');

		mSlideMenuClose();
	});

	//menu click
	$('.mGnbMenu > ul > li > a').on('click', function(){
		var li = $(this).parent();
		var subMenu = $(this).next('.subMenu');
		if(!li.hasClass('on')){
			li.siblings().removeClass('on');
			li.addClass('on');
			subMenu.slideDown();
			li.siblings().find('.subMenu').slideUp();
		}else{
			li.removeClass('on');
			subMenu.slideUp();
		}
	});
}

//mainVisualSlider
 function mainVisualSlider(){
	 if($('#mainVisualSlider').length>0){
			var mainVisualSlider = new Swiper('#mainVisualSlider', {
			  slidesPerView: 1,
			  pagination: {
				el: '#mainVisualSlider .swiper-pagination',
				clickable: true,
			  },
			navigation: {
				nextEl: '#mainVisualSlider .swiper-button-next',
				prevEl: '#mainVisualSlider .swiper-button-prev',
				clickable:true,
			  },
				autoplay: {delay:5000, disableOnInteraction:false},
				loop: true,			  
				speed:500
			});
	  }
 }

//sliderSwiper
function sliderSwiper(opt){

	if(!$(opt.obj).length > 0) return;

	var sliderList = opt.obj + ' .swiper-container';
	var sliderSwiper;
	var prevBtn = opt.obj+' .swiper-button-prev';
	var nextBtn = opt.obj+' .swiper-button-next';
	var btnCheck = opt.btnCheck == null ? true : opt.btnCheck;
		slide();

	function slide(){
			var containerSize = $(opt.obj).width();
			var sliderSize = 0;
			$(sliderList+' .swiper-slide').each(function(){
				sliderSize += $(this).outerWidth();
			});			
			var sliderNum = $(sliderList+' .swiper-slide').length;

			sliderSwiper = new Swiper(sliderList, opt.sliderSetting);

			if(btnCheck){	
			if(containerSize < sliderSize){
				$(prevBtn).show();
				$(nextBtn).show();
			}else{
				sliderSwiper.destroy();
				$(prevBtn).hide();
				$(nextBtn).hide();
			}
		}
		
		if(opt.listCallback != undefined)	opt.listCallback(sliderSwiper);
	}

	$(window).resize(function(){
		sliderSwiper.destroy();
		slide();
	});
 }

 
function requestWorkSlider(){

	sliderSwiper({
		obj:'#requestWorkSlider',
		sliderSetting:{
			slidesPerView:3,
			spaceBetween:20,
			navigation: {
				nextEl: '#requestWorkSlider .swiper-button-next',
				prevEl: '#requestWorkSlider .swiper-button-prev',
				clickable:true,
			},
			pagination: {
				el: '#requestWorkSlider .swiper-pagination',
				clickable: true,
			},			  
			autoplay: {delay:2000, disableOnInteraction:false},
			loop: true,
			breakpoints: {
			1024: {
					slidesPerView:'2',
					//spaceBetween:5,
				},
			768: {
				slidesPerView:'auto',
				spaceBetween:0,
				},
			360: {
				slidesPerView:'1'
				}
			}			
		}
	});
}


function artWorkSlider1(){
	sliderSwiper({
		obj:'#artWorkSlider1',
		sliderSetting:{
			slidesPerView:'auto',
			spaceBetween:0,
			navigation: {
				nextEl: '#artWorkSlider1 .swiper-button-next',
				prevEl: '#artWorkSlider1 .swiper-button-prev',
				clickable:true,
			},			  
			autoplay: {delay:2000, disableOnInteraction:false},
			loop: true,			
		}
	});
}

function artWorkSlider2(){
	sliderSwiper({
		obj:'#artWorkSlider2',
		sliderSetting:{
			slidesPerView:'auto',
			spaceBetween:0,
			navigation: {
				nextEl: '#artWorkSlider2 .swiper-button-next',
				prevEl: '#artWorkSlider2 .swiper-button-prev',
				clickable:true,
			},			  
			autoplay: {delay:2000, disableOnInteraction:false},
			loop: true,			
		}
	});
}

function artistsSlider(){
	sliderSwiper({
		obj:'#artistsSlider',
		sliderSetting:{
			slidesPerView:'auto',
			spaceBetween:0,
			navigation: {
				nextEl: '#artistsSlider .swiper-button-next',
				prevEl: '#artistsSlider .swiper-button-prev',
				clickable:true,
			},			  
			pagination: {
				el: '#artistsSlider .swiper-pagination',
				clickable: true,
			},				
			autoplay: {delay:2000, disableOnInteraction:false},
			loop: true,			
		}
	});
}
 
//  //mainNoticeTab
//  function mainNoticeTab(){
// 	 //tabType1
// 	$('.noticeTab a').on('click', function(){
// 		var href= $(this).attr('href');
// 		var siblings = $(this).siblings('a')
// 		siblings.each(function(){
// 			var h = $(this).attr('href');
// 			$(this).removeClass('on');
// 			$(h).hide();
// 		});
// 		$(this).addClass('on');
// 		$(href).show();

// 		return false;
// 	});
//  }

 function footerMenu(){
	$('.footerMenu a').on('click', function(){
		var li = $(this).parent();
		var subMenu = $(this).next('ul');
		if(!li.hasClass('on')){
			li.siblings().removeClass('on');
			li.addClass('on');
			subMenu.slideDown();
			li.siblings().find('ul').slideUp();
		}else{
			li.removeClass('on');
			subMenu.slideUp();
		}
	});		
 }


//popup
function popOpen(id){
	$(id).show();
}

function popClose(id){
	$(id).hide();
}
