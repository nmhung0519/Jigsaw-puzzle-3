var buttons = document.getElementsByClassName('button');
var menu = document.getElementById('menu');
var x, y;
var tmpX, tmpY;
var target = null;
var direction = 0;
var canClick = 1;
var a = new Audio('E:/Music/Simple love - obito (W-n Remix) , Cover Duongg , Tien.mp3');
var pieces = new Array();
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
		if (direction == 1) {
			for (var i = 0; i < n; i++) {
				target[i].style.transform = 'scale(1)';
				target[i].style.left = '0px';
			}
		}
		else if (direction == 2) {
			for (var i = 0; i < m; i++) {
				target[i].style.transform = 'scale(1)';
				target[i].style.top = '0px';
			}
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
			for (var i = 0; i < n; i++) {
				var tmp = tmpX[i] + (event.screenX - x);
				target[i].style.left = tmp + "px";
			}

		}
	}
	else if (direction == 2) {
		if (event.screenY != y) {
			for (var i = 0; i < m; i++) {
				var tmp = tmpY[i] + (event.screenY - y);
				target[i].style.top = tmp + "px";
			}
		}
	}
}
function selectTarget(_target) {
	console.log(_target);
	if (direction == 1) {
		tmpX = new Array();
		tmpY = new Array();
		target = new Array();
		var col = getCol(_target.parentElement);
		for (var i = 0; i < n; i++) {
			target[i] = pieces[i][col].children[0];
			frame.appendChild(pieces[i][col]);
			target[i].style.transform = 'scale(1.02)';
			tmpX[i] = 0;
			tmpY[i] = 0;
		}
	}
	else if (direction == 2) {
		tmpY = new Array();
		target = new Array();
		var row = getRow(_target.parentElement);
		for (var i = 0; i < m; i++) {
			target[i] = pieces[row][i].children[0];
			frame.appendChild(pieces[row][i]);
			target[i].style.transform = 'scale(1.02)';
			tmpY[i] = 0;
        }
    }
}
function createImage(file) {
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
			pieces[i][j].appendChild(tmp);
		}
	}
}
function mixImage() {

}
function getRow(node) {
	return new Number((node.style.top).slice(0, -2)) / (frameHeight / n);
}
function getCol(node) {
	return new Number((node.style.left).slice(0, -2)) / (frameWidth / m);
}