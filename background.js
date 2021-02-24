// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.tabs.onActivated.addListener(tab => {
    console.log(tab);
    chrome.tabs.get(tab.tabId, c => {
        // console.log(c.url);
        if (/^https:\/\/www\.youtube/.test(c.url)) {



            chrome.tabs.executeScript(null, { file: './foreground.js' }, () => {
                console.log('i injected fg using bg script in youtube webpages')
            })
        }
    })

})

//for sending a message
// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {

// });

//for listening any message which comes from runtime


chrome.runtime.onMessage.addListener(retrievenotes)

function retrievenotes(msg) {
    if (msg.method == "getnotes") {
        //todo
    }

}

chrome.runtime.onMessage.addListener(storelocal);

function storelocal(msg) {
    if (msg.method == "storeinlocal") {
        chrome.storage.local.set({ note: inputnote, timestamp: time, videolink: link });
    }
}

chrome.runtime.onMessage.addListener(gettimestampfile);

function gettimestampfile(msg) {
    if (msg.method == "tsget") {
        var temp1 = msg.tsval;
        var temp2 = msg.finallink;
        console.log("msg.tsval value: " + msg.tsval);
        console.log('msg.finallink ' + msg.finallink);
        //tsval and finallink being received properly in the bg consolelog

        chrome.runtime.sendMessage({ method: "tsfind", tsvaltopopup: temp1, fl: temp2 });
        // , function() {
        //     console.log('tsval to popup');
        // })
    }

}

function checktimestamp(msg) {
    // Do your work here
    if (msg.method == "gettimestamp") {

        chrome.tabs.executeScript(null, { file: './gettimestamp.js' }, () => {
            console.log('injected gettimestamp.js file')
                //listen for result string from gettimestamp.js
        })
    }
}

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log('The color is green.');
//   });
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'developer.chrome.com'},
//       })],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });