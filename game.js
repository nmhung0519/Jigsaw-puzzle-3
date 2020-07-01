var buttons = document.getElementsByClassName('button');
var menu = document.getElementById('menu');
var footer = document.getElementById('footer');
var nextButton = document.getElementById('next-button');
var nextText = document.getElementById('next-text');
var congrat = document.getElementById('congrat');
var container = [];
var header = [];
var title = [];
var back = [];
var x, y;
var tmpX, tmpY;
var target = null;
var direction = 0;
var canClick = 1;
var soundClick = new Audio('sound/click.mp3');
var soundMove = new Audio('sound/move.mp3');
var soundComplete = new Audio('sound/complete.mp3');
var mute = false;
var pieces;
var n;	// So dong
var m;	// So cot
var start, end;
const frameWidth = 960;
const frameHeight = 540;
var temp;
var count;
var rightCol;
var rightRow;
var index;

container[0] = createContainer();
header[0] = createHeader();
header[0].style.background = button[0]['headerColor'];
header[0].appendChild(createTitle(button[0]['name']));
var setting = document.createElement("div");
setting.className = 'setting';
header[0].appendChild(setting);
for (var i = 1; i < button.length; i++) {
	container[0].appendChild(createButton(i, button[i]));
	createPage(i, button[i]['name']);
}
loadPic();
container[-1] = createContainer();
header[-1] = createHeader();
header[-1].appendChild(createTitle('Settings'));
header[-1].appendChild(createBack());

//play
var play_container = createContainer();
var play_header = createHeader();
var play_title = createTitle();
var play_setting = document.createElement("div");
var refresh = document.createElement("div");
refresh.id = 'refresh';
refresh.onclick = function () {
	if (!mute) soundClick.play();
	restart();
};
play_header.appendChild(refresh);
play_setting.className = 'setting';
play_setting.style.right = "2%";
play_setting.style.left = "auto";
play_header.style.background = 'pink';
play_header.appendChild(play_title);
play_header.appendChild(play_setting);
play_header.appendChild(createBack());
var frame = document.createElement("div");
frame.id = 'frame';
play_container.appendChild(frame);
//game over
var game_over = document.createElement("div");
game_over.id = "game-over";
var restart_button = document.createElement("div");
var restart_title = document.createElement("span");
restart_title.id = 'restart-title';
restart_title.innerText = 'Out of moves';
restart_button.appendChild(restart_title);
var restart_click = document.createElement("span");
restart_click.id = 'restart-click';
restart_click.innerText = 'Restart Level';
restart_button.appendChild(restart_click);
restart_button.id = 'restart-button';
play_container.appendChild(game_over);
play_container.appendChild(restart_button);
restart_click.onclick = function () {
	if (!mute) soundClick.play();
	game_over.style.display = 'none';
	restart_button.style.display = 'none';
	restart();
};

//Sound setting button
var soundBT = document.createElement("div");
soundBT.style.top = "30%";
soundBT.style.margin = "1% auto 0 auto";
soundBT.style.width = '40%';
soundBT.style.minWidth = '200px';
soundBT.style.maxWidth = '1000px';
soundBT.style.height = '28px';
soundBT.style.position = 'relative';
soundBT.style.borderTop = '1px solid grey';
soundBT.style.borderBottom = '1px solid grey';
soundBT.style.background = 'white';
var sound_icon = document.createElement("div");
sound_icon.className = 'sound';
var sound_frame = document.createElement("div");
sound_frame.id = "frame-check-button";
var sound_button = document.createElement("div");
sound_button.id = "check-button";
sound_frame.appendChild(sound_button);
var sound_text = document.createElement("span");
sound_text.className = "text";
sound_text.innerText = "Sound";
sound_text.style.marginRight = '100px';
soundBT.appendChild(sound_text);
soundBT.appendChild(sound_frame);
soundBT.appendChild(sound_icon);
sound_button.onclick = function (event) {
	mute = !mute;
	if (mute) {
		event.target.parentElement.style.background = 'grey';
		event.target.style.left = "0px";
	}
	else {
		event.target.parentElement.style.background = header[-1].style.background;
		event.target.style.left = "34px";
	}
}
container[-1].appendChild(soundBT);
addEventListener("mouseup", function(event) {
	if (canClick == 1) {
		var target = event.target;
		if (target.className == 'button') {
			if (!mute) soundClick.play();
			let lv = target.id;
			canClick = 0;
			select(lv);
		}
		else if (target.className == 'back') {
			if (!mute) soundClick.play();
			canClick = 0;
			_back();
		}
		else if (target.className == 'picture') {
			if (!mute) soundClick.play();
			canClick = 0;
			play(target);
		}
		else if (target.className == "setting") {
			if (!mute) soundClick.play();
			canClick = 0;
			select(-1);
        }
	}
})

//Khi bam vao 1 nut
function select(lv) {
	var container_pre = document.getElementsByClassName("container");
	var header_pre = document.getElementsByClassName("header");
	if (lv == -1) {
		container[-1].style.background = container_pre[container_pre.length - 1].style.background;
		header[-1].style.background = header_pre[header_pre.length - 1].style.background;
		if (!mute) sound_frame.style.background = header[-1].style.background;
    }
	container_pre = container_pre[container_pre.length - 1];
	header_pre = header_pre[header_pre.length - 1];
	menu.appendChild(container[lv]);
	container[lv].style.animationName = 'enter';
	header[lv].style.animationName = 'enter';
	menu.appendChild(header[lv]);
	container_pre.style.animationName = 'hide';
	header_pre.style.animationName = 'hide';
	setTimeout(function () {
		container_pre.style.display = 'none';
		header_pre.style.display = 'none';
		canClick = 1;
	}, 800);
}

//Khi bam nut quay lai
function _back() {
	var container_pre = document.getElementsByClassName("container");
	var header_pre = document.getElementsByClassName("header");
	var n = container_pre.length;
	if (n == 3) footer.style.bottom = '-60px';
	container_pre[n-1].style.animationName = 'back';
	header_pre[n].style.animationName = 'back';
	container_pre[n-2].style.display = 'block';
	header_pre[n-1].style.display = 'block';
	container_pre[n-2].style.animationName = 'unhide';
	header_pre[n-1].style.animationName = 'unhide';
	setTimeout(function() {
		menu.removeChild(container_pre[n-1]);
		menu.removeChild(header_pre[n]);
		canClick = 1;
	}, 800);
}

function start() {
	menu.appendChild(container[0]);
	menu.appendChild(header[0]);
}

//Khi chon man choi - Bat dau choi
function play(target) {
	index = parseInt(target.getAttribute('index'));
	newGame();
	var data = game[index];
	var container_pre = document.getElementsByClassName("container")[1];
	var header_pre = document.getElementsByClassName("header")[2];
	container_pre.style.animationName = 'hide';
	header_pre.style.animationName = 'hide';
	menu.appendChild(play_container);
	menu.appendChild(play_header);
	play_container.style.animationName = 'enter';
	play_header.style.animationName = 'enter';
	setTimeout(function () {
		container_pre.style.display = 'none';
		header_pre.style.display = 'none';
		canClick = 1;
	}, 800);
}

//Luu vi tri con tro chuot khi bam chuot vao manh ghep
addEventListener("mousedown", function (event) {
	if (event.target.className == 'piece') {
		addEventListener("mousemove", move);
		x = event.screenX;
		y = event.screenY;
	}
})

//Tha manh ghep
addEventListener("mouseup", function () {
	if (target != null) {
		for (var i = 0; target[i] != null; i++) {
			target[i].style.transform = 'scale(1)';
			target[i].style.left = '0px';
			target[i].style.top = '0px';
			target[i] = null;
		}
		if (temp) {
			count--;
			play_title.innerText = "Moves:" + count;
			if (direction == 1) {
				rightCol = true;
				for (var i = 0; i < m; i++) if (pieces[0][i].children[0].getAttribute('y') != i) rightCol = false;

			}
			else if (direction == 2) {
				rightRow = true;
				for (var i = 0; i < n; i++) if (pieces[i][0].children[0].getAttribute('x') != i) rightRow = false;
			}
			if (rightRow && rightCol) {
				soundComplete.play();
				if (index + 1 == game.length) nextText.innerText = "Home";
				win();

			}
			else if (count == 0) gameOver();
			else soundMove.play();
		}
		else soundMove.play();
	}
	removeEventListener("mousemove", move);
	target = null;
	direction = 0;
})

function loadPic() {
	for (var i = 0; i < game.length; i++) {
		var pic = document.createElement("li");
		pic.className = 'picture';
		pic.style.background = "url('" + game[i]['path'] + "')";
		pic.style.backgroundSize = '100% 100%';
		pic.id = game[i]['id'];
		pic.setAttribute('index', i);
		container[(game[i]['id']).slice(0, 1)].appendChild(pic);
	}
}

//Di chuyen manh ghep
function move(event) {
	if (target == null && direction == 0) {
		if (event.screenX != x) {
			if (!rightCol) {
				direction = 1;
				selectTarget(event.target);
			}
		}
		else if ( event.screenY) {
			if (!rightRow) {
				direction = 2;
				selectTarget(event.target);
			}
		}
	}
	if (direction == 1) {
		if (event.screenX != x) {
			var d = event.screenX - x;
			for (var i = 0; i < target.length; i++) {
				target[i].style.left = tmpX[i] + d + "px";
			}
			var tmp = d / (frameWidth / m);
			if (tmp < 0) tmp = parseInt(-(-tmp + 2 / 3));
			else tmp = parseInt(tmp + 2 / 3);
			if (tmp != temp) {
				if (start + tmp >= 0 && end + tmp < m) {
					swapCol(temp, tmp, d);
					temp = tmp;
                } 
			}
		}
	}
	else if (direction == 2) {
		if (event.screenY != y) {
			var d = event.screenY - y;
			for (var i = 0; i < target.length; i++) {
				target[i].style.top = tmpY[i] + d + "px";
			}
			var tmp = d / (frameHeight / n);
			if (tmp < 0) tmp = parseInt(-(-tmp + 2 / 3));
			else tmp = parseInt(tmp + 2 / 3);
			if (tmp != temp) {
				if (start + tmp >= 0 && end + tmp < n) {
					swapRow(temp, tmp, d);
					temp = tmp;
                }
            }
		}
	}
	function swapRow(a, b, d) {
		for (var i = start; i <= end; i++) moveRow(i + a, i + b);
		if (b > a) {
			for (var i = end + a + 1; i <= end + b; i++) moveRow(i, i - (end - start + 1));
		}
		else {
			for (var i = start + a - 1; i >= start + b; i--) moveRow(i, i + (end - start + 1));
        }
		var tmp = target.length;
		for (var i = 0; i < tmp; i++) {
			tmpY[i] = -b * (frameHeight / n);
			target[i].style.top = (tmpY[i] + d) + "px";
		}
		hightlight();
	}
	function swapCol(a, b, d) {
		for (var i = start; i <= end; i++) moveCol(i + a, i + b);
		if (b > a) {
			for (var i = end + a + 1; i <= end + b; i++) moveCol(i, i - (end - start + 1));
		}
		else {
			for (var i = start + a - 1; i >= start + b; i--) moveCol(i, i + (end - start + 1));
        }
		var tmp = target.length;
		for (var i = 0; i < tmp; i++) {
			tmpX[i] = -b * (frameWidth / m);
			target[i].style.left = (tmpX[i] + d) + "px";
		}
		hightlight();
	}
	function hightlight() {
		var tmp = target.length;
		for (var i = 0; i < tmp; i++) {
			frame.appendChild(target[i].parentElement);
        }
    }
}
function moveRow(a, b) {
	for (var i = 0; i < m; i++) moveImg(a, i, b, i);
}
function moveCol(a, b) {
	for (var i = 0; i < n; i++) moveImg(i, a, i, b);
}
function selectTarget(_target) {
	temp = 0;
	if (direction == 1) {
		tmpX = new Array();
		target = new Array();
		var col = getCol(_target.parentElement);
		selectCol(col);
		start = col;
		end = col;
		checkCol(col, -1);
		checkCol(col, 1);
	}
	else if (direction == 2) {
		tmpY = new Array();
		target = new Array();
		var row = getRow(_target.parentElement);
		selectRow(row);
		start = row;
		end = row;
		checkRow(row, -1);
		checkRow(row, 1);
	}
	function checkCol(tmp_col, r) {
		if (tmp_col + r >= 0 && tmp_col + r < m) {
			if (parseInt(pieces[0][tmp_col].children[0].getAttribute('y')) + r == parseInt(pieces[0][tmp_col + r].children[0].getAttribute('y'))) {
				if (tmp_col + r > end) end = tmp_col + r;
				else if (tmp_col + r < start) start = tmp_col + r;
				checkCol(tmp_col + r, r);
				selectCol(tmp_col + r);
			}
		}
	}
	function checkRow(tmp_row, r) {
		if (tmp_row + r >= 0 && tmp_row + r < n) {
			if (parseInt(pieces[tmp_row][0].children[0].getAttribute('x')) + r == parseInt(pieces[tmp_row + r][0].children[0].getAttribute('x'))) {
				if (tmp_row + r > end) end = tmp_row + r;
				else if (tmp_row + r < start) start = tmp_row + r;
				checkRow(tmp_row + r, r);
				selectRow(tmp_row + r);
            }
        }
	}
	function selectCol(tmp_col) {
		for (var i = 0; i < n; i++) {
			target[target.length] = pieces[i][tmp_col].children[0];
			frame.appendChild(pieces[i][tmp_col]);
			target[target.length - 1].style.transform = 'scale(1.01)';
			tmpX[target.length - 1] = 0;
		}
	}
	function selectRow(tmp_row) {
		for (var i = 0; i < m; i++) {
			target[target.length] = pieces[tmp_row][i].children[0];
			frame.appendChild(pieces[tmp_row][i]);
			target[target.length - 1].style.transform = 'scale(1.01)';
			tmpY[target.length - 1] = 0;
        }
	}
}
function createImage(path, a, b) {
	pieces = new Array();
	for (var i = 0; i < n; i++) {
		pieces[i] = new Array();
		for (var j = 0; j < m; j++) {
			pieces[i][j] = document.createElement("div");
			pieces[i][j].style.left = j * (frameWidth / m) + "px";
			pieces[i][j].style.top = i * (frameHeight / n) + 'px';
			pieces[i][j].style.position = 'absolute';
			frame.appendChild(pieces[i][j]);
			var tmp = document.createElement("div");
			tmp.className = 'piece';
			tmp.style.width = 960 / m + "px";
			tmp.style.height = 540 / n + "px";
			tmp.style.background = 'url(' + path + ')';
			tmp.style.backgroundPositionX = -(j * (frameWidth / m)) + "px";
			tmp.style.backgroundPositionY = -(i * (frameHeight / n)) + 'px';
			tmp.style.position = 'absolute';
			tmp.setAttribute('x', i);
			tmp.setAttribute('y', j);
			pieces[i][j].appendChild(tmp);
		}
	}
	mixImage(a, b);
	frame.style.boxShadow = '0 0 5px 4px dimgrey';
}
function mixImage(a, b) {
	for (var i = 0; i < a; i++) {
		var tmp1 = randomInt(n);
		var tmp2 = randomInt(n);
		while (tmp1 == tmp2) tmp2 = randomInt(n);
		for (var j = 0; j < m; j++) {
			moveImg(tmp1, j, tmp2, j);
			moveImg(tmp2, j, tmp1, j);
		}

	}
	for (var i = 0; i < b; i++) {
		var tmp1 = randomInt(m);
		var tmp2 = randomInt(m);
		while (tmp1 == tmp2) tmp2 = randomInt(m);
		for (var j = 0; j < n; j++) {
			moveImg(j, tmp1, j, tmp2);
			moveImg(j, tmp2, j, tmp1);
		}
	}
}
function newFrame() {
	var tmp1 = n;
	var tmp2 = m;
	while (tmp1) {
		while (tmp2) {
			frame.removeChild(pieces[tmp1 - 1][tmp2 - 1]);
			tmp2--;
		}
		tmp1--;
		tmp2 = m;
	}
	pieces = null;
	frame.style.boxShadow = '';
}
function moveImg(n1, m1, n2, m2) {
	pieces[n2][m2].appendChild(pieces[n1][m1].children[0]);
}
function getRow(node) {
	return new Number((node.style.top).slice(0, -2)) / (frameHeight / n);
}
function getCol(node) {
	return new Number((node.style.left).slice(0, -2)) / (frameWidth / m);
}
function randomInt(a) {
	return Math.floor(Math.random() * a);
}

function gameOver() {
	game_over.style.display = 'block';
	restart_button.style.display = 'block';
}

function restart() {
	newFrame();
	pieces = null;
	var data = game[index];
	count = data['moves'];
	play_title.innerText = "Moves:" + count;
	createImage(data['path'], data['swaprow'], data['swapcol']);
}
function win() {
	congrat.style.top = '0';
	footer.style.bottom = '0';
};
nextButton.onclick = function () {
	if (!mute) soundClick.play();
	canClick = 0;
	if (index + 1 < game.length) nextLV();
	else {
		var container_pre = document.getElementsByClassName("container");
		container_pre = container_pre[container_pre.length - 2];
		var header_pre = document.getElementsByClassName("header");
		header_pre = header_pre[header_pre.length - 2];
		menu.removeChild(container_pre);
		menu.removeChild(header_pre);
		setTimeout(function () {
			container_pre.style.display = 'block';
			header_pre.style.display = 'block';
			nextText.innerText = "Next Level";
		}, 800);
		congrat.style.top = '-60px';
		footer.style.bottom = '-60px';
		_back();
    }
}
function newGame() {
	var data = game[index];
	count = data['moves'];
	play_title.innerText = "Moves:" + count;
	rightCol = false;
	rightRow = false;
	footer.style.bottom = '-60px';
	congrat.style.top = '-60px';
	if (pieces != null) newFrame();
	play_header.style.background = data['headerColor'];
	setTimeout(function () {
		congrat.style.background = data['headerColor'];
		footer.style.background = data['headerColor'];
		nextText.style.color = data['headerColor'];
	}, 800);
	nextButton.style.background = data['background'];
	play_container.style.background = data['background'];
	game_over.style.display = 'none';
	restart_button.style.display = 'none';
	n = data['rows'];
	m = data['cols'];
	setTimeout(function () {
		canClick = 1;
		createImage(data['path'], data['swaprow'], data['swapcol']);
	}, 1000);
}
function nextLV() {
	index++;
	congrat.style.top = '-60px';
	footer.style.bottom = '-60px';
	newFrame();
	setTimeout(newGame, 600);
}

//Tao page
function createPage(i, name) {
	container[i] = createContainer();
	container[i].style.background = "FFF4C3";
	header[i] = createHeader();
	header[i].style.background = 'blue';
	header[i].appendChild(createBack());
	header[i].style.background = 'blue';
	header[i].appendChild(createTitle(name));

}
function createContainer() {
	var tmp = document.createElement("div");
	tmp.className = 'container';
	return tmp;
}
function createHeader() {
	var tmp = document.createElement("div");
	tmp.className = 'header';
	return tmp;
}
function createBack() {
	var tmp = document.createElement("div");
	tmp.className = 'back';
	return tmp;
}
function createTitle(name) {
	var tmp = document.createElement("span");
	tmp.className = 'title';
	tmp.innerText = name;
	return tmp;
}

//Tao button chon bo suu tap anh
function createButton(i, data) {
	var but = document.createElement("div");
	but.id = i;
	but.className = 'button';
	but.innerText = data['name'];
	but.style.background = data['butBackground'];
	return but;
}
