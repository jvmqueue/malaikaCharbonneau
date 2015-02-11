var _malaika = _malaika || {}; /* refactored 2015Jun16 */
_malaika['cvsCache'] = (function(w, d, undefined){

	var _cache = {
			xml:{
				docElm:{
					node:null,
					groups:[],
					childs:[]
				},
				blnIsLoaded:false
			}
	};

	return{
		cache:_cache
	};
	
})(window, document);