var _malaika = _malaika || {};

_malaika['bio'] = (function(w, d){

	var transistion = (function(){
		
		var objInterval = w.setInterval(function(){ // wait for DOM
			
			if(!!d.getElementsByTagName('body')[0]){
				w.clearInterval(objInterval);
				
				var nodeChilds = d.getElementById('contentContainer').getElementsByTagName('p'),
				len = nodeChilds.length,
				strCssClass = null;				
			
				for(var i = len - 1; i > -1; i--){ // no reason, just because we can step backwards
					strCssClass = nodeChilds[i].getAttribute('class') || '';
					strCssClass += ' transition';
					nodeChilds[i].setAttribute('class', strCssClass);
				}
			}
			
		}, 111); // End objInterval
		
	})();

})(window, document);