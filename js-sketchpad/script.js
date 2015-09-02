/*
NOTES:
	Button:
	- Prompt user for pixels
	- Send results to grid
	Grid:
	- Clear Grid
	- Initialize grid
	Pixel:
	- Change color
*/

$(document).ready(function(){
	var pixels = 16; // initial pixel density
	var destruction = false; // Destruction mode off by default
	initializeGrid(pixels);

	$(document).on('mouseenter', '.pixel', function(){
		changeColor($(this));
		if (destruction === true) animatePixel($(this));
	});

	$('#clear').click(function(e){
		e.preventDefault();
		pixels = promptPixels();
		initializeGrid(pixels);
	});

	$('#destruction').click(function(e){
		e.preventDefault();
		destruction = toggleDestruction(destruction);
	});

});

function initializeGrid(pixels){
	clearGrid();
	pixels = checkPixelQty(pixels);
	
	var width = gridWidth();
	var args = {'gridWidth': width, 'pixels': pixels};
	args['pixelSize'] = calculatePixelSize(args);
	drawGrid(args);
}

function gridWidth(){
	width = $('#grid').width();
	return width;
}

function calculatePixelSize(args){
	var pixels = args['pixels'];
	var width = args['gridWidth'];
	pixelSize = Math.floor(width / pixels) - 2;
	return pixelSize;
	//TODO: What to do when pixels don't fill the grid
}

function drawGrid(args){
	var pixels = args['pixels'];
	var width = args['gridWidth'];
	var pixelSize = args['pixelSize'];
	var pixel = '<div class="pixel" style="width: ' + pixelSize + 'px; height: ' + pixelSize + 'px"></div>';

	for (i = 0; i < pixels * pixels; i++) {
		$('#grid').append(pixel).fadeTo('fast', 1);
	}
}

function checkPixelQty(pixels){
	if (pixels < 1) {pixels = 1;}
	if (pixels > 100) {pixels = 100;}
	if ($.isNumeric(pixels) === false) {pixels = 16;}
	return pixels;
}

function clearGrid(){
	$('#grid').empty();
}

function promptPixels(){
	pixels = parseInt(prompt('How many pixels ya want? (You can have any amount, between 1 and 100!)', 16));
	return pixels;
}

function toggleDestruction(destruction) {
	if (destruction === false) {
		destruction = true;
		$('#destruction').addClass('activated');
	} else {
		destruction = false;
		$('#destruction').removeClass('activated');
	}
	return destruction;
}

function changeColor(self){
	 $this = self;
	 activatePixel($this);
	 if ($this.css('background-color') != '#000000'){
	 	var bkgColor = $this.css('background-color');
	 	bkgColor = darken(bkgColor);
	 	$this.css('background-color', bkgColor);
	}
}

function darken(bkgColor){
	// This function could probably be broken up further

	bkgColor = rgb2hex(bkgColor);

	while(bkgColor.charAt(0) === '#') bkgColor = bkgColor.substr(1);
	
	// Split the Hex into decimal rgb
	r = parseInt(bkgColor.slice(0,2), 16);
	g = parseInt(bkgColor.slice(2,4), 16);
	b = parseInt(bkgColor.slice(4,6), 16);

	// Reduce value by 10%
	r = Math.floor(r - 25.5);
	b = Math.floor(b - 25.5);
	g = Math.floor(g - 25.5);

	// Ensure value isn't < 0
	if (g < 0) g = 0;
	if (b < 0) b = 0;
	if (r < 0) r = 0;

	// Convert back to hex
	r = r.toString(16);
	b = b.toString(16);
	g = g.toString(16);

	// Add 0 to beginning of hex if only has one character
	if (r.length < 2) r = '0' + r;
	if (g.length < 2) g = '0' + g;
	if (b.length < 2) b = '0' + b;

	// Convert to Hex for HTML
	bkgColor = '#' + r + g + b;

	return bkgColor;
}

function rgb2hex(rgb){
	// This function taken from Stack Overflow
	var parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	// parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
	parts.splice(0, 1);
	for (var i = 0; i < 3; ++i) {
	    parts[i] = parseInt(parts[i]).toString(16);
	    if (parts[i].length == 1) parts[i] = '0' + parts[i];
	} 
	var hexString ='#'+parts.join('').toUpperCase();
	return hexString
}

function activatePixel(self){
	$this = self;
	if ($this.hasClass('active') != true) {
		$this.addClass('active');
	}
}

function animationClass(self) {
	$this = self;
	$this.css('left', 0);
	$this.css('top', 0);
}

function animatePixel(self) {
	animationClass(self);
	$this = self;
	var top = Math.floor(Math.random() * (100)) + 50;
	var left = Math.floor(Math.random() * (100)) + 50;
	$this.css('left', left);
	$this.css('top', top);
}
