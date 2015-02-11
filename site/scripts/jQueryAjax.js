/*
Purpose: only get XML data. NO processing here
Parameters: base path, file name
*/
var charbonneau = {
	getFile:function(options){
		$.ajax({
			url:options.base + options.file,
			context:document.body,
			'text.xml':jQuery.parseXML,
			crossDomain:false,
			dataType:'xml',
			ifModified:true,			
			success:function(parmData){
				// pass the XML Documetn to the callback function
				options.callback.apply(this, [parmData]);				
			},
			statusCode:{
				404:function(){console.log('Exception: 404 - file not found');}
			},
			error:function(){console.log('Exception: charbonneau.getFile Ajax request failed');}
		}).done(function(){/* anything after done */});

	}, // End getFile
	getData:function(options){
		// any external calls should call charbonneau.getData()
		// the callback function is required for XML data to be accessed by an external file
		// using a callback allows external calls to gain access to the private variable parmData which is the XML Document
		charbonneau.getFile({base:options.base, file:options.file, callback:options.callback});
	} // End getData
}; // End namespace charbonneau