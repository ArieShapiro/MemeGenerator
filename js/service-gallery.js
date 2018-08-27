'use strict';

var gGallery = []; // An array of objects: { id: '', url: '', keywords: '' }



// Retrieve the gallery model
function getGallery() {
	return gGallery;
}

// Add initial images to the images model
function addImages() {
	addImage('img/2.jpg', ['happy', 'dance']);
	addImage('img/003.jpg', ['crazy', 'sarcastic', 'trump', 'president']);
	addImage('img/004.jpg', ['happy', 'animal', 'dogs']);
	addImage('img/005.jpg', ['kids', 'calm', 'slip', 'animal', 'baby', 'dog']);
	addImage('img/5.jpg', ['sarcastic', 'kids', 'baby']);
	addImage('img/006.jpg', ['animal', 'calm', 'cat', 'animal', 'sleep']);
	addImage('img/8.jpg', ['happy']);
	addImage('img/9.jpg', ['crazy', 'sarcastic', 'kids']);
	addImage('img/12.jpg', ['crazy', 'smart']);
	addImage('img/19.jpg', ['crazy', 'sarcastic', 'scream']);
	addImage('img/Ancient-Aliens.jpg', ['sarcastic', 'smart']);
	addImage('img/drevil.jpg', ['crazy', 'sarcastic']);
	addImage('img/img2.jpg', ['happy', 'kids', 'dance']);
	addImage('img/img4.jpg', ['crazy', 'sarcastic', 'trump', 'president']);
	addImage('img/img5.jpg', ['kids', 'baby']);
	addImage('img/img6.jpg', ['animal', 'dog']);
	addImage('img/img11.jpg', ['happy', 'obama', 'president']);
	addImage('img/img12.jpg', ['sad', 'kiss', 'boxing', 'box']);
	addImage('img/leo.jpg', ['happy', 'leo', 'dring']);
	addImage('img/meme1.jpg', ['sarcastic', 'motphius']);
	addImage('img/One-Does-Not-Simply.jpg', ['happy']);
	addImage('img/Oprah-You-Get-A.jpg', ['happy', 'crazy', 'oprah']);
	addImage('img/patrick.jpg', ['happy', 'star treck']);
	addImage('img/putin.jpg', ['sarcastic', 'crazy', 'president', 'putin']);
	addImage('img/X-Everywhere.jpg', ['happy', 'kids', 'toys']);
}

// Add a single image to the images model
function addImage(imgUrl, keywords) {
	gGallery.push(createImage(imgUrl, keywords));
}

// Create a single image object
function createImage(imgUrl, keywords) {
	return {
		id: makeId(),
		url: imgUrl,
		keywords: keywords
	}
}

// Retrieve an image by image id
function getImage(imgId) {
	var res = gGallery.filter(function (image) {
		return image.id === imgId;
	});
	return res[0];
}
