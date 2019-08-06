
var windowWidth = $(window).width();

$(function(){
	//메인
	setTimeout(function(){
		mainVisualSlider();
		requestWorkSlider();
		artWorkSlider1();
		artWorkSlider2();
		artistsSlider();
	}, 100);

	//작품상세 더보기 이미지
	workImgMoreSlider();
	//아트워크작품상세 더보기 이미지
	artworkImgMoreSlider();
	//참고이미지
	referenceSlider();
	//사진 올리기 
	// photoAddListSlider('#photoAddListSlider');
	// photoAddListSlider('#photoAddListSlider2');

	//작품상세 클라이언트
	//followScroll('.workDetail .client', 0, 1200);

	desingSelect();

	filterList();


});

 // headerScroll
 function headerScroll(){
	if($('.header').length <= 0) return;
	var startPosition = 0
	function action (){
	   var scTop = $(document).scrollTop();
	   var headerheight = $('.header').height();
	   if(scTop > startPosition){
		   //$('.header').css({top:0,left:0,position:'fixed',width:'100%','z-index':80})
		   $('.header').css({top:0,left:0,position:'fixed',width:'100%','z-index':80})
		   $('.header').addClass('fix');
		   $('body').css({paddingTop:headerheight})

	   }else{
		   //$('.header').css({top:0,left:0,position:'relative',width:'100%','z-index':80})
		   $('.header').css({top:0,left:0,position:'relative',width:'100%','z-index':80})
		   $('.header').removeClass('fix')
		   $('body').css({paddingTop:0})
	   }
	}
   $(window).scroll(function(){
	   action ();
   });
   $(window).resize(function(){
	   action ()
   })
}

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
			$('body').css('overflow', 'hidden');
			mobileMenu.stop().show();
			$(this).addClass('on');
			mobileMenu.addClass('on');
		}else{
			mSlideMenuClose();
		}
	});
	$('.mSlideMenu .close,  .mSlideMenu .mask').on('click', function(){
		mSlideMenuClose();
	});

	$(window).resize(function(){
		var winW = $(window).width();
		var search = $('.headerMenu');
		search.removeClass('on');
		if(winW > 1024){
			mSlideMenuClose();
		}
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
	 if($('#mainVisualSlider').length < 0) return;
	 if($('#mainVisualSlider li').length>0){
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
				speed:1000
			});
	  }
 }

 function workDetailVisual(){
	sliderSwiper({
		obj:'#workDetailVisualSlider',
		sliderSetting:{
			slidesPerView:1,
			spaceBetween:0,
			navigation: {
				nextEl: '.workDetailVisualSliderBtn.swiper-button-next',
				prevEl: '.workDetailVisualSliderBtn.swiper-button-prev',
				clickable:true,
			},
			speed:800
		}
	});
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
		if ($(window).width() != windowWidth) {
			sliderSwiper.destroy();
			slide();
			windowWidth = $(window).width();
		}
	});

	return sliderSwiper;
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
			// pagination: {
			// 	el: '#requestWorkSlider .swiper-pagination',
			// 	clickable: true,
			// },			  
			autoplay: {delay:5000, disableOnInteraction:false},
			loop: true,
			speed:1000,
			breakpoints: {
			1024: {
					slidesPerView:'2',
					//spaceBetween:5,
					centeredSlides:true
				},
			768: {
				slidesPerView:'auto',
				spaceBetween:0,
				centeredSlides:true
				},
			420: {
				slidesPerView:'1',
				centeredSlides:false
				}
			}			
		}
	});
}

function artWorkSlider1(){
	var load = false;
	function setSize(){
		var count = $('#artWorkSlider1 .swiper-slide .work .img img').length;
		$('#artWorkSlider1 .swiper-slide .work .img img').each(function(i){
			var setObj = $(this).parents('.work');
			setObj.attr('style', '');
			var w = $(this).width();
			setObj.width(w);
			if (i+1 === count) {
			}
		});
	}
	setSize();
	//setTimeout(setSize, 100);
	$(window).resize(function(){
		setTimeout(setSize, 100);
	});

	sliderSwiper({
		obj:'#artWorkSlider1',
		sliderSetting:{
			slidesPerView:'auto',
			spaceBetween:15,
			navigation: {
				nextEl: '#artWorkSlider1 .swiper-button-next',
				prevEl: '#artWorkSlider1 .swiper-button-prev',
				clickable:true,
			},			  
			autoplay: {delay:5000, disableOnInteraction:false},
			loop: true,
			speed:1000,
			centeredSlides:false,
			breakpoints: {
				1024: {
						centeredSlides:true
					}
			}				
		}
	});
}

function artWorkSlider2(){
	function setSize(){
		$('#artWorkSlider2 .swiper-slide .work .img img').each(function(){
			var setObj = $(this).parents('.work');
			setObj.attr('style', '');
			var w = $(this).width();
			setObj.width(w);
		});
	}
	setSize();
	//setTimeout(setSize, 100);
	$(window).resize(function(){
		setTimeout(setSize, 100);
	});	
	sliderSwiper({
		obj:'#artWorkSlider2',
		sliderSetting:{
			slidesPerView:'auto',
			spaceBetween:15,
			navigation: {
				nextEl: '#artWorkSlider2 .swiper-button-next',
				prevEl: '#artWorkSlider2 .swiper-button-prev',
				clickable:true,
			},			  
			autoplay: {delay:5000, disableOnInteraction:false},
			loop: true,
			centeredSlides:false,		
			speed:1000,	
			breakpoints: {
				1024: {
						centeredSlides:true
					}
			}				
		}
	});
}

function artistsSlider(){
	sliderSwiper({
		obj:'#artistsSlider',
		sliderSetting:{
			slidesPerView:'auto',
			spaceBetween:22,
			navigation: {
				nextEl: '#artistsSlider .swiper-button-next',
				prevEl: '#artistsSlider .swiper-button-prev',
				clickable:true,
			},			  
			// pagination: {
			// 	el: '#artistsSlider .swiper-pagination',
			// 	clickable: true,
			// },				
			autoplay: {delay:5000, disableOnInteraction:false},
			loop: true,
			speed:1000,
			breakpoints: {
				1024: {
						spaceBetween:15,
						centeredSlides:true
					}
			}	
		}
	});
}

function workImgMoreSlider(){
	sliderSwiper({
		obj:'#workImgMoreSlider',
		sliderSetting:{
			slidesPerView: 6,
			spaceBetween:8,
			navigation: {
				nextEl: '#workImgMoreSlider .swiper-button-next',
				prevEl: '#workImgMoreSlider .swiper-button-prev',
				clickable:true,
			},
			breakpoints: {
				1024: {
						slidesPerView: 'auto'
					}
			}	
		}
	});

	$('#workImgMoreSlider .work a').on('click', function(){
		$('.workDetailImg').html($(this).html());
		$('#workImgMoreSlider li').removeClass('on');
		$(this).parents('li').addClass('on');
	});
}

function artworkImgMoreSlider(){
	sliderSwiper({
		obj:'#artworkImgMoreSlider',
		sliderSetting:{
			slidesPerView: 'auto',
			spaceBetween:8,
			navigation: {
				nextEl: '#artworkImgMoreSlider .swiper-button-next',
				prevEl: '#artworkImgMoreSlider .swiper-button-prev',
				clickable:true,
			},
			breakpoints: {
				1024: {
						slidesPerView: 'auto'
					}
			}	
		}
	});

	$('#artworkImgMoreSlider .work a').on('click', function(){
		$('.artworkDetailImg a').attr('href', $(this).find('img').attr('src'));
		$('.artworkDetailImg a').attr('data-size', $(this).find('img').attr('data-img-size'));
		$('.artworkDetailImg img').attr('src', $(this).find('img').attr('src'));
		$('#artworkImgMoreSlider li').removeClass('on');
		$(this).parents('li').addClass('on');
	});
}

function addPhotoFile(obj, callback){
	var src;

	if (obj.files && obj.files[0]) {
		var reader = new FileReader();
		reader.readAsDataURL(obj.files[0]);
		reader.onload = function (e) {
			src = e.target.result
			callback(src);
		}
	}
}

function photoAddListSlider(obj){
	var opt= {
		obj:obj,
		sliderSetting:{
			slidesPerView: 'auto',
			spaceBetween:12
		}
	}
	var photoAddListSlider = sliderSwiper(opt);

	var containerSize;
	var sliderSize;
	
	setSize(obj);
	function setSize(obj){
		containerSize = $(obj +' .swiper-container').width();
		sliderSize = 0;
		$(obj +' .swiper-slide').each(function(){
			sliderSize += $(this).outerWidth();
		});
	}

	$(document).on('click', obj +' .delete', function(){
		var index = $(this).parents('li').index();
		var objW = $(this).parents('li').outerWidth();
		setSize(obj);
		if(containerSize > sliderSize-objW){
			photoAddListSlider.destroy();
			$(this).parents('li').remove();
		}else{
			photoAddListSlider.removeSlide(index);
		}
	});

	$(obj +' .photoAddBtn input').on('change', function(){
		addPhotoFile(this, function(src){
			var objW;
			$(obj + ' ul').prepend('<li class="swiper-slide">' +
			'	<a href="javascript:void(0);" class="delete"></a>'+
			'	<a href="javascript:void(0);" class="work">'+
			'		<div class="img"><img src="'+src+'" alt="" /></div>'+
			'	</a>'+
			'</li>');
			
			// photoAddListSlider.addSlide(0, [
			// '<li class="swiper-slide">' +
			// '	<a href="javascript:void(0);" class="delete"></a>'+
			// '	<a href="javascript:void(0);" class="work">'+
			// '		<div class="img"><img src="'+src+'" alt="" /></div>'+
			// '	</a>'+
			// '</li>'
			// ]);

			setTimeout(function(){
				objW = $(obj + ' ul li').eq(1).outerWidth();
				setSize(obj);
				if(containerSize > sliderSize + objW){
					photoAddListSlider.destroy();
				}else{
					photoAddListSlider.destroy();
					photoAddListSlider = sliderSwiper(opt);
				}			
			}, 100);
	
			//photoAddListSlider.slideTo(0);
		});
	});	
}

function referenceSlider(){
	sliderSwiper({
		obj:'#referenceSlider',
		sliderSetting:{
			slidesPerView: 'auto',
			spaceBetween:12,
			navigation: {
				nextEl: '#referenceSlider .swiper-button-next',
				prevEl: '#referenceSlider .swiper-button-prev',
				clickable:true,
			}
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

function moreList(target, obj, callback){
	var toggling = false;
	function more(){
		$(target).find('ul').append(obj);
		$(target).find('li').animate({'opacity':'1'}, 350);
		$(target).find('.loading').hide();
		if(callback){
			callback();
		}	
	}
	$(window).scroll(function() {
		if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
			$(target).find('.loading').show();
			clearTimeout(toggling);
			toggling = setTimeout(more, 450);
		}
	});
}

function followScroll(obj, init, bottom){
	var initPos;
	if($('.client').length > 0){
		var quick_menu =$('.client');
		//var quick_menuH =  quick_menu.height() -100;
		var initPos = init;
		//if($('body').hasClass('main')) initPos = 910;
		var maxPos = $('body > .wrap').height() - bottom;
		var gap = 0;

		$(window).scroll(function(){
			maxPos = $('body > .wrap').height() - bottom;
			quick_menu.stop();
			if($(document).scrollTop() > (initPos-20) && $(document).scrollTop() < maxPos){
				quick_menu.animate({'top':$(document).scrollTop()+gap}, 500);
			}else if($(document).scrollTop() >= maxPos){
				quick_menu.animate({'top':maxPos}, 500);
			}else if($(document).scrollTop() <= initPos){
				quick_menu.animate({'top':initPos}, 500);
			}
		});
	}
}

function scrollMove(target){
	var pos = $(target).offset().top - parseInt($('body').css('padding-top'));
		$('html, body').animate({scrollTop:pos}, '500');

}

function desingSelect(){
	$(document).on('change', '.selectType1 select',function(){
		var val = $(this).find('option:selected').text();
		var obj = $(this).prev('.design');
		obj.text(val);
	});	
}

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

 
 function workOff(obj){
	 var parent = $(obj).parents('.work');
	 $(obj).parents('.work').toggleClass('off');
 }

 function filterList(){
	 $('.filterList li .title').on('click', function(){
		 var li = $(this).parents('li');
		if(li.hasClass('on')) li.removeClass('on');
		else li.addClass('on');
	 });
 }

 function filterListClose(obj){
	scrollPrevMove(obj);
	$('.filterList li').removeClass('on');
 }

 // show
 function show(obj, callback){
	$(obj).show();
	if(callback){
		callback(obj);
	}	
 }

 // hide
 function hide(obj, callback){
	$(obj).hide();
	if(callback){
		callback(obj);
	}	
 }

 function scrollPrevMove(obj){
	 var pos = $(obj).prev().position().top;
	 $('html, body').scrollTop(pos);
 }

//popup
function popOpen(id, callback){
	$(id).show();
	$('body').addClass('openPop');
	if(callback){
		callback();
	}

	$(id).find('.close, .mask').on('click', function(){
		$(id).hide();
		$('body').removeClass('openPop');
	});
}

function popClose(id){
	$(id).hide();
	$('body').removeClass('openPop');
}
