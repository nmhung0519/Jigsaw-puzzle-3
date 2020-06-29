var buttons = document.getElementsByClassName('button');
var menu = document.getElementById('menu');
var footer = document.getElementById('footer');
var nextButton = document.getElementById('next-button');
var nextText = document.getElementById('next-text');
var x, y;
var tmpX, tmpY;
var target = null;
var direction = 0;
var canClick = 1;
var sound = new Audio('sound/click.mp3');
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
addEventListener("mouseup", function(event) {
	if (canClick == 1) {
		var target = event.target;
		if (target.className == 'button') {
			if (!mute) sound.play();
			let lv = target.id;
			canClick = 0;
			select(lv);
		}
		else if (target.className == 'back') {
			if (!mute) sound.play();
			canClick = 0;
			_back();
		}
		else if (target.className == 'picture') {
			if (!mute) sound.play();
			canClick = 0;
			play(target);
		}
		else if (target.className == "setting") {
			if (!mute) sound.play();
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
	header_pre[n-1].style.animationName = 'back';
	container_pre[n-2].style.display = 'block';
	header_pre[n-2].style.display = 'block';
	container_pre[n-2].style.animationName = 'unhide';
	header_pre[n-2].style.animationName = 'unhide';
	setTimeout(function() {
		menu.removeChild(container_pre[n-1]);
		menu.removeChild(header_pre[n-1]);
		canClick = 1;
	}, 800);
}

function start() {
	menu.appendChild(container[0]);
	menu.appendChild(header[0]);
}

//Khi chon man choi - Bat dau choi
function play(target) {
	rightCol = false;
	rightRow = false;
	footer.style.bottom = '-60px';
	play_title.innerText = "";
	if (pieces != null) newFrame();
	var container_pre = document.getElementsByClassName("container")[1];
	var header_pre = document.getElementsByClassName("header")[1];
	container_pre.style.animationName = 'hide';
	header_pre.style.animationName = 'hide';
	menu.appendChild(play_container);
	menu.appendChild(play_header);
	play_container.style.animationName = 'enter';
	play_header.style.animationName = 'enter';
	play_header.style.background = target.getAttribute('headerColor');
	footer.style.background = target.getAttribute('headerColor');
	nextText.style.color = target.getAttribute('headerColor');
	nextButton.style.background = target.getAttribute('background');
	play_container.style.background = target.getAttribute('background');
	game_over.style.display = 'none';
	restart_button.style.display = 'none';
	setTimeout(function () {
		container_pre.style.display = 'none';
		header_pre.style.display = 'none';
		canClick = 1;
		n = 3;
		m = 4;
		createImage('picture/1-01.jpg', 1, 1, 7);
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
			if (rightRow && rightCol) win();
			else if (count == 0) gameOver();
		}
	}
	removeEventListener("mousemove", move);
	target = null;
	direction = 0;
})

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
function createImage(path, a, b, _count) {
	pieces = new Array();
	count = _count;
	play_title.innerText = "Moves:" + count;
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

function gameOver() {
	game_over.style.display = 'block';
	restart_button.style.display = 'block';
}
restart_button.onclick = function () {
	game_over.style.display = 'none';
	restart_button.style.display = 'none';
	restart();
};
function restart() {
	newFrame();
	pieces = null;
	createImage('picture/1-01.jpg', 1, 1, 7);
}
function win() {
	play_title.innerText = 'Congratulations!';
	footer.style.bottom = '0';
};
nextButton.onclick = function () {

}