var ClsXmlReq = Class.create({
		initialize:function(parmDataPath){
			this._addObservers();
			this._transport(parmDataPath);
		}, // End constructor
		_transport:function(parmPath){
			var req = new Ajax.Request(parmPath, {
					method:'get',
					onFailure:function(){
						/* TODO: define a custom exception here fail gracefully */
					}, /* End onFailure */
					onSuccess:function(){
					}, /* End onSuccess */
					onComplete:function(parmTransport){
						document.fire('xmlRequest:complete', parmTransport.responseXML.documentElement);
					} /* End onComplete */
				});
		}, // End _transport
		_addObservers:function(){
			var lstnrGetFirstChilds = this._lstnrGetFirstChilds.bindAsEventListener(this);
			document.observe('xmlRequest:complete', lstnrGetFirstChilds);
		}, // End _addObservers()
		_lstnrGetFirstChilds:function(parmEvent){
			var childsFirst = $A(parmEvent.memo.childNodes);
			var hdlrNodeIsElement = this._hdlrNodeIsElement.bind();
			var childsFirstNodes = childsFirst.select(hdlrNodeIsElement);
			document.fire('xmlNodes:retrieved', childsFirstNodes);
		}, // End _lstnrGetFirstChilds()
		_hdlrNodeIsElement:function(parmNode){
			if(parmNode.nodeType == 1){
				return true;
			} /* End if() */
			else{
				return false;
			} /* End else */
		} // End _hdlrGetFirstChilds()
}); // End ClsXmlReq