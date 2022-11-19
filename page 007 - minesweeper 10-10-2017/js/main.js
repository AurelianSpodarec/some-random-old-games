$("document").ready(function () {

	createTitle();
	
	createStylesheet();

	drawStartScreen();
});

var style;
var field;
var minesPercentage = 10;
var itemSize = 0;
var targetCell;
var gameOver = false;

const EmptyCell = '<div class="cell empty"></div>';
const UnknownCell = '<div class="cell unknown"><span>?</span></div>';
const FlagCell = '<div class="cell flag"><span>!</span></div>';
const MineCell = '<div class="cell mine"><span>O</span></div>';
const SteppedCell = '<div class="cell stepped"><span>O</span></div>';
const Prompt =
	'<div class="prompt-container">' +
		'<div class="prompt-content">' +
			'<div class="prompt dig-prompt" onclick="digCell()"><span>DIG</span></div>' +
			'<div class="prompt flag-prompt" onclick="toggleFlagCell()"><span>FLAG</span></div>' +
		'</div>' +
	'</div>';

function spawnAdjecentCell ( value ) {

	if (value == 0)
		return '<div class="cell adjecent"><span></span></div>';

	return '<div class="cell adjecent"><span>' + value + '</span></div>';
}

function createTitle () {

	var title = document.getElementsByTagName('title')[0] || document.createElement('title');
	title.innerHTML = 'Minesweeper';

	document.getElementsByTagName('head')[0].appendChild(title);
}

function createStylesheet () {

	style = document.getElementsByTagName('style')[0] || document.createElement('style');
	style.type = 'text/css';

	style.innerHTML = appStylesheet();

	document.getElementsByTagName('head')[0].appendChild(style);
}

function appStylesheet () {

	var style = "";

	var styles = [
		"body { width: 100vw; height: 100vh; margin:0; padding:0; font-family: sans-serif; background-color: #f80; }",
		".wrapper { width: 100vw; height: 100vh; display: grid; grid-template-rows: 3fr 1fr 1fr 1fr; }",
		"div { margin: auto; }",
		"h1, h2, h3, h4, h5, h6 { margin: auto; text-align: center; color: white; }",
		"h1 { font-size: 10vmin; }",
		"h2 { font-size: 8vmin; }",
		"h3 { font-size: 6vmin; }",
		"h4 { font-size: 3vmin; }",
		"h5 { font-size: 2vmin; }",
		"h6 { font-size: 1vmin; }",
		"button { width: auto; height: auto; margin: 10px 20px; padding: 1vmin 2vmin;" +
		"font-size: 5vmin; color: grey; background-color: white; border: none; border-radius: 10px; filter: opacity(.75); }",
		"button:hover, button:active, button:focus { outline: none; border: none; filter: drop-shadow(0px 0px 1vmin rgba(0,0,0,.5)) opacity(1); cursor: pointer; color: #f80; }",
		"button:active { background-color: #ffa; }",
		".horizontal-stack { width: auto; height: auto; margin: auto; }",
		".horizontal-stack > * { float: center; }",
		".game-container { width: 100vw; height: 100vh; grid-row: 1/5; display: grid; grid-template-rows: 1fr 90vmin 1fr; grid-template-columns: 1fr 90vmin 1fr; }",
		".game-grid { grid-column: 2; grid-row: 2; display: grid; margin: 0; }",
		".cell-container { display:grid; width: auto; height: auto; overflow: hidden; filter: opacity(1); cursor: pointer; }",
		".cell { box-sizing: border-box; display: grid; margin: auto; border: solid 1px #f80; border-radius: 3px; }",
		".empty { background-color: rgba(255,255,255,.5); }",
		".adjecent { text-align: center; color: rgba(255,255,255,.5); background-color: #f80; border: solid 2px rgba(255,255,255,.2); }",
		".unknown { text-align: center; color: white; background-color: rgba(255,255,255,.5); font-weight: bold; }",
		".flag { text-align: center; color: white; background-color: #fd0; font-weight: bold; }",
		".mine { text-align: center; color: white; background-color: red; }",
		".stepped { text-align: center; color: white; background-color: #111;  }",
		".prompt-container { position: relative; height: 0; }",
		".prompt-content { position: absolute; transform: translateY(-100%); }",
		".prompt { box-sizing: border-box; display: grid; margin: auto; }",
		".prompt:hover { transform: scale(1.4) }",
		".dig-prompt { text-align: center; color: white; background-color: #8af; border: solid 1px #f80; border-bottom: dotted 2px white; border-radius: 3px 3px 0 0; }",
		".flag-prompt { text-align: center; color: white; background-color: orange; border: solid 1px #f80; border-top: dotted 2px white; border-radius: 0 0 3px 3px; }"
	];

	for (var i = 0; i < styles.length; i++)
		style += styles[i];

	return style;
}

function drawStartScreen () {
	
	$(".wrapper").html(
		'<div>' +
			'<h1>MINESWEEPER</h1>' + 
		'</div>' +
		'<h3>Field size</h3>' +
		'<div>' +
			'<div class="horizontal-stack">' +
				'<button class="field-size" data-value="5" onclick="createField( $(this).attr(\'data-value\') );">5x5</button>' +
				'<button class="field-size" data-value="10" onclick="createField( $(this).attr(\'data-value\') );">10x10</button>' +
				'<button class="field-size" data-value="20" onclick="createField( $(this).attr(\'data-value\') );">20x20</button>' +
			'</div>' +
		'</div>'
	);
}

function createField ( value ) {
	
	field = new gameField(value);

	plantMines(minesPercentage);

	calculateCellValues();

	// testing values
	//test_field();

	drawGameScreen ();
}

function test_field () {

	var mines = 0;
	var output = "";

	for (var i = 0; i < field.size; i++) {
		for (var j = 0; j < field.size; j++) {
			var cell = field.cell(i,j);
			if (cell.value() == "mine") {
				mines++;
				output += "x   ";
			}
			else {
				output += cell.value() + "   ";
			}
		}
		output += "\n";
	}

	output += "\nPercentage of mines: " + mines / (field.size * field.size) * 100 + "%" +
	"\nTarget percentage: " + minesPercentage + "%";
	alert(output);
}

gameField = function ( value ) {
	
	var field = [];
	var size = value;
	
	init(value);

	function init (value) {

		for (var i = 0; i < value; i++) {
			
			var row = [];
			
			for(var j = 0; j < value; j++) {
				row [j] = new gameCell(i,j);
			}

			field[i] = row;
		}
	}
	function size () {
		return size;
	}
	function cell (x,y) {
		if (x < size && x >= 0 && y < size && y >= 0)
			return field[x][y];
	}
	return {
		size,
		cell
	}
}

gameField.constructor = gameField;

gameCell = function (xPos,yPos) {
	var isDug = false;
	var isMine = false;
	var adjecentMines = 0;
	var isFlagged = false;
	const xPosition = xPos;
	const yPosition = yPos;

	function mine () {
		isMine = true;
	}

	function adjecentMine () {
		
		if (isMine == true)
			return;
		
		adjecentMines++;
	}
	function isDugOut () {
		return isDug;
	}
	function dig () {
		isDug = true;
	}
	function value () {
		
		if (isMine == true)
			return "mine";

		return adjecentMines;
	}
	function flagged () {
		return isFlagged;
	}
	function flag () {
		isFlagged = !isFlagged;
	}
	function x () {
		return xPosition;
	}
	function y () {
		return yPosition;
	}
	return {
		mine,
		adjecentMine,
		isDugOut,
		dig,
		value,
		flagged,
		flag,
		x,
		y
	}
}

gameCell.constructor = gameCell;

function plantMines ( percentage ) {

	var cellCount = field.size * field.size;

	// makes sure that there are at least 1 mine and 1 empty cell in the field
	var totalMines = Math.round( Math.clamp( (percentage / 100) * cellCount, 1, cellCount -1 ) );

	var minedCells = [];

	while (minedCells.length < totalMines) {
		
		var x = Math.round( Math.random() * (field.size - 1) );
		var y = Math.round( Math.random() * (field.size - 1) );

		var cell = field.cell(x,y);

		if ( cell != null && minedCells.indexOf(cell) == -1 ) {

			cell.mine();
			minedCells.push(cell);
		}
	}
}

function calculateCellValues () {

	for (var i = 0; i < field.size; i++) {
		for (var j = 0; j < field.size; j++) {

			if (field.cell(i,j).value() == "mine") {
				
				var cells = adjecentCells(i,j);

				for (var temp = 0; temp < cells.length; temp++) {
					cells[temp].adjecentMine();
				}
			}
		}
	}
}

function adjecentCells ( x,y ) {

	var cells = [];

	for (var i = x-1; i <= x+1; i++) {
		for (var j = y-1; j <= y+1; j++) {
			
			if (i != x || j != y) {

				var cell = field.cell(i,j);

				if (cell != null)
					cells.push(cell);
			}
		}
	}

	return cells;
}

function drawGameScreen () {
	
	// container size = 90vmin
	// item size = - ( gap count * gap size - container size) / item count
	itemSize = ((field.size -1) * 0 - 90) / (-field.size);

	var code = '';

	code += 
		'<div class="game-container">' +
			'<div class="game-grid">';

	for (var x = 0; x < field.size; x++) {
		for (var y = 0; y < field.size; y++) {
			code +=
				'<div class="cell-container" data-x="' + x + '" data-y="' + y + '" onmouseover="enterCell( this )" onmouseout="exitCell( this )">' +
					UnknownCell +
				'</div>';
		}
	}

	code +=		
			'</div>' +
		'</div>' +
		Prompt;

	$(".wrapper").html(code);

	style.innerHTML += gameStylesheet();

	$(".prompt-container").css("display", "none");
}

function gameStylesheet () {

	var style = "";

	var styles = [
		".game-grid { grid-template-columns: repeat("+field.size+",auto); grid-template-rows: repeat("+field.size+",auto); }",
		".cell { width: "+itemSize+"vmin; height: "+itemSize+"vmin; }",
		".cell span { font-size: "+itemSize*.5+"vmin; line-height: "+itemSize+"vmin; }",
		".prompt { width: "+itemSize+"vmin; height: "+itemSize*.5+"vmin; }",
		".prompt span { font-size: "+itemSize*.25+"vmin; line-height: "+itemSize*.5+"vmin; }",
		".prompt-container { width: "+itemSize+"vmin; }"
	];

	for (var i = 0; i < styles.length; i++)
		style += styles[i];

	return style;
}

function enterCell ( element ) {

	targetCell = element;
	
	var x = $(element).data("x");
	var y = $(element).data("y");

	var cell = field.cell(x,y);

	if (cell.isDugOut() || $(element).data('hover') == "true" )
		return;

	$(element).data('hover','true');

	// show prompt

	$(".prompt-container").css("display","block").appendTo(element);
}

function exitCell ( element ) {

	$(element).data('hover','false');

	$(".prompt-container").css("display", "none");
}

function digCell () {
	
	var x = $(targetCell).data("x");
	var y = $(targetCell).data("y");

	var cell = field.cell(x,y);

	cell.dig();

	if (cell.value() == "mine") {

		targetCell.innerHTML = SteppedCell;
		endGame();
		return;
	}
	else if (cell.value() == 0) {

		openEmptyCells(cell);
		targetCell.innerHTML += Prompt;
	}
	else {

		targetCell.innerHTML = spawnAdjecentCell(cell.value()) + Prompt;		
	}

	exitCell(targetCell);
	checkEndState();
}

function toggleFlagCell () {
	
	var x = $(targetCell).data("x");
	var y = $(targetCell).data("y");

	var cell = field.cell(x,y);

	cell.flag();

	targetCell.innerHTML = (cell.flagged() ? FlagCell : UnknownCell) + Prompt;

	$(".prompt-container").fadeOut(0).fadeIn(1000);
}

function openEmptyCells ( cell ) {

	var queue = [ cell ];
	var opened = [];

	while (queue.length > 0) {

		cell = queue.pop();
		opened.push(cell);

		if (cell.value() == 0){

			queueCell( field.cell(cell.x()-1, cell.y()) );
			queueCell( field.cell(cell.x()+1, cell.y()) );
			queueCell( field.cell(cell.x(), cell.y()-1) );
			queueCell( field.cell(cell.x(), cell.y()+1) );
		}


		passiveDigCell( findCell(cell) );
	}

	function queueCell( cell ) {
		
		if (cell == null)
			return;

		if (opened.indexOf(cell) == -1 && cell.value != "mine") {

			queue.push(cell);
		}
	}
}

function findCell ( cell ) {

	var elements = document.getElementsByClassName("cell-container");

	for (var i = 0; i < elements.length; i++) {
	
		var x = $(elements[i]).data("x");
		var y = $(elements[i]).data("y");

		if ( x == cell.x() && y == cell.y() )
			return {
				"element" : elements[i],
				"cell" : cell
			};
	}
}

function passiveDigCell ( data ) {

	data.cell.dig();
	data.element.innerHTML = spawnAdjecentCell( data.cell.value() );
}

function checkEndState () {

	var cells = getAllCells();

	var flag = false;

	for (var i = 0; i < cells.length; i++) {

		if ( cells[i].isDugOut() == false && cells[i].value() != "mine" )
			flag = true;
	}

	if (flag == false) {
		endGame();
		alert("Game Won!");
	}
}

function getAllCells () {

	var cells = [];

	for (var i = 0; i < field.size; i++) {
		for (var j = 0; j < field.size; j++) {
			
			cells.push( field.cell(i,j) );
		}		
	}

	return cells;
}

function endGame () {

	var elements = document.getElementsByClassName("cell-container");
	var cells = getAllCells();

	for (var i = 0; i < cells.length; i++) {

		cells[i].dig();

		if (cells[i].value() == "mine") {

			if (elements[i] != targetCell)
				elements[i].innerHTML = MineCell;
		}
		else {

			elements[i].innerHTML = spawnAdjecentCell(cells[i].value());
		}
	}

	$(".wrapper").delay(500).fadeOut(1000, function () {
		
			alert("Game Lost...");

			location.reload();
		});
}

Math.clamp = function ( num, min, max ) {
	return Math.min(Math.max(num, min), max);
}


