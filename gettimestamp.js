var result1 = document.querySelector('#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar').getAttribute("aria-valuetext");

function getinseconds(sec) {
    var x = sec.split(':');
    var seconds = parseInt(x[0]) * 60 * 60 + parseInt(x[1]) * 60 + parseInt(x[2]);
    console.log('seconds calc gettimestamp.js ' + seconds);
    return seconds;
} //function working fine

console.log('gettimestamp.js ' + result1); // okay till here

var pagelink = window.location.href;

console.log('gettimestamp.js pagelink ' + pagelink);

var tres;

//find index of &v= substring
var idx = pagelink.indexOf('v=');

console.log('gettimestamp.js idx value ' + idx);

//construct link to exact point here
var temparr = result1.split(' ');

if (temparr[6] == "Hours") {
    tres = +"00:" + temparr[0] + ":" + temparr[2];

} else if (temparr[1] == "Hours") {
    tres = temparr[0] + ":" + temparr[2] + ":" + temparr[4];
} else if (temparr[6] == "Minutes") {
    tres = "00:" + temparr[0] + ":" + temparr[2];
}

// console.log('tres gettimestamp.js ' + tres); fine - format hh:mm:ss

// console.log('typeof tres gettimestamp.js ' + typeof(tres)); //working fine - returns string


var tsinsec = getinseconds(tres); //working fine - returns number

// console.log('tsinsec gettimestamp.js ' + tsinsec); fine

var pagelinkfinal;

if (idx == -1) {
    pagelink = "https://youtube.com";
} else {
    pagelinkfinal = "https://youtube.com/watch?v=" + pagelink.substr(idx + 2, 11) + "&t=" + tsinsec;
    console.log('gettimestamp.js pagelinkfinal ' + pagelinkfinal);
} // pagelinkfinal fine


chrome.runtime.sendMessage({ method: "tsget", tsval: tres, finallink: pagelinkfinal });