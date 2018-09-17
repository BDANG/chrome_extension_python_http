// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var bkg = chrome.extension.getBackgroundPage();

let changeColor = document.getElementById('get_button');
let postButton = document.getElementById("post_button");

var xhr = new XMLHttpRequest();


chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});


changeColor.onclick = function(element) {
  bkg.console.log("GET BUTTON");
  xhr.open("GET", "http://localhost:8000");

  //Send the proper header information along with the request
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.send();

  xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == 4 && xhr.status == 200) {
        bkg.console.log(xhr.responseText);
        bkg.alert("GET Reponse: "+xhr.responseText);
    }
  }


  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

postButton.onclick = function(element) {
  bkg.console.log("POST BUTTON");

  xhr.open("POST", "http://localhost:8000");
  //Send the proper header information along with the request
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  var params = "hello=world";
  xhr.send(params);

  xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == 4 && xhr.status == 200) {
        bkg.console.log(xhr.responseText);
        bkg.alert("POST Reponse: "+xhr.responseText);
    }
  }

};
