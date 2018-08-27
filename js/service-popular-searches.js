'use strict';

function getStorageKey() {
	return 'MemeGeneratorSearch';
}

// Retrieve popular searches from local storage
function getPopularSearches() {
	return loadFromStorage(getStorageKey());
}

// Add popular searches
function addPopularSearches(searches, keyword) {

	// Check if the keyword exist in the searches
	var searchExist = searches.some(function (search) {
		return search[0] === keyword;
	});

	// Add keyword
	if (searchExist) {
		// Increase count
		searches.map(function (item) {
			var count = (item[0] === keyword) ? item[1]++ : item[1];
			return [item[0], count];
		});
	} else {
		// Add new
		searches.push([keyword, 1]);
	}

	return searches;
}

// Set initial popular searches
function setInitPopularSearches() {
	// Check if searches exist in the local storage
	var searches = getPopularSearches();
	if (searches) return;

	// if not, set initial search keywords
	var initialSearches = [
		['animal', 1],
		['crazy', 3],
		['happy', 7],
		['toys', 1],
		['sarcastic', 4],
		['sad', 1],
	];
	saveToStorage(getStorageKey(), initialSearches);
}
