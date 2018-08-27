'use strict';

// Initialize the app
function init() {

	// Add initial images
	addImages();

	// Set images keywords
	setKeywords();

	// Set initial popular searches
	setInitPopularSearches();

	// Render popular searches on screen
	renderSearches();

	// Render keywords on screen
	renderKeywords();

	// Render gallery grid on screen
	renderGallery();

	// Load meme texts
	renderMemeTexts();

	// Load meme design
	renderMemeDesigns();

	// Show gallery screen, hide canvas
	showGallery();
}



/*************** SCREENS ***************/

// Toggle header menu
function menuToggle( el ) {
	document.querySelector('header .btn').classList.toggle('open');
	document.querySelector('header ul.nav').classList.toggle('open');
}

// Hide all sections
function hideAllSections() {
	hideElement('.canvas-section');
	hideElement('.gallery-section');
	hideElement('.about-section');
	hideElement('.contact-section');
}

// Show gallery screen
function showGallery() {
	hideAllSections();
	showElement('.gallery-section');
}

// Show gallery screen
function showCanvas() {
	hideAllSections();
	showElement('.canvas-section');
}

// Show about screen
function showAbout() {
	hideAllSections();
	showElement('.about-section');
}

// Show about screen
function showContact() {
	hideAllSections();
	showElement('.contact-section');
}



/*************** GALLERY ***************/

// Render gallery grid on screen
function renderGallery() {

	// Retrieve filter parameter
	var elKeywordsFilter = document.querySelector('#filter');
	var filterBy = elKeywordsFilter.value;

	// Filter images
	var gallery = getGallery();
	var filteredImages = gallery.filter(function (image) {
		return (image.keywords).join().includes(filterBy);
	});

	// Create HTML for each image
	var strHTML = '';
	filteredImages.forEach(function (image) {
		strHTML += `
		<li class="hex">
			<div class="hexIn">
				<div class="hexLink">
					<div class="img" style="background-image: url(${image.url})" onclick="onChangeMemeImage('${image.id}'); showCanvas();">
						<img src="${image.url}" alt="" class="img img-${image.id}" />
					</div>
				</div>
			</div>
		</li>`;
	});

	// Update gallery on screen
	var elImages = document.querySelector('.images');
	elImages.innerHTML = strHTML;
}

// Render keywords on screen
function renderKeywords() {
	var keywords = getKeywords();
	var strHTML = '';
	for (var i = 0; i < keywords.length; i++) {
		var keyword = keywords[i];
		strHTML += `<option value="${keyword[0]}">${keyword[0]}</option>`;
	}

	// Update keywords data list on screen
	var elKeywordsDataList = document.querySelector('#keywords');
	elKeywordsDataList.innerHTML = strHTML;
}

// Render popular searches on screen
function renderSearches() {
	var items = getPopularSearches();
	var lowVal = Number.MAX_VALUE;
	var highVal = 0;
	var minSize = 15;
	var maxSize = 60;

	for (var i = 0; i < items.length; i++) {
		var data = parseInt(items[i][1], 10);
		if (data > highVal) highVal = data;
		if (data < lowVal) lowVal = data;
	}

	var spreadSize = maxSize - minSize;
	var spread = highVal - lowVal;

	var strHTML = '';
	for (i = 0; i < items.length; i++) {
		data = parseInt(items[i][1], 10);
		var size = (spreadSize * (data - lowVal) / spread) + minSize;
		size = Math.round(size);
		var keyword = items[i][0];
		strHTML += `<li><span role="button" style="font-size: ${size}px" onclick="onSelectSearch('${keyword}')">${keyword}</span></li>`;
	}

	// Update popular searches on screen
	var elSearches = document.querySelector('.searches');
	elSearches.innerHTML = strHTML;
}

// When searching by keywords, save search results
function onSearch(search) {
	// Get all available keywords
	var keywords = getKeywords();

	// Check if the search equals to one of the keywords
	var keywordExist = keywords.some(function (keyword) {
		return keyword[0] === search;
	});

	// Save search to local storage
	if (keywordExist) {
		var searches = getPopularSearches();
		searches = addPopularSearches(searches, search);
		saveToStorage(getStorageKey(), searches);
	}

	renderSearches()
	renderGallery();
}

// When selecting a popular search
function onSelectSearch(keyword) {
	document.querySelector('#filter').value = keyword;
	onSearch(keyword);
}



/*************** CANVAS ***************/

// Retrieve the canvas element
function getCanvas() {
	var canvas = document.querySelector('.meme-canvas');
	return canvas;
}

// Render canvas
function renderCanvas(img) {
	var canvas = getCanvas();
	var ctx = canvas.getContext('2d');

	// Clean board
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// If no image uploaded, use meme image
	if (!img) {
		var imgId = getMemeImage();
		var imgObj = getImage(imgId);
		var img = document.querySelector('.img-' + imgObj.id);
	}

	// Set max canvas width
	var maxCanvasWidth = 550;
	var screenWidth = window.screen.availWidth - 20;
	maxCanvasWidth = (maxCanvasWidth < screenWidth) ? maxCanvasWidth : screenWidth;

	// For large image, reduce image size
	if (img.width > maxCanvasWidth) {
		img.height = img.height * (maxCanvasWidth / img.width);
		img.width = maxCanvasWidth;
	}

	// For small images, reduce canvas size
	canvas.width = img.width;
	canvas.height = canvas.width * (img.height / img.width);

	// Print Image
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	// Print text
	var texts = getMemeTexts();
	for (var i = 0; i < texts.length; i++) {
		var text = texts[i];
		var bold = (getMemeBold(text.id)) ? 'bold' : '';

		// Text size, font family and bold
		ctx.font = `${bold} ${getMemeSize(text.id)}px ${getMemeFont(text.id)}`;

		// Text Color
		ctx.fillStyle = getMemeColor(text.id);

		if (getMemeStroke(text.id)) {
			// Stroked text
			ctx.strokeStyle = getMemeColor(text.id);
			ctx.strokeText(getMemeText(text.id), getMemePositionX(text.id), getMemePositionY(text.id));
		} else {
			// Regular text
			ctx.fillText(getMemeText(text.id), getMemePositionX(text.id), getMemePositionY(text.id));
		}
	}
}



/*************** MEME ***************/

// Render meme texts from the model and render them on screen
function renderMemeTexts() {
	var currTextIdx = getMemeCurrText();
	var texts = getMemeTexts();
	var strHTML = '';
	for (var i = 0; i < texts.length; i++) {
		var text = texts[i];
		var content = getMemeText(text.id);
		var currClass = (currTextIdx === i) ? 'current' : '';
		strHTML += `
			<div class="meme-text-block meme-text-block-${text.id} ${currClass}">
				<label for="meme-text-${text.id}" class="sr-only">Text ${i + 1}:</label>
				<input type="text" value="${content}" class="meme-text meme-text-${text.id}" id="meme-text-${text.id}" onfocus="onChangeMemeCurrText('${i}')" onkeyup="onChangeMemeText(this.value)">
				<button class="btn btn-danger" onclick="onDeleteMemeText('${text.id}')">
					<i class="fas fa-times"></i>
				</button>
			</div>
		`;
	}

	// Update keywords data list on screen
	var elKeywordsDataList = document.querySelector('.input-fields-container');
	elKeywordsDataList.innerHTML = strHTML;
}

// Render meme design from the model and render it on screen
function renderMemeDesigns() {
	document.querySelector('.meme-font').value = getMemeFont();
	document.querySelector('.meme-color').value = getMemeColor();
}

// Delete line
function onDeleteMemeText(textIdx) {
	removeMemeText(textIdx);
	renderMemeTexts();
	renderCanvas();
}

// Add another text line input field
function onAddMemeText() {
	addMemeText();
	renderMemeTexts();
	renderCanvas();
}

// On upload meme image
function onChangeMemeCurrText(textIdx) {
	setMemeCurrText(textIdx);
	// renderMemeTexts();
	renderMemeDesigns();
}

// On upload meme image
function onUploadMemeImage(ev) {
	var reader = new FileReader();
	reader.onload = function (event) {
		var img = new Image();
		img.onload = renderCanvas.bind(null, img)
		img.src = event.target.result;
	}
	reader.readAsDataURL(ev.target.files[0]);
}

// On change meme image (from the gallery)
function onChangeMemeImage(imgId) {
	updateMemeImage(imgId);
	renderCanvas();
}

// On change meme text
function onChangeMemeText(text) {
	updateMemeText(text);
	renderCanvas();
}

// On change meme font
function onChangeMemeFont(font) {
	updateMemeFont(font);
	renderCanvas();
}

// On change meme color
function onChangeMemeColor(color) {
	updateMemeColor(color);
	renderCanvas();
}

// On change meme bold
function onChangeMemeBold() {
	var bold = !getMemeBold();
	updateBold(bold);
	renderCanvas();
}

// On change meme stroke
function onChangeMemeStroke() {
	var stroke = !getMemeStroke();
	updateStroke(stroke);
	renderCanvas();
}

// On meme font size increase
function onMemeSizeIncrease() {
	updateMemeSize(5);
	renderCanvas();
}

// On meme font size decrease
function onMemeSizeDecrease() {
	updateMemeSize(-5);
	renderCanvas();
}

// On meme alignment
function onMemeAlignment(pos) {
	var canvas = getCanvas();
	var ctx = canvas.getContext('2d');
	var textWidth = ctx.measureText(getMemeText()).width;
	updateMemeAlignment(pos, canvas.width, textWidth);
	renderCanvas();
}

// On move up
function moveUp() {
	updateMemePositionY(-5);
	renderCanvas();
}

// On move right
function moveRight() {
	updateMemePositionX(+5);
	renderCanvas();
}

// On move down
function moveDown() {
	updateMemePositionY(10);
	renderCanvas();
}

// On move left
function moveLeft() {
	updateMemePositionX(-10);
	renderCanvas();
}

// Handle keyboards clicks
function handleKeyPress(ev) {
	switch (ev.key) {
		case '+':
			onMemeSizeIncrease();
			break;
		case '-':
			onMemeSizeDecrease();
			break;
		case 'ArrowUp':
			moveUp();
			break;
		case 'ArrowRight':
			moveRight();
			break;
		case 'ArrowDown':
			moveDown();
			break;
		case 'ArrowLeft':
			moveLeft();
			break;
	}
}

// Download the image
function onDownloadImage(elLink) {
	var canvas = getCanvas();
	var imgContent = canvas.toDataURL('image/jpeg');
	elLink.href = imgContent;
}
