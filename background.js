
chrome.browserAction.onClicked.addListener(function (tab) {

    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action", "id": activeTab.id});
    });


    var id = tab.id;
    if (tab.url.indexOf("https://chrome.google.com") == 0 || tab.url.indexOf("chrome://") == 0 || tab.url.indexOf("googleusercontent.com") == 0) {
        alert(chrome.i18n.getMessage("error_google"));
        return;
    } else if (tab.url.indexOf("file:///") == 0) {
        alert(chrome.i18n.getMessage("error_local"));
        return;
    }

    chrome.browserAction.getTitle({
        tabId: id
    }, function (title) {
        chrome.tabs.sendMessage(id, 'browserAction');
    });
});
