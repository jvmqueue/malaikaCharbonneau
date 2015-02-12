/* ********************* Begin Generate Random ********************* */

/* ******* Begin file notes ******* */
/*
Purpose			: generateRandom.js generates a random ordered array composed of "distinct integers"
				: then we use the random order values in the array to determine the rendor order of gallery images
Dependencies	: gallery.js must be linked to the document, because this file depends on the object's defined in gallery.js
Notes			: Code reuse: simply redefine the array in function countArt() which determines how many unique integers are to be calculated
*/
/* ******* End file notes ******* */

rendor =
{
	/* order which gallery will be rendored */
	order:[],
	/* number of each value in order[] */
	numOfEachVal:[]
} // End object literal rendor



/*
Purpose			: generates an array filled with random values between 0 and number of gallery.title.length, find this literal in gallery.js
				: acts as a controller
				: thus, all required functions are called here
				: from a purist perspective, there should be no logic here, simply function calls
Parameters		: none
Dependencies	: gallery is an object literal defined in gallery.js
Return			: 
Notes			: 
*/
function generateImageOrder(parmCardinality)
{
	/* fillRandom populates our object literal rendor.order[] array */
	fillRandom(parmCardinality);
	/* count the number of each value in rendor.ordinal, 0 for no-value, 1 for value exists once, 2 for value exists twice, etc */
	countNumOfEachVal();
	/* replace repeated values with -1, an invalid value */
	removeRepeatedValues();
	/* finally, replace the -1 values with values that do not already exist */
	correctRendorOrder();
} // End function

/*
Purpose			: fill an array with random values
Parameters		: none
Dependencies	: countArt() counts number of a art pieces
				: getRandom() retrieves a single random value
				: rendor.order[] an object literal acts as a member-level variable, defined in gallery.js
Return			: none
Notes			: good example of "divide and conquer"
				: loop through each value in our array 
				: let getRandom() compute the next value
*/
function fillRandom(parmCardinality){
	var numOfArtPieces = parmCardinality;
	for(var i = 0; i < numOfArtPieces; i++)
	{
		rendor.order[i] = getRandom(numOfArtPieces);
	} // End for()
} // End fillRandom()

/*
Purpose			: count the number of each value in rendor.order[] array
				: 0 for value does not exist, 1 for value exists once, 2 for value exists twice, etc
Parameters		: none
Dependencies	: rendor.order[] is an object literal, defined in gallery.js
				: rendor.numOfEachVal[] is an object literal, acting as a member-level variable, defined in generateRandom.js
Return			: none, we are using member-level arrays to store our values
Notes			: 
*/
function countNumOfEachVal()
{
	/* initiate our numOfEachVal array to zero */
	for(var i = 0; i < rendor.order.length; i++)
	{
		rendor.numOfEachVal[i] = 0;
	} // End for()
	/* increment each relative to render.order[i]'s value  */
	for(var i = 0; i < rendor.order.length; i++)
	{
		/* rendor.order[3] has value 15, so increment rendor.numOfEachVal[15] */
		/* rendor.order[4] has value 19, so increment rendor.numOfEachVal[19] */
		/* let the position in rendor.numOfEachVal represent the value in rendor.order */
		rendor.numOfEachVal[rendor.order[i]]++;
	} // End for()
} // End countNumOfEachVal()

/*
Purpose			: remove repeated values in a random array
Parameters		: none
Dependencies	: rendor.order[] defined in rendor object literal, acting as a member-level variable
				: rendor.numOfEachVal[] an object literal that notes number of each value in rendor.order[]
Return			: none, we are using object literal rendor to store values
Notes			: 
*/
function removeRepeatedValues()
{
	/* the position values in ordinalExists[] represent the number of times that value exists in rendor.order[]  */
	var ordinalExists = new Array(rendor.order.length);
	/* assume there are no values in our rendor.order[] array */
	for(var i = 0; i < ordinalExists.length; i++)
	{
		ordinalExists[i] = 0;
	} // End for()
	/* now, let's remove any repeated value if it's not the first instance */
	for(var i = 0; i < rendor.order.length; i++)
	{
		/* catch first instance of value */
		/* each position in ordinalExists[] represents the number of times that value is in rendor.order */
		/* if rendor.order[2] = 17 then increment ordinalExists[17], we know we have one value of 17 in rendor.order[] */
		/* if rendor.order[3] = 5 then increment ordinalExists[5], we know we have one value of 5 in rendor.order[] */
		ordinalExists[rendor.order[i]]++;
		/* if rendor.order[2] = 17, check ordinalExists[17] see if that position has been incremented more than once */
		/* if rendor.order[5] = 13 and ordinalExists[13] is more than one, we know we have more than one 13 value in rendor.order[] */
		if( (ordinalExists[rendor.order[i]] > 1) )
		{
			/* we've discovered that the value in rendor.order[] is the second or more instance of the the same value so change the value to an invalid value */
			rendor.order[i] = -1;
		} // End if()
	} // End for()
} // End removeRepeatedValues()

/*
Purpose			: change the -1 values to a new random that does not exist in rendor.order[]
Parameters		: none, we are using member-level arrays, object literals to be precise
Dependencies	: rendor.order an object literal
				: getRandom() simply returns a random number in the range of [0, rendor.order.length)
				: checkIfInRendorOrder() checks if the newValue is in rendor.order before we try to assign it
Return			: 
Notes			: 
*/
function correctRendorOrder()
{
	/* assume the value at rendor.order i already exists */
	var blnIsInRendorOrder = true;
	/* loop through our rendor order array */
	for(var i = 0; i < rendor.order.length; i++)
	{
		/* check if the value was changed to -1 */
		if(rendor.order[i] == -1)
		{
			/* ok, the value was changed to -1, get a new value */
			newValue = getRandom(rendor.order.length);
			/* check if the newValue already is in our rendor.order array */
			blnIsInRendorOrder = checkIfInRendorOrder(newValue);
			/* the newValue is in our rendor.ordinal array, get another value until checkIfInRendorOrder() knows its not in our rendor.order array */
			while(blnIsInRendorOrder == true)
			{
				newValue = getRandom(rendor.order.length);
				blnIsInRendorOrder = checkIfInRendorOrder(newValue);						
			} // End while()
			/* ok, we our out of the while loop, we know newValue is not in rendor.order replace the -1 value in rendor.order */
			rendor.order[i] = newValue;
		} // End if()
	} // End for()
} // End correctRendorOrder()			


/*
Purpose			: check our parameter against each value in our rendor.order object literal
				: ensure the value does not exist in rendor.order object literal array
Parameters		: newValue a value we want to check before we insert it into our rendor.order array
Dependencies	: rendor.order is an object literal
Return			: blnFound true if the value exists in our rendor.order array
				: blnFound false if the value does not exist in our rendor.order array
Notes			: 
*/
function checkIfInRendorOrder(parmNewValue)
{
	for(var i = 0; i < rendor.order.length; i++)
	{
		if(parmNewValue == rendor.order[i])
		{
			/* discovered that parmNewValue exists in rendor.order return true, exit the function */
			return true;
		} // End if()
	} // End for()
	/* ok, the if condition never was satisfied, parmNewValue does not exist in rendor.order[] */
	return false;
} // End checkIfInRendorOrder()



/*
Purpose			: calculate a random number based on the cardinality of a set
				: in this case the set is the gallery.title[] array
Parameters		: parmCardinality the number of elements in gallery.title or in any array
Dependencies	: none
Return			: random number between [ 0, parmCardinality ), inclusive on the left, exclusive on the right
Notes			: 
*/
function getRandom(parmCardinality)
{
	var intRandom = Math.random();
	intRandom = intRandom * (parmCardinality);
	intRandom = Math.floor(intRandom);
	return intRandom;
} // End getRandom()

/*
Purpose			: count number of pieces of art
Parameters		: none
Dependencies	: gallery.title an object literal in gallery.js that is an array that identifies our art pieces
Return			: number of art pieces
Notes			: 
*/
function countArt()
{
	var numOfArtPieces = 0;
	/* count the number of non-empty contiguous values in our object literal */
	
	while(gallery.title[numOfArtPieces] != "")
	{
		numOfArtPieces++;
	} // End while()
	return numOfArtPieces;
} // End countArt()


/* ********************* End Generate Random ********************* */






















