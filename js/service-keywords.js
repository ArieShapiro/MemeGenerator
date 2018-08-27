'use strict';

var gKeywords = [];



// Retrieve the keywords model
function getKeywords() {
	return gKeywords;
}

// Set images keywords
function setKeywords() {
	// Retrieve all the keywords in the gallery
	var gallery = getGallery();
	var keywords = gallery.map(function (img) {
		return img.keywords;
	});

	// Sort the keywords
	keywords = flattenArray(keywords);
	keywords = sortArrayByOccurrences(keywords);

	// Set global keywords
	gKeywords = keywords;
}
