$(function() {
	$('input[type="checkbox"]').uniform();
	$('.filter-b ul li').each(function() {
		var t = $(this);
		var thisMin = eval(t.find('.slide').attr('data-min'));
		var thisMax = eval(t.find('.slide').attr('data-max'));
		var start = eval(t.find('.slide').attr('data-start'));
		var end = eval(t.find('.slide').attr('data-end'));
		var step = eval(t.find('.slide').attr('data-step'));
		$(this).find('.slide').slider({
			value: 20000,
			range: true,
			min: thisMin,
			max: thisMax,
			step: step,
			values: [start, end],
			slide: function(event, ui) {
				t.find('.from').val(ui.values[0]);
				t.find('.to').val(ui.values[1]);
			}
		});
		t.find('.from').val(start);
		t.find('.to').val(end);
		t.find('.from').keyup(function() {
			t.find('.slide').slider('values',0,$(this).val());
		});
		t.find('.to').keyup(function() {
			t.find('.slide').slider('values',1,$(this).val());
		});
		t.find('.from').change(function() {
			if ( $(this).val() < thisMin ) {
				$(this).val(thisMin);
			}
			if ( $(this).val() > $(this).siblings('.to').val() ) {
				$(this).val($(this).siblings('.to').val());
			}
			t.find('.slide').slider('values',0,$(this).val());
		});
		t.find('.to').change(function() {
			if ( $(this).val() > thisMax ) {
				$(this).val(thisMax);
			}
			if ( $(this).val() < $(this).siblings('.from').val() ) {
				$(this).val($(this).siblings('.from').val());
			}
			t.find('.slide').slider('values',1,$(this).val());
		});
	});
	$('.img-bg').each(function() {
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	});
	$('.banner-b div').css({
		'margin-top': -$('.banner-b div').outerHeight()/2+'px'
	});
	$(window).on('scroll', function() {
		if ( $(document).scrollTop() > 272 ) {
			$('.special-e').css({
				'position': 'fixed',
				'top': '0'
			});
		} else {
			$('.special-e').css({
				'position': 'absolute',
				'top': '272px'
			});
		}
	});
	$('.special-e .close').on('click', function(e) {
		e.preventDefault();
		$(this).parent().stop().fadeOut(200);
	});
	$('.rc .gallery-m ul').jcarousel({
		scroll: 1,
		animation: 500,
		easing: 'easeInOutQuad',
		wrap: 'circular',
		vertical: true
	});
	$('.rc .gallery-m .big a').hide();
	$('.gallery-m [data-s]').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.gallery-m').find('[data-b="'+$(this).attr('data-s')+'"]').stop().fadeIn(200).siblings('[data-b]').fadeOut();
	}).filter(':first').click();
	$('.tooltip').each(function() {
		$(this).append('<span class="close"></span>');
	});
	$('.object-b .news .list ul li').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');
		var pic = $(this).parents('.news').find('.pic');
		$(this).parents('.news').find('.pic').css({
			'background': 'url("'+$(this).attr('data-img-src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	}).filter(':first').click();
	$('.object-b .news .list').jScrollPane({
		autoReinitialise: true,
		verticalGutter: 8,
	});
	$('.floor > div > div').each(function() {
		var cover = $(this).find('.cover');
		var w = cover.width(); 
		var h = cover.height(); 
		var src = cover.attr('src');
		cover.hide();
		$(this).css({'background-image': 'url('+src+')'});
		$(this).width(w);
		$(this).height(h);
		var ooo = $(this).attr('id');
		var r = Raphael(ooo, w, h), attributes = {
			fill: '#ffffff',
			opacity: '0',
			stroke: '#3899E6',
			'stroke-width': 0,
			'stroke-linejoin': 'round'
		},
		arr = new Array();
		for (var apartment in eval(ooo)) {
			var obj = r.path(eval(ooo)[apartment].path);
			obj.attr(attributes);
			arr[obj.id] = apartment;
			obj.hover(function(){
				this.stop(true, true).animate({
					fill: '#ffffff',
					opacity: '0.75'
				}, 250);
				this.attr({'cursor':'pointer'});
			}, function(){
				this.stop(true, true).animate({
					fill: attributes.fill,
					opacity: attributes.opacity
				}, 250);
				this.attr({'cursor':'default'});
			}).click(function(){
				$('.tooltip').hide();
				$('#'+ooo).parent('div').css({
					'z-index': '1'
				}).siblings().css({
					'z-index': '0'
				});
				var currentapartment = arr[this.id];
				$('#'+ooo).children('div').fadeOut(150);
				var bbox = this.getBBox();
				$('#'+ooo).find('.'+currentapartment).css({'left': (bbox.width/2)+bbox.x+'px', 'top': (bbox.height/2)+bbox.y+'px'});
				$('#'+ooo).find('.'+currentapartment).stop(true, true).fadeIn(150);
				$('#'+ooo).find('.'+currentapartment+' .close').bind('click', function() {
					$(this).parent().stop(true, true).fadeOut(150);
					return false;
				});
				return false;
			});
		}
	});
	$(document).mouseup(function(e) {
		var tooltip = $('.tooltip');
		if ( !tooltip.is(e.target) && tooltip.has(e.target).length === 0 ) {
			tooltip.hide();
		}
	});
	$('.floor > div > div').each(function() {
		$(this).css({
			'-webkit-transform': 'scale('+395/$(this).find('.cover').attr('width')+')',
			'transform': 'scale('+395/$(this).find('.cover').attr('width')+')'
		});
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('disabled') > 0 ) {
			$('.filter-opened').stop().slideUp(200);
			$('.search-result').stop().slideUp(200);
			$('.search-p .user input[type="text"]').removeClass('found');
			$('.lk-drop').stop().slideUp(250);
			var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
			$('.fade').stop(true,true).fadeIn(500);
			var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
			if ( h < $(window).scrollTop()+40 ) {
				h = $(window).scrollTop()+20;
			}
			t.css({
				'top': h+'px'
			}).stop(true,true).fadeIn(500);
		}
	});
	$('.fade, .modal .close').on('click', function(e) {
		e.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(500);
	});
	$('.zoom').fancybox({
		padding: 0,
        helpers: {
            overlay: {
              locked: false
            }
        }
	});
});