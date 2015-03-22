'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);

    var storageService = new remindmeStorageService();
    chrome.browserAction.setBadgeBackgroundColor({ color: [100, 100, 100, 100] });
    chrome.browserAction.setBadgeText({text: '' + storageService.count()});
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  var storageService = new remindmeStorageService();
  if(request) {
    if(request.action === 'add') {
      storageService.add(request.data);
    }
    chrome.browserAction.setBadgeText({text: '' + storageService.count()});
  }
});

