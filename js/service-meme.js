'use strict';

var gMeme = {
	selectedImgId: null,
	txts: [
		{
			id: 'aaa',
			text: 'Top text...',
			font: 'monospace',
			color: 'white',
			size: 30,
			positionX: 190,
			positionY: 80,
			isBold: true,
			isStroke: false
		},
		{
			id: '222',
			text: 'Bottom text...',
			font: 'monospace',
			color: 'white',
			size: 30,
			positionX: 160,
			positionY: 240,
			isBold: true,
			isStroke: true
		}
	]
}



var gCurrTextIdx = 0;

// Get the current text being edited
function getMemeCurrText() {
	return +gCurrTextIdx;
}

// Update the current text being edited
function setMemeCurrText(idx) {
	gCurrTextIdx = +idx;
}



/*************** General ***************/

// Retrieve the meme model texts
function getMemeTexts() {
	return gMeme.txts;
}

// Delete existing text
function removeMemeText(textId) {
	var textIdx = getMemeTextIdx(textId);
	if ( textIdx >= 0 && textIdx > gMeme.txts.length) return;
	gMeme.txts.splice(textIdx, 1);
	setMemeCurrText(0);
}

// Add new text object (returns the number text items)
function addMemeText() {
	gMeme.txts.push({
		id: makeId(),
		text: 'Your text...',
		font: 'monospace',
		color: 'white',
		size: 40,
		positionX: 100,
		positionY: 100,
		isBold: false,
		isStroke: false
	});
}

/*************** GET ***************/

// Retrieve meme image
function getMemeImage() {
	return gMeme.selectedImgId;
}

// Retrieve meme text ids by text id
function getMemeTextIdx(textId) {
	return gMeme.txts.findIndex(function (txt) {
		return txt.id === textId;
	});
}

// Retrieve meme text by text id
function getMemeText(textId) {
	var textIdx = getMemeTextIdx(textId);
	if ( typeof textIdx === 'undefined' || textIdx < 0 || textIdx > gMeme.txts.length) textIdx = gCurrTextIdx;
	return gMeme.txts[textIdx].text;
}

// Retrieve meme font
function getMemeFont(textId) {
	var textIdx = getMemeTextIdx(textId);
	if ( typeof textIdx === 'undefined' || textIdx < 0 || textIdx > gMeme.txts.length) textIdx = gCurrTextIdx;
	return gMeme.txts[textIdx].font;
}

// Retrieve meme color
function getMemeColor(textId) {
	var textIdx = getMemeTextIdx(textId);
	if ( typeof textIdx === 'undefined' || textIdx < 0 || textIdx > gMeme.txts.length) textIdx = gCurrTextIdx;
	return gMeme.txts[textIdx].color;
}

// Retrieve meme Bold
function getMemeBold(textId) {
	var textIdx = getMemeTextIdx(textId);
	if ( typeof textIdx === 'undefined' || textIdx < 0 || textIdx > gMeme.txts.length) textIdx = gCurrTextIdx;
	return gMeme.txts[textIdx].isBold;
}

// Retrieve meme strokness
function getMemeStroke(textId) {
	var textIdx = getMemeTextIdx(textId);
	if ( typeof textIdx === 'undefined' || textIdx < 0 || textIdx > gMeme.txts.length) textIdx = gCurrTextIdx;
	return gMeme.txts[textIdx].isStroke;
}

// Retrieve meme size
function getMemeSize(textId) {
	var textIdx = getMemeTextIdx(textId);
	if ( typeof textIdx === 'undefined' || textIdx < 0 || textIdx > gMeme.txts.length) textIdx = gCurrTextIdx;
	return gMeme.txts[textIdx].size;
}

// Retrieve meme position X
function getMemePositionX(textId) {
	var textIdx = getMemeTextIdx(textId);
	if ( typeof textIdx === 'undefined' || textIdx < 0 || textIdx > gMeme.txts.length) textIdx = gCurrTextIdx;
	return gMeme.txts[textIdx].positionX;
}

// Retrieve meme position Y
function getMemePositionY(textId) {
	var textIdx = getMemeTextIdx(textId);
	if ( typeof textIdx === 'undefined' || textIdx < 0 || textIdx > gMeme.txts.length) textIdx = gCurrTextIdx;
	return gMeme.txts[textIdx].positionY;
}

/*************** UPDATE ***************/

// Update the meme image
function updateMemeImage(imgId) {
	gMeme.selectedImgId = imgId;
}

// Update the meme text
function updateMemeText(text) {
	gMeme.txts[gCurrTextIdx].text = text;
}

// Update the meme font
function updateMemeFont(font) {
	gMeme.txts[gCurrTextIdx].font = font;
}

// Update the meme color
function updateMemeColor(color) {
	gMeme.txts[gCurrTextIdx].color = color;
}

// Update the meme Bold
function updateBold(bold) {
	gMeme.txts[gCurrTextIdx].isBold = bold;
}

// Update the meme strokness
function updateStroke(stroke) {
	gMeme.txts[gCurrTextIdx].isStroke = stroke;
}

// Update the meme size
function updateMemeSize(size) {
	gMeme.txts[gCurrTextIdx].size += size;
}

// Update the meme position X
function updateMemePositionX(position) {
	gMeme.txts[gCurrTextIdx].positionX += position;
}

// Update the meme position Y
function updateMemePositionY(position) {
	gMeme.txts[gCurrTextIdx].positionY += position;
}

// Update the meme alignment
function updateMemeAlignment(position, canvasWidth, textWidth) {
	switch (position) {
		case -1:
			gMeme.txts[gCurrTextIdx].positionX = 0;
			break;
		case 0:
			gMeme.txts[gCurrTextIdx].positionX = (canvasWidth - textWidth) / 2;
			break;
		case 1:
			gMeme.txts[gCurrTextIdx].positionX = canvasWidth - textWidth;
			break;
	}
}
