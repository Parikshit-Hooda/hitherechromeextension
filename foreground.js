console.log('from fg');

let result = document.querySelector('#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar').getAttribute("aria-valuetext");

console.log(result);

// chrome.runtime.sendMessage({ timestring: result }, function(response) {
//     console.log('response received' + response);
// });