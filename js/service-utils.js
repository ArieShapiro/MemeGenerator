'use strict';

// Save data to local storage
function saveToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

// Load data from local storage
function loadFromStorage(key) {
	return JSON.parse(localStorage.getItem(key))
}

// Hide an HTML element
function hideElement(selector) {
	document.querySelector(selector).style.display = 'none';
}

// Show an HTML element
function showElement(selector) {
	document.querySelector(selector).style.display = 'block';
}

// Create a unique ID
function makeId() {
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var length = 6;
	var txt = '';
	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return txt;
}

// Flatten an array of arrays
function flattenArray(values) {
	return values.reduce(function (acc, currentValue) {
		if (Array.isArray(currentValue)) currentValue = flattenArray(currentValue);
		return acc.concat(currentValue);
	}, []);
}

// Sort an array by occurrences
function sortArrayByOccurrences(values) {
	// Map occurrences
	var occurObj = values.reduce(function (acc, currentValue) {
		acc[currentValue] = (acc[currentValue]) ? acc[currentValue] + 1 : 1;
		return acc;
	}, {});

	// Sortable array
	var sortable = [];
	for (var item in occurObj) {
		sortable.push([item, occurObj[item]]);
	}

	// Sort the array
	sortable.sort(function (a, b) {
		return b[1] - a[1];
	});

	return sortable;
}
