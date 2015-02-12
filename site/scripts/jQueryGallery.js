// Reference: http://www.jacklmoore.com/colorbox/example1/
(function(w, d, $){
	$(function(){
		var node = {
			copyright:function(){
				var n = {p:document.createElement('p'), c:document.createElement('span')};
				$(n.p).addClass('copyright');
				n.p.innerHTML = 'Malaika Z. Charbonneau &#169;';
				return n.p;
			},
			ajaxImg:{id:'ajaxLoading', src:'./images/ajaxLoaderTransparentSmall.gif'},
			title:null
		};

		// custom events
		$('#contentContainer').bind('DOM:XMLToDOM', function(e){			
			$('.swatchImg').colorbox({
					rel:'swatchrelation',
					width:'60%',
					height:'79%',
					top:'-3%',
					preloading:true,
					transition:'none',
					onLoad:function(e){
						var nodeImg = document.createElement('img');
						$(nodeImg).attr({'id':node.ajaxImg.id, 'src':node.ajaxImg.src});
						$('#colorbox').append(nodeImg);

						// disable right click
						$('#colorbox').bind('contextmenu', function(){return false;});
						// hide controls and image during onload to prevent clutter during user clicking through canvas'
						$('.cboxControls').css({visiblility:'hidden'});
						
						$('.cboxPhoto').addClass('hidden');
						// title from swatch that was clicked
						$('#colorbox .canvasTitle').remove();
						
						node.title = '&#8212;&#160;' + $(this).next().find('span')[0].innerHTML + '&#160;&#8212;';
					}, // End onLoad
					onComplete:function(e){
						$('#' + node.ajaxImg.id).remove();
						var n = document.createElement('span');
						n.innerHTML = node.title;
						$(n).insertBefore('#cboxWrapper').addClass('canvasTitle');
						$('.copyright').remove();
						$(node.copyright()).insertAfter('.canvasTitle');
						$('#colorbox').css({'padding-bottom':'5%', 'cursor':'text', 'background-image':''});
						$('#colorbox').removeClass('canvasLoading');
						$('#cboxLoadedContent').css({overflow:'hidden'});
						$('#cboxClose').addClass('cboxControls');
						$('#cboxPrevious').addClass('cboxControls');
						$('#cboxNext').addClass('cboxControls');
						$('.cboxPhoto').removeClass('hidden').css({'cursor':'text'});
						// set image's properties
						utils.scaleCanvas({node:$('.cboxPhoto')});						
						$('.cboxControls').removeClass('hidden');
					} // End onComplete
			}); // End $('.swatchImg').colorbox()
			// remove page is loading image
			$('#contentContainer').removeClass('loadingSwatches');
		}); // End bind('DOM:XMLToDOM)
		
		// ensure clicking on anchor does NOT affect the locations address. Otherwise the HREF value is appended to the URL
//		$('li a.active').bind('click', function(){return false;});
//		charbonneau.getFile({base:'./xml/', file:'gallery.xml?noCache=' + new Date().getTime()});
		var xml = {
			docElement:null,
			input:{file:{node:'file', attributes:['base']}},
			output:{basePath:null},
			node:{
				parent:'canvas',
				isSold:'isSold',
				title:'title',
				date:'date',
				swatch:'swatch',
				file:'fileName',
				media:'media',
				dim:'dimension'
			}
		};
		var html = {
			buildDOM:function(){				
				var intNumXMLNodes = xml.docElement.getElementsByTagName('canvas').length;
				// define rendor.order[]
				// generateImageOrder defined in generateRandom.js
				generateImageOrder(intNumXMLNodes);
				
				// set our xml.output.basePath
				html.setFilePath();
				var swatchContainer =  document.createElement('div');
				var imgBasePath = xml.output.basePath;
				var $array = [];

				// build array of DOM fragments from XML data
				$(xml.docElement).find('canvas').each(function(index, elm){
					// send each XML canvas node to buildFrag
					// buildFrag returns a document fragment
					$array[ rendor.order[index] ] = utils.buildFrag(this);
				});
				// optimization: append each swatch fragment to a temporary container that is not part of the DOM
				// this prevents us from touching the DOM until all of our swatches are collected into a single container
				utils.appendDoc($array, swatchContainer);
				// optimization: append the swatch container to the DOM. So were touching the DOM once only
				$(swatchContainer).appendTo('#contentContainer');
				// Define custom event which indicates DOM is built
				// trigger custom event listener builds click events for each swatch
				$('#contentContainer').trigger('DOM:XMLToDOM');
			}, // End buildDOM
			setFilePath:function(){
				$(xml.docElement).find(xml.input.file.node).each(function(){xml.output.basePath = this.getAttribute('base');});
			}
		};
		var data = {
			array:[]
		};
		var utils = {
			appendDoc:function(parmFragArray, parmSwatchContainer){
				for(var i = 0, len = parmFragArray.length; i < len; i++){
					$(parmFragArray[i]).appendTo(parmSwatchContainer);
				}
			},
			scaleCanvas:function(options){
				var dim = {width:options.node.outerWidth(), height:options.node.outerHeight()};
				var percnt = 90/100;				
				var parent = options.node.parent('div');
				var dimPar = {width:parent.outerWidth(), height:parent.outerHeight()};
				var diff = dimPar.width - dim.width;
				var nodeCopyright = $('.copyright');
				
				// override parent settings in colorbox.js
				parent.css({'overflow':'visible'});
				options.node.css({ 'margin-top':'30px'});
				// font-size relative to width
				nodeCopyright.css({'font-size':dim.width/3 + '%'});
				// scale canvas if difference parent width and canvas width is small, indicating large canvas
				if(diff <= 340){
					options.node.attr({'width':(dim.width * percnt), 'height':(dim.height * percnt)} );
					options.node.css({ 'display':'block', 'margin-left':'auto', 'margin-right':'auto'});
				}
			},
			buildFrag:function(parmXMLNode){
				// container for containerLeft and containerRight
				var container = document.createElement('div');
				var containerLeft = document.createElement('a');
				// clicking on anchor has no affect on location, keeping the url clean. This ensures the page does not scroll to bookmark
				$(containerLeft).attr('onclick', 'return false;');
				var containerRight = document.createElement('div');
				var $breaks = [document.createElement('br'), document.createElement('br'), document.createElement('br'), document.createElement('br')];
				
				
				var containersText = [];				
				
				var intCounter = 0;
				// build nodes for right side swatch text
				$(parmXMLNode.childNodes).each(function(index, elm){
					if(this.nodeType == 1){
						containersText[intCounter++] = document.createElement('span');
					}
				});
				
				// swatch image
				$(containerLeft).attr({href:xml.output.basePath + parmXMLNode.getElementsByTagName(xml.node.file)[0].firstChild.nodeValue});
				$(containerLeft).css('background-image', 'url("'+ xml.output.basePath + parmXMLNode.getElementsByTagName(xml.node.swatch)[0].firstChild.nodeValue + '")');
				$(containerLeft).addClass('swatchImg');
				$(containerLeft).appendTo(container);
				
				// swatch data
				$(containersText[0]).text(parmXMLNode.getElementsByTagName(xml.node.title)[0].firstChild.nodeValue);
				
				var dim = {
					width:parmXMLNode.getElementsByTagName(xml.node.dim)[0].getAttribute('width'),
					height:parmXMLNode.getElementsByTagName(xml.node.dim)[0].getAttribute('height')
				};

				if(dim.width !== "''"){
					$(containersText[1]).text(dim.width + ' inches X ' + dim.height + ' inches');		
				}else{

					$(containersText[1]).text('unspecified');
				}
				
				
				$(containersText[2]).text(parmXMLNode.getElementsByTagName(xml.node.media)[0].firstChild.nodeValue);
				// test if item is sold, and position it next to last node in containersText
				if( parmXMLNode.getAttribute(xml.node.isSold).match(/true/i) ){
					$(containersText[3]).text('SOLD').addClass('sold');
				}else{
					$(containersText[3]).text(parmXMLNode.getElementsByTagName(xml.node.date)[0].firstChild.nodeValue);
				}
				// ensure canvas file name is the last node in our containersText
				$(containersText[4]).text(parmXMLNode.getElementsByTagName(xml.node.file)[0].firstChild.nodeValue);

				// append each text container to containerRight
				for(var i = 0; i < 5; i++){					
					$(containersText[i]).appendTo(containerRight);
					// hide canvas image name
					if( $(containersText[i]).text().match(/.jpg/) ){$(containersText[i]).addClass('hidden canvasImage');}
					$($breaks[i]).insertAfter(containersText[i]);
				}
				// raise .swatchImg click event for colorbox otherwise the swatch image is the only way to render the colorbox
				$(containerRight).appendTo(container).bind('click', function(e){$(this).prev().trigger('click');});
				$(containerRight).addClass('swatchTxt');
				$(container).addClass('swatchBlock');
				// return swatch DOM fragment
				return container;
			}
		};
		// get data
		charbonneau.getData(
			{ // configuration for getData
			base:'./xml/', 
			file:'gallery.xml?noCache=' + new Date().getTime(),
			callback:function(parmXMLDoc){
				// access the returned XML Documuent Element
				xml.docElement = parmXMLDoc.documentElement;
				// invoke XML to HTML Processing Modal				
				var lclInterval = w.setInterval(function(){
					if(!!xml.docElement){ // 2015 Feb 10, fix page attempting to renderr swatches before XML is retrieved. We should implement a listener for this
						w.clearInterval(lclInterval);
						html.buildDOM();
					}
				}, 333);
			}
		}); // End getData
	}); // End DOM ready
})(window, document, jQuery);