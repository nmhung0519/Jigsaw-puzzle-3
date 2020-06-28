var container = [];
var header = [];
var title = [];
var back = [];

//Main - 0
container[0] = document.createElement("div");
container[0].className = 'container';
header[0] = document.createElement("div");
header[0].className = 'header';
header[0].style.background = '#FF7424';
var setting = document.createElement("div");
setting.className = 'setting';
title[0] = document.createElement("div");
title[0].innerText = 'Slide the Pic';
title[0].className = 'title';
header[0].appendChild(title[0]);
header[0].appendChild(setting);
//Button 1
var button_1 = document.createElement("div");
button_1.id = '1';
button_1.className = 'button';
button_1.innerText = 'Main Pack';
container[0].appendChild(button_1);
//Button 2
var button_2 = document.createElement("div");
button_2.id = '2';
button_2.className = 'button';
button_2.innerText = 'Famous Paintings';
container[0].appendChild(button_2);
//Button 3
var button_3 = document.createElement("div");
button_3.id = '3';
button_3.className = 'button';
button_3.innerText = 'Animals';
container[0].appendChild(button_3);
//Button 4
var button_4 = document.createElement("div");
button_4.id = '4';
button_4.className = 'button';
button_4.innerText = 'Portraits';
container[0].appendChild(button_4);
//Button 5
var button_5 = document.createElement("div");
button_5.id = '5';
button_5.className = 'button';
button_5.innerText = 'Landmarks';
container[0].appendChild(button_5);

//mainPack - 1
container[1] = document.createElement("div");
container[1].className = 'container';
container[1].style.animationName = 'enter';
header[1] = document.createElement("div");
header[1].className = 'header';
back[1] = document.createElement("div");
back[1].className = 'back';
header[1].appendChild(back[1]);
header[1].style.background = 'blue';
header[1].style.animationName = 'enter';
title[1] = document.createElement("span");
title[1].innerText = 'Main Pack';
title[1].className = 'title';
header[1].appendChild(title[1]);

//Famous Paintings - 2
container[2] = document.createElement("div");
container[2].className = 'container';
container[2].style.animationName = 'enter';
header[2] = document.createElement("div");
header[2].className = 'header';
back[2] = document.createElement("div");
back[2].className = 'back';
header[2].appendChild(back[2]);
header[2].style.background = 'blue';
header[2].style.animationName = 'enter';
title[2] = document.createElement("span");
title[2].innerText = 'Famous Paintings';
title[2].className = 'title';
header[2].appendChild(title[2]);

//Animals - 3
container[3] = document.createElement("div");
container[3].className = 'container';
container[3].style.animationName = 'enter';
header[3] = document.createElement("div");
header[3].className = 'header';
back[3] = document.createElement("div");
back[3].className = 'back';
header[3].appendChild(back[3]);
header[3].style.background = 'blue';
header[3].style.animationName = 'enter';
title[3] = document.createElement("span");
title[3].innerText = 'Animals';
title[3].className = 'title';
header[3].appendChild(title[3]);

//Portraits - 4
container[4] = document.createElement("div");
container[4].className = 'container';
container[4].style.animationName = 'enter';
header[4] = document.createElement("div");
header[4].className = 'header';
back[4] = document.createElement("div");
back[4].className = 'back';
header[4].appendChild(back[4]);
header[4].style.background = 'blue';
header[4].style.animationName = 'enter';
title[4] = document.createElement("span");
title[4].innerText = 'Portraits';
title[4].className = 'title';
header[4].appendChild(title[4]);

//Landmarks
container[5] = document.createElement("div");
container[5].className = 'container';
container[5].style.animationName = 'enter';
header[5] = document.createElement("div");
header[5].className = 'header';
back[5] = document.createElement("div");
back[5].className = 'back';
header[5].appendChild(back[5]);
header[5].style.background = 'blue';
header[5].style.animationName = 'enter';
title[5] = document.createElement("span");
title[5].innerText = 'Portraits';
title[5].className = 'title';
header[5].appendChild(title[5]);

var pic = document.createElement("div");
pic.className = 'picture';
container[1].appendChild(pic);
pic.style.background = 'url("picture/1-01.jpg")';
pic.id = '1-01';
pic.style.backgroundSize = 'cover';
var pic2 = document.createElement("div");
pic2.className = 'picture';
container[1].appendChild(pic2);

var play_container = document.createElement("div");
play_container.className = "container";
var play_header = document.createElement("div");
var play_title = document.createElement("span");
play_title.className = "title";
var play_setting = document.createElement("div");
play_setting.className = 'setting';
play_setting.style.left = "96%";
play_header.className = "header";
play_header.style.background = 'pink';
play_header.appendChild(play_title);
play_header.appendChild(play_setting);
var play_back = document.createElement("div");
play_back.className = "back";
play_header.appendChild(play_back);
var frame = document.createElement("div");
frame.id = 'frame';
play_container.appendChild(frame);


//setting
container[-1]= document.createElement("div");
container[-1].className = "container";
header[-1] = document.createElement("div");
header[-1].className = 'header';
header[-1].style.background = '#FF7424';
header[-1].style.animationName = 'enter';
setting_title = document.createElement("span");
setting_title.className = "title";
setting_title.innerText = "Setting";
back[-1] = document.createElement("div");
back[-1].className = "back";
header[-1].appendChild(back[-1]);
header[-1].appendChild(setting_title);

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
container[-1].appendChild(soundBT);
