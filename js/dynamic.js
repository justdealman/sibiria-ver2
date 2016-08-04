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
});