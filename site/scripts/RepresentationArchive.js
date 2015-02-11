/* TODO: namespace this boolean trigger */
var blnDataRendered = false;
document.observe("dom:loaded", function(){										
	var dt = new Date;
	var ml = dt.getMilliseconds();
	new ClsPageInit({pathData:'xml/dataRepresentation.xml?noCache=' + ml});
});

var ClsPageInit = Class.create(ClsXmlReq, {
		initialize:function($super, parmOptions){
			if(blnDataRendered == true){
				return void(0);
			} /* End if() */			
			this.docTable = $('contentTable');
			this.nodeNewTbody = null;
			this._childsFirstNodesXML = [];
			this._addObservrs();
			$super(parmOptions.pathData);
			blnDataRendered = true;
		}, // End constructor
		_addObservrs:function(){
			var lstnrBuild = this._lstnrBuild.bind(this);
			document.observe('xmlNodes:retrieved', lstnrBuild);
		}, // End _addObservrs()
		_lstnrBuild:function(parmEvent){
			var hdlrControllerBuild = this._hdlrControllerBuild.bind(this);
			parmEvent.memo.each(hdlrControllerBuild);
		}, // End _lstnrBuildTbodys()
		_hdlrControllerBuild:function(parmNodeXml){			
			var childsFirst = $A(parmNodeXml.childNodes);
			var hdlrNodeIsElement = this._hdlrNodeIsElement.bind();
			this._childsFirstNodesXML = childsFirst.select(hdlrNodeIsElement);
			this.nodeNewTbody = this._buildTbody($('contentTable'));
			this._buildHeaderRow(this.nodeNewTbody, parmNodeXml);
			this._buildRow(this.nodeNewTbody);
		}, // End _hdlrBuildTBodys()
		_buildTbody:function(parmNodeHTML){
			var newNodeTBody = new Element('tbody');
			parmNodeHTML.insert(newNodeTBody);
			return newNodeTBody;
		}, // End _buildTbody()
		_buildHeaderRow:function(parmNodeHTML, parmNodeXML){
  			var newNodeRow = new Element('tr');
			var newNodeCol = new Element('th');
			var newNodeSpan = new Element('span');
			newNodeSpan.update(this._childsFirstNodesXML[0].firstChild.nodeValue);
			newNodeCol.update(parmNodeXML.attributes[0].nodeValue);
			newNodeCol.insert(newNodeSpan);
			newNodeRow.insert(newNodeCol);
			parmNodeHTML.insert(newNodeRow);
		}, // End _buildHeaderRow()
		_buildRow:function(parmNodeHTML){
			var hdlerBuildRows = this._hdlerBuildRows.bind(this);
			this._childsFirstNodesXML.each(hdlerBuildRows);
		}, // End _buildRows()
		_hdlerBuildRows:function(nodeXML){
			if(nodeXML.tagName.indexOf('0') > 0){
				return void(0);
			} /* End if() */
  			var newNodeRow = new Element('tr');
			var newNodeCol = new Element('td');
			var newNodeSpan = new Element('span');
			if(nodeXML.firstChild.nodeValue.indexOf('www.') >= 0){
				var newNodeAnchor = new Element('a');
				newNodeAnchor.writeAttribute('href', 'http://' + nodeXML.firstChild.nodeValue);
				newNodeAnchor.writeAttribute('target', '_blank');
				newNodeAnchor.update(nodeXML.firstChild.nodeValue);
				newNodeSpan.insert(newNodeAnchor);
			} /* End if() */
			else{
				newNodeSpan.update(nodeXML.firstChild.nodeValue);
			} /* End else */
			newNodeCol.insert(newNodeSpan);
			newNodeRow.insert(newNodeCol);
			this.nodeNewTbody.insert(newNodeRow);
		} // End _hdlerBuildRows()
}); // End ClsPageInit