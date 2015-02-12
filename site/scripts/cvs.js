var _malaika = _malaika || {}; /* placed in proper closure 2014Jun16 */
_malaika['cvs'] - (function($, w, d, undefined){

document.observe('dom:loaded', function(){
		var dt = new Date();
		var mllscds = dt.getMilliseconds();
		new ClsPageInit({path:'xml/cvData.xml?noCache=' + mllscds});
});

var ClsXML = Class.create({
		initialize:function(parmDataPath){
			this._transport(parmDataPath);
			this._addObservers();
			this._transition();
		}, // End constructor
		_transition:function(){
			setTimeout(function(){
				var nodeExist = d.getElementById('contentContainer');
				var cssClass = nodeExist.getAttribute('class') || '';
				nodeExist.setAttribute('class', cssClass + ' transistion');
			}, 777);
		}, // End _transition		
		_transport:function(parmPath){
			var req = new Ajax.Request(parmPath, {
				method:'POST',
				onFailure:function(){
					try{throw new _malaika.exceptions.exceptions.xml('transport');}catch(EX){util.message.xprint([EX.message], true)};
				}, /* End onFailure */
				onSuccess:function(){
				}, /* End onSuccess */
				onComplete:function(parmTransport){
					_malaika.cvsCache.cache.xml.docElm.node = parmTransport.responseXML.documentElement;
					document.fire('xml:cached', _malaika.cvsCache.cache.xml.docElm.node);
				} /* End onComplete */
			}); /* End req */
		}, // End _transport()
		_addObservers:function(){
			var lstnrCacheXMLGroups = this._lstnrCacheXMLGroups.bindAsEventListener(this);
			document.observe('xml:cached', lstnrCacheXMLGroups);
		}, // End _addObservers()
		_lstnrCacheXMLGroups:function(parmEvent){
			var xmlChilds = $A(parmEvent.memo.childNodes);
			var hdlrCacheXMLGroups = this._hdlrCacheXMLGroups.bind(this); 
			xmlChilds.each(hdlrCacheXMLGroups);
			document.fire('xml:groupsCached', _malaika.cvsCache.cache.xml.docElm.groups);
		}, // End _lstnrCacheXMLRows()
		_hdlrCacheXMLGroups:function(parmNode){
			if(parmNode.nodeType == 1){
				_malaika.cvsCache.cache.xml.docElm.groups.push(parmNode);
			} // End if()
		} // End _hdlrCacheXMLGroups()
		
}); // End ClsXML

var ClsPageInit = Class.create(ClsXML, {
		initialize:function($super, parmData){
			/* Prevent Chrome and Safarie from rendering the data more than once by repeatedly firing custom events attached to the DOM */
			if(_malaika.cvsCache.cache.xml.blnIsLoaded == true){
				return false;
			} /* End if() */
			$super(parmData.path);
			this.elmTbodyExist = $$('#table0 tbody')[0];
			this.intRowId = 0;
			this.cssClassRow = 'evenRow';
			this.intNumOfEmptyCells = 0;
			this._subAddObservers();
			_malaika.cvsCache.cache.xml.blnIsLoaded = true;
		}, // End constructor
		_subAddObservers:function(){
			var lstnrBuildTableHTML = this._subLstnrBuildTableHTML.bindAsEventListener(this);
			document.observe('xml:groupsCached', lstnrBuildTableHTML);
		}, // End _addObservers
		_subLstnrBuildTableHTML:function(parmEvent){			
			var xmlGroups = $A(parmEvent.memo);
			var hdlrBuildHeaders = this._hdlrBuildHeaders.bind(this);
			xmlGroups.each(hdlrBuildHeaders);
		}, // End _subLstnrBuildTableHTML()
		_hdlrBuildHeaders:function(parmXMLHeaderNode){
			this.cssClassRow = 'evenRow';
			var elmRow = new Element('tr', {'id':'tr' + this.intRowId++});
			var elmCol =  new Element('th', {'class':'someClass'});
			elmCol.writeAttribute('colspan', '2');
			elmCol.update(parmXMLHeaderNode.attributes[0].value);
			elmRow.insert(elmCol);
			this.elmTbodyExist.insert(elmRow);
			var hdlrBuildRows = this._hdlrBuildRows.bind(this);
			$A(parmXMLHeaderNode.childNodes).each(hdlrBuildRows);
			/* TODO: insert our related rows for each group */
		}, // End _hdlrBuildHeaders()
		_hdlrBuildRows:function(parmXMLRowNode){	
			this.intNumOfEmptyCells = 0;
			if(parmXMLRowNode.nodeType == 1){
				var elmRow = new Element('tr');
				elmRow.addClassName(this.cssClassRow);
				for(var i = 0; i < parmXMLRowNode.childNodes.length; i++){
					if(parmXMLRowNode.childNodes[i].nodeType == 1){
						var elmCol = new Element('td');
						if(parmXMLRowNode.childNodes[i].firstChild.nodeValue.length > 70){
							elmCol.addClassName('longText');
						}
						
						elmCol.update(parmXMLRowNode.childNodes[i].firstChild.nodeValue);
						if(parmXMLRowNode.childNodes[i].firstChild.nodeValue.length == 1){
							this.intNumOfEmptyCells++;
						} /* End if() */
						elmRow.insert(elmCol);
						this.elmTbodyExist.insert(elmRow);
					} /* End if() */
				} /* End for() */
				if(this.intNumOfEmptyCells > 2){
					this.cssClassRow == 'evenRow';
				} /* End if() */
				else{
					this.cssClassRow == 'evenRow' ? this.cssClassRow = 'oddRow' : this.cssClassRow = 'evenRow';	
				} /* End else */
			} /* End if() */
		} // End _hdlrBuildHeaders()		
}); // End ClsPageInit


})(Prototype, window, document);