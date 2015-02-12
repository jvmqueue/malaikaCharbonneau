var _malaika = _malaika || {};

_malaika['exceptions'] = (function(w, d, undefined){

	var _exceptions = {
			xml:function(parmType){
				this.message = null;
				switch(parmType){
					case 'transport':
						console.log('Reached transport exception--------------------');
						
						this.message = 'onFailure invalid XML data path';
						break;
					default:
						this.message = 'Generic XML Transport Exception';
				} /* End switch() */
			} /* End xml */
	}; /* End exceptions */

	return{
		exceptions:_exceptions
	};
	
})(window, document);