/*
Purpose			: hide adverts
Parameters		: none
Dependencies	: prototype.js
Return			: none
Notes			: this function is a single purpose function
				: simply instantiate it
*/
var Adverts = Class.create({
    /* constructor */
    initialize:function(){
		this.cssIdMenu = 'menu';
		this.cssIdImageMask = 'mask0';
		this._hide();
		this._addObservers();
    },
    /* instance method */
    _hide:function(){
		var nodeAdvertisment = document.getElementsByTagName('body')[0].firstChild;
		if( (nodeAdvertisment.nodeType == 1) && (nodeAdvertisment.tagName.toUpperCase() == 'IFRAME') ){
			var nodeAdvertismentID = nodeAdvertisment.getAttribute('id');
			$(nodeAdvertismentID).remove();				
			document.fire('advert:hidden');
		} // End if()
    }, // End _hide()
	_addObservers:function(){
		var listenerSetMenuPos = this._setMenuPosition.bindAsEventListener(this);
		document.observe('advert:hidden', listenerSetMenuPos);
	}, // End _addObservers()
	_setMenuPosition:function(parmEvent){
		var nodeMenu = $(this.cssIdMenu);
		nodeMenu.setStyle({position:'relative'});
	}, // End namespace _setMenuPosition	
	setImageMaskPosition:function(){
		try{
			var nodeImageMask = $(this.cssIdImageMask);
			nodeImageMask.setStyle({position:'absolute'});
		}
		catch(EX){
			// Do nothing menu node does not exist
		} // End catch()
	} // End namespace setImageMaskPosition
}); // End Class Adverts








