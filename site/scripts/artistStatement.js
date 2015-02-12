var _malaika = _malaika || {};
_malaika['artistStatement'] = (function(w, d, undefined){

	var _setAttribute = function(options){

		for(var i = 0, len = options.childs.length; i < len; i++){
			options.childs[i].setAttribute(options.attribute, options.val);
		}	
	
	};

	var objInterval = setInterval(function(){
		if( !!d.getElementsByTagName('p') ){			
			clearInterval(objInterval);
			var nodeExist = d.getElementById('contentContainer');
			var nodeExistChilds = nodeExist.getElementsByTagName('p');
			
			_setAttribute({childs:nodeExist.getElementsByTagName('p'), attribute:'class', val:'transition'});
		}	
	}, 333);

})(window, document);