var _malaika = _malaika || {};
_malaika['nav'] = (function(w, d, undefined){


/*
Purpose			: object literal
				: URL used to compare the the page the visitor is on
				: PageTitle is in one-one correspondence with URL
				: PageTitle is what we are writing to the page to show the visitor which page they are on
				: nodeToAppendText is an id of a document element which we are writing text to
Notes			: The majority of the functions in this file will fail if this object literal is missing
*/
site = 
{
	URL:["index", "BIO", "CV", "Artist", "Gallery", "Contact", "Representation"],
	PageTitle:["index", "Biography", "Curriculum Vitae", "Artist Statement", "Gallery", "Contact", "Representation"],
	nodeToAppendText:"thisPage0",
	linkContainerId:{top:'ulNavTop', bottom:"ulNav0"}
} // End siteURL object literal



/*
Purpose			: basically, a controller
				: each page calls this at the bottom of the page, to ensure the page is loaded
Parameters		: none
Dependencies	: reverseString() 
				: getLastSlash()
				: getPageName()
				: site object literal
Notes			: 
*/
function _detectURL(){
	var winURL = window.location + "";
	/* we need the page that is showing */
	var winURLReverse = reverseString(winURL);
	var intLastSolidusPosition = getLastSlash(winURLReverse);
	var pageName = getPageName(winURL, intLastSolidusPosition);
	/* we need to match our pageName with the value in our object literal "site" */
	var intObjLiteralArrayIndex = getMatch(pageName);
	var blnHasTopMenu = true;

	/* ok, use our object literal, site, second Array that has a one-one correspondance with each Array in site */
	/* use this second Array to write to the document */
	writeMessageToDocument(intObjLiteralArrayIndex);
	/* style the link associated with the page the visitor is rendering */
	if(!(!!document.getElementById(site.linkContainerId.top)) ){
		blnHasTopMenu = false;
	}else{
		styleRespectiveLink(site.linkContainerId.top, intObjLiteralArrayIndex);
	}	
	styleRespectiveLink(site.linkContainerId.bottom, intObjLiteralArrayIndex);
} // End detectURL();

/*
Purpose			: reverse any string
Parameters		: winURL usually a window.location + "", but could be any string
Dependencies	: none
Return			: strReverse the reverse of our parameter value
Notes			: this works well when we are searching for the page name, 
				: because we need the position of the last forward slash
*/
function reverseString(winURL)
{
	var strReverse = "";
	/* loop through our parameter backwards, Starting at its length. Go until we decrease down to 0 length */
	for(var i = winURL.length; i >= 0; i--)
	{
		strReverse += winURL.charAt(i);
	} // End for()
	return strReverse;
} // End reverseString()

/*
Purpose			: measure the first incidence of a forward slash
Parameters		: parmURLReverse is a window.location in reverse order
Dependencies	: none this will work for any string
Notes			: TODO: define an if-condition to ensure parmURLReverse is not empty
				: TODO: define an if-condition to ensure parmURLReverse has a "/" or "\"
*/
function getLastSlash(parmURLReverse)
{
	var intLastSlashPosition = parmURLReverse.indexOf("/");
	return intLastSlashPosition;
} // End getLastSlash()

/*
Purpose			: return the actual page name the visitor is on
Parameters		: URL the window.location + ""
				: indexOfLastSlash the index of the position of the last "/"
Dependencies	: none
Notes			: TODO: define error-handling, like URL is empty
				: TODO: error-handling what happens when URL.substring returns nothing
*/
function getPageName(URL, indexOfLastSlash)
{
	var strPageName = URL.substring( (URL.length - indexOfLastSlash), URL.length);
	return strPageName;
} // End getPageName()

/*
Purpose			: compare a page name with an Array value defined in an object literal
Parameters		: parmPageName the page file name the visitor is on
Dependencies	: site is an object literal that must contain the URL Array object
Notes			: 
*/
function getMatch(parmPageName)
{
	parmPageName = parmPageName.toLowerCase();
	for(var i = 0; i < site.URL.length; i++)
	{
		if( parmPageName.indexOf(site.URL[i].toLowerCase()) != -1 )
		{
			return i;
		} // End if()
	} // End for()
} // End getMatch()

/*
Purpose			: write text to document
Parameters		: parmArrayIndex the index of an object literal array which has the value that matches the page the visitor is on
Dependencies	: site is an object literal with Array definitions
Notes			: 
*/
function writeMessageToDocument(parmArrayIndex)
{
	var newText = document.createTextNode(site.PageTitle[parmArrayIndex]);
	var docElement = document.getElementById(site.nodeToAppendText);
	docElement.appendChild(newText);
} // End writeMessageToDocument()


/*
Purpose			: style a page link that is represents the page the visitor is on
Parameters		: parmIntArrayIndex the index of our object literal Arrays that has the value associated with page in view
Dependencies	: site is an object literal must be defined
Notes			: 
*/
function styleRespectiveLink(parmNavContainerId, parmIntArrayIndex){
	/* access the link collection parent */
	var objNavContainer = document.getElementById(parmNavContainerId);
	/* access the link collection though the parent */
	var navLiArray = objNavContainer.getElementsByTagName("li");
	var navAnchorArray = new Array(navLiArray.length);
	var navAnchorTitle = null;
	
	/* loop through each li  */
	for(var i = 0; i < navLiArray.length; i++)
	{
		/* access all the anchor elements in the li tag, should only be one */
		navAnchorArray = navLiArray[i].getElementsByTagName("a");
		/* ok, use zero as an index, because there is only one anchor element */
		/* access the elements title attribute value */
		navAnchorTitle = navAnchorArray[0].getAttribute("title").toLowerCase();
		/* check if our object literal's array[our parameter index] is in the title */
		if(navAnchorTitle.indexOf(site.PageTitle[parmIntArrayIndex].toLowerCase()) != -1)
		{
			/* style the puppy */
			navAnchorArray[0].style.color = "#A67C4C";
			return false;
		} // End if()
	} // End for()
} // End styleRespectiveLink()

return{
	detectURL:_detectURL
};

})(window, document);