$(function(){
	//desingSelect();
	tabMenu();
	headerTop();
	info_desc_view();
	layerpopup1Scroll();
	layerPop2Setting();
	footerMenuType1();
	filedownLayer();
	tooltipLayer();

	topFix('#topFix');

	// 투자가이드 상세 메뉴 fix토글
	scrollMenu('.unit_bt_wrap', '.detail_menu');
});
$(window).resize(function(){
	layerpopup1Scroll();
	layerPop2Setting();

	scrollMenu('.unit_bt_wrap', '.detail_menu');
});

$.fn.hasScrollBar = function() {
	return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0)
			|| (this.prop("scrollHeight") > this.prop("clientHeight"));
};


function headerTop(){
	$('.content').scroll(function(){
		var top = $(this).scrollTop();
		if(top > 0 ){
			$('.header').addClass('fix');
			if(!$('.content').hasScrollBar()) $('.content > div[class*="_area"]').css('padding-bottom', '85px');
		}else{
			$('.header').removeClass('fix');
		}
	});

	$(window).resize(function(){
		$('.content > div[class*="_area"]').attr('style', '');
	});
}

function topFix(obj){
	$('.content').scroll(function(){
		var top = $(this).scrollTop();
		var basePos = $(obj).offset().top;
		var objH = $(obj).outerHeight();
		var headerH = $('.header').length > 0 ? $('.header').outerHeight() : 0;
		console.log(basePos,  top)
		if(basePos <= headerH ){
			$(obj).addClass('fix');
		}
	});
}

function info_desc_view(){
	$('.info_desc_view .txt_label').on('click', function(){
		var parent = $('.info_desc_view');
		if(parent.hasClass('on')){
			parent.removeClass('on');
		}else{
			parent.addClass('on');
		}
	});
}

function footerMenuType1(){
	if($('.footer_menu_type1').length <= 0) return;
	addFix();
	$(window).resize(function(){
		addFix();
	});
	function addFix(){
		if($(".content").hasScrollBar()){
			$('.footer_menu_type1').addClass('fix');
		}else{
			$('.footer_menu_type1').removeClass('fix');
		}
	}
}

function scrollMenu(menu, baseline){
	if($(menu).length <= 0 && $(baseline).length <= 0 && $(menu).hasClass('evt') <= 0) return;

	var unitH = $(menu).height();
	var footerH = $('.footer').length > 0 ? $('.footer').height() : 0;
	var basePos = $(baseline).offset().top;
	
	fnc();
	$('.content').on('scroll', function(){
		fnc();
	});

	function fnc(){
		var scrollTop  = $('.content').scrollTop() + $(window).height() - unitH;
		if(scrollTop > basePos){
			$(menu).removeClass('fix');
			$(menu).css({bottom:0});
		}else{
			$(menu).addClass('fix');
			$(menu).css({bottom:footerH});
		}
	}
}

function prevSch(){
	$('.prev_search .schtag .del').on('click', function(){
		var parent = $(this).parents('.prev_search');
		var input = $(this).parents('.inp_search2').find('input');
		parent.hide();
		input.focus();
	});
}

function repleInput(){
	$('.reple_input').on('click', function(){
		var wrap = $(this).parents('.reple_input_wrap');
		var input = $(this).find('textarea');
		var placeholder = wrap.find('.placeholder');
		var write = wrap.find('.write');
		var complete = wrap.find('.complete');
		
		input.focus();
		wrap.addClass( 'on' );
		input.attr('placeholder', '댓글은 공백포함 1,000자까지 등록이가능합니다.');
		placeholder.text('댓글을 입력하세요.');	

		$('.reple_input_wrap .dim').on('click', function(){
			var wrap = $(this).parents('.reple_input_wrap');
			wrap.removeClass( 'on' );
			input.attr('placeholder', '댓글을 입력하세요.');
			placeholder.text('댓글은 공백포함 1,000자까지 등록이가능합니다.');
		});

		input.on('keyup', function(){
			if(input.val() != '') {
				write.hide();
				complete.show();
			}else{
				write.show();
				complete.hide();
			}
		});
	});
}

function toastPop(){
	$('.toast_popup .toast').animate({bottom:70, opacity:1}, 500);
	setTimeout(function(){
		$('.toast_popup .toast').animate({bottom:-60, opacity:0}, 200);
	}, 1500);
}

function popOpen(obj){
	$(obj).show();
	$(obj).find('.dim').on('click', function(){
		$(obj).hide();
	});
 
	layerPop2Setting();
} 

function popClose(obj){
	$(obj).hide();
}

function layerpopup1Scroll(){
	if($('.layerPopup1').length <= 0) return;
	var wh = $(window).height();
	$('.layerPopup1').each(function(){
		$(this).find('.popup').css('max-height', wh*0.9);
	});
}

// function desingSelect(){
// 	$('.select_type1 select').on('change', function(){
// 		//var val = $('.select_type1 select option:selected').text();
// 		var val = $(this).find('option:selected').text();
// 		var obj = $(this).next('.design');

// 		obj.find('.placeholder').text(val);
// 		obj.addClass('selected');
// 	});	
// }

 function tabMenu(){
	//tabType1
   $('.tab_menu.evt a').on('click', function(){
	   var href= $(this).attr('href');
	   var siblings = $(this).parents('li').siblings('').find('a');
	   siblings.each(function(){
		   var h = $(this).attr('href');
		   $(this).parents('li').removeClass('on');
		   $(h).hide();
	   });
	   $(this).parents('li').addClass('on');
	   $(href).show();

	   return false;
   });
}
$(function(){
	tblOnbox();
})
function tblOnbox(){
	if($('.tbl_onbox_layer').length <= 0) return;
	var moveTop = $('.tbl_onbox_layer').parents('.tbl').find('.tbl_onbox').find('td').position().top;
	$('.tbl_onbox_layer').css({top:moveTop});
}

function filedownLayer(){
	$('.addfile_down a').on('click', function(){
		var addfile_layer = $(this).parent().find('.addfile_layer');
		addfile_layer.toggle();
	});
}

function filterBtn(){
	$(".fund_filter").on("click",function(){
		$(this).find(".ico_filter").toggleClass('on')
	});
}
 
function tooltipLayer(){
	$('.tooltip_wrap .tooltip_txt').on('click', function(){
		var tooltip_layer = $(this).parent().find('.tooltip_layer');
		tooltip_layer.toggle();
	});
	$('.tooltip_wrap .close').on('click', function(){
		var tooltip_layer = $(this).parents('.tooltip_layer');
		tooltip_layer.hide();
	});
}
 

 //레이어 팝업 컨텐츠 높이에 따른 드래그 기능 (스크롤가능 유무에 따른 바 생성)
 function layerPop2Setting(){
	
	if($('.layerPopup2').length <= 0) return;

	$('.dragable_layer').each(function(){
		var layer = $(this);		
		var docu_h = $(window).outerHeight();
		var layer_h = $(this).outerHeight()

		$('html, body').animate({
			scrollTop: $(document).scrollTop() - 50
		}, 250);

		var max = docu_h - layer_h;
		var mid = parseInt(docu_h)/2 ;
		var max2 = max < 50 ? 50 : max;    //닫기 영역 50px
		var lyTop = 0;
			
		var status = "";
		if (layer_h < mid) {
		lyTop = max;
		status = "none";
		
		} else {
		lyTop = mid;
		status = "min";
		$('.line').addClass('block')
		//dragable_layer.style.top = lyTop + "px";
		$(this).css('top', lyTop)
		}
		

		layer.draggable({
			axis: 'y',
			/*revert: true,*/
			start: function(){
				console.log( 'start drag!' + ' : ' + status );
			},
			drag: function() {
				console.log( 'dragging!: ' + layer.css('top') );
				if( status === 'none' ) {
					return false;
				}
				if( status === 'min' && parseFloat(layer.css('top')) < max2 ) {
					return false;
				}
				if( status === 'max' && parseFloat(layer.css('top')) > mid ) {
					return false;
				}
			},
			stop: function() {
				console.log( 'stop drag!' + ' : ' + status );

			// 위아래 드래그
				if( status === 'min'){
					if(parseFloat(layer.css('top')) < mid ) {
						status = 'max';
						layer.stop().animate({
							'top': max2
						}, 300);
						} else {
							layer.stop().animate({
							'top': mid
						}, 300);
					}
				} else if( status === 'max'){
					if(parseFloat(layer.css('top')) > max2 ) {
									status = 'min';
									layer.stop().animate({
										'top': mid
									});
				} else {
					layer.stop().animate({
						'top': max2
					});
					}
				}
			
			}

		});
		
	});
 }