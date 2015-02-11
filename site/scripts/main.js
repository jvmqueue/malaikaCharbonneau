var _malaika = _malaika || {};

_malaika['main'] = (function($){
	var base = 'scripts/';
	var scripts = [
		'jQueryAjax.js',
		'generateRandom.js',
		'jquery.colorbox.js',
		'jQueryGallery.js',
		'jQueryColorbox.js'
	]	
	$(function(){
		$(scripts).each(function(data, value){
			$.getScript(base + value);
		});			   
	})
})(jQuery);