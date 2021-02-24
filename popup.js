// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

$(function() {

    //retrieve data from local for already stored notes
    chrome.runtime.sendMessage({ method: "getnotes" })

    $('#pointsli > li > span > a').on("click", function() {
        console.log('li clicked event fired');
    })

    //document.querySelector("#pointsli > li > span > a")

    //todo
    //make same page reload of youtube video to bookmarked point

    $('#notedesc').focus(function() {



        //for sending a message
        chrome.runtime.sendMessage({ method: "gettimestamp" });

        //for listening any message which comes from runtime
        chrome.runtime.onMessage.addListener(tsvalue);


        // chrome.storage.local.set({ note: inputnote, timestamp: time, videolink: link });

        function makeentryinstorage(inputnote, time, link) {
            chrome.runtime.sendMessage({ method: "storeinlocal", note: inputnote, timestamp: time, videolink: link });

        }

        var ts, tslink, desc;

        function tsvalue(msg) {
            // Do your work here
            if (msg.method == "tsfind") {
                //here, ive gotten timestamped video link as msg.fl, and timestamp in hour format as msg.tsvaltopopup
                // var noteinput = $('#notedesc').val();
                //add to popup.html, "timestamp received"
                ts = msg.tsvaltopopup;
                tslink = msg.fl;


                $('#submitnote').on('click', function() {
                    // console.log('submitnote button clicked')
                    var noteinput = $('#notedesc').val();
                    console.log('#noteinput val ' + noteinput);
                    $('#pointsli').append('<li><span>' + ts + ' - <a href="' + msg.fl + '">' + noteinput + '</a></span></li>');

                    makeentryinstorage(noteinput, ts, tslink);


                    // $('#pointsli').append('<li><span><a href="' + $(msg.fl) + '">' + noteinput + '</a></span></li>');
                });

                $('#currts').text(msg.tsvaltopopup)

                $('#tsreceipt').text('got timestamp')
                    // console.log('msg obj popup.js ' + msg);
                    // console.log('popupjs noteinput ' + noteinput);
                    // $('#pointsli').append('<li><span><a href="' + $(msg.fl) + '">' + noteinput + '</a></span></li>');

                // { method: "tsfind", tsvaltopopup: msg.tsval, fl: msg.finallink }


            }

        }



        // ------------
        // $('#currts').text('hello');
        // chrome.runtime.onMessage.addListener(fn);

        // function fn(obj, sender, sendResponse) {
        //     if (obj) {
        //         sendResponse({ message: 'in the if(obj)' })
        //         $('#currts').text(obj);
        //     }
        // }

    })
});

// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };