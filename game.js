var buttons = document.getElementsByClassName('button');
var menu = document.getElementById('menu');
var x, y;
var tmpX, tmpY;
var target = null;
var direction = 0;
var canClick = 1;
var a = new Audio('E:/Music/Simple love - obito (W-n Remix) , Cover Duongg , Tien.mp3');
var pieces;
var n;	// number of rows
var m;	// number of columns
const frameWidth = 960;
const frameHeight = 540;
addEventListener("mouseup", function(event) {
	if (canClick == 1) {
		var target = event.target;
		if (target.className == 'button') {
			let lv = target.id;
			canClick = 0;
			select(lv);
		}
		else if (target.className == 'back') {
			canClick = 0;
			_back();
		}
		if (target.className == 'picture') {
			canClick = 0;
			play(target);
        }
	}
})
addEventListener("mousedown", function (event) {
	if (event.target.classname == 'piece') {
		
    }
})
function select(lv) {
	var container_pre = document.getElementsByClassName("container")[0];
	var header_pre = document.getElementsByClassName("header")[0];
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
function _back() {
	var container_pre = document.getElementsByClassName("container");
	var header_pre = document.getElementsByClassName("header");
	var n = container_pre.length;
	container_pre[n-1].style.animationName = 'back';
	header_pre[n-1].style.animationName = 'back';
	container[n-2].style.display = 'block';
	header[n-2].style.display = 'block';
	//menu.appendChild(container[0]);
	//menu.appendChild(header[0]);
	container_pre[n-2].style.animationName = 'unhide';
	header[n-2].style.animationName = 'unhide';
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
function play(target) {
	var container_pre = document.getElementsByClassName("container")[1];
	var header_pre = document.getElementsByClassName("header")[1];
	container_pre.style.animationName = 'hide';
	header_pre.style.animationName = 'hide';
	menu.appendChild(play_container);
	menu.appendChild(play_header);
	play_container.style.animationName = 'enter';
	play_header.style.animationName = 'enter';
	pieces = null;
	setTimeout(function () {
		container_pre.style.display = 'none';
		header_pre.style.display = 'none';
		canClick = 1;
		n = 3;
		m = 4;
		createImage('picture/1-01.jpg');
	}, 800);
}
addEventListener("mousedown", function (event) {
	if (event.target.className == 'piece') {
		addEventListener("mousemove", move);
		x = event.screenX;
		y = event.screenY;
	}
})
addEventListener("mouseup", function (t) {
	if (target != null) {
		for (var i = 0; target[i] != null; i++) {
			target[i].style.transform = 'scale(1)';
			target[i].style.left = '0px';
			target[i].style.top = '0px';
			target[i] = null;
        }
	}
	removeEventListener("mousemove", move);
	target = null;
	direction = 0;
})
function move(event) {
	if (target == null && direction == 0) {
		if (event.screenX != x) {
			direction = 1;
			selectTarget(event.target);
		}
		else {
			direction = 2;
			selectTarget(event.target);
		}
	}
	if (direction == 1) {
		if (event.screenX != x) {
			var d = event.screenX - x;
			for (var i = 0; i < target.length; i++) {
				target[i].style.left = tmpX[i] + d + "px";
			}
		}
	}
	else if (direction == 2) {
		if (event.screenY != y) {
			for (var i = 0; i < target.length; i++) {
				var tmp = tmpY[i] + (event.screenY - y);
				target[i].style.top = tmp + "px";
			}
		}
	}
}
function selectTarget(_target) {
	if (direction == 1) {
		tmpX = new Array();
		tmpY = new Array();
		target = new Array();
		var col = getCol(_target.parentElement);
		selectCol(col);
		checkCol(col, 1);
		checkCol(col, -1);
	}
	else if (direction == 2) {
		tmpY = new Array();
		target = new Array();
		var row = getRow(_target.parentElement);
		for (var i = 0; i < m; i++) {
			target[i] = pieces[row][i].children[0];
			frame.appendChild(pieces[row][i]);
			target[i].style.transform = 'scale(1.01)';
			tmpY[i] = 0;
			checkRow(row, 1);
			checkRow(row, -1);
        }
	}
	function checkCol(tmp_col, r) {
		if (tmp_col + r >= 0 && tmp_col + r < m) {
			if (parseInt(pieces[0][tmp_col].children[0].getAttribute('y')) + r == parseInt(pieces[0][tmp_col + r].children[0].getAttribute('y'))) {
				selectCol(tmp_col + r);
				checkCol(tmp_col + r, r);
			}
		}
	}
	function checkRow(tmp_col, r) {

	}
	function selectCol(tmp_col) {
		for (var i = 0; i < n; i++) {
			target[target.length] = pieces[i][tmp_col].children[0];
			frame.appendChild(pieces[i][tmp_col]);
			target[target.length - 1].style.transform = 'scale(1.01)';
			tmpX[target.length - 1] = 0;
			tmpY[target.lenght - 1] = 0;
		}
	}
	function selectRow(tmp_col) {}
}
function createImage(file) {
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
			tmp.style.background = 'url(' + file + ')';
			tmp.style.backgroundPositionX = -(j * (frameWidth / m)) + "px";
			tmp.style.backgroundPositionY = -(i * (frameHeight / n)) + 'px';
			tmp.style.position = 'relative';
			tmp.setAttribute('x', i);
			tmp.setAttribute('y', j);
			pieces[i][j].appendChild(tmp);

		}
	}
	mixImage(1, 1);
}
function mixImage(a, b) {
	for (var i = 0; i < a; i++) {
		var tmp1 = randomInt(n);
		var tmp2 = randomInt(n);
		while (tmp1 == tmp2) tmp2 = randomInt(n);
		for (var j = 0; j < m; j++) wrapImg(tmp1, j, tmp2, j);

	}
	for (var i = 0; i < b; i++) {
		var tmp1 = randomInt(m);
		var tmp2 = randomInt(m);
		while (tmp1 == tmp2) tmp2 = randomInt(m);
		for (var j = 0; j < n; j++) wrapImg(j, tmp1, j, tmp2);
    }
}
function wrapImg(n1, m1, n2, m2) {
	pieces[n1][m1].appendChild(pieces[n2][m2].children[0]);
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